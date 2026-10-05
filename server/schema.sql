-- ====================================================================
-- PostgreSQL Relational Database Schema for IIT Kharagpur BS Portal ERP
-- Includes Strict Foreign Key Constraints, Indexes, Check Constraints & ACID Compliance
-- ====================================================================

-- 1. Users & Staff / Employee Table (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    emp_id VARCHAR(50) UNIQUE,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('superadmin', 'admin', 'employee', 'student')),
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(150) DEFAULT 'Staff Member',
    department VARCHAR(150) DEFAULT 'BS Academic Operations',
    phone VARCHAR(30) DEFAULT '',
    is_temp_password BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Deactivated')),
    roll_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_emp_id ON users(emp_id);

-- 2. Students Master Table
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(50) PRIMARY KEY,
    roll VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General' CHECK (category IN ('General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'PwD')),
    dob DATE,
    gender VARCHAR(30) DEFAULT 'Not Specified',
    guardian_name VARCHAR(255) DEFAULT '',
    address TEXT DEFAULT '',
    city VARCHAR(150) NOT NULL,
    state VARCHAR(150) DEFAULT 'West Bengal',
    pincode VARCHAR(20) DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_students_roll ON students(roll);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_category ON students(category);

-- 3. Admissions Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(50) PRIMARY KEY,
    roll VARCHAR(50) NOT NULL REFERENCES students(roll) ON UPDATE CASCADE ON DELETE CASCADE,
    student_id VARCHAR(50) REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    level VARCHAR(100) NOT NULL,
    pathway VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    income_tier VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending Review' CHECK (status IN ('Draft', 'Pending Review', 'Under Scrutiny', 'Verified', 'Query Raised', 'Rejected')),
    rejection_reason TEXT DEFAULT '',
    submission_date VARCHAR(50) NOT NULL,
    exam_city VARCHAR(150) NOT NULL,
    docs JSONB DEFAULT '{}'::jsonb,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_applications_roll ON applications(roll);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_level ON applications(level);
CREATE INDEX IF NOT EXISTS idx_applications_submission_date ON applications(created_at DESC);

-- 4. Fee Transactions Table (SBI MOPS / Razorpay Gateway Simulation)
CREATE TABLE IF NOT EXISTS fee_transactions (
    id SERIAL PRIMARY KEY,
    transaction_ref VARCHAR(100) UNIQUE NOT NULL,
    application_id VARCHAR(50) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE,
    roll VARCHAR(50) REFERENCES students(roll) ON UPDATE CASCADE ON DELETE CASCADE,
    fee_type VARCHAR(100) NOT NULL DEFAULT 'Qualifier Application Fee',
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    currency VARCHAR(10) DEFAULT 'INR',
    gateway VARCHAR(50) DEFAULT 'SBI MOPS',
    order_id VARCHAR(100) DEFAULT '',
    payment_mode VARCHAR(50) DEFAULT 'UPI',
    bank_name VARCHAR(150) NOT NULL DEFAULT 'State Bank of India',
    utr_number VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'Pending Review' CHECK (status IN ('Initiated', 'Pending Review', 'Under Verification', 'Verified', 'Query Raised', 'Settled', 'Failed', 'Refunded')),
    bank_status VARCHAR(150) DEFAULT 'Awaiting Daily Clearing',
    query_remarks TEXT DEFAULT '',
    receipt_name VARCHAR(255) DEFAULT '',
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fee_transactions_roll ON fee_transactions(roll);
CREATE INDEX IF NOT EXISTS idx_fee_transactions_utr ON fee_transactions(utr_number);
CREATE INDEX IF NOT EXISTS idx_fee_transactions_status ON fee_transactions(status);

-- 5. Courses Master Table (Qualifier Round Subjects)
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(30) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT DEFAULT '',
    credits INTEGER DEFAULT 4 CHECK (credits > 0),
    weekly_duration_hours INTEGER DEFAULT 6,
    semester_term VARCHAR(50) DEFAULT 'Qualifier 2026',
    instructor_name VARCHAR(255) NOT NULL,
    instructor_designation VARCHAR(150) DEFAULT 'Department of Computer Science & Engineering',
    thumbnail_url VARCHAR(500) DEFAULT '',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);

-- 6. LMS Content & Weekly Modules Table
CREATE TABLE IF NOT EXISTS lms_content (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL CHECK (week_number >= 1),
    module_title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('video', 'pdf', 'practice_set', 'notes', 'interactive_lab')),
    resource_url TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    file_size_mb NUMERIC(6, 2) DEFAULT 0.00,
    order_index INTEGER DEFAULT 1,
    description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lms_content_course ON lms_content(course_id, week_number);

