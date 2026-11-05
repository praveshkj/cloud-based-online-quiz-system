-- ==============================================================
-- CLOUD-BASED ONLINE QUIZ SYSTEM - SEED DATA
-- Academic Project for 5th-Semester Cloud Computing
-- ==============================================================

USE cloud_quiz_db;

-- 1. INSERT DEFAULT USERS
-- Password for all seed users is:
-- Faculty: faculty123 ($2b$10$zws7/alkGZ6IgTr3dUI7JuhYCZVuZ1v0Lrh7TRc8E.OgYGF7mgl8O)
-- Student: student123 ($2b$10$ONojY5aUhP/BtE8DZJr1ouXitMqd9zM3yVBtmEJaxznWLCp3Uv.3e)

INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Prof. Alan Turing', 'faculty@quiz.edu', '$2b$10$zws7/alkGZ6IgTr3dUI7JuhYCZVuZ1v0Lrh7TRc8E.OgYGF7mgl8O', 'faculty'),
(2, 'Ada Lovelace', 'student@quiz.edu', '$2b$10$ONojY5aUhP/BtE8DZJr1ouXitMqd9zM3yVBtmEJaxznWLCp3Uv.3e', 'student'),
(3, 'John Doe', 'john.doe@quiz.edu', '$2b$10$ONojY5aUhP/BtE8DZJr1ouXitMqd9zM3yVBtmEJaxznWLCp3Uv.3e', 'student');

-- 2. INSERT SAMPLE QUIZZES
INSERT INTO quizzes (id, title, description, created_by, status) VALUES
(1, 'Cloud Computing Fundamentals', 'Covers NIST cloud definitions, core cloud service models (IaaS, PaaS, SaaS), deployment architectures, and cloud elasticity.', 1, 'published'),
(2, 'AWS Core Infrastructure & Cloud Services', 'Test your knowledge on Amazon EC2 compute instances, S3 object storage buckets, RDS managed databases, and CloudWatch metrics.', 1, 'published'),
(3, 'Three-Tier Architecture & Scalability', 'Examines multi-tier cloud web applications, decoupling presentation from application logic, and database tier durability.', 1, 'published');

-- 3. INSERT QUESTIONS FOR QUIZ 1: Cloud Computing Fundamentals
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES
(1, 'According to the NIST definition, which of the following is an essential characteristic of cloud computing?', 'Fixed physical location', 'On-demand self-service', 'Manual resource provisioning', 'High latency computing', 'B'),
(1, 'Which cloud computing service model provides users with virtual machines, networking, and storage while leaving OS management to the customer?', 'Software as a Service (SaaS)', 'Platform as a Service (PaaS)', 'Infrastructure as a Service (IaaS)', 'Function as a Service (FaaS)', 'C'),
(1, 'What is the term for the ability of a cloud system to automatically provision and de-provision computing resources according to workload demand?', 'Elasticity', 'Durability', 'Virtualization', 'Fault Isolation', 'A'),
(1, 'In which cloud deployment model does an organization combine private cloud infrastructure with public cloud services?', 'Community Cloud', 'Hybrid Cloud', 'Multi-tenant On-premises', 'Private Isolated Grid', 'B'),
(1, 'Which of the following is a key advantage of the Cloud Computing Pay-As-You-Go pricing model?', 'High upfront capital expenditure (CapEx)', 'Fixed ongoing hardware maintenance overhead', 'Conversion of CapEx to operational expenditure (OpEx)', 'Mandatory 5-year hardware leasing contracts', 'C');

-- 4. INSERT QUESTIONS FOR QUIZ 2: AWS Core Infrastructure & Cloud Services
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES
(2, 'What type of cloud computing service is Amazon Elastic Compute Cloud (EC2)?', 'Managed NoSQL Database', 'Object Storage Service', 'Virtual Compute Server (IaaS)', 'Content Delivery Network (CDN)', 'C'),
(2, 'What fundamental storage unit is used by Amazon Simple Storage Service (S3) to store files and documents?', 'Blocks and Partitions', 'Buckets and Objects', 'Tables and Columns', 'Mount Points and Disks', 'B'),
(2, 'Which AWS managed service provides automated backups, patch management, and multi-AZ replication for MySQL databases?', 'Amazon EC2', 'Amazon S3', 'Amazon Relational Database Service (RDS)', 'Amazon Route 53', 'C'),
(2, 'What is the primary role of Amazon CloudWatch in a cloud application architecture?', 'Compile frontend React assets', 'Collect operational metrics, system logs, and trigger alarms', 'Store relational database schemas', 'Route DNS queries across regional data centers', 'B'),
(2, 'Why is Amazon S3 suitable for hosting the static production build of a React single-page application?', 'It requires an active Apache server daemon', 'It natively serves HTML, CSS, and JS objects over HTTP with high availability', 'It automatically compiles Express.js backend scripts', 'It replaces relational database servers', 'B');

-- 5. INSERT QUESTIONS FOR QUIZ 3: Three-Tier Architecture & Scalability
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES
(3, 'In a standard Three-Tier web application, what does the Presentation Tier consist of?', 'Node.js Express controller routing', 'MySQL database tables and foreign keys', 'Client-side user interface (e.g. React.js in browser)', 'Operating system kernel and hypervisor', 'C'),
(3, 'What is the main responsibility of the Application/Logic Tier (such as our Node.js Express server)?', 'Rendering raw pixels on physical monitors', 'Executing business rules, validation, score computation, and API endpoints', 'Physical data block allocation on SSDs', 'Routing BGP packets between Internet backbones', 'B'),
(3, 'Why should correct quiz answers NEVER be sent in the student-facing quiz question API response?', 'To conserve network bandwidth on slow mobile devices', 'Because JSON does not support multiple fields', 'To prevent client-side answer inspection and cheating prior to submission', 'Because MySQL only allows reading answers at midnight', 'C'),
(3, 'What is the function of the Database Tier (Data Tier) in a cloud architecture?', 'Handle client HTTP cookies and local storage', 'Persist users, quizzes, questions, and attempt results reliably', 'Compile Vite JSX bundles on the fly', 'Encrypt TLS handshakes for incoming browser requests', 'B'),
(3, 'What benefit does decoupling the Frontend (Vite/React) from Backend (Express API) provide in cloud deployments?', 'Each layer can be scaled independently based on traffic and demand', 'It eliminates the need for HTTP protocols', 'It prevents databases from using SQL syntax', 'It forces all users to use the same browser version', 'A');

-- 6. INSERT SAMPLE PREVIOUS ATTEMPTS (For Ada Lovelace & John Doe)
INSERT INTO results (id, student_id, quiz_id, score, total_questions, percentage, attempted_at) VALUES
(1, 2, 1, 4, 5, 80.00, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 3, 1, 5, 5, 100.00, DATE_SUB(NOW(), INTERVAL 1 DAY));

