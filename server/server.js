import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.url.startsWith('/assets')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Initialize database
await db.init();

// ==========================================
// 1. HEALTHCHECK & METRICS
// ==========================================
app.get('/api/health', async (req, res) => {
  try {
    const totalStudents = await db.getTotalCount();
    const memory = process.memoryUsage();
    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'IIT Kharagpur BS Portal Enterprise Backend',
      database: db.isPg ? 'PostgreSQL 16' : 'Local JSON/Memory Engine (Active Fallback)',
      metrics: {
        totalStudents,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryRssMb: Math.round(memory.rss / (1024 * 1024)),
        nodeVersion: process.version
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// ==========================================
// 2. STUDENTS ROSTER & ADVANCED SEARCH
// ==========================================
app.get('/api/students', async (req, res) => {
  try {
    const { page = 1, limit = 10, q = '', status = 'ALL', level = 'ALL', sortBy = 'submissionDate', sortOrder = 'desc' } = req.query;
    const result = await db.getStudents({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      q: String(q).trim(),
      status: String(status),
      level: String(level),
      sortBy: String(sortBy),
      sortOrder: String(sortOrder)
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve students roster', details: err.message });
  }
});

// ==========================================
// 5. ENTERPRISE CSV BULK IMPORT & EXPORT
// ==========================================
app.get('/api/students/export-csv', async (req, res) => {
  try {
    const students = await db.getAllStudents();
    const headers = [
      'Application ID', 'Roll Number', 'Full Name', 'Email Address', 'Phone Number',
      'Academic Level', 'Admission Pathway', 'Category', 'Income Tier',
      'Application Status', 'Rejection Reason', 'Submission Date', 'Exam City',
      'Fee Amount', 'Payment UTR', 'Payment Mode', 'Bank Name', 'Payment Status', 'Bank Status', 'Query Remarks'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = students.map(s => [
      escapeCsv(s.id),
      escapeCsv(s.roll),
      escapeCsv(s.name),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.level),
      escapeCsv(s.pathway),
      escapeCsv(s.category),
      escapeCsv(s.incomeTier),
      escapeCsv(s.status),
      escapeCsv(s.rejectionReason),
      escapeCsv(s.submissionDate),
      escapeCsv(s.examCity),
      escapeCsv(s.payment?.amount || ''),
      escapeCsv(s.payment?.utr || ''),
      escapeCsv(s.payment?.mode || ''),
      escapeCsv(s.payment?.bank || ''),
      escapeCsv(s.payment?.status || ''),
      escapeCsv(s.payment?.bankStatus || ''),
      escapeCsv(s.payment?.queryRemarks || '')
    ].join(','));

    const csvOutput = [headers.join(','), ...rows].join('\r\n');

    await db.logAudit({
      action: 'EXPORT_CSV',
      entityType: 'STUDENTS_ROSTER',
      entityId: `EXPORT_${students.length}`,
      actorRole: 'Admin',
      actorName: 'Admissions Officer',
      details: `Exported ${students.length} student enrollment records to CSV.`
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=iit_kgp_students_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    res.send(csvOutput);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate CSV export', details: err.message });
  }
});

app.post('/api/students/bulk-import', async (req, res) => {
  try {
    const { students = [], csvText = '', actor = 'Admin Bulk Uploader' } = req.body;
    let listToImport = students;

    if (csvText && csvText.trim()) {
      const lines = csvText.trim().split(/\r?\n/);
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        listToImport = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
          if (cols.length >= 3 && cols[0]) {
            const studentObj = {
              roll: cols[headers.indexOf('Roll')] || cols[headers.indexOf('Roll Number')] || cols[0],
              name: cols[headers.indexOf('Name')] || cols[headers.indexOf('Full Name')] || cols[1],
              email: cols[headers.indexOf('Email')] || cols[headers.indexOf('Email Address')] || cols[2],
              phone: cols[headers.indexOf('Phone')] || cols[headers.indexOf('Phone Number')] || cols[3] || '',
              level: cols[headers.indexOf('Level')] || cols[headers.indexOf('Academic Level')] || cols[4] || 'Foundation Level',
              category: cols[headers.indexOf('Category')] || cols[5] || 'General',
              status: cols[headers.indexOf('Status')] || cols[headers.indexOf('Application Status')] || cols[6] || 'Verified',
              payment: {
                amount: parseInt(cols[headers.indexOf('FeeAmount')] || cols[headers.indexOf('Fee Amount')] || cols[7] || '1500', 10),
                utr: cols[headers.indexOf('UTR')] || cols[headers.indexOf('Payment UTR')] || cols[8] || `UTR${Date.now()}`,
                status: cols[headers.indexOf('PaymentStatus')] || cols[headers.indexOf('Payment Status')] || cols[9] || 'Verified',
                bank: cols[headers.indexOf('Bank')] || cols[headers.indexOf('Bank Name')] || cols[10] || 'State Bank of India'
              }
            };
            listToImport.push(studentObj);
          }
        }
      }
    }

    if (!Array.isArray(listToImport) || listToImport.length === 0) {
      return res.status(400).json({ error: 'No valid student records provided for bulk import.' });
    }

    const result = await db.bulkImport(listToImport, actor);
    res.json({
      message: `Successfully bulk imported ${result.importedCount} student records.`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'Bulk import failed', details: err.message });
  }
});

// Single student lookup by Roll or ID
app.get('/api/students/:roll', async (req, res) => {
  try {
    const { roll } = req.params;
    const all = await db.getAllStudents();
    const student = all.find(s => s.roll === roll || s.id === roll);
    if (!student) {
      return res.status(404).json({ error: 'Student record not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. STUDENT REGISTRATION
// ==========================================
app.post('/api/students', async (req, res) => {
  try {
    const studentData = req.body;
    if (!studentData.name || !studentData.email) {
      return res.status(400).json({ error: 'Student full name and email are mandatory.' });
    }

    const saved = await db.saveStudent(studentData, studentData.actor || 'Applicant Web Form');
    res.status(201).json({
      message: 'Student application successfully registered.',
      student: saved
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application', details: err.message });
  }
});

// ==========================================
// 4. ADMIN VERIFICATION ACTIONS
// ==========================================
app.patch('/api/students/:roll/verify', async (req, res) => {
  try {
    const { roll } = req.params;
    const { status, reason = '', actor = 'Admissions Officer' } = req.body;
    if (!status || !['Verified', 'Rejected', 'Pending Review'].includes(status)) {
      return res.status(400).json({ error: "Status must be 'Verified', 'Rejected', or 'Pending Review'." });
    }

    const updated = await db.updateVerification(roll, status, reason, actor);
    res.json({
      message: `Application ${status} successfully.`,
      result: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update verification status', details: err.message });
  }
});

app.patch('/api/students/:roll/payment', async (req, res) => {
  try {
    const { roll } = req.params;
    const { paymentStatus, bankStatus = '', queryRemarks = '', actor = 'Accounts Desk' } = req.body;
    if (!paymentStatus || !['Verified', 'Query Raised', 'Rejected', 'Pending Review'].includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status provided.' });
    }

    const updated = await db.updatePayment(roll, paymentStatus, bankStatus, queryRemarks, actor);
    res.json({
      message: `Payment status updated to ${paymentStatus}.`,
      result: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status', details: err.message });
  }
});


// ==========================================
// 6. AUDIT LOGGING SYSTEM
// ==========================================
app.get('/api/audit-logs', async (req, res) => {
  try {
    const { page = 1, limit = 20, q = '' } = req.query;
    const result = await db.getAuditLogs({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      q: String(q).trim()
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve audit logs', details: err.message });
  }
});

// ==========================================
// 7. MASS DUMMY DATA GENERATOR (TESTING)
// ==========================================
app.post('/api/test/generate-dummy-students', async (req, res) => {
  try {
    const count = parseInt(req.body.count || 50, 10);
    const actor = req.body.actor || 'QA Test Automation';
    const result = await db.generateDummyStudents(count, actor);
    res.json({
      message: `Generated ${result.generatedCount} test dummy student records for pagination and performance verification.`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'Dummy generation failed', details: err.message });
  }
});

// ==========================================
// 8. SERVE PRODUCTION FRONTEND BUILD
// ==========================================
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  console.log(`📁 Serving compiled static frontend from: ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  IIT Kharagpur BS Portal Enterprise Backend Server`);
  console.log(`  Running on: http://localhost:${PORT}`);
  console.log(`  Health API: http://localhost:${PORT}/api/health`);
  console.log(`  Students:   http://localhost:${PORT}/api/students`);
  console.log(`  Audit Logs: http://localhost:${PORT}/api/audit-logs`);
  console.log(`====================================================`);
});
