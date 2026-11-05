const fs = require('fs');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'root',
  database: process.env.DB_NAME || 'cloud_quiz_db',
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, '..', '..', 'ca.pem'))
},
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
};

// Create a connection pool
const realPool = mysql.createPool(dbConfig);

let isDbConnected = false;

// In-Memory Store (Preloaded with academic Cloud Computing seed data)
const memoryStore = {
  users: [
    {
      id: 1,
      name: 'Prof. Alan Turing',
      email: 'faculty@quiz.edu',
      password: '$2b$10$zws7/alkGZ6IgTr3dUI7JuhYCZVuZ1v0Lrh7TRc8E.OgYGF7mgl8O', // faculty123
      role: 'faculty',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString()
    },
    {
      id: 2,
      name: 'Ada Lovelace',
      email: 'student@quiz.edu',
      password: '$2b$10$ONojY5aUhP/BtE8DZJr1ouXitMqd9zM3yVBtmEJaxznWLCp3Uv.3e', // student123
      role: 'student',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@quiz.edu',
      password: '$2b$10$ONojY5aUhP/BtE8DZJr1ouXitMqd9zM3yVBtmEJaxznWLCp3Uv.3e', // student123
      role: 'student',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    }
  ],
  quizzes: [
    {
      id: 1,
      title: 'Cloud Computing Fundamentals',
      description: 'Covers NIST cloud definitions, core cloud service models (IaaS, PaaS, SaaS), deployment architectures, and cloud elasticity.',
      created_by: 1,
      status: 'published',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      id: 2,
      title: 'AWS Core Infrastructure & Cloud Services',
      description: 'Test your knowledge on Amazon EC2 compute instances, S3 object storage buckets, RDS managed databases, and CloudWatch metrics.',
      created_by: 1,
      status: 'published',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      id: 3,
      title: 'Three-Tier Architecture & Scalability',
      description: 'Examines multi-tier cloud web applications, decoupling presentation from application logic, and database tier durability.',
      created_by: 1,
      status: 'published',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ],
  questions: [
    // Quiz 1 Questions
    {
      id: 1,
      quiz_id: 1,
      question_text: 'According to the NIST definition, which of the following is an essential characteristic of cloud computing?',
      option_a: 'Fixed physical location',
      option_b: 'On-demand self-service',
      option_c: 'Manual resource provisioning',
      option_d: 'High latency computing',
      correct_answer: 'B'
    },
    {
      id: 2,
      quiz_id: 1,
      question_text: 'Which cloud computing service model provides users with virtual machines, networking, and storage while leaving OS management to the customer?',
      option_a: 'Software as a Service (SaaS)',
      option_b: 'Platform as a Service (PaaS)',
      option_c: 'Infrastructure as a Service (IaaS)',
      option_d: 'Function as a Service (FaaS)',
      correct_answer: 'C'
    },
    {
      id: 3,
      quiz_id: 1,
      question_text: 'What is the term for the ability of a cloud system to automatically provision and de-provision computing resources according to workload demand?',
      option_a: 'Elasticity',
      option_b: 'Durability',
      option_c: 'Virtualization',
      option_d: 'Fault Isolation',
      correct_answer: 'A'
    },
    {
      id: 4,
      quiz_id: 1,
      question_text: 'In which cloud deployment model does an organization combine private cloud infrastructure with public cloud services?',
      option_a: 'Community Cloud',
      option_b: 'Hybrid Cloud',
      option_c: 'Multi-tenant On-premises',
      option_d: 'Private Isolated Grid',
      correct_answer: 'B'
    },
    {
      id: 5,
      quiz_id: 1,
      question_text: 'Which of the following is a key advantage of the Cloud Computing Pay-As-You-Go pricing model?',
      option_a: 'High upfront capital expenditure (CapEx)',
      option_b: 'Fixed ongoing hardware maintenance overhead',
      option_c: 'Conversion of CapEx to operational expenditure (OpEx)',
      option_d: 'Mandatory 5-year hardware leasing contracts',
      correct_answer: 'C'
    },

    // Quiz 2 Questions
    {
      id: 6,
      quiz_id: 2,
      question_text: 'What type of cloud computing service is Amazon Elastic Compute Cloud (EC2)?',
      option_a: 'Managed NoSQL Database',
      option_b: 'Object Storage Service',
      option_c: 'Virtual Compute Server (IaaS)',
      option_d: 'Content Delivery Network (CDN)',
      correct_answer: 'C'
    },
    {
      id: 7,
      quiz_id: 2,
      question_text: 'What fundamental storage unit is used by Amazon Simple Storage Service (S3) to store files and documents?',
      option_a: 'Blocks and Partitions',
      option_b: 'Buckets and Objects',
      option_c: 'Tables and Columns',
      option_d: 'Mount Points and Disks',
      correct_answer: 'B'
    },
    {
      id: 8,
      quiz_id: 2,
      question_text: 'Which AWS managed service provides automated backups, patch management, and multi-AZ replication for MySQL databases?',
      option_a: 'Amazon EC2',
      option_b: 'Amazon S3',
      option_c: 'Amazon Relational Database Service (RDS)',
      option_d: 'Amazon Route 53',
      correct_answer: 'C'
    },
    {
      id: 9,
      quiz_id: 2,
      question_text: 'What is the primary role of Amazon CloudWatch in a cloud application architecture?',
      option_a: 'Compile frontend React assets',
      option_b: 'Collect operational metrics, system logs, and trigger alarms',
      option_c: 'Store relational database schemas',
      option_d: 'Route DNS queries across regional data centers',
      correct_answer: 'B'
    },
    {
      id: 10,
      quiz_id: 2,
      question_text: 'Why is Amazon S3 suitable for hosting the static production build of a React single-page application?',
      option_a: 'It requires an active Apache server daemon',
      option_b: 'It natively serves HTML, CSS, and JS objects over HTTP with high availability',
      option_c: 'It automatically compiles Express.js backend scripts',
      option_d: 'It replaces relational database servers',
      correct_answer: 'B'
    },

    // Quiz 3 Questions
    {
      id: 11,
      quiz_id: 3,
      question_text: 'In a standard Three-Tier web application, what does the Presentation Tier consist of?',
      option_a: 'Node.js Express controller routing',
      option_b: 'MySQL database tables and foreign keys',
      option_c: 'Client-side user interface (e.g. React.js in browser)',
      option_d: 'Operating system kernel and hypervisor',
      correct_answer: 'C'
    },
    {
      id: 12,
      quiz_id: 3,
      question_text: 'What is the main responsibility of the Application/Logic Tier (such as our Node.js Express server)?',
      option_a: 'Rendering raw pixels on physical monitors',
      option_b: 'Executing business rules, validation, score computation, and API endpoints',
      option_c: 'Physical data block allocation on SSDs',
      option_d: 'Routing BGP packets between Internet backbones',
      correct_answer: 'B'
    },
    {
      id: 13,
      quiz_id: 3,
      question_text: 'Why should correct quiz answers NEVER be sent in the student-facing quiz question API response?',
      option_a: 'To conserve network bandwidth on slow mobile devices',
      option_b: 'Because JSON does not support multiple fields',
      option_c: 'To prevent client-side answer inspection and cheating prior to submission',
      option_d: 'Because MySQL only allows reading answers at midnight',
      correct_answer: 'C'
    },
    {
      id: 14,
      quiz_id: 3,
      question_text: 'What is the function of the Database Tier (Data Tier) in a cloud architecture?',
      option_a: 'Handle client HTTP cookies and local storage',
      option_b: 'Persist users, quizzes, questions, and attempt results reliably',
      option_c: 'Compile Vite JSX bundles on the fly',
      option_d: 'Encrypt TLS handshakes for incoming browser requests',
      correct_answer: 'B'
    },
    {
      id: 15,
      quiz_id: 3,
      question_text: 'What benefit does decoupling the Frontend (Vite/React) from Backend (Express API) provide in cloud deployments?',
      option_a: 'Each layer can be scaled independently based on traffic and demand',
      option_b: 'It eliminates the need for HTTP protocols',
      option_c: 'It forces all users to use the same browser version',
      option_d: 'It prevents databases from using SQL syntax',
      correct_answer: 'A'
    }
  ],
  results: [
    {
      id: 1,
      student_id: 2,
      quiz_id: 1,
      score: 4,
      total_questions: 5,
      percentage: 80.00,
      attempted_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      id: 2,
      student_id: 3,
      quiz_id: 1,
      score: 5,
      total_questions: 5,
      percentage: 100.00,
      attempted_at: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ]
};

// Test connection on startup
async function testConnection() {
  try {
    const connection = await realPool.getConnection();
    console.log(`\n===========================================================`);
    console.log(` MySQL Database Connected: "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);
    console.log(` Storage Mode: LIVE MYSQL DATABASE (Primary Mode)`);
    console.log(`===========================================================\n`);
    connection.release();
    isDbConnected = true;
    return true;
  } catch (error) {
    isDbConnected = false;
    console.log(`\n===========================================================`);
    console.log(`⚠️  NOTE: MySQL database "${dbConfig.database}" is not yet connected.`);
    console.log(`   Reason: ${error.message}`);
    console.log(`-----------------------------------------------------------`);
    console.log(`   TO CONNECT YOUR REAL MYSQL DATABASE:`);
    console.log(`   1. Open "server/.env" and set your MySQL password:`);
    console.log(`      DB_PASSWORD=your_mysql_password`);
    console.log(`   2. Run: npm run db:setup`);
    console.log(`-----------------------------------------------------------`);
    console.log(`   STANDBY DEMO MODE ACTIVE:`);
    console.log(`   The application is fully operational in Google Chrome`);
    console.log(`   with preloaded Cloud Computing quizzes & sample accounts!`);
    console.log(`===========================================================\n`);
    return false;
  }
}

// Smart query executor
async function executeQuery(sql, params = []) {
  if (isDbConnected) {
    try {
      return await realPool.query(sql, params);
    } catch (err) {
      console.warn('MySQL query error, using memory store fallback:', err.message);
    }
  }

  // Memory store fallback
  const normalized = sql.trim().toLowerCase();

  // 1. SELECT users by email
  if (normalized.startsWith('select') && normalized.includes('from users') && normalized.includes('email = ?')) {
    const email = params[0];
    const match = memoryStore.users.filter(u => u.email === email);
    return [match, []];
  }

  // 2. SELECT user by id
  if (normalized.startsWith('select') && normalized.includes('from users') && normalized.includes('id = ?')) {
    const id = params[0];
    const match = memoryStore.users.filter(u => u.id === id);
    return [match, []];
  }

  // 3. INSERT user
  if (normalized.startsWith('insert into users')) {
    const [name, email, password, role] = params;
    const newId = memoryStore.users.length > 0 ? Math.max(...memoryStore.users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, name, email, password, role, created_at: new Date().toISOString() };
    memoryStore.users.push(newUser);
    return [{ insertId: newId, affectedRows: 1 }, []];
  }

  // 4. SELECT quizzes (getAllQuizzes)
  if (normalized.startsWith('select') && normalized.includes('from quizzes q')) {
    const isOnlyPublished = normalized.includes("status = 'published'");
    const quizzes = memoryStore.quizzes
      .filter(q => !isOnlyPublished || q.status === 'published')
      .map(q => {
        const creator = memoryStore.users.find(u => u.id === q.created_by);
        const qCount = memoryStore.questions.filter(qst => qst.quiz_id === q.id).length;
        const attempts = memoryStore.results.filter(r => r.quiz_id === q.id).length;
        return {
          id: q.id,
          title: q.title,
          description: q.description,
          status: q.status,
          created_at: q.created_at,
          creator_name: creator ? creator.name : 'Faculty Staff',
          total_questions: qCount,
          total_attempts: attempts
        };
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return [quizzes, []];
  }

  // 5. SELECT single quiz by id
  if (normalized.startsWith('select') && normalized.includes('from quizzes') && (normalized.includes('id = ?') || normalized.includes('q.id = ?'))) {
    const qid = params[0];
    const quiz = memoryStore.quizzes.find(q => q.id === qid);
    if (!quiz) return [[], []];
    if (normalized.includes("status = 'published'") || normalized.includes('status = "published"')) {
      if (quiz.status !== 'published') return [[], []];
    }
    const creator = memoryStore.users.find(u => u.id === quiz.created_by);
    return [[{ ...quiz, creator_name: creator ? creator.name : 'Faculty Staff' }], []];
  }

  // 6. SELECT questions for quiz
  if (normalized.startsWith('select') && normalized.includes('from questions') && normalized.includes('quiz_id = ?')) {
    const qid = params[0];
    const isFacultyView = normalized.includes('correct_answer');
    const questions = memoryStore.questions
      .filter(q => q.quiz_id === qid)
      .map(q => {
        if (isFacultyView) return { ...q };
        const { correct_answer, ...safeQ } = q;
        return safeQ;
      });
    return [questions, []];
  }

  // 7. INSERT quiz
  if (normalized.startsWith('insert into quizzes')) {
    const [title, description, created_by, status] = params;
    const newId = memoryStore.quizzes.length > 0 ? Math.max(...memoryStore.quizzes.map(q => q.id)) + 1 : 1;
    const newQuiz = { id: newId, title, description, created_by, status, created_at: new Date().toISOString() };
    memoryStore.quizzes.unshift(newQuiz);
    return [{ insertId: newId, affectedRows: 1 }, []];
  }

  // 8. UPDATE quiz
  if (normalized.startsWith('update quizzes set title')) {
    const [title, description, status, quizId] = params;
    const quiz = memoryStore.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.title = title;
      quiz.description = description;
      quiz.status = status;
    }
    return [{ affectedRows: 1 }, []];
  }

  // 9. DELETE quiz
  if (normalized.startsWith('delete from quizzes where id = ?')) {
    const qid = params[0];
    memoryStore.quizzes = memoryStore.quizzes.filter(q => q.id !== qid);
    memoryStore.questions = memoryStore.questions.filter(q => q.quiz_id !== qid);
    memoryStore.results = memoryStore.results.filter(r => r.quiz_id !== qid);
    return [{ affectedRows: 1 }, []];
  }

  // 10. TOGGLE quiz status
  if (normalized.startsWith('update quizzes set status = ? where id = ?')) {
    const [newStatus, qid] = params;
    const quiz = memoryStore.quizzes.find(q => q.id === qid);
    if (quiz) quiz.status = newStatus;
    return [{ affectedRows: 1 }, []];
  }

  // 11. INSERT questions
  if (normalized.startsWith('insert into questions')) {
    const rows = params[0];
    if (Array.isArray(rows)) {
      rows.forEach(r => {
        const [quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer] = r;
        const newQId = memoryStore.questions.length > 0 ? Math.max(...memoryStore.questions.map(q => q.id)) + 1 : 1;
        memoryStore.questions.push({
          id: newQId,
          quiz_id,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer
        });
      });
    }
    return [{ affectedRows: rows ? rows.length : 1 }, []];
  }

  // 12. DELETE questions for quiz
  if (normalized.startsWith('delete from questions where quiz_id = ?')) {
    const qid = params[0];
    memoryStore.questions = memoryStore.questions.filter(q => q.quiz_id !== qid);
    return [{ affectedRows: 1 }, []];
  }

  // 13. INSERT results
  if (normalized.startsWith('insert into results')) {
    const [student_id, quiz_id, score, total_questions, percentage] = params;
    const newId = memoryStore.results.length > 0 ? Math.max(...memoryStore.results.map(r => r.id)) + 1 : 1;
    const newRes = {
      id: newId,
      student_id,
      quiz_id,
      score,
      total_questions,
      percentage,
      attempted_at: new Date().toISOString()
    };
    memoryStore.results.unshift(newRes);
    return [{ insertId: newId, affectedRows: 1 }, []];
  }

  // 14. SELECT student results
  if (normalized.startsWith('select') && normalized.includes('from results r') && normalized.includes('r.student_id = ?')) {
    const sid = params[0];
    const results = memoryStore.results
      .filter(r => r.student_id === sid)
      .map(r => {
        const quiz = memoryStore.quizzes.find(q => q.id === r.quiz_id);
        return {
          id: r.id,
          quiz_id: r.quiz_id,
          score: r.score,
          total_questions: r.total_questions,
          percentage: r.percentage,
          attempted_at: r.attempted_at,
          quiz_title: quiz ? quiz.title : 'Quiz',
          quiz_description: quiz ? quiz.description : ''
        };
      })
      .sort((a, b) => new Date(b.attempted_at) - new Date(a.attempted_at));
    return [results, []];
  }

  // 15. SELECT all results (Faculty)
  if (normalized.startsWith('select') && normalized.includes('from results r') && normalized.includes('join users u')) {
    const qid = params.length > 0 ? params[0] : null;
    const results = memoryStore.results
      .filter(r => !qid || r.quiz_id === qid)
      .map(r => {
        const quiz = memoryStore.quizzes.find(q => q.id === r.quiz_id);
        const user = memoryStore.users.find(u => u.id === r.student_id);
        return {
          id: r.id,
          score: r.score,
          total_questions: r.total_questions,
          percentage: r.percentage,
          attempted_at: r.attempted_at,
          quiz_id: r.quiz_id,
          quiz_title: quiz ? quiz.title : 'Quiz',
          student_id: r.student_id,
          student_name: user ? user.name : 'Unknown Student',
          student_email: user ? user.email : 'unknown'
        };
      })
      .sort((a, b) => new Date(b.attempted_at) - new Date(a.attempted_at));
    return [results, []];
  }

  // 16. DASHBOARD STATS
  if (normalized.includes('distinct_quizzes_attempted')) {
    const sid = params[0];
    const userRes = memoryStore.results.filter(r => r.student_id === sid);
    const distinctQuizzes = new Set(userRes.map(r => r.quiz_id)).size;
    const totalAttempts = userRes.length;
    const avgScore = totalAttempts > 0 ? (userRes.reduce((acc, r) => acc + Number(r.percentage), 0) / totalAttempts) : 0;
    const highestScore = totalAttempts > 0 ? Math.max(...userRes.map(r => Number(r.percentage))) : 0;
    return [[{
      distinct_quizzes_attempted: distinctQuizzes,
      total_attempts: totalAttempts,
      avg_score: avgScore,
      highest_score: highestScore
    }], []];
  }

  if (normalized.includes('select count(*) as total_quizzes')) {
    return [[{
      total_quizzes: memoryStore.quizzes.length,
      published_quizzes: memoryStore.quizzes.filter(q => q.status === 'published').length
    }], []];
  }
  if (normalized.includes('select count(*) as total_students')) {
    return [[{
      total_students: memoryStore.users.filter(u => u.role === 'student').length
    }], []];
  }
  if (normalized.includes('select count(*) as total_attempts')) {
    const count = memoryStore.results.length;
    const sum = memoryStore.results.reduce((acc, r) => acc + Number(r.percentage), 0);
    const avg = count > 0 ? sum / count : 0;
    return [[{ total_attempts: count, avg_percentage: avg }], []];
  }
  if (normalized.includes('select count(*) as available_quizzes')) {
    return [[{
      available_quizzes: memoryStore.quizzes.filter(q => q.status === 'published').length
    }], []];
  }

  if (normalized.includes('from results r') && normalized.includes('join quizzes q') && normalized.includes('r.student_id = ?')) {
    const sid = params[0];
    const userRes = memoryStore.results
      .filter(r => r.student_id === sid)
      .map(r => {
        const quiz = memoryStore.quizzes.find(q => q.id === r.quiz_id);
        return {
          id: r.id,
          quiz_id: r.quiz_id,
          score: r.score,
          total_questions: r.total_questions,
          percentage: r.percentage,
          attempted_at: r.attempted_at,
          quiz_title: quiz ? quiz.title : 'Quiz'
        };
      })
      .sort((a, b) => new Date(b.attempted_at) - new Date(a.attempted_at));
    return [userRes, []];
  }

  if (normalized.includes('from results r') && normalized.includes('join users u') && normalized.includes('join quizzes q')) {
    const list = memoryStore.results.map(r => {
      const u = memoryStore.users.find(usr => usr.id === r.student_id);
      const q = memoryStore.quizzes.find(qz => qz.id === r.quiz_id);
      return {
        id: r.id,
        score: r.score,
        total_questions: r.total_questions,
        percentage: r.percentage,
        attempted_at: r.attempted_at,
        student_name: u ? u.name : 'Student',
        quiz_title: q ? q.title : 'Quiz'
      };
    }).sort((a, b) => new Date(b.attempted_at) - new Date(a.attempted_at));
    return [list, []];
  }

  if (normalized.includes('from quizzes q') && normalized.includes('left join results r')) {
    const list = memoryStore.quizzes.map(q => {
      const attempts = memoryStore.results.filter(r => r.quiz_id === q.id);
      const avg = attempts.length > 0 ? (attempts.reduce((a, c) => a + Number(c.percentage), 0) / attempts.length) : null;
      return {
        id: q.id,
        title: q.title,
        status: q.status,
        attempt_count: attempts.length,
        avg_score: avg
      };
    });
    return [list, []];
  }

  // Default return
  return [[], []];
}

async function getConnection() {
  if (isDbConnected) {
    try {
      return await realPool.getConnection();
    } catch (e) {
      // fallback
    }
  }

  return {
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: executeQuery
  };
}

module.exports = {
  pool: {
    query: executeQuery,
    getConnection: getConnection
  },
  testConnection,
  dbConfig,
  isLiveDbConnected: () => isDbConnected
};
