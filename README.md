# CLOUD-BASED ONLINE QUIZ SYSTEM

> **5th-Semester Cloud Computing Academic Project**  
> A complete, modern, professional web application demonstrating **Three-Tier Cloud Web Architecture** principles, student assessment, faculty curriculum management, and educational cloud computing concepts.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Three-Tier Architecture](#-three-tier-architecture)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Preconfigured Demo Accounts](#-preconfigured-demo-accounts)
6. [Step-by-Step Installation & Running Guide](#-step-by-step-installation--running-guide)
7. [MySQL Database Setup](#-mysql-database-setup)
8. [Available NPM Scripts](#-available-npm-scripts)
9. [REST API Documentation](#-rest-api-documentation)
10. [Cloud Concepts & Academic Curriculum Mapping](#-cloud-concepts--academic-curriculum-mapping)
11. [Troubleshooting Guide](#-troubleshooting-guide)

---

## 🌟 Project Overview

The **Cloud-Based Online Quiz System** is designed as a college demonstration project for a 5th-semester Cloud Computing course. It fulfills two primary objectives:
1. **Practical Assessment Platform**: Enables faculty to author, edit, and publish multiple-choice quizzes and inspect detailed student submission analytics; allows students to take quizzes with instant score calculation, percentage grading, and review breakdowns.
2. **Cloud Architectural Case Study**: Models an enterprise Three-Tier web application and maps each layer directly to core Amazon Web Services (AWS) building blocks (**Amazon EC2, Amazon S3, Amazon RDS, Amazon CloudWatch**).

> [!NOTE]  
> This application runs locally on your laptop without incurring cloud costs or requiring live AWS credentials. The cloud mappings are educational models explained interactively in the application.

---

## 🏛️ Three-Tier Architecture

The system decouples presentation, business logic, and data storage into distinct tiers:

```
[ Tier 1: Presentation Layer ]
  React.js (Vite) Single Page App (Running in Google Chrome)
  ☁️ Cloud Equivalent: Amazon S3 (Static Website Hosting) + Amazon CloudFront
             │
             │ HTTPS / JSON REST API Calls (Port 5000)
             ▼
[ Tier 2: Application / Logic Layer ]
  Node.js + Express.js Server
  JWT Authentication, Bcrypt Hashing, Server-Side Answer Grading
  ☁️ Cloud Equivalent: Amazon EC2 Virtual Machine Instance
             │
             │ TCP Connection Pool (Port 3306)
             ▼
[ Tier 3: Data Persistence Layer ]
  MySQL Relational Database (`cloud_quiz_db`)
  Users, Quizzes, Questions, Results Tables
  ☁️ Cloud Equivalent: Amazon Relational Database Service (RDS Multi-AZ)
```

---

## 💻 Technology Stack

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | React 18, Vite, HTML5, CSS3, JavaScript | Modern dashboard UI, responsive cards, MCQ quiz navigator |
| **Icons** | Lucide React | Lightweight, crisp SVG icons |
| **Backend** | Node.js (v20+), Express.js 4 | REST API endpoints, JWT authentication, anti-cheat validation |
| **Security** | Bcrypt.js, JSON Web Tokens (JWT) | Password hashing (10 salt rounds) and role-based route protection |
| **Database** | MySQL (MySQL Community / XAMPP) | Relational storage with primary and foreign key constraints |
| **DB Driver**| `mysql2/promise` | Asynchronous MySQL connection pooling |

---

## 📁 Project Structure

```
CLOUD_PROJECT/
├── client/                     # Frontend React + Vite Application
│   ├── index.html              # HTML shell
│   ├── vite.config.js          # Vite config & API proxy to port 5000
│   ├── package.json            # Frontend dependencies
│   └── src/
│       ├── main.jsx            # React root mount
│       ├── App.jsx             # React Router routing configuration
│       ├── index.css           # Global modern styling (Blue, White, Light-Grey)
│       ├── components/
│       │   ├── Navbar.jsx      # Top navigation with role badges & logout
│       │   ├── Sidebar.jsx     # Dashboard navigation sidebar
│       │   ├── Footer.jsx      # Academic project footer
│       │   ├── StatCard.jsx    # Metric statistic cards
│       │   ├── Modal.jsx       # Reusable confirmation modal
│       │   ├── ProtectedRoute.jsx # Role-based route guard
│       │   └── ArchitectureDiagram.jsx # Interactive 3-Tier visual pipeline
│       ├── pages/
│       │   ├── LandingPage.jsx         # Public landing page with features
│       │   ├── LoginPage.jsx           # Student & Faculty login with 1-click fill
│       │   ├── RegisterPage.jsx        # Account registration
│       │   ├── StudentDashboard.jsx    # Student statistics & available tests
│       │   ├── QuizTakePage.jsx        # Active quiz taking with question palette
│       │   ├── QuizResultPage.jsx      # Instant score, percentage & review breakdown
│       │   ├── FacultyDashboard.jsx    # Faculty metrics & recent activity
│       │   ├── FacultyQuizManage.jsx   # Create, Edit, Delete, Publish quizzes
│       │   ├── FacultyResultsView.jsx  # Student submissions with quiz filtering
│       │   └── CloudConceptsPage.jsx   # Academic Cloud Computing topics
│       ├── services/
│       │   ├── api.js          # Fetch wrapper with Bearer token injection
│       │   └── auth.js         # LocalStorage session state management
│       └── styles/
│           └── theme.css       # Color variables and keyframe animations
├── server/                     # Backend Node.js + Express API
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Environment variable template
│   ├── .env                    # Active environment variables
│   └── src/
│       ├── index.js            # Express server entry point (Port 5000)
│       ├── config/
│       │   └── db.js           # MySQL connection pool & resilient fallback
│       ├── middleware/
│       │   ├── auth.js         # JWT verification & role authorization
│       │   └── errorHandler.js # Centralized Express error handler
│       ├── controllers/
│       │   ├── authController.js       # Register, Login, Me
│       │   ├── quizController.js       # Quiz CRUD & Server-side grading
│       │   ├── resultController.js     # Student & faculty submission views
│       │   └── dashboardController.js  # Role-specific analytics
│       └── routes/
│           ├── authRoutes.js
│           ├── quizRoutes.js
│           ├── resultRoutes.js
│           └── dashboardRoutes.js
├── database/                   # Database Scripts
│   ├── schema.sql              # MySQL DDL (Database, tables, foreign keys)
│   ├── seed.sql                # Preloaded accounts & Cloud Computing quizzes
│   └── setup.js                # One-step Node.js automated setup script
├── test-e2e.js                 # Automated 10-step integration test suite
├── .env.example                # Root environment variable template
├── package.json                # Root orchestration scripts (concurrent dev)
└── README.md                   # Comprehensive documentation
```

---

## 🔑 Preconfigured Demo Accounts

For your presentation and evaluation, the project comes pre-seeded with sample accounts and Cloud Computing quizzes:

| Role | Email Address | Password | Name |
|---|---|---|---|
| **Faculty Account** | `faculty@quiz.edu` | `faculty123` | Prof. Alan Turing |
| **Student Account** | `student@quiz.edu` | `student123` | Ada Lovelace |
| **Student Account 2**| `john.doe@quiz.edu` | `student123` | John Doe |

> [!TIP]  
> The Login Page includes **1-Click Quick Fill Demo Buttons** ("Fill Student" & "Fill Faculty") so you can sign in instantly during your classroom presentation without typing credentials!

---

## 🚀 Step-by-Step Installation & Running Guide

Follow these simple steps to run the application locally on your Windows laptop.

### Prerequisites
1. **Node.js** (v18 or higher recommended; verified on Node v20):  
   Verify by running in terminal:
   ```powershell
   node -v
   npm -v
   ```
2. **Google Chrome** (or any modern web browser).
3. **MySQL Server** (MySQL Community Server 8.0, XAMPP, or WAMP).

---

### Step 1: Open the Project Directory
Open PowerShell or Command Prompt and navigate to the project directory:
```powershell
cd c:\Users\prave\OneDrive\Desktop\CLOUD_PROJECT
```

---

### Step 2: Configure Environment Variables
A default `.env` file is already created in `server/.env`. Open it to verify:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secret_cloud_quiz_jwt_key_2026_academic

# MySQL Database Settings
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_root_password
DB_NAME=cloud_quiz_db
```
Replace `your_mysql_root_password` with your actual local MySQL password (if you use XAMPP, leave `DB_PASSWORD=` empty).

---

### Step 3: Setup the MySQL Database
You can set up the database using **either Option A (Automated)** or **Option B (Manual)**:

#### Option A: Automated One-Step Setup (Recommended)
Run the built-in database setup script:
```powershell
npm run db:setup
```
This script automatically connects to MySQL, creates `cloud_quiz_db`, creates all 4 tables with foreign keys, and seeds the initial Cloud Computing quizzes!

#### Option B: Manual Setup (MySQL Workbench or MySQL CLI)
Open MySQL Workbench or MySQL CLI and run:
```sql
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

---

### Step 4: Start the Application
Run the root startup command to launch both the Backend (Port 5000) and Frontend (Port 3000) simultaneously:
```powershell
npm run dev
```

You will see:
```
[SERVER] Server running on: http://localhost:5000
[SERVER] MySQL Database Connected: "cloud_quiz_db"
[CLIENT] VITE v6.x.x ready in 300 ms
[CLIENT] Local: http://localhost:3000/
```

---

### Step 5: Open in Google Chrome
Open **Google Chrome** and visit:
👉 **`http://localhost:3000`**

---

## 🛠️ Available NPM Scripts

From the root directory:
- `npm run dev`: Runs both backend and frontend concurrently with color-coded logs.
- `npm run server`: Runs only the Express backend on `http://localhost:5000`.
- `npm run client`: Runs only the Vite frontend on `http://localhost:3000`.
- `npm run db:setup`: Executes the automated MySQL database creation and data seeding.
- `npm run test`: Runs the automated 10-step API integration test suite.
- `npm run build`: Compiles the React frontend for production into `client/dist`.

---

## 📡 REST API Documentation

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new student or faculty account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Authenticated | Fetch current logged-in user details |

### 2. Quizzes (`/api/quizzes`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/quizzes` | Public / Student / Faculty | List quizzes (students see published; faculty see all) |
| `GET` | `/api/quizzes/:id` | Public / Student / Faculty | Fetch quiz questions (**answers omitted for students**) |
| `POST` | `/api/quizzes` | Faculty | Create new quiz with MCQs |
| `PUT` | `/api/quizzes/:id` | Faculty | Update quiz details and questions |
| `DELETE`| `/api/quizzes/:id` | Faculty | Delete quiz and its questions/results |
| `PATCH` | `/api/quizzes/:id/status` | Faculty | Toggle quiz status between `published` and `draft` |
| `POST` | `/api/quizzes/:id/submit` | Student | Submit quiz answers; backend grades and stores result |

### 3. Results (`/api/results`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/results/my-results` | Student | Retrieve all previous quiz attempts for current student |
| `GET` | `/api/results/all` | Faculty | Retrieve all student submissions across all quizzes |
| `GET` | `/api/results/:id` | Student / Faculty | Retrieve specific result breakdown |

### 4. Dashboard Statistics (`/api/dashboard`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/stats` | Authenticated | Role-aware metrics (Quizzes, Attempts, Average Score) |

### 5. Health Check (`/api/health`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System status and architecture details |

---

## ☁️ Cloud Concepts & Academic Curriculum Mapping

Under the **"Cloud Concepts"** navigation link in the top bar, the application features dedicated, visually attractive cards and interactive diagrams covering:

1. **Cloud Computing**: NIST definition, characteristics (On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service), service models (IaaS, PaaS, SaaS), and advantages.
2. **Amazon EC2**: Virtual machines, hypervisors, and how EC2 instances host the Node.js Express logic tier with Auto Scaling.
3. **Amazon S3**: Object storage architecture (Buckets, Keys, Metadata) and how S3 static website hosting serves Vite/React SPA builds.
4. **Amazon RDS**: Managed relational databases, automated backups, and Multi-AZ replication for MySQL high availability.
5. **Amazon CloudWatch**: System metrics, CPU utilization alarms, log groups, and operational monitoring.
6. **Three-Tier Architecture**: Interactive visual diagram showing secure request flows between Presentation (Browser), Logic (Express), and Data (MySQL).

---

## ❓ Troubleshooting Guide

### 1. MySQL Connection Warning
If you see a warning that MySQL is not connected:
- Verify that your MySQL Windows service is running (e.g. `MySQL80` in Windows Services or MySQL in XAMPP Control Panel).
- Check your password in `server/.env`:
  ```env
  DB_PASSWORD=your_actual_password
  ```
- Run `npm run db:setup` to initialize the database tables.
- **Standby Mode**: Even if your MySQL service is temporarily paused during class, the application features an in-memory standby mode so your presentation never crashes!

### 2. Port Already in Use (Port 5000 or 3000)
If port 5000 or 3000 is occupied by another program:
- To change backend port: Update `PORT=5001` in `server/.env` and update `target: 'http://localhost:5001'` in `client/vite.config.js`.
- Or terminate the old process using PowerShell:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
  ```

---

## 🎓 Academic Credit & Presentation Notes
- **Course**: 5th-Semester Cloud Computing (Academic Project)
- **Topic**: Cloud-Based Online Quiz System with Three-Tier Architecture
- **Demonstration Flow**:
  1. Open `http://localhost:3000` in Google Chrome.
  2. Showcase the **Landing Page** with architectural badges and feature overview.
  3. Navigate to **"Cloud Concepts"** and present the interactive **Three-Tier Architecture Diagram** (Topics A through F).
  4. Click **"Student Login"** -> Click **"Fill Student (Ada)"** -> View available quizzes -> Start a quiz.
  5. Demonstrate MCQ navigation, answer selection, question numbers palette, and the confirmation submission modal.
  6. Review the **Instant Score Calculation & Breakdown** (Score, Percentage, Grade badge, verified correct answers).
  7. Log out and click **"Faculty Login"** -> Click **"Fill Faculty (Alan)"**.
  8. Showcase the **Faculty Dashboard** metrics, author a new quiz module in **Quiz Management**, toggle publish/draft, and inspect student submission logs in **Student Results**.

