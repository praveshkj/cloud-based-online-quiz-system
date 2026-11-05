/**
 * ==============================================================
 * CLOUD-BASED ONLINE QUIZ SYSTEM - DATABASE SETUP SCRIPT
 * Automated script to create schema and seed data in MySQL
 * ==============================================================
 */

const fs = require('fs');
const path = require('path');
const mysql = require('../server/node_modules/mysql2/promise');
const dotenv = require('../server/node_modules/dotenv');

// Load environment variables from server/.env or root .env
const serverEnvPath = path.join(__dirname, '..', 'server', '.env');
const rootEnvPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(serverEnvPath)) {
  dotenv.config({ path: serverEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else {
  dotenv.config();
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '';
const DB_NAME = process.env.DB_NAME || 'cloud_quiz_db';

async function setupDatabase() {
  console.log('\n======================================================');
  console.log('   CLOUD-BASED ONLINE QUIZ SYSTEM - DATABASE SETUP    ');
  console.log('======================================================\n');
  console.log(`Connecting to MySQL at ${DB_HOST}:${DB_PORT} as user '${DB_USER}'...`);

  let connection;
  try {
    // 1. Connect to MySQL server without specifying database
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true
    });

    console.log(' Successfully connected to MySQL server!');

    // 2. Read schema.sql and execute
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log(`Creating database '${DB_NAME}' and tables...`);
    await connection.query(schemaSql);
    console.log(' Tables created successfully (users, quizzes, questions, results).');

    // 3. Read seed.sql and execute
    const seedPath = path.join(__dirname, 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    console.log('Seeding initial data (Cloud Computing quizzes, sample faculty & student accounts)...');
    await connection.query(seedSql);
    console.log(' Database seeded successfully!');

    console.log('\n------------------------------------------------------');
    console.log(' SAMPLE LOGIN CREDENTIALS:');
    console.log(' Faculty Account : faculty@quiz.edu  |  Password: faculty123');
    console.log(' Student Account : student@quiz.edu  |  Password: student123');
    console.log('------------------------------------------------------');
    console.log('\n Setup complete! You can now start the application:');
    console.log('   npm run dev\n');

  } catch (error) {
    console.error('\n DATABASE SETUP FAILED:');
    console.error(error.message);
    console.log('\n troubleshooting tip:');
    console.log(' 1. Ensure your MySQL server (MySQL Community / XAMPP) is running.');
    console.log(' 2. Check your MySQL password in "server/.env".');
    console.log(`    Current configuration: DB_HOST=${DB_HOST}, DB_PORT=${DB_PORT}, DB_USER=${DB_USER}, DB_PASSWORD=${DB_PASSWORD ? '******' : '(empty)'}`);
    console.log(' 3. Open "server/.env" and set:');
    console.log('    DB_PASSWORD=your_actual_mysql_root_password\n');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();

