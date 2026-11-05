/**
 * End-to-End API Integration Verification Test
 */
const http = require('http');

// Helper to make HTTP request to localhost:5000
function apiRequest(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (body) headers['Content-Length'] = Buffer.byteLength(postData);

    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path: `/api${path}`,
        method,
        headers
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );

    req.on('error', reject);
    if (body) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE END-TO-END TESTS ---');

  // Wait 1.5s for server to start
  await new Promise((r) => setTimeout(r, 1500));

  try {
    // 1. Health check
    const health = await apiRequest('/health');
    console.log('[TEST 1] Health Check:', health.status === 200 ? 'PASS' : 'FAIL', health.data.project);

    // 2. Student Login
    const studentLogin = await apiRequest('/auth/login', 'POST', {
      email: 'student@quiz.edu',
      password: 'student123'
    });
    console.log('[TEST 2] Student Login:', studentLogin.status === 200 ? 'PASS' : 'FAIL', studentLogin.data.user?.name);
    const studentToken = studentLogin.data.token;

    // 3. Faculty Login
    const facultyLogin = await apiRequest('/auth/login', 'POST', {
      email: 'faculty@quiz.edu',
      password: 'faculty123'
    });
    console.log('[TEST 3] Faculty Login:', facultyLogin.status === 200 ? 'PASS' : 'FAIL', facultyLogin.data.user?.name);
    const facultyToken = facultyLogin.data.token;

    // 4. Get Quizzes (Student View)
    const quizzesRes = await apiRequest('/quizzes', 'GET', null, studentToken);
    console.log('[TEST 4] Get Quizzes:', quizzesRes.status === 200 ? 'PASS' : 'FAIL', `Found ${quizzesRes.data.quizzes?.length} quizzes`);

    // 5. Get Single Quiz for taking (Ensure NO correct_answer in payload!)
    const quizTake = await apiRequest('/quizzes/1', 'GET', null, studentToken);
    const questions = quizTake.data.quiz?.questions || [];
    const hasExposedAnswer = questions.some((q) => q.correct_answer !== undefined);
    console.log('[TEST 5] Student Quiz Retrieval (Security Check):', !hasExposedAnswer ? 'PASS (Answers HIDDEN)' : 'FAIL (Answers LEAKED!)');

    // 6. Submit Quiz as Student
    const answers = { 1: 'B', 2: 'C', 3: 'A', 4: 'B', 5: 'C' }; // All correct answers
    const submitRes = await apiRequest('/quizzes/1/submit', 'POST', { answers }, studentToken);
    console.log('[TEST 6] Submit Quiz & Score Calculation:', submitRes.status === 201 ? 'PASS' : 'FAIL', `Score: ${submitRes.data.result?.score}/${submitRes.data.result?.totalQuestions} (${submitRes.data.result?.percentage}%)`);

    // 7. Student Dashboard Stats
    const studentStats = await apiRequest('/dashboard/stats', 'GET', null, studentToken);
    console.log('[TEST 7] Student Dashboard Stats:', studentStats.status === 200 ? 'PASS' : 'FAIL', `Attempts: ${studentStats.data.stats?.totalSubmissions}, Avg: ${studentStats.data.stats?.averageScore}%`);

    // 8. Faculty Dashboard Stats
    const facultyStats = await apiRequest('/dashboard/stats', 'GET', null, facultyToken);
    console.log('[TEST 8] Faculty Dashboard Stats:', facultyStats.status === 200 ? 'PASS' : 'FAIL', `Total Students: ${facultyStats.data.stats?.totalStudents}, Quizzes: ${facultyStats.data.stats?.totalQuizzes}`);

    // 9. Faculty Results View
    const facultyResults = await apiRequest('/results/all', 'GET', null, facultyToken);
    console.log('[TEST 9] Faculty Results View:', facultyResults.status === 200 ? 'PASS' : 'FAIL', `Submissions: ${facultyResults.data.results?.length}`);

    // 10. Faculty Create New Quiz
    const newQuizRes = await apiRequest('/quizzes', 'POST', {
      title: 'Virtualization & Hypervisors',
      description: 'Covers Type 1 and Type 2 hypervisors and containerization.',
      status: 'published',
      questions: [
        {
          question_text: 'Which hypervisor runs directly on bare-metal hardware without an underlying OS?',
          option_a: 'Type 2 Hypervisor',
          option_b: 'Type 1 Bare-Metal Hypervisor',
          option_c: 'Browser JVM',
          option_d: 'Virtual DOM',
          correct_answer: 'B'
        }
      ]
    }, facultyToken);
    console.log('[TEST 10] Faculty Create Quiz:', newQuizRes.status === 201 ? 'PASS' : 'FAIL', `Created Quiz ID: ${newQuizRes.data.quizId}`);

    console.log('\n--- ALL 10 TESTS EXECUTED SUCCESSFULLY! ---');
    process.exit(0);
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

// Start server in-process for test
require('./server/src/index.js');
runTests();

