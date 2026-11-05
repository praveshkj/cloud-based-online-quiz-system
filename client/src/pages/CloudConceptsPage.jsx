import React from 'react';
import {
  Cloud,
  Server,
  HardDrive,
  Database,
  Activity,
  Layers,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function CloudConceptsPage() {
  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 65px)', padding: '2.5rem 1rem 4rem' }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        {/* Header Banner */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="hero-badge" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={16} />
            <span>Academic Curriculum Reference • 5th-Semester Cloud Computing</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
            Cloud Concepts & Architecture Guide
          </h1>
          <p style={{ color: 'var(--slate-600)', fontSize: '1rem', maxWidth: '780px', margin: '0.5rem auto 0', lineHeight: 1.6 }}>
            Comprehensive theoretical and architectural study examining how modern enterprise web applications leverage cloud service models, virtualization, managed databases, and multi-tier architectures.
          </p>
        </div>

        {/* Academic Disclaimer Notice */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <Info size={24} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <div style={{ fontSize: '0.875rem', color: '#1e3a8a', lineHeight: 1.6 }}>
            <strong>Academic Educational Notice:</strong> The cloud services referenced in this section (Amazon EC2, S3, RDS, CloudWatch) represent architectural models and theoretical mapping for this 5th-semester project. The application currently runs safely in a local development environment (Node.js, React, and local MySQL) without incurring cloud expenses, IAM permissions, or live external AWS integrations.
          </div>
        </div>

        {/* TOPIC A: Cloud Computing */}
        <section className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cloud size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-600)' }}>
                Topic A
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Cloud Computing Fundamentals
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                1. What is Cloud Computing?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                According to the NIST definition, Cloud Computing is an on-demand model providing ubiquitous, convenient network access to a shared pool of configurable computing resources (networks, servers, storage, applications, and services) that can be rapidly provisioned with minimal management effort.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                2. Key Advantages
              </h4>
              <ul style={{ fontSize: '0.875rem', color: 'var(--slate-600)', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li><strong>No Upfront CapEx:</strong> Trade capital expense for variable operational expense.</li>
                <li><strong>Elasticity:</strong> Automatically scale resources up or down to handle exam surges.</li>
                <li><strong>High Availability:</strong> Multi-region redundancy and automatic failover.</li>
                <li><strong>Global Reach:</strong> Deploy applications to worldwide audiences in minutes.</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-600)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <strong>How it relates to this Quiz Project:</strong> A college quiz system experiences bursty workloads (e.g., hundreds of students logging in simultaneously during an exam hour). Cloud computing enables the system to spin up additional compute capacity during exam sessions and downscale afterward to reduce cost.
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              <strong>Real-World Example:</strong> Platforms like Netflix or Coursera dynamically expand streaming compute nodes on AWS during peak evening hours without taking services offline.
            </div>
          </div>
        </section>

        {/* TOPIC B: Amazon EC2 */}
        <section className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Server size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#059669' }}>
                Topic B
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Amazon Elastic Compute Cloud (EC2)
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                1. What is EC2 & How Virtual Machines Work?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Amazon EC2 provides resizable virtual compute capacity (Infrastructure as a Service - IaaS). It uses hypervisors (like AWS Nitro / Xen) to slice physical enterprise server hardware into independent Virtual Machines (VMs) running Linux or Windows operating systems with dedicated vCPUs, RAM, and storage volumes.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                2. How EC2 Could Host Our Node.js Backend
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Our Express API server (`server/src/index.js`) could be deployed inside an Ubuntu EC2 instance (`t3.micro` or `t3.small`). A process manager like PM2 keeps the Node.js process alive, while an Nginx reverse proxy handles SSL/TLS termination and routes incoming HTTP port 80/443 traffic to our Node port 5000.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #059669' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <strong>How it relates to this Quiz Project:</strong> The Node.js Express server is our Logic Tier. In a production cloud scenario, an EC2 Auto Scaling group would automatically launch 2 or more EC2 instances behind an Application Load Balancer (ALB) when student quiz traffic spikes.
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              <strong>Practical Example:</strong> Hosting an Express backend on an EC2 Linux instance launched with an Amazon Machine Image (AMI) configured with Node 20 runtime and security groups allowing inbound HTTP traffic.
            </div>
          </div>
        </section>

        {/* TOPIC C: Amazon S3 */}
        <section className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HardDrive size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb' }}>
                Topic C
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Amazon Simple Storage Service (S3)
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                1. What is S3 & Object Storage?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Amazon S3 is a scalable cloud object storage service designed for 99.999999999% (11 9's) data durability. Unlike block storage (hard drives with file hierarchies), S3 stores data as individual flat objects containing a unique key, binary data payload, and metadata within globally unique namespaces called "Buckets".
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                2. Hosting Our React Frontend Files
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                When we run `npm run build` in our `client` folder, Vite bundles our JSX code into static `index.html`, JavaScript, and CSS files. S3 provides a native feature called "Static Website Hosting" that serves these assets directly over HTTP without requiring an active web server or operating system.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #2563eb' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <strong>How it relates to this Quiz Project:</strong> Our Presentation Tier (React.js SPA) is completely decoupled from the backend. Storing the compiled assets in an S3 bucket connected to Amazon CloudFront CDN ensures students get millisecond load times worldwide for virtually zero server cost.
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              <strong>Practical Example:</strong> Uploading `client/dist/` assets to an S3 bucket named `cloud-quiz-system-2026` configured with public read access and `index.html` as the error and index document.
            </div>
          </div>
        </section>

        {/* TOPIC D: Amazon RDS */}
        <section className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f0fdfa',
              color: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Database size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#0d9488' }}>
                Topic D
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Amazon Relational Database Service (RDS)
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                1. What is RDS & Managed Databases?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Amazon RDS is a Platform as a Service (PaaS) managed database offering. Instead of manually installing and patching MySQL on a raw virtual server, AWS automates administrative tasks including continuous backups, OS security patching, hardware provisioning, point-in-time recovery, and Multi-AZ replication.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                2. Storing Quiz Data with MySQL on RDS
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Our project defines 4 relational tables (`users`, `quizzes`, `questions`, `results`). In a cloud deployment, we provision an Amazon RDS MySQL 8.0 instance. Our backend simply updates `DB_HOST` in `.env` to point to the RDS endpoint URL (e.g. `quiz-db.c7x8y.us-east-1.rds.amazonaws.com`).
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #0d9488' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <strong>How it relates to this Quiz Project:</strong> The Data Tier must never lose exam results. RDS Multi-AZ synchronously replicates our MySQL database to a standby instance in a different physical Availability Zone, guaranteeing zero data loss if a data center suffers a power failure.
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              <strong>Practical Example:</strong> Executing `schema.sql` and `seed.sql` on an Amazon RDS MySQL instance placed in a private VPC subnet accessible only from our EC2 backend security group.
            </div>
          </div>
        </section>

        {/* TOPIC E: Amazon CloudWatch */}
        <section className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#fffbeb',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#d97706' }}>
                Topic E
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Amazon CloudWatch Monitoring & Observability
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                1. What is CloudWatch?
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Amazon CloudWatch is an enterprise monitoring and management service that collects operational data in the form of logs, metrics, and events. It provides single-pane-of-glass visibility into resource utilization, application performance, and operational health.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                2. How It Could Monitor Our Quiz App
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                CloudWatch can ingest Express HTTP server console logs, track CPU and memory usage of the backend process, monitor RDS MySQL database IOPS and connection pool exhaustion, and send instant SMS/email alarms via Amazon SNS if error rates exceed 1%.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #d97706' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <strong>How it relates to this Quiz Project:</strong> If hundreds of students click "Submit Quiz" simultaneously and database latency spikes above 2000ms, a CloudWatch Alarm triggers an Auto-Scaling policy to add backend EC2 instances before students experience timeouts.
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              <strong>Practical Example:</strong> Setting up a CloudWatch metric alarm on <code>HTTPCode_Target_5XX_Count &gt;= 5</code> to alert the faculty administrator immediately during an active college exam.
            </div>
          </div>
        </section>

        {/* TOPIC F: Three-Tier Architecture & Interactive Diagram */}
        <section style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f5f3ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Layers size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#7c3aed' }}>
                  Topic F
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  Three-Tier Cloud Web Architecture
                </h2>
              </div>
            </div>

            <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Modern enterprise cloud applications strictly avoid monolithic designs where the user interface, backend code, and database are fused into a single unmaintainable program. Instead, they implement <strong>Three-Tier Architecture</strong>, partitioning the system into three decoupled layers:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--primary-700)', marginBottom: '0.4rem' }}>
                  Tier 1: Presentation Layer
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                  Built with <strong>React.js & Vite</strong>. Runs entirely on the client's browser (Google Chrome). Handles UI state, MCQ options rendering, instant validation, and interactive user feedback. Never touches the database directly.
                </p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontWeight: 700, color: '#0d9488', marginBottom: '0.4rem' }}>
                  Tier 2: Business Logic Layer
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                  Built with <strong>Node.js & Express.js</strong>. Intermediary layer executing critical business algorithms: verifying JWT tokens, hashing passwords via bcrypt, validating faculty rights, and evaluating student answers against ground-truth keys.
                </p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <h4 style={{ fontWeight: 700, color: '#0284c7', marginBottom: '0.4rem' }}>
                  Tier 3: Data Persistence Layer
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                  Built with <strong>MySQL Relational DBMS</strong>. Stores persistent relational entities with referential integrity. Isolated in a secure network zone; queries can only originate from Tier 2.
                </p>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #7c3aed' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                <strong>How the 3 Layers Communicate:</strong>
                <ol style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  <li><strong>Browser ↔ Express Server:</strong> Tier 1 communicates with Tier 2 over standard HTTP/HTTPS using JSON REST request payloads (e.g. <code>POST /api/quizzes/1/submit</code> with bearer tokens).</li>
                  <li><strong>Express Server ↔ MySQL Database:</strong> Tier 2 communicates with Tier 3 over an authenticated TCP connection pool using SQL statements (<code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>).</li>
                  <li><strong>Security Isolation:</strong> The browser (Tier 1) has zero direct access to MySQL (Tier 3), completely preventing client-side SQL injection or direct answer extraction.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Render Interactive Architecture Diagram */}
          <ArchitectureDiagram />
        </section>
      </div>
    </div>
  );
}
