import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory for local fallback persistence
const DATA_DIR = path.join(__dirname, 'data');
const LOCAL_DB_FILE = path.join(DATA_DIR, 'iit_kgp_db.json');

// Default Seed Users for Role-Based Access Control (RBAC)
const SEED_USERS = [
  {
    id: 1,
    username: "admin_kgp",
    email: "admin@iitkgp.ac.in",
    password_hash: bcrypt.hashSync("Admin@KGP2026!", 10),
    role: "admin",
    name: "Prof. Admissions Chair",
    designation: "Dean of Academic Affairs",
    roll_number: null
  },
  {
    id: 2,
    username: "officer_kgp",
    email: "officer@iitkgp.ac.in",
    password_hash: bcrypt.hashSync("Officer@KGP2026!", 10),
    role: "admin",
    name: "Dr. S. K. Mukherjee",
    designation: "Admissions Scrutiny Officer",
    roll_number: null
  },
  {
    id: 3,
    username: "student_kgp",
    email: "subho.roy@kgp.ac.in",
    password_hash: bcrypt.hashSync("Student@KGP2026!", 10),
    role: "student",
    name: "Subhashis Roy",
    designation: "Undergraduate Student",
    roll_number: "24BS0001"
  }
];

// Initial seed applications
const SEED_APPLICATIONS = [
  {
    id: "KGP-2026-0841",
    roll: "24BS0001",
    name: "Subhashis Roy",
    email: "subho.roy@kgp.ac.in",
    phone: "+91 98301 11223",
    level: "Foundation Level",
    pathway: "Direct Entry: WBJEE Rank #412",
    category: "General",
    incomeTier: "< 1 LPA (75% Waiver)",
    status: "Verified",
    rejectionReason: "",
    submissionDate: "2026-09-22 10:15 AM",
    examCity: "Kolkata, West Bengal",
    docs: {
      genInfo: "Verified",
      education: "Verified (WBJEE Rank #412)",
      photo: "Verified",
      fee: "Verified"
    },
    payment: {
      amount: 375,
      utr: "SBI928410294821",
      mode: "UPI (Google Pay)",
      bank: "State Bank of India",
      date: "2026-09-22 10:20 AM",
      status: "Verified",
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "sbi_upi_receipt_375.pdf"
    }
  },
  {
    id: "KGP-2026-0842",
    roll: "24BS0002",
    name: "Priyanka Sen",
    email: "priyanka.s@kgp.ac.in",
    phone: "+91 98312 44556",
    level: "Diploma in Data Science & AI",
    pathway: "Qualifier CBT (Score: 92.5%)",
    category: "OBC-NCL",
    incomeTier: "1 - 5 LPA (50% Waiver)",
    status: "Verified",
    rejectionReason: "",
    submissionDate: "2026-09-22 11:30 AM",
    examCity: "Kharagpur Main Campus",
    docs: {
      genInfo: "Verified",
      education: "Verified (Class 10 & 12)",
      photo: "Verified",
      fee: "Verified"
    },
    payment: {
      amount: 750,
      utr: "HDFC884102931102",
      mode: "UPI (PhonePe)",
      bank: "HDFC Bank",
      date: "2026-09-22 11:35 AM",
      status: "Verified",
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "hdfc_utr_receipt_750.pdf"
    }
  },
  {
    id: "KGP-2026-0843",
    roll: "24BS0003",
    name: "Debojyoti Ghosh",
    email: "debo.g@kgp.ac.in",
    phone: "+91 94330 77889",
    level: "Foundation Level",
    pathway: "Direct Entry: Tripura JEE Rank #84",
    category: "General",
    incomeTier: "> 5 LPA (Standard)",
    status: "Pending Review",
    rejectionReason: "",
    submissionDate: "2026-09-23 02:45 PM",
    examCity: "West Tripura (Agartala)",
    docs: {
      genInfo: "Verified",
      education: "Verified (Tripura JEE Card)",
      photo: "Verified",
      fee: "Pending Reconciliation"
    },
    payment: {
      amount: 1500,
      utr: "ICIC773019284102",
      mode: "Net Banking (ICICI)",
      bank: "ICICI Bank",
      date: "2026-09-23 02:50 PM",
      status: "Query Raised",
      bankStatus: "UTR Discrepancy Flagged",
      queryRemarks: "UTR number ICIC773019284102 returned 'Transaction Failed' in clearing reconciliation. Student requested to provide updated debit statement.",
      receiptName: "icici_debit_ack.png"
    }
  },
  {
    id: "KGP-2026-0844",
    roll: "24BS0004",
    name: "Ananya Mukherjee",
    email: "ananya.m@kgp.ac.in",
    phone: "+91 98305 99001",
    level: "B.Sc. Degree Level",
    pathway: "Direct Entry: JEE Advanced Rank #3842",
    category: "General",
    incomeTier: "1 - 5 LPA (50% Waiver)",
    status: "Pending Review",
    rejectionReason: "",
    submissionDate: "2026-09-23 04:10 PM",
    examCity: "Kolkata Salt Lake",
    docs: {
      genInfo: "Verified",
      education: "Awaiting Rank Card Scrutiny",
      photo: "Verified",
      fee: "Under Review"
    },
    payment: {
      amount: 750,
      utr: "PAYTM994018274112",
      mode: "UPI (Paytm)",
      bank: "Paytm Payments Bank",
      date: "2026-09-23 04:15 PM",
      status: "Pending Review",
      bankStatus: "Awaiting Daily Clearing",
      queryRemarks: "",
      receiptName: "paytm_payment_750.png"
    }
  },
  {
    id: "KGP-2026-0845",
    roll: "24BS0005",
    name: "Rajesh Kumar Mandal",
    email: "rajesh.km@kgp.ac.in",
    phone: "+91 94340 22334",
    level: "Foundation Level",
    pathway: "Qualifier CBT (Score: 88.0%)",
    category: "SC",
    incomeTier: "< 1 LPA (75% Waiver)",
    status: "Verified",
    rejectionReason: "",
    submissionDate: "2026-09-23 05:20 PM",
    examCity: "Paschim Bardhaman (Asansol)",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Verified"
    },
    payment: {
      amount: 375,
      utr: "AXIS448102938192",
      mode: "UPI (BHIM)",
      bank: "Axis Bank",
      date: "2026-09-23 05:25 PM",
      status: "Verified",
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "axis_bhim_375.pdf"
    }
  },
  {
    id: "KGP-2026-0846",
    roll: "24BS0006",
    name: "Tanmay Singha",
    email: "tanmay.s@kgp.ac.in",
    phone: "+91 98320 88990",
    level: "Foundation Level",
    pathway: "Qualifier CBT (Score: 79.5%)",
    category: "EWS",
    incomeTier: "< 1 LPA (75% Waiver)",
    status: "Pending Review",
    rejectionReason: "",
    submissionDate: "2026-09-24 09:10 AM",
    examCity: "Siliguri & Jalpaiguri",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Query Raised"
    },
    payment: {
      amount: 375,
      utr: "SBI339102847119",
      mode: "UPI (Google Pay)",
      bank: "State Bank of India",
      date: "2026-09-24 09:15 AM",
      status: "Query Raised",
      bankStatus: "Underpaid Discrepancy",
      queryRemarks: "Candidate claimed 75% fee waiver (paid ₹375) but uploaded expired 2024 income certificate. Please upload current FY 2026 income certificate issued by SDO/DM or pay balance tariff.",
      receiptName: "gpay_screen_375.jpg"
    }
  }
];

