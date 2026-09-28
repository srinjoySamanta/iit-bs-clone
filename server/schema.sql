-- PostgreSQL Schema for IIT Kharagpur BS Portal Enterprise Database

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(50) PRIMARY KEY,
    roll VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    level VARCHAR(100) NOT NULL,
    pathway VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    income_tier VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending Review',
    rejection_reason TEXT DEFAULT '',
    submission_date VARCHAR(50) NOT NULL,
    exam_city VARCHAR(150) NOT NULL,
    docs JSONB DEFAULT '{}'::jsonb,
    payment JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high-speed multi-field search and sorting
CREATE INDEX IF NOT EXISTS idx_students_roll ON students(roll);
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at DESC);

-- 2. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50) NOT NULL,
    actor_role VARCHAR(50) DEFAULT 'Admin',
    actor_name VARCHAR(100) DEFAULT 'Admissions Staff',
    details TEXT DEFAULT '',
    ip_address VARCHAR(50) DEFAULT '127.0.0.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_id ON audit_logs(entity_id);

-- 3. Users & Administrators Table (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student', -- 'admin', 'superadmin', 'student'
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(150) DEFAULT 'Admissions Officer',
    roll_number VARCHAR(50), -- linked roll number if role is student
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

