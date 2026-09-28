# IIT Kharagpur BS Portal — Enterprise Production Deployment Guide

This guide provides step-by-step instructions for deploying the **IIT Kharagpur BS Degree Application Portal** to production using containerization (Docker & Docker Compose) and cloud database providers (Render, Railway, AWS RDS, Neon, Supabase).

---

## 🏛 Architecture Overview

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide icons (compiled to optimized static assets in `/dist`).
- **Backend API**: Node.js & Express REST API (`/api/students`, `/api/health`, `/api/audit-logs`, `/api/students/bulk-import`, `/api/students/export-csv`).
- **Database Layer**:
  - **Primary**: PostgreSQL 16 with JSONB document and payment tracking, indexes on Roll Number, Email, and Status.
  - **Dual-Engine Auto-Fallback**: If PostgreSQL is not configured, the backend automatically falls back to atomic local JSON persistence (`server/data/iit_kgp_db.json`), ensuring zero-downtime operation.
- **Client Fallback**: If running statically on GitHub Pages without a backend server, the client seamlessly falls back to browser localStorage with full reactivity.

---

## 🚀 Option 1: 1-Click Local Docker Compose (Recommended)

Run both the PostgreSQL database and full-stack application container with a single command:

```bash
# 1. Clone repository & navigate to root
cd "e:\IIT kgp bs"

# 2. Start PostgreSQL 16 and Node/React container
docker-compose up --build
```

### Accessing Services:
- **Application Portal & Admin Console**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **PostgreSQL Database**: `localhost:5432` (User: `iitkgp_admin`, DB: `iitkgp_bs_portal`)

To stop containers:
```bash
docker-compose down
```

To stop containers and wipe persistent database volume:
```bash
docker-compose down -v
```

---

## ☁️ Option 2: Cloud Deployment on Render

Render provides free or low-cost hosting for both Web Services and Managed PostgreSQL.

### Step 1: Create PostgreSQL Database on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **PostgreSQL**.
2. Set Name: `iitkgp-bs-db`
3. Database: `iitkgp_bs_portal`
4. User: `iitkgp_user`
5. Click **Create Database**.
6. Copy the **Internal Database URL** (or External URL if connecting remotely).

### Step 2: Initialize Database Schema
1. Connect using `psql` or Render Web Shell:
   ```bash
   psql "<RENDER_DATABASE_URL>" -f server/schema.sql
   ```
   *(Note: The server auto-initializes the schema on boot if tables don't exist).*

### Step 3: Deploy Web Service on Render
1. In Render Dashboard, click **New +** -> **Web Service**.
2. Connect your GitHub repository (`iit-bs-clone`).
3. Select **Docker** as runtime environment (it uses the root `Dockerfile`).
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: `<YOUR_RENDER_INTERNAL_DATABASE_URL>`
   - `SESSION_SECRET`: `<GENERATE_RANDOM_STRING>`
5. Click **Deploy Web Service**.

---

## 🚂 Option 3: Cloud Deployment on Railway

1. Install Railway CLI or visit [Railway.app](https://railway.app/).
2. Create a new project from your GitHub repo.
3. Click **+ New** -> **Database** -> **Add PostgreSQL**.
4. Railway will automatically inject `DATABASE_URL` into your service.
5. In your application service settings, set:
   - Build command: uses multi-stage `Dockerfile`.
   - Port: `5000`.
6. Railway generates a public domain (e.g., `iit-kgp-bs.up.railway.app`).

---

## 🌐 Option 4: AWS EC2 + AWS RDS (Enterprise Infrastructure)

### 1. AWS RDS PostgreSQL:
- Create an Amazon RDS PostgreSQL instance (db.t4g.micro for dev or db.m6g.large for production).
- Security Group: Allow inbound TCP on port 5432 from your EC2 Security Group.

### 2. AWS EC2 Instance:
- Launch an Ubuntu 24.04 LTS instance.
- Install Docker & Docker Compose:
  ```bash
  sudo apt update && sudo apt install -y docker.io docker-compose git
  sudo systemctl enable --now docker
  ```
- Clone repo:
  ```bash
  git clone https://github.com/srinjoySamanta/iit-bs-clone.git
  cd iit-bs-clone
  ```
- Create `.env`:
  ```env
  NODE_ENV=production
  PORT=5000
  DATABASE_URL=postgres://aws_db_user:password@rds-endpoint.amazonaws.com:5432/iitkgp_bs_portal?sslmode=require
  ```
- Build and run:
  ```bash
  docker build -t iitkgp-bs-portal:latest .
  docker run -d --name iitkgp_portal -p 80:5000 --env-file .env --restart always iitkgp-bs-portal:latest
  ```

---

## 🧪 System Health Verification & Scale Testing

You can verify the backend endpoints and run load tests:

```bash
# 1. Health & DB engine check
curl http://localhost:5000/api/health

# Expected response:
# {
#   "status": "UP",
#   "uptime": 120.4,
#   "database": { "engine": "PostgreSQL", "status": "CONNECTED" },
#   "stats": { "total_students": 108, "verified_count": 82, ... }
# }

# 2. Test pagination (Page 1, 10 records per page)
curl "http://localhost:5000/api/students?page=1&limit=10"

# 3. Test multi-field search
curl "http://localhost:5000/api/students?q=Aarav"

# 4. Generate 100 test dummy student applications
curl -X POST http://localhost:5000/api/test/generate-dummy-students \
     -H "Content-Type: application/json" \
     -d '{"count": 100}'

# 5. Export student roster to CSV via curl
curl http://localhost:5000/api/students/export-csv -o export_roster.csv
```

---

## 🔒 Security & Disaster Recovery

1. **Database Backups (PostgreSQL)**:
   ```bash
   pg_dump -U iitkgp_admin -d iitkgp_bs_portal > backup_$(date +%Y%m%d).sql
   ```
2. **Restore**:
   ```bash
   psql -U iitkgp_admin -d iitkgp_bs_portal < backup_20260928.sql
   ```
3. **Audit Trail**: Every administrative status mutation is recorded in `audit_logs` table with actor role, name, target roll, and timestamp.