class DatabaseService {
  constructor() {
    this.isPg = false;
    this.pgPool = null;
    this.memoryDb = {
      students: [],
      audit_logs: []
    };
  }

  async init() {
    // Check if PostgreSQL is configured via env
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      try {
        this.pgPool = new pg.Pool({
          connectionString: dbUrl,
          connectionTimeoutMillis: 3000
        });
        // Test connection
        const res = await this.pgPool.query('SELECT NOW()');
        console.log('✅ Connected to PostgreSQL Database at:', res.rows[0].now);
        this.isPg = true;
        await this.initPgTables();
        return;
      } catch (err) {
        console.warn('⚠️ PostgreSQL connection failed, falling back to JSON persistence:', err.message);
        this.isPg = false;
      }
    }

    // Fallback: Local JSON Persistence
    console.log('📦 Using Local High-Performance JSON/Memory Storage Engine');
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(LOCAL_DB_FILE)) {
      try {
        const raw = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
        this.memoryDb = JSON.parse(raw);
        if (!this.memoryDb.students || this.memoryDb.students.length === 0) {
          this.memoryDb.students = [...SEED_APPLICATIONS];
        }
        if (!this.memoryDb.users || this.memoryDb.users.length === 0) {
          this.memoryDb.users = [...SEED_USERS];
        }
        this.saveLocal();
      } catch (e) {
        this.memoryDb = { students: [...SEED_APPLICATIONS], users: [...SEED_USERS], audit_logs: [] };
        this.saveLocal();
      }
    } else {
      this.memoryDb = {
        students: [...SEED_APPLICATIONS],
        users: [...SEED_USERS],
        audit_logs: [
          {
            id: 1,
            action: 'SYSTEM_INIT',
            entity_type: 'DATABASE',
            entity_id: 'SYSTEM',
            actor_role: 'System',
            actor_name: 'IIT Kharagpur BS Server',
            details: 'Initial database created with official seeded records and secure admin accounts.',
            timestamp: new Date().toISOString()
          }
        ]
      };
      this.saveLocal();
    }
  }

  saveLocal() {
    if (!this.isPg) {
      try {
        fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(this.memoryDb, null, 2), 'utf-8');
      } catch (err) {
        console.error('Failed to write local database file:', err);
      }
    }
  }

  async initPgTables() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf-8');
      await this.pgPool.query(sql);
      // Check if students seeded
      const countRes = await this.pgPool.query('SELECT COUNT(*) FROM students');
      if (parseInt(countRes.rows[0].count, 10) === 0) {
        console.log('🌱 Seeding initial applications into PostgreSQL...');
        for (const app of SEED_APPLICATIONS) {
          await this.saveStudent(app, 'System Initializer');
        }
      }
      // Check if users seeded
      const userCountRes = await this.pgPool.query('SELECT COUNT(*) FROM users');
      if (parseInt(userCountRes.rows[0].count, 10) === 0) {
        console.log('🌱 Seeding initial administrative and student accounts into PostgreSQL...');
        for (const user of SEED_USERS) {
          await this.pgPool.query(
            `INSERT INTO users (username, email, password_hash, role, name, designation, roll_number)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (username) DO NOTHING`,
            [user.username, user.email, user.password_hash, user.role, user.name, user.designation, user.roll_number]
          );
        }
      }
    }
  }

  // AUDIT LOGGING
  async logAudit({ action, entityType, entityId, actorRole = 'Admin', actorName = 'Admissions Staff', details = '', ip = '127.0.0.1' }) {
    const timestamp = new Date().toISOString();
    if (this.isPg) {
      try {
        await this.pgPool.query(
          `INSERT INTO audit_logs (action, entity_type, entity_id, actor_role, actor_name, details, ip_address, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [action, entityType, entityId, actorRole, actorName, details, ip, timestamp]
        );
      } catch (e) {
        console.error('Error writing audit log to PG:', e);
      }
    } else {
      const newLog = {
        id: this.memoryDb.audit_logs.length + 1,
        action,
        entity_type: entityType,
        entity_id: entityId,
        actor_role: actorRole,
        actor_name: actorName,
        details,
        ip_address: ip,
        timestamp
      };
      this.memoryDb.audit_logs.unshift(newLog);
      this.saveLocal();
    }
  }

  async getAuditLogs({ page = 1, limit = 20, q = '' }) {
    if (this.isPg) {
      const offset = (page - 1) * limit;
      let query = 'SELECT * FROM audit_logs';
      const params = [];
      if (q) {
        query += ' WHERE details ILIKE $1 OR action ILIKE $1 OR entity_id ILIKE $1';
        params.push(`%${q}%`);
      }
      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
      const res = await this.pgPool.query(query, params);
      const countRes = await this.pgPool.query('SELECT COUNT(*) FROM audit_logs');
      return {
        logs: res.rows,
        total: parseInt(countRes.rows[0].count, 10),
        page: parseInt(page, 10),
        totalPages: Math.ceil(parseInt(countRes.rows[0].count, 10) / limit)
      };
    } else {
      let logs = [...this.memoryDb.audit_logs];
      if (q) {
        const query = q.toLowerCase();
        logs = logs.filter(l => 
          (l.details && l.details.toLowerCase().includes(query)) ||
          (l.action && l.action.toLowerCase().includes(query)) ||
          (l.entity_id && l.entity_id.toLowerCase().includes(query))
        );
      }
      const total = logs.length;
      const offset = (page - 1) * limit;
      const paginated = logs.slice(offset, offset + limit);
      return {
        logs: paginated,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit)
      };
    }
  }

  // STUDENTS CRUD & SEARCH
  async getStudents({ page = 1, limit = 10, q = '', status = 'ALL', level = 'ALL', sortBy = 'submissionDate', sortOrder = 'desc' }) {
    if (this.isPg) {
      let whereClauses = [];
      let params = [];

      if (q) {
        params.push(`%${q}%`);
        whereClauses.push(`(name ILIKE $${params.length} OR roll ILIKE $${params.length} OR email ILIKE $${params.length} OR id ILIKE $${params.length})`);
      }

      if (status && status !== 'ALL') {
        params.push(status);
        whereClauses.push(`status = $${params.length}`);
      }

      if (level && level !== 'ALL') {
        params.push(level);
        whereClauses.push(`level = $${params.length}`);
      }

      const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const countRes = await this.pgPool.query(`SELECT COUNT(*) FROM students ${whereSql}`, params);
      const total = parseInt(countRes.rows[0].count, 10);

      const offset = (page - 1) * limit;
      const orderCol = sortBy === 'name' ? 'name' : sortBy === 'roll' ? 'roll' : 'created_at';
      const orderDir = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

      params.push(limit, offset);
      const dataRes = await this.pgPool.query(
        `SELECT * FROM students ${whereSql} ORDER BY ${orderCol} ${orderDir} LIMIT $${params.length - 1} OFFSET $${params.length}`,
        params
      );

      return {
        students: dataRes.rows,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit),
        limit: parseInt(limit, 10)
      };
    } else {
      let list = [...this.memoryDb.students];

      // Search
      if (q) {
        const query = q.toLowerCase();
        list = list.filter(s =>
          (s.name && s.name.toLowerCase().includes(query)) ||
          (s.roll && s.roll.toLowerCase().includes(query)) ||
          (s.email && s.email.toLowerCase().includes(query)) ||
          (s.id && s.id.toLowerCase().includes(query)) ||
          (s.payment?.utr && s.payment.utr.toLowerCase().includes(query))
        );
      }

      // Filter by Status
      if (status && status !== 'ALL') {
        list = list.filter(s => s.status === status);
      }

      // Filter by Level
      if (level && level !== 'ALL') {
        list = list.filter(s => s.level.toLowerCase().includes(level.toLowerCase()));
      }

      // Sorting
      list.sort((a, b) => {
        let valA = a[sortBy] || a.submissionDate || '';
        let valB = b[sortBy] || b.submissionDate || '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      const total = list.length;
      const offset = (page - 1) * limit;
      const paginated = list.slice(offset, offset + limit);

      return {
        students: paginated,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit) || 1,
        limit: parseInt(limit, 10)
      };
    }
  }

  async getAllStudents() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM students ORDER BY roll ASC');
      return res.rows;
    }
    return [...this.memoryDb.students];
  }

  async saveStudent(studentData, actor = 'Applicant Online') {
    const roll = studentData.roll || `24BS${String(Math.floor(1000 + Math.random() * 9000))}`;
    const id = studentData.id || `KGP-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const student = {
      ...studentData,
      id,
      roll,
      status: studentData.status || 'Pending Review',
      submissionDate: studentData.submissionDate || new Date().toLocaleString()
    };

    if (this.isPg) {
      await this.pgPool.query(
        `INSERT INTO students (id, roll, name, email, phone, level, pathway, category, income_tier, status, rejection_reason, submission_date, exam_city, docs, payment)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         ON CONFLICT (roll) DO UPDATE SET
         name = EXCLUDED.name, email = EXCLUDED.email, phone = EXCLUDED.phone, level = EXCLUDED.level,
         pathway = EXCLUDED.pathway, category = EXCLUDED.category, income_tier = EXCLUDED.income_tier,
         docs = EXCLUDED.docs, payment = EXCLUDED.payment, updated_at = NOW()`,
        [
          student.id, student.roll, student.name, student.email, student.phone || '',
          student.level || 'Foundation Level', student.pathway || 'Qualifier CBT',
          student.category || 'General', student.incomeTier || 'Standard',
          student.status, student.rejectionReason || '', student.submissionDate,
          student.examCity || 'Kharagpur',
          JSON.stringify(student.docs || {}), JSON.stringify(student.payment || {})
        ]
      );
    } else {
      const idx = this.memoryDb.students.findIndex(s => s.roll === student.roll || s.id === student.id);
      if (idx >= 0) {
        this.memoryDb.students[idx] = { ...this.memoryDb.students[idx], ...student };
      } else {
        this.memoryDb.students.unshift(student);
      }
      this.saveLocal();
    }

    await this.logAudit({
      action: 'STUDENT_REGISTER',
      entityType: 'STUDENT',
      entityId: student.roll,
      actorRole: 'Applicant',
      actorName: actor,
      details: `New student registered: ${student.name} (${student.roll}) for ${student.level}.`
    });

    return student;
  }

  async updateVerification(roll, newStatus, reason = '', actor = 'Admissions Officer') {
    if (this.isPg) {
      await this.pgPool.query(
        `UPDATE students SET status = $1, rejection_reason = $2, updated_at = NOW() WHERE roll = $3 OR id = $3`,
        [newStatus, newStatus === 'Rejected' ? reason : '', roll]
      );
    } else {
      const student = this.memoryDb.students.find(s => s.roll === roll || s.id === roll);
      if (student) {
        student.status = newStatus;
        student.rejectionReason = newStatus === 'Rejected' ? reason : '';
        if (newStatus === 'Verified' && student.docs) {
          student.docs.genInfo = 'Verified';
          student.docs.education = 'Verified';
        }
        this.saveLocal();
      }
    }

    await this.logAudit({
      action: newStatus === 'Verified' ? 'VERIFY_APPLICATION' : 'REJECT_APPLICATION',
      entityType: 'STUDENT',
      entityId: roll,
      actorRole: 'Admin',
      actorName: actor,
      details: `Application ${newStatus}. ${reason ? `Reason: ${reason}` : ''}`
    });

    return { roll, status: newStatus, reason };
  }

  async updatePayment(roll, paymentStatus, bankStatus, queryRemarks = '', actor = 'Accounts Desk') {
    if (this.isPg) {
      const studentRes = await this.pgPool.query('SELECT payment, docs, status FROM students WHERE roll = $1 OR id = $1', [roll]);
      if (studentRes.rows.length > 0) {
        const curPayment = studentRes.rows[0].payment || {};
        const curDocs = studentRes.rows[0].docs || {};
        const updatedPayment = {
          ...curPayment,
          status: paymentStatus,
          bankStatus: bankStatus || curPayment.bankStatus,
          queryRemarks: queryRemarks || ''
        };
        const updatedDocs = { ...curDocs, fee: paymentStatus };
        const updatedAppStatus = paymentStatus === 'Verified' && studentRes.rows[0].status !== 'Rejected' ? 'Verified' : studentRes.rows[0].status;

        await this.pgPool.query(
          `UPDATE students SET payment = $1, docs = $2, status = $3, updated_at = NOW() WHERE roll = $4 OR id = $4`,
          [JSON.stringify(updatedPayment), JSON.stringify(updatedDocs), updatedAppStatus, roll]
        );
      }
    } else {
      const student = this.memoryDb.students.find(s => s.roll === roll || s.id === roll);
      if (student) {
        if (!student.payment) student.payment = {};
        student.payment.status = paymentStatus;
        if (bankStatus) student.payment.bankStatus = bankStatus;
        student.payment.queryRemarks = queryRemarks || '';
        if (!student.docs) student.docs = {};
        student.docs.fee = paymentStatus;
        if (paymentStatus === 'Verified' && student.status !== 'Rejected') {
          student.status = 'Verified';
        }
        this.saveLocal();
      }
    }

    await this.logAudit({
      action: paymentStatus === 'Verified' ? 'APPROVE_PAYMENT' : paymentStatus === 'Query Raised' ? 'PAYMENT_QUERY' : 'REJECT_PAYMENT',
      entityType: 'PAYMENT',
      entityId: roll,
      actorRole: 'Admin Accounts',
      actorName: actor,
      details: `Payment set to ${paymentStatus}. Bank: ${bankStatus}. ${queryRemarks ? `Remarks: ${queryRemarks}` : ''}`
    });

    return { roll, paymentStatus, bankStatus, queryRemarks };
  }

  // BULK IMPORT
  async bulkImport(studentsList, actor = 'System Administrator') {
    let imported = 0;
    for (const student of studentsList) {
      if (student.name && student.email) {
        await this.saveStudent(student, actor);
        imported++;
      }
    }

    await this.logAudit({
      action: 'BULK_IMPORT',
      entityType: 'STUDENTS_ROSTER',
      entityId: `BATCH_${Date.now()}`,
      actorRole: 'Admin',
      actorName: actor,
      details: `Successfully bulk imported ${imported} student records into database.`
    });

    return { importedCount: imported, totalNow: await this.getTotalCount() };
  }

  async getTotalCount() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT COUNT(*) FROM students');
      return parseInt(res.rows[0].count, 10);
    }
    return this.memoryDb.students.length;
  }

  // DUMMY DATA GENERATOR (For Mass Load Testing)
  async generateDummyStudents(count = 50, actor = 'QA Tester') {
    const firstNames = ['Aarav', 'Ananya', 'Rohan', 'Sneha', 'Vikram', 'Pooja', 'Aditya', 'Riya', 'Rahul', 'Isha', 'Amit', 'Meera', 'Kunal', 'Shreya', 'Deepak', 'Sujata', 'Kalyan', 'Tanya', 'Sayan', 'Moumita', 'Debarshi', 'Nilanjana', 'Sourav', 'Trisha'];
    const lastNames = ['Banerjee', 'Chatterjee', 'Das', 'Sen', 'Mukherjee', 'Ghosh', 'Roy', 'Dutta', 'Gupta', 'Sharma', 'Mondal', 'Chakraborty', 'Bose', 'Mitra', 'Saha', 'Majumdar', 'Paul', 'Ganguly'];
    const pathways = ['Qualifier CBT (Score: 85-98%)', 'Direct Entry: WBJEE', 'Direct Entry: JEE Advanced', 'Direct Entry: Tripura JEE'];
    const levels = ['Foundation Level', 'Diploma in Programming', 'Diploma in Data Science & AI', 'B.Sc. Degree Level', 'BS Degree Level'];
    const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];
    const incomeTiers = ['< 1 LPA (75% Waiver)', '1 - 5 LPA (50% Waiver)', '> 5 LPA (Standard)'];
    const cities = ['Kolkata Salt Lake', 'Kharagpur Main Campus', 'Bhubaneswar', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Siliguri', 'Durgapur'];
    const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Axis Bank'];

    const newStudents = [];
    const baseRoll = 240000 + Math.floor(Math.random() * 50000);

    for (let i = 0; i < count; i++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const roll = `24BS${baseRoll + i}`;
      const id = `KGP-2026-${1000 + (baseRoll % 9000) + i}`;
      const isVerified = Math.random() > 0.35;
      const status = isVerified ? 'Verified' : Math.random() > 0.5 ? 'Pending Review' : 'Query Raised';
      const income = incomeTiers[Math.floor(Math.random() * incomeTiers.length)];
      const amount = income.includes('75%') ? 375 : income.includes('50%') ? 750 : 1500;
      const bank = banks[Math.floor(Math.random() * banks.length)];

      const dummy = {
        id,
        roll,
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random() * 999)}@gmail.com`,
        phone: `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
        level: levels[Math.floor(Math.random() * levels.length)],
        pathway: pathways[Math.floor(Math.random() * pathways.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        incomeTier: income,
        status,
        rejectionReason: '',
        submissionDate: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)).toLocaleString(),
        examCity: cities[Math.floor(Math.random() * cities.length)],
        docs: {
          genInfo: status === 'Verified' ? 'Verified' : 'Under Review',
          education: status === 'Verified' ? 'Verified' : 'Pending',
          photo: 'Verified',
          fee: status === 'Verified' ? 'Verified' : status === 'Query Raised' ? 'Query Raised' : 'Pending Review'
        },
        payment: {
          amount,
          utr: `${bank.slice(0, 4).toUpperCase()}${Math.floor(100000000000 + Math.random() * 900000000000)}`,
          mode: 'UPI (Online)',
          bank,
          date: new Date().toLocaleString(),
          status: status === 'Verified' ? 'Verified' : status === 'Query Raised' ? 'Query Raised' : 'Pending Review',
          bankStatus: status === 'Verified' ? 'Bank Settlement Confirmed' : status === 'Query Raised' ? 'Discrepancy Flagged' : 'Awaiting Settlement',
          queryRemarks: status === 'Query Raised' ? 'Simulated query: Verify category certificate validity.' : '',
          receiptName: `payment_proof_${roll}.pdf`
        }
      };

      await this.saveStudent(dummy, actor);
      newStudents.push(dummy);
    }

    await this.logAudit({
      action: 'MASS_SIMULATION',
      entityType: 'TESTING',
      entityId: `SIM_${count}`,
      actorRole: 'System QA',
      actorName: actor,
      details: `Generated ${count} test dummy student records for pagination and performance verification.`
    });

    return {
      generatedCount: newStudents.length,
      totalCount: await this.getTotalCount()
    };
  }

  // ==========================================
  // USER / RBAC AUTHENTICATION METHODS
  // ==========================================
  async getUserByEmailOrUsername(identifier) {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    if (this.isPg) {
      const res = await this.pgPool.query(
        'SELECT * FROM users WHERE LOWER(email) = $1 OR LOWER(username) = $1 LIMIT 1',
        [clean]
      );
      return res.rows[0] || null;
    } else {
      const users = this.memoryDb.users || [];
      return users.find(u =>
        (u.email && u.email.toLowerCase() === clean) ||
        (u.username && u.username.toLowerCase() === clean)
      ) || null;
    }
  }

  async getUserById(id) {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
      return res.rows[0] || null;
    } else {
      const users = this.memoryDb.users || [];
      return users.find(u => u.id === id || String(u.id) === String(id)) || null;
    }
  }

  async createUser(userData) {
    const { username, email, password, role = 'student', name, designation = '', roll_number = null } = userData;
    const password_hash = bcrypt.hashSync(password, 10);

    if (this.isPg) {
      const res = await this.pgPool.query(
        `INSERT INTO users (username, email, password_hash, role, name, designation, roll_number)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, username, email, role, name, designation, roll_number, created_at`,
        [username, email, password_hash, role, name, designation, roll_number]
      );
      return res.rows[0];
    } else {
      if (!this.memoryDb.users) this.memoryDb.users = [];
      const newUser = {
        id: this.memoryDb.users.length + 1,
        username,
        email,
        password_hash,
        role,
        name,
        designation,
        roll_number,
        created_at: new Date().toISOString()
      };
      this.memoryDb.users.push(newUser);
      this.saveLocal();
      const { password_hash: _, ...safeUser } = newUser;
      return safeUser;
    }
  }

  // ==========================================
  // DELETE STUDENT APPLICATION (ADMIN ONLY)
  // ==========================================
  async deleteStudent(roll, actor = 'Admissions Officer') {
    let deletedStudent = null;
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM students WHERE roll = $1 OR id = $1', [roll]);
      if (res.rows.length > 0) {
        deletedStudent = res.rows[0];
        await this.pgPool.query('DELETE FROM students WHERE roll = $1 OR id = $1', [roll]);
      }
    } else {
      const idx = this.memoryDb.students.findIndex(s => s.roll === roll || s.id === roll);
      if (idx >= 0) {
        deletedStudent = this.memoryDb.students.splice(idx, 1)[0];
        this.saveLocal();
      }
    }

    if (deletedStudent) {
      await this.logAudit({
        action: 'DELETE_APPLICATION',
        entityType: 'STUDENT',
        entityId: roll,
        actorRole: 'Admin',
        actorName: actor,
        details: `Deleted student application: ${deletedStudent.name} (${roll}).`
      });
      return { success: true, roll, student: deletedStudent };
    }
    return { success: false, error: 'Student record not found' };
  }
}

export const db = new DatabaseService();