-- 7. Student Course Engagement & Progress Tracking
CREATE TABLE IF NOT EXISTS student_course_progress (
    id SERIAL PRIMARY KEY,
    roll VARCHAR(50) NOT NULL REFERENCES students(roll) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES lms_content(id) ON DELETE CASCADE,
    video_progress_percentage INTEGER DEFAULT 0 CHECK (video_progress_percentage BETWEEN 0 AND 100),
    is_completed BOOLEAN DEFAULT FALSE,
    practice_attempts INTEGER DEFAULT 0 CHECK (practice_attempts >= 0),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(roll, course_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_student_progress_roll ON student_course_progress(roll);

-- 8. Exam Quizzes / Qualifier Assessment Table
CREATE TABLE IF NOT EXISTS exam_quizzes (
    id SERIAL PRIMARY KEY,
    quiz_code VARCHAR(50) UNIQUE NOT NULL,
    course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    time_limit_minutes INTEGER NOT NULL DEFAULT 45 CHECK (time_limit_minutes > 0),
    total_marks NUMERIC(6, 2) NOT NULL DEFAULT 100.00,
    pass_percentage NUMERIC(5, 2) NOT NULL DEFAULT 40.00,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_exam_quizzes_code ON exam_quizzes(quiz_code);

-- 9. Exam Scores & Auto-Evaluation Results Table
CREATE TABLE IF NOT EXISTS exam_scores (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES exam_quizzes(id) ON DELETE CASCADE,
    roll VARCHAR(50) NOT NULL REFERENCES students(roll) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    total_questions INTEGER NOT NULL DEFAULT 10,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    score_obtained NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    pass_status VARCHAR(30) DEFAULT 'Failed' CHECK (pass_status IN ('Passed', 'Failed', 'Disqualified')),
    cutoff_cleared BOOLEAN DEFAULT FALSE,
    responses JSONB DEFAULT '{}'::jsonb,
    auto_evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(quiz_id, roll)
);

CREATE INDEX IF NOT EXISTS idx_exam_scores_roll ON exam_scores(roll);
CREATE INDEX IF NOT EXISTS idx_exam_scores_quiz ON exam_scores(quiz_id);
CREATE INDEX IF NOT EXISTS idx_exam_scores_cutoff ON exam_scores(cutoff_cleared);

-- 10. Employee Tasks & Workflow Table ("Kaj o Progress")
CREATE TABLE IF NOT EXISTS employee_tasks (
    id SERIAL PRIMARY KEY,
    task_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    assigned_to INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
    status VARCHAR(50) NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Under Review', 'Completed')),
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    overdue_flag BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_employee_tasks_assigned_to ON employee_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_status ON employee_tasks(status);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_due_date ON employee_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_priority ON employee_tasks(priority);

-- 11. Employee Worklogs Table ("Kaj Kotota Hoyeche")
CREATE TABLE IF NOT EXISTS employee_worklogs (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES employee_tasks(id) ON DELETE CASCADE,
    employee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    progress_before INTEGER NOT NULL CHECK (progress_before BETWEEN 0 AND 100),
    progress_after INTEGER NOT NULL CHECK (progress_after BETWEEN 0 AND 100),
    log_note TEXT NOT NULL,
    hours_spent NUMERIC(5, 2) DEFAULT 1.00 CHECK (hours_spent >= 0),
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_employee_worklogs_task ON employee_worklogs(task_id);
CREATE INDEX IF NOT EXISTS idx_employee_worklogs_employee ON employee_worklogs(employee_id);

-- 12. Qualifier Cutoff Thresholds Table
CREATE TABLE IF NOT EXISTS cutoffs (
    id SERIAL PRIMARY KEY,
    term VARCHAR(50) NOT NULL DEFAULT 'Qualifier 2026',
    category VARCHAR(50) NOT NULL UNIQUE CHECK (category IN ('General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'PwD')),
    min_score_percentage NUMERIC(5, 2) NOT NULL CHECK (min_score_percentage BETWEEN 0 AND 100),
    is_active BOOLEAN DEFAULT TRUE,
    updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. System Audit Logs Table (Full Traceability)
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    actor_role VARCHAR(50) DEFAULT 'Admin',
    actor_name VARCHAR(100) DEFAULT 'Admissions Staff',
    details TEXT DEFAULT '',
    ip_address VARCHAR(50) DEFAULT '127.0.0.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
