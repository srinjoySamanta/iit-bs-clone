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

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// -------------------------------------------------------------
// 1. SEED USERS & EMPLOYEES (RBAC)
// -------------------------------------------------------------
const SEED_USERS = [
  {
    id: 1,
    emp_id: "EMP-KGP-001",
    username: "admin_kgp",
    email: "admin@iitkgp.ac.in",
    password_hash: bcrypt.hashSync("Admin@KGP2026!", 10),
    role: "superadmin",
    name: "Prof. Suman Chakraborty",
    designation: "Dean of Academic Affairs & Program Chair",
    department: "Executive Directorate",
    phone: "+91 3222 282001",
    is_temp_password: false,
    status: "Active",
    roll_number: null,
    created_at: new Date('2026-08-01T10:00:00Z').toISOString()
  },
  {
    id: 2,
    emp_id: "EMP-KGP-002",
    username: "officer_kgp",
    email: "officer@iitkgp.ac.in",
    password_hash: bcrypt.hashSync("Officer@KGP2026!", 10),
    role: "admin",
    name: "Dr. S. K. Mukherjee",
    designation: "Chief Scrutiny & Admissions Officer",
    department: "BS Admissions Cell",
    phone: "+91 3222 282005",
    is_temp_password: false,
    status: "Active",
    roll_number: null,
    created_at: new Date('2026-08-05T10:00:00Z').toISOString()
  },
  {
    id: 3,
    emp_id: "EMP-KGP-010",
    username: "prof_sensarma",
    email: "sensarma@iitkgp.ac.in",
    password_hash: bcrypt.hashSync("Staff@KGP2026!", 10),
    role: "employee",
    name: "Dr. Gautam Sen Sarma",
    designation: "Academic Coordinator & Document Reviewer",
    department: "Document Verification Division",
    phone: "+91 94331 55678",
    is_temp_password: false,
    status: "Active",
    roll_number: null,
    created_at: new Date('2026-08-10T10:00:00Z').toISOString()
  },
  {
    id: 4,
    emp_id: "EMP-KGP-015",
    username: "ta_subhadip",
    email: "subhadip.ta@iitkgp.ac.in",
    password_hash: bcrypt.hashSync("Staff@KGP2026!", 10),
    role: "employee",
    name: "Subhadip Banerjee",
    designation: "Senior Teaching Assistant & Exam Proctor",
    department: "Assessment & Exam Evaluation",
    phone: "+91 98310 99887",
    is_temp_password: false,
    status: "Active",
    roll_number: null,
    created_at: new Date('2026-08-12T10:00:00Z').toISOString()
  },
  {
    id: 5,
    emp_id: null,
    username: "student_kgp",
    email: "subho.roy@kgp.ac.in",
    password_hash: bcrypt.hashSync("Student@KGP2026!", 10),
    role: "student",
    name: "Subhashis Roy",
    designation: "Qualifier Candidate",
    department: "Undergraduate Candidate",
    phone: "+91 98301 11223",
    is_temp_password: false,
    status: "Active",
    roll_number: "24BS0001",
    created_at: new Date('2026-09-01T10:00:00Z').toISOString()
  }
];

// -------------------------------------------------------------
// 2. SEED COURSES & LMS CONTENT (Qualifier Round)
// -------------------------------------------------------------
const SEED_COURSES = [
  {
    id: 1,
    code: "BS-CT101",
    title: "Computational Thinking & Algorithm Design",
    category: "Core Computing",
    description: "Algorithmic thinking, flowchart logic, decomposition, pattern recognition, and introduction to Python syntax.",
    credits: 4,
    weekly_duration_hours: 6,
    semester_term: "Qualifier 2026",
    instructor_name: "Prof. Partha Pratim Chakrabarti",
    instructor_designation: "Department of Computer Science & Engineering",
    thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    is_active: true
  },
  {
    id: 2,
    code: "BS-MA101",
    title: "Mathematics for Data Science",
    category: "Foundational Mathematics",
    description: "Linear algebra, matrix operations, vectors, calculus of functions, limits, and matrix factorizations.",
    credits: 4,
    weekly_duration_hours: 6,
    semester_term: "Qualifier 2026",
    instructor_name: "Prof. Somesh Kumar",
    instructor_designation: "Department of Mathematics",
    thumbnail_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    is_active: true
  },
  {
    id: 3,
    code: "BS-ST101",
    title: "Basic Statistics & Probability",
    category: "Data Science & Analytics",
    description: "Descriptive statistics, probability distributions, Bayes' Theorem, expected value, variance, and random variables.",
    credits: 4,
    weekly_duration_hours: 6,
    semester_term: "Qualifier 2026",
    instructor_name: "Prof. Nitai Mitra",
    instructor_designation: "Center of Excellence in AI & Data Science",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    is_active: true
  },
  {
    id: 4,
    code: "BS-EN101",
    title: "English for Academic Communication",
    category: "Humanities & Professional Skills",
    description: "Academic writing, technical summaries, syntax mastery, reading comprehension, and scientific discourse.",
    credits: 3,
    weekly_duration_hours: 4,
    semester_term: "Qualifier 2026",
    instructor_name: "Dr. Priyadarshi Patnaik",
    instructor_designation: "Department of Humanities & Social Sciences",
    thumbnail_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    is_active: true
  }
];

const SEED_LMS_CONTENT = [
  // Computational Thinking
  {
    id: 101,
    course_id: 1,
    week_number: 1,
    module_title: "Week 1: Algorithmic Logic & Flow Control",
    content_type: "video",
    resource_url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
    duration_minutes: 42,
    file_size_mb: 240.5,
    order_index: 1,
    description: "Principles of step-by-step reasoning, conditional branching, and flowchart traces."
  },
  {
    id: 102,
    course_id: 1,
    week_number: 1,
    module_title: "Week 1 Lecture Notes & Algorithm Handbook (PDF)",
    content_type: "pdf",
    resource_url: "/docs/lms/BS-CT101_Week1_Handout.pdf",
    duration_minutes: 20,
    file_size_mb: 4.8,
    order_index: 2,
    description: "Official comprehensive PDF notes for Week 1 algorithmic paradigms."
  },
  {
    id: 103,
    course_id: 1,
    week_number: 1,
    module_title: "Week 1 Graded Practice Problem Set 1",
    content_type: "practice_set",
    resource_url: "/lms/practice/BS-CT101-W1",
    duration_minutes: 30,
    file_size_mb: 1.2,
    order_index: 3,
    description: "10 interactive conceptual questions on loop invariants and condition checking."
  },
  {
    id: 104,
    course_id: 1,
    week_number: 2,
    module_title: "Week 2: Data Structures & Python Syntax Foundations",
    content_type: "video",
    resource_url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    duration_minutes: 48,
    file_size_mb: 290.0,
    order_index: 4,
    description: "Python lists, tuples, dictionaries, and iteration mechanics."
  },
  {
    id: 105,
    course_id: 1,
    week_number: 2,
    module_title: "Week 2 Practice Lab & Code Snippets",
    content_type: "practice_set",
    resource_url: "/lms/practice/BS-CT101-W2",
    duration_minutes: 35,
    file_size_mb: 1.5,
    order_index: 5,
    description: "Coding snippets evaluation: Predict output of list slicing and recursive calls."
  },

  // Mathematics for Data Science
  {
    id: 201,
    course_id: 2,
    week_number: 1,
    module_title: "Week 1: Vector Spaces, Linear Combinations & Span",
    content_type: "video",
    resource_url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
    duration_minutes: 50,
    file_size_mb: 310.0,
    order_index: 1,
    description: "Understanding n-dimensional Euclidean spaces, linear independence, and basis."
  },
  {
    id: 202,
    course_id: 2,
    week_number: 1,
    module_title: "Week 1 Linear Algebra Formula Reference (PDF)",
    content_type: "pdf",
    resource_url: "/docs/lms/BS-MA101_Week1_LinearAlgebra.pdf",
    duration_minutes: 15,
    file_size_mb: 3.2,
    order_index: 2,
    description: "Vector dot products, cross products, determinants, and matrix transpose cheat-sheet."
  },
  {
    id: 203,
    course_id: 2,
    week_number: 1,
    module_title: "Week 1 Practice Problem Set: Matrix Inversion & Rank",
    content_type: "practice_set",
    resource_url: "/lms/practice/BS-MA101-W1",
    duration_minutes: 40,
    file_size_mb: 1.1,
    order_index: 3,
    description: "Numerical and multiple choice questions on matrix rank, Gaussian elimination, and trace."
  },

  // Basic Statistics & Probability
  {
    id: 301,
    course_id: 3,
    week_number: 1,
    module_title: "Week 1: Probability Spaces, Axioms & Conditional Likelihood",
    content_type: "video",
    resource_url: "https://www.youtube.com/watch?v=1uW3qWbLSOo",
    duration_minutes: 45,
    file_size_mb: 260.0,
    order_index: 1,
    description: "Sample spaces, events, mutually exclusive outcomes, and Bayes' Theorem application."
  },
  {
    id: 302,
    course_id: 3,
    week_number: 1,
    module_title: "Week 1 Statistics Primer & Probability Handout (PDF)",
    content_type: "pdf",
    resource_url: "/docs/lms/BS-ST101_Week1_Probability.pdf",
    duration_minutes: 25,
    file_size_mb: 5.1,
    order_index: 2,
    description: "Detailed study guide on discrete random variables and probability mass functions."
  },

  // English
  {
    id: 401,
    course_id: 4,
    week_number: 1,
    module_title: "Week 1: Academic Writing & Cohesion",
    content_type: "video",
    resource_url: "https://www.youtube.com/watch?v=GgkRoYPLhts",
    duration_minutes: 38,
    file_size_mb: 210.0,
    order_index: 1,
    description: "Structuring technical arguments, topic sentences, and avoiding syntactic ambiguity."
  }
];

// Initial student progress seed for student_kgp
const SEED_STUDENT_PROGRESS = [
  {
    id: 1,
    roll: "24BS0001",
    course_id: 1,
    module_id: 101,
    video_progress_percentage: 100,
    is_completed: true,
    practice_attempts: 3,
    last_accessed_at: new Date('2026-09-24T14:30:00Z').toISOString()
  },
  {
    id: 2,
    roll: "24BS0001",
    course_id: 1,
    module_id: 102,
    video_progress_percentage: 100,
    is_completed: true,
    practice_attempts: 1,
    last_accessed_at: new Date('2026-09-24T15:00:00Z').toISOString()
  },
  {
    id: 3,
    roll: "24BS0001",
    course_id: 1,
    module_id: 103,
    video_progress_percentage: 85,
    is_completed: false,
    practice_attempts: 2,
    last_accessed_at: new Date('2026-09-25T11:20:00Z').toISOString()
  },
  {
    id: 4,
    roll: "24BS0001",
    course_id: 2,
    module_id: 201,
    video_progress_percentage: 70,
    is_completed: false,
    practice_attempts: 1,
    last_accessed_at: new Date('2026-09-26T09:15:00Z').toISOString()
  }
];

// -------------------------------------------------------------
// 3. SEED EXAM QUIZZES & QUESTION BANK
// -------------------------------------------------------------
const SEED_EXAM_QUIZZES = [
  {
    id: 1,
    quiz_code: "KGP-QUAL-2026-CBT",
    course_id: 1,
    title: "IIT Kharagpur BS Qualifier Comprehensive CBT 2026",
    description: "Official Qualifier Examination covering Computational Thinking, Mathematics, Probability & English. Mandatory for BS Degree Admission confirmation.",
    time_limit_minutes: 45,
    total_marks: 100,
    pass_percentage: 40.0,
    scheduled_start: new Date(Date.now() - 3600000).toISOString(),
    scheduled_end: new Date(Date.now() + 86400000 * 30).toISOString(),
    is_published: true,
    created_by: 1,
    questions: [
      {
        id: "Q1",
        type: "mcq",
        subject: "Computational Thinking",
        marks: 10,
        text: "In an algorithm, what is the asymptotic time complexity of searching for an element in an unsorted array of size N using linear scan?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
        correct_answer: "O(N)",
        explanation: "In the worst case, every element of an unsorted list must be checked sequentially, leading to O(N) comparisons."
      },
      {
        id: "Q2",
        type: "code_snippet",
        subject: "Computational Thinking",
        marks: 10,
        text: "Analyze the following Python snippet and determine the final printed value of `result`:\n\n```python\nnums = [1, 2, 3, 4, 5]\nresult = sum([x * 2 for x in nums if x % 2 != 0])\nprint(result)\n```",
        options: ["18", "16", "20", "12"],
        correct_answer: "18",
        explanation: "Odd numbers are 1, 3, 5. Multiplied by 2, they become 2, 6, 10. Their sum is 2 + 6 + 10 = 18."
      },
      {
        id: "Q3",
        type: "numerical",
        subject: "Mathematics for Data Science",
        marks: 10,
        text: "Compute the determinant of the 2x2 matrix A:\n\n| 5   3 |\n| 2   4 |",
        correct_answer: "14",
        explanation: "Determinant = (5 * 4) - (3 * 2) = 20 - 6 = 14."
      },
      {
        id: "Q4",
        type: "mcq",
        subject: "Mathematics for Data Science",
        marks: 10,
        text: "If two non-zero vectors u and v satisfy the condition u · v = 0, what is the geometric relationship between them?",
        options: ["Parallel", "Orthogonal (Perpendicular)", "Collinear", "Opposite directions"],
        correct_answer: "Orthogonal (Perpendicular)",
        explanation: "The dot product of two vectors is ||u|| * ||v|| * cos(theta). It is zero when theta = 90 degrees, i.e., orthogonal."
      },
      {
        id: "Q5",
        type: "numerical",
        subject: "Basic Statistics & Probability",
        marks: 10,
        text: "A fair 6-sided die is rolled once. What is the probability (expressed in percentage, e.g. 50) of obtaining an even number?",
        correct_answer: "50",
        explanation: "Even outcomes: {2, 4, 6}. Total outcomes: 6. Probability = 3/6 = 0.50 = 50%."
      },
      {
        id: "Q6",
        type: "mcq",
        subject: "Basic Statistics & Probability",
        marks: 10,
        text: "Which statistical measure represents the middle value in an ordered set of observations?",
        options: ["Mean", "Median", "Mode", "Variance"],
        correct_answer: "Median",
        explanation: "The median divides the ordered distribution into two equal halves."
      },
      {
        id: "Q7",
        type: "code_snippet",
        subject: "Computational Thinking",
        marks: 10,
        text: "What is the output of the recursive call `mystery(3)`?\n\n```python\ndef mystery(n):\n    if n <= 1:\n        return 1\n    return n + mystery(n - 1)\n```",
        options: ["3", "5", "6", "7"],
        correct_answer: "6",
        explanation: "mystery(3) = 3 + mystery(2) = 3 + 2 + mystery(1) = 3 + 2 + 1 = 6."
      },
      {
        id: "Q8",
        type: "numerical",
        subject: "Basic Statistics & Probability",
        marks: 10,
        text: "Given data points [2, 4, 4, 4, 5, 5, 7, 9], what is the mean of this sample?",
        correct_answer: "5",
        explanation: "Sum = 2+4+4+4+5+5+7+9 = 40. Count = 8. Mean = 40 / 8 = 5."
      },
      {
        id: "Q9",
        type: "mcq",
        subject: "English for Academic Communication",
        marks: 10,
        text: "Select the sentence that conforms to standard formal academic English grammar:",
        options: [
          "The data shows that there is discrepancies in the experimental readings.",
          "The data show that there are discrepancies in the experimental readings.",
          "The datas show that discrepancies was observed.",
          "There is data showing that discrepancies were not no problem."
        ],
        correct_answer: "The data show that there are discrepancies in the experimental readings.",
        explanation: "In academic English, 'data' is historically plural taking 'show' and plural verb 'are'."
      },
      {
        id: "Q10",
        type: "mcq",
        subject: "English for Academic Communication",
        marks: 10,
        text: "Choose the word most appropriate to replace 'put off' in an academic report: 'The committee decided to put off the inspection.'",
        options: ["Postpone", "Cancel", "Accelerate", "Denounce"],
        correct_answer: "Postpone",
        explanation: "'Postpone' is the formal academic register equivalent of the phrasal verb 'put off'."
      }
    ]
  }
];

// Initial exam scores seed
const SEED_EXAM_SCORES = [
  {
    id: 1,
    quiz_id: 1,
    roll: "24BS0002",
    student_name: "Priyanka Sen",
    student_email: "priyanka.s@kgp.ac.in",
    category: "OBC-NCL",
    total_questions: 10,
    correct_answers: 9,
    score_obtained: 90,
    percentage: 90.0,
    pass_status: "Passed",
    cutoff_cleared: true,
    responses: { Q1: "O(N)", Q2: "18", Q3: "14", Q4: "Orthogonal (Perpendicular)", Q5: "50", Q6: "Median", Q7: "6", Q8: "5", Q9: "The data show that there are discrepancies in the experimental readings.", Q10: "Cancel" },
    auto_evaluated_at: new Date('2026-09-24T18:00:00Z').toISOString()
  },
  {
    id: 2,
    quiz_id: 1,
    roll: "24BS0005",
    student_name: "Rajesh Kumar Mandal",
    student_email: "rajesh.km@kgp.ac.in",
    category: "SC",
    total_questions: 10,
    correct_answers: 8,
    score_obtained: 80,
    percentage: 80.0,
    pass_status: "Passed",
    cutoff_cleared: true,
    responses: {},
    auto_evaluated_at: new Date('2026-09-24T19:30:00Z').toISOString()
  }
];

// -------------------------------------------------------------
// 4. SEED EMPLOYEE WORKFLOW & TASKS ("Kaj o Progress")
// -------------------------------------------------------------
const SEED_EMPLOYEE_TASKS = [
  {
    id: 1,
    task_code: "TSK-KGP-2026-01",
    title: "Document Scrutiny: Batch 1 WBJEE & JEE Rank Certificates",
    description: "Verify uploaded caste/category certificates and state JEE rank card proofs for applicants 24BS0001 through 24BS0040.",
    assigned_to: 3, // Dr. Gautam Sen Sarma
    assigned_by: 1, // Superadmin
    priority: "Urgent",
    status: "In Progress",
    progress_percentage: 65,
    start_date: "2026-09-20",
    due_date: "2026-10-06",
    completed_at: null,
    overdue_flag: false,
    created_at: new Date('2026-09-20T09:00:00Z').toISOString(),
    updated_at: new Date('2026-09-26T14:15:00Z').toISOString()
  },
  {
    id: 2,
    task_code: "TSK-KGP-2026-02",
    title: "SBI MOPS Daily Fee Reconciliation & UTR Audit",
    description: "Match 108 online fee transactions against the daily State Bank of India clearing report. Flag unverified UTR entries.",
    assigned_to: 3, // Dr. Gautam Sen Sarma
    assigned_by: 2, // Dr. S.K. Mukherjee
    priority: "High",
    status: "Under Review",
    progress_percentage: 90,
    start_date: "2026-09-22",
    due_date: "2026-10-02",
    completed_at: null,
    overdue_flag: true, // Overdue because current date is Oct 4, 2026 and due was Oct 2
    created_at: new Date('2026-09-22T10:00:00Z').toISOString(),
    updated_at: new Date('2026-10-03T16:00:00Z').toISOString()
  },
  {
    id: 3,
    task_code: "TSK-KGP-2026-03",
    title: "Qualifier CBT Question Bank Moderation & Key Validation",
    description: "Review Python code evaluation questions and numerical problems for the BS Qualifier Test Engine.",
    assigned_to: 4, // Subhadip Banerjee
    assigned_by: 1, // Superadmin
    priority: "High",
    status: "Completed",
    progress_percentage: 100,
    start_date: "2026-09-15",
    due_date: "2026-09-25",
    completed_at: new Date('2026-09-24T18:00:00Z').toISOString(),
    overdue_flag: false,
    created_at: new Date('2026-09-15T09:00:00Z').toISOString(),
    updated_at: new Date('2026-09-24T18:00:00Z').toISOString()
  },
  {
    id: 4,
    task_code: "TSK-KGP-2026-04",
    title: "LMS Week 3 Video Uploads & PDF Compilations",
    description: "Coordinate with audio-visual studio to upload high-definition lectures for Mathematics and Statistics qualifier modules.",
    assigned_to: 4, // Subhadip Banerjee
    assigned_by: 2, // Officer
    priority: "Medium",
    status: "In Progress",
    progress_percentage: 40,
    start_date: "2026-09-28",
    due_date: "2026-10-08",
    completed_at: null,
    overdue_flag: false,
    created_at: new Date('2026-09-28T11:00:00Z').toISOString(),
    updated_at: new Date('2026-10-02T12:00:00Z').toISOString()
  },
  {
    id: 5,
    task_code: "TSK-KGP-2026-05",
    title: "Category Cutoff Shortlisting & Merit List Preparation",
    description: "Generate category-wise cutoff clearance reports (General, OBC-NCL, SC, ST, EWS) based on qualifier scores.",
    assigned_to: 3, // Dr. Gautam Sen Sarma
    assigned_by: 1, // Superadmin
    priority: "Urgent",
    status: "Not Started",
    progress_percentage: 0,
    start_date: "2026-10-03",
    due_date: "2026-10-07",
    completed_at: null,
    overdue_flag: false,
    created_at: new Date('2026-10-03T09:00:00Z').toISOString(),
    updated_at: new Date('2026-10-03T09:00:00Z').toISOString()
  }
];

const SEED_EMPLOYEE_WORKLOGS = [
  {
    id: 1,
    task_id: 1,
    employee_id: 3,
    progress_before: 0,
    progress_after: 35,
    log_note: "Initiated scrutiny for first 15 candidates. Verified 12 WBJEE rank cards successfully.",
    hours_spent: 3.5,
    logged_at: new Date('2026-09-21T16:30:00Z').toISOString()
  },
  {
    id: 2,
    task_id: 1,
    employee_id: 3,
    progress_before: 35,
    progress_after: 65,
    log_note: "Completed OBC-NCL certificate verification for 14 candidates. Raised 2 queries on expired income certificates.",
    hours_spent: 4.0,
    logged_at: new Date('2026-09-25T17:15:00Z').toISOString()
  },
  {
    id: 3,
    task_id: 2,
    employee_id: 3,
    progress_before: 0,
    progress_after: 90,
    log_note: "Reconciled 97 transactions against SBI clearing file. Flagged 3 UTR mismatches for review.",
    hours_spent: 6.0,
    logged_at: new Date('2026-10-02T19:00:00Z').toISOString()
  },
  {
    id: 4,
    task_id: 3,
    employee_id: 4,
    progress_before: 50,
    progress_after: 100,
    log_note: "Verified all 10 questions and auto-grading solutions with subject faculty. CBT question bank is ready.",
    hours_spent: 5.5,
    logged_at: new Date('2026-09-24T17:45:00Z').toISOString()
  },
  {
    id: 5,
    task_id: 4,
    employee_id: 4,
    progress_before: 0,
    progress_after: 40,
    log_note: "Uploaded Week 2 and Week 3 drafts. Formatted PDF handouts and verified practice links.",
    hours_spent: 3.0,
    logged_at: new Date('2026-10-02T11:30:00Z').toISOString()
  }
];

// -------------------------------------------------------------
// 5. SEED CUTOFF THRESHOLDS
// -------------------------------------------------------------
const SEED_CUTOFFS = [
  { id: 1, term: "Qualifier 2026", category: "General", min_score_percentage: 50.0, is_active: true },
  { id: 2, term: "Qualifier 2026", category: "OBC-NCL", min_score_percentage: 45.0, is_active: true },
  { id: 3, term: "Qualifier 2026", category: "EWS", min_score_percentage: 45.0, is_active: true },
  { id: 4, term: "Qualifier 2026", category: "SC", min_score_percentage: 40.0, is_active: true },
  { id: 5, term: "Qualifier 2026", category: "ST", min_score_percentage: 35.0, is_active: true },
  { id: 6, term: "Qualifier 2026", category: "PwD", min_score_percentage: 35.0, is_active: true }
];

// -------------------------------------------------------------
// 6. SEED STUDENTS & APPLICATIONS
// -------------------------------------------------------------
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
      mode: "UPI (Google Pay)",
      bank: "Axis Bank",
      date: "2026-09-23 05:25 PM",
      status: "Verified",
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "axis_receipt_375.pdf"
    }
  }
];

// =============================================================
// DATABASE ADAPTER CLASS
// Seamlessly operates with PostgreSQL when available, or
// fallback JSON/Memory engine with full transactional safety.
// =============================================================
class DatabaseAdapter {
  constructor() {
    this.isPg = false;
    this.pgPool = null;
    this.memoryDb = {
      users: [...SEED_USERS],
      students: [...SEED_APPLICATIONS],
      courses: [...SEED_COURSES],
      lms_content: [...SEED_LMS_CONTENT],
      student_progress: [...SEED_STUDENT_PROGRESS],
      exam_quizzes: [...SEED_EXAM_QUIZZES],
      exam_scores: [...SEED_EXAM_SCORES],
      employee_tasks: [...SEED_EMPLOYEE_TASKS],
      employee_worklogs: [...SEED_EMPLOYEE_WORKLOGS],
      cutoffs: [...SEED_CUTOFFS],
      audit_logs: [
        {
          id: 1,
          action: 'SYSTEM_INIT',
          entity_type: 'DATABASE',
          entity_id: 'SYSTEM',
          actor_role: 'System',
          actor_name: 'IIT Kharagpur BS Server',
          details: 'Initial database created with complete enterprise ERP, LMS, Exam & Workflow modules.',
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  async init() {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      try {
        console.log(`Connecting to PostgreSQL database at ${dbUrl.split('@')[1] || 'db'}...`);
        this.pgPool = new pg.Pool({
          connectionString: dbUrl,
          connectionTimeoutMillis: 3000,
          idleTimeoutMillis: 10000
        });

        // Test connection
        const client = await this.pgPool.connect();
        client.release();
        this.isPg = true;
        console.log('✅ PostgreSQL connected successfully. Initializing enterprise schema...');
        await this.initPgTables();
        return;
      } catch (err) {
        console.warn(`⚠️ PostgreSQL connection not available (${err.message}). Using local JSON/Memory database engine.`);
        this.isPg = false;
      }
    } else {
      console.log('ℹ️ No DATABASE_URL specified. Initializing local JSON/Memory persistence engine.');
      this.isPg = false;
    }

    // Load from local JSON if available
    this.loadLocal();
  }

  loadLocal() {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      try {
        const raw = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.memoryDb = {
          users: parsed.users || [...SEED_USERS],
          students: parsed.students || [...SEED_APPLICATIONS],
          courses: parsed.courses || [...SEED_COURSES],
          lms_content: parsed.lms_content || [...SEED_LMS_CONTENT],
          student_progress: parsed.student_progress || [...SEED_STUDENT_PROGRESS],
          exam_quizzes: parsed.exam_quizzes || [...SEED_EXAM_QUIZZES],
          exam_scores: parsed.exam_scores || [...SEED_EXAM_SCORES],
          employee_tasks: parsed.employee_tasks || [...SEED_EMPLOYEE_TASKS],
          employee_worklogs: parsed.employee_worklogs || [...SEED_EMPLOYEE_WORKLOGS],
          cutoffs: parsed.cutoffs || [...SEED_CUTOFFS],
          audit_logs: parsed.audit_logs || []
        };
        console.log(`📁 Loaded local database: ${this.memoryDb.students.length} applications, ${this.memoryDb.users.length} users, ${this.memoryDb.employee_tasks.length} tasks.`);
      } catch (err) {
        console.error('Error reading local db file, resetting to initial seed:', err);
        this.saveLocal();
      }
    } else {
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

      // Seed Users if empty
      const userCountRes = await this.pgPool.query('SELECT COUNT(*) FROM users');
      if (parseInt(userCountRes.rows[0].count, 10) === 0) {
        for (const user of SEED_USERS) {
          await this.pgPool.query(
            `INSERT INTO users (emp_id, username, email, password_hash, role, name, designation, department, phone, is_temp_password, status, roll_number)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             ON CONFLICT (username) DO NOTHING`,
            [user.emp_id, user.username, user.email, user.password_hash, user.role, user.name, user.designation, user.department, user.phone, user.is_temp_password, user.status, user.roll_number]
          );
        }
      }

      // Seed Courses if empty
      const courseCountRes = await this.pgPool.query('SELECT COUNT(*) FROM courses');
      if (parseInt(courseCountRes.rows[0].count, 10) === 0) {
        for (const c of SEED_COURSES) {
          await this.pgPool.query(
            `INSERT INTO courses (id, code, title, category, description, credits, weekly_duration_hours, semester_term, instructor_name, instructor_designation, thumbnail_url, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             ON CONFLICT (id) DO NOTHING`,
            [c.id, c.code, c.title, c.category, c.description, c.credits, c.weekly_duration_hours, c.semester_term, c.instructor_name, c.instructor_designation, c.thumbnail_url, c.is_active]
          );
        }
      }

      // Seed LMS Content if empty
      const lmsCountRes = await this.pgPool.query('SELECT COUNT(*) FROM lms_content');
      if (parseInt(lmsCountRes.rows[0].count, 10) === 0) {
        for (const m of SEED_LMS_CONTENT) {
          await this.pgPool.query(
            `INSERT INTO lms_content (id, course_id, week_number, module_title, content_type, resource_url, duration_minutes, file_size_mb, order_index, description)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             ON CONFLICT (id) DO NOTHING`,
            [m.id, m.course_id, m.week_number, m.module_title, m.content_type, m.resource_url, m.duration_minutes, m.file_size_mb, m.order_index, m.description]
          );
        }
      }

      // Seed Cutoffs if empty
      const cutoffCountRes = await this.pgPool.query('SELECT COUNT(*) FROM cutoffs');
      if (parseInt(cutoffCountRes.rows[0].count, 10) === 0) {
        for (const co of SEED_CUTOFFS) {
          await this.pgPool.query(
            `INSERT INTO cutoffs (term, category, min_score_percentage, is_active)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (category) DO NOTHING`,
            [co.term, co.category, co.min_score_percentage, co.is_active]
          );
        }
      }
    }
  }

  // =============================================================
  // AUDIT LOGS
  // =============================================================
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
          (l.entity_id && String(l.entity_id).toLowerCase().includes(query))
        );
      }
      const total = logs.length;
      const offset = (page - 1) * limit;
      const paginated = logs.slice(offset, offset + limit);
      return {
        logs: paginated,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit) || 1
      };
    }
  }

  // =============================================================
  // USERS & EMPLOYEES CRUD (RBAC)
  // =============================================================
  async getUserByUsername(username) {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM users WHERE LOWER(username) = LOWER($1)', [username]);
      return res.rows[0] || null;
    }
    return this.memoryDb.users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
  }

  async getUserById(id) {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM users WHERE id = $1', [id]);
      return res.rows[0] || null;
    }
    return this.memoryDb.users.find(u => u.id === parseInt(id, 10)) || null;
  }

  async getAllUsers() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT id, emp_id, username, email, role, name, designation, department, phone, status, roll_number, created_at FROM users ORDER BY id ASC');
      return res.rows;
    }
    return this.memoryDb.users.map(({ password_hash, ...u }) => u);
  }

  async getAllEmployees() {
    if (this.isPg) {
      const res = await this.pgPool.query(`SELECT id, emp_id, username, email, role, name, designation, department, phone, status, created_at FROM users WHERE role IN ('employee', 'admin') ORDER BY name ASC`);
      return res.rows;
    }
    return this.memoryDb.users
      .filter(u => u.role === 'employee' || u.role === 'admin')
      .map(({ password_hash, ...u }) => u);
  }

  async createEmployeeAccount({ emp_id, username, email, password, role = 'employee', name, designation, department, phone }, creatorUser) {
    const existing = await this.getUserByUsername(username);
    if (existing) {
      throw new Error(`Username '${username}' is already in use.`);
    }

    const password_hash = bcrypt.hashSync(password, 10);
    const newEmpId = emp_id || `EMP-KGP-${String(Math.floor(100 + Math.random() * 900))}`;

    let createdRecord = null;
    if (this.isPg) {
      const res = await this.pgPool.query(
        `INSERT INTO users (emp_id, username, email, password_hash, role, name, designation, department, phone, is_temp_password, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE, 'Active')
         RETURNING id, emp_id, username, email, role, name, designation, department, phone, status, created_at`,
        [newEmpId, username, email, password_hash, role, name, designation || 'Staff Member', department || 'Academic Operations', phone || '']
      );
      createdRecord = res.rows[0];
    } else {
      const newId = this.memoryDb.users.length ? Math.max(...this.memoryDb.users.map(u => u.id)) + 1 : 1;
      createdRecord = {
        id: newId,
        emp_id: newEmpId,
        username,
        email,
        password_hash,
        role,
        name,
        designation: designation || 'Staff Member',
        department: department || 'Academic Operations',
        phone: phone || '',
        is_temp_password: true,
        status: 'Active',
        roll_number: null,
        created_at: new Date().toISOString()
      };
      this.memoryDb.users.push(createdRecord);
      this.saveLocal();
    }

    await this.logAudit({
      action: 'CREATE_EMPLOYEE_ACCOUNT',
      entityType: 'USER_ACCOUNT',
      entityId: createdRecord.emp_id,
      actorRole: creatorUser.role,
      actorName: creatorUser.name,
      details: `Created new staff/employee account for ${name} (${username}) with role: ${role}, Emp ID: ${newEmpId}.`
    });

    const { password_hash: _, ...safeUser } = createdRecord;
    return safeUser;
  }

  // =============================================================
  // EMPLOYEE TASKS & WORKFLOW MANAGEMENT ("Kaj o Progress")
  // =============================================================
  async getEmployeeTasks({ employeeId = null, status = 'ALL', priority = 'ALL', q = '' } = {}) {
    const now = new Date();

    if (this.isPg) {
      let query = `
        SELECT t.*, 
               u.name as employee_name, u.emp_id, u.email as employee_email, u.designation as employee_designation,
               a.name as assigned_by_name
        FROM employee_tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        LEFT JOIN users a ON t.assigned_by = a.id
        WHERE 1=1
      `;
      const params = [];
      if (employeeId) {
        params.push(parseInt(employeeId, 10));
        query += ` AND t.assigned_to = $${params.length}`;
      }
      if (status && status !== 'ALL') {
        params.push(status);
        query += ` AND t.status = $${params.length}`;
      }
      if (priority && priority !== 'ALL') {
        params.push(priority);
        query += ` AND t.priority = $${params.length}`;
      }
      if (q) {
        params.push(`%${q}%`);
        query += ` AND (t.title ILIKE $${params.length} OR t.task_code ILIKE $${params.length} OR t.description ILIKE $${params.length})`;
      }
      query += ' ORDER BY CASE t.priority WHEN \'Urgent\' THEN 1 WHEN \'High\' THEN 2 WHEN \'Medium\' THEN 3 ELSE 4 END, t.due_date ASC';

      const res = await this.pgPool.query(query, params);
      return res.rows.map(task => ({
        ...task,
        overdue_flag: task.status !== 'Completed' && new Date(task.due_date) < now
      }));
    } else {
      let tasks = [...this.memoryDb.employee_tasks];

      if (employeeId) {
        tasks = tasks.filter(t => t.assigned_to === parseInt(employeeId, 10));
      }
      if (status && status !== 'ALL') {
        tasks = tasks.filter(t => t.status === status);
      }
      if (priority && priority !== 'ALL') {
        tasks = tasks.filter(t => t.priority === priority);
      }
      if (q) {
        const queryStr = q.toLowerCase();
        tasks = tasks.filter(t => 
          (t.title && t.title.toLowerCase().includes(queryStr)) ||
          (t.task_code && t.task_code.toLowerCase().includes(queryStr)) ||
          (t.description && t.description.toLowerCase().includes(queryStr))
        );
      }

      // Enrich with employee & assigner details
      return tasks.map(task => {
        const emp = this.memoryDb.users.find(u => u.id === task.assigned_to);
        const assigner = this.memoryDb.users.find(u => u.id === task.assigned_by);
        const isOverdue = task.status !== 'Completed' && new Date(task.due_date) < now;
        return {
          ...task,
          overdue_flag: isOverdue,
          employee_name: emp ? emp.name : 'Unknown Employee',
          emp_id: emp ? emp.emp_id : 'N/A',
          employee_email: emp ? emp.email : '',
          employee_designation: emp ? emp.designation : '',
          assigned_by_name: assigner ? assigner.name : 'Admin Directorate'
        };
      }).sort((a, b) => {
        const prioOrder = { Urgent: 1, High: 2, Medium: 3, Low: 4 };
        return (prioOrder[a.priority] || 5) - (prioOrder[b.priority] || 5);
      });
    }
  }

  async getTaskById(taskId) {
    const tasks = await this.getEmployeeTasks();
    return tasks.find(t => t.id === parseInt(taskId, 10)) || null;
  }

  async createEmployeeTask({ title, description, assigned_to, priority = 'Medium', start_date, due_date }, assignerUser) {
    const task_code = `TSK-KGP-${Date.now().toString().slice(-6)}`;
    const taskRecord = {
      task_code,
      title,
      description: description || '',
      assigned_to: parseInt(assigned_to, 10),
      assigned_by: assignerUser.id,
      priority,
      status: 'Not Started',
      progress_percentage: 0,
      start_date: start_date || new Date().toISOString().split('T')[0],
      due_date,
      completed_at: null,
      overdue_flag: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    let createdId = null;
    if (this.isPg) {
      const res = await this.pgPool.query(
        `INSERT INTO employee_tasks (task_code, title, description, assigned_to, assigned_by, priority, status, progress_percentage, start_date, due_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id`,
        [taskRecord.task_code, taskRecord.title, taskRecord.description, taskRecord.assigned_to, taskRecord.assigned_by, taskRecord.priority, taskRecord.status, taskRecord.progress_percentage, taskRecord.start_date, taskRecord.due_date]
      );
      createdId = res.rows[0].id;
    } else {
      createdId = this.memoryDb.employee_tasks.length ? Math.max(...this.memoryDb.employee_tasks.map(t => t.id)) + 1 : 1;
      this.memoryDb.employee_tasks.push({ ...taskRecord, id: createdId });
      this.saveLocal();
    }

    await this.logAudit({
      action: 'ASSIGN_EMPLOYEE_TASK',
      entityType: 'TASK',
      entityId: task_code,
      actorRole: assignerUser.role,
      actorName: assignerUser.name,
      details: `Assigned task '${title}' [${task_code}] to Employee ID: ${assigned_to}. Priority: ${priority}, Due: ${due_date}.`
    });

    return await this.getTaskById(createdId);
  }

  async updateTaskProgress(taskId, { progress_percentage, status, log_note, hours_spent = 1.0 }, actorUser) {
    const task = await this.getTaskById(taskId);
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found.`);
    }

    const prevProgress = task.progress_percentage;
    const newProgress = Math.min(100, Math.max(0, parseInt(progress_percentage, 10)));
    let newStatus = status || task.status;

    if (newProgress === 100) {
      newStatus = 'Completed';
    } else if (newProgress > 0 && newStatus === 'Not Started') {
      newStatus = 'In Progress';
    }

    const completed_at = newStatus === 'Completed' ? new Date().toISOString() : null;
    const now = new Date();
    const isOverdue = newStatus !== 'Completed' && new Date(task.due_date) < now;

    if (this.isPg) {
      await this.pgPool.query(
        `UPDATE employee_tasks
         SET progress_percentage = $1, status = $2, completed_at = $3, overdue_flag = $4, updated_at = NOW()
         WHERE id = $5`,
        [newProgress, newStatus, completed_at, isOverdue, taskId]
      );

      // Add worklog if note is provided
      if (log_note) {
        await this.pgPool.query(
          `INSERT INTO employee_worklogs (task_id, employee_id, progress_before, progress_after, log_note, hours_spent)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [taskId, actorUser.id, prevProgress, newProgress, log_note, hours_spent]
        );
      }
    } else {
      const idx = this.memoryDb.employee_tasks.findIndex(t => t.id === parseInt(taskId, 10));
      if (idx >= 0) {
        this.memoryDb.employee_tasks[idx] = {
          ...this.memoryDb.employee_tasks[idx],
          progress_percentage: newProgress,
          status: newStatus,
          completed_at,
          overdue_flag: isOverdue,
          updated_at: new Date().toISOString()
        };
      }

      if (log_note) {
        const logId = this.memoryDb.employee_worklogs.length ? Math.max(...this.memoryDb.employee_worklogs.map(l => l.id)) + 1 : 1;
        this.memoryDb.employee_worklogs.unshift({
          id: logId,
          task_id: parseInt(taskId, 10),
          employee_id: actorUser.id,
          progress_before: prevProgress,
          progress_after: newProgress,
          log_note,
          hours_spent: parseFloat(hours_spent) || 1.0,
          logged_at: new Date().toISOString()
        });
      }
      this.saveLocal();
    }

    await this.logAudit({
      action: 'UPDATE_TASK_PROGRESS',
      entityType: 'TASK',
      entityId: task.task_code,
      actorRole: actorUser.role,
      actorName: actorUser.name,
      details: `Updated task progress from ${prevProgress}% to ${newProgress}% (${newStatus}). Note: "${log_note || 'Progress update slider adjustment'}"`
    });

    return await this.getTaskById(taskId);
  }

  async getTaskWorklogs(taskId) {
    if (this.isPg) {
      const res = await this.pgPool.query(
        `SELECT w.*, u.name as employee_name, u.emp_id
         FROM employee_worklogs w
         JOIN users u ON w.employee_id = u.id
         WHERE w.task_id = $1
         ORDER BY w.logged_at DESC`,
        [taskId]
      );
      return res.rows;
    } else {
      return this.memoryDb.employee_worklogs
        .filter(w => w.task_id === parseInt(taskId, 10))
        .map(w => {
          const emp = this.memoryDb.users.find(u => u.id === w.employee_id);
          return {
            ...w,
            employee_name: emp ? emp.name : 'Employee',
            emp_id: emp ? emp.emp_id : 'N/A'
          };
        })
        .sort((a, b) => new Date(b.logged_at) - new Date(a.logged_at));
    }
  }

  async getEmployeeWorkloadSummary() {
    const employees = await this.getAllEmployees();
    const tasks = await this.getEmployeeTasks();

    const summary = employees.map(emp => {
      const empTasks = tasks.filter(t => t.assigned_to === emp.id);
      const total = empTasks.length;
      const completed = empTasks.filter(t => t.status === 'Completed').length;
      const inProgress = empTasks.filter(t => t.status === 'In Progress' || t.status === 'Under Review').length;
      const notStarted = empTasks.filter(t => t.status === 'Not Started').length;
      const overdue = empTasks.filter(t => t.overdue_flag).length;
      const avgProgress = total > 0 ? Math.round(empTasks.reduce((acc, t) => acc + (t.progress_percentage || 0), 0) / total) : 0;

      return {
        employee: emp,
        total_tasks: total,
        completed_tasks: completed,
        active_tasks: inProgress,
        pending_tasks: notStarted,
        overdue_tasks: overdue,
        average_progress: avgProgress
      };
    });

    return summary;
  }

  // =============================================================
  // LMS & COURSE PROGRESS TRACKING
  // =============================================================
  async getCourses() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM courses WHERE is_active = TRUE ORDER BY id ASC');
      return res.rows;
    }
    return this.memoryDb.courses.filter(c => c.is_active);
  }

  async getCourseWithModules(courseId, roll = null) {
    let course = null;
    let modules = [];

    if (this.isPg) {
      const cRes = await this.pgPool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
      course = cRes.rows[0] || null;
      if (course) {
        const mRes = await this.pgPool.query('SELECT * FROM lms_content WHERE course_id = $1 ORDER BY week_number ASC, order_index ASC', [courseId]);
        modules = mRes.rows;
      }
    } else {
      course = this.memoryDb.courses.find(c => c.id === parseInt(courseId, 10)) || null;
      if (course) {
        modules = this.memoryDb.lms_content.filter(m => m.course_id === parseInt(courseId, 10))
          .sort((a, b) => a.week_number - b.week_number || a.order_index - b.order_index);
      }
    }

    if (!course) return null;

    // Attach student progress if roll is provided
    let progressMap = {};
    if (roll) {
      const progress = await this.getStudentCourseProgress(roll, courseId);
      progress.forEach(p => {
        progressMap[p.module_id] = p;
      });
    }

    const enrichedModules = modules.map(m => ({
      ...m,
      studentProgress: progressMap[m.id] || {
        video_progress_percentage: 0,
        is_completed: false,
        practice_attempts: 0
      }
    }));

    return {
      ...course,
      modules: enrichedModules
    };
  }

  async getStudentCourseProgress(roll, courseId = null) {
    if (this.isPg) {
      let query = 'SELECT * FROM student_course_progress WHERE roll = $1';
      const params = [roll];
      if (courseId) {
        query += ' AND course_id = $2';
        params.push(courseId);
      }
      const res = await this.pgPool.query(query, params);
      return res.rows;
    } else {
      let progress = this.memoryDb.student_progress.filter(p => p.roll === roll);
      if (courseId) {
        progress = progress.filter(p => p.course_id === parseInt(courseId, 10));
      }
      return progress;
    }
  }

  async updateStudentModuleProgress({ roll, courseId, moduleId, video_progress_percentage, practice_increment = false }) {
    const videoProgress = Math.min(100, Math.max(0, parseInt(video_progress_percentage ?? 0, 10)));
    const isCompleted = videoProgress >= 90;

    if (this.isPg) {
      await this.pgPool.query(
        `INSERT INTO student_course_progress (roll, course_id, module_id, video_progress_percentage, is_completed, practice_attempts, last_accessed_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
         ON CONFLICT (roll, course_id, module_id) DO UPDATE SET
         video_progress_percentage = GREATEST(student_course_progress.video_progress_percentage, EXCLUDED.video_progress_percentage),
         is_completed = (EXCLUDED.is_completed OR student_course_progress.is_completed),
         practice_attempts = student_course_progress.practice_attempts + (CASE WHEN $7 THEN 1 ELSE 0 END),
         last_accessed_at = NOW(),
         updated_at = NOW()`,
        [roll, courseId, moduleId, videoProgress, isCompleted, practice_increment ? 1 : 0, practice_increment]
      );
    } else {
      const idx = this.memoryDb.student_progress.findIndex(
        p => p.roll === roll && p.course_id === parseInt(courseId, 10) && p.module_id === parseInt(moduleId, 10)
      );
      if (idx >= 0) {
        const cur = this.memoryDb.student_progress[idx];
        const newPct = Math.max(cur.video_progress_percentage || 0, videoProgress);
        this.memoryDb.student_progress[idx] = {
          ...cur,
          video_progress_percentage: newPct,
          is_completed: cur.is_completed || newPct >= 90,
          practice_attempts: (cur.practice_attempts || 0) + (practice_increment ? 1 : 0),
          last_accessed_at: new Date().toISOString()
        };
      } else {
        this.memoryDb.student_progress.push({
          id: this.memoryDb.student_progress.length + 1,
          roll,
          course_id: parseInt(courseId, 10),
          module_id: parseInt(moduleId, 10),
          video_progress_percentage: videoProgress,
          is_completed: isCompleted,
          practice_attempts: practice_increment ? 1 : 0,
          last_accessed_at: new Date().toISOString()
        });
      }
      this.saveLocal();
    }

    return { roll, courseId, moduleId, video_progress_percentage: videoProgress, is_completed: isCompleted };
  }

  // =============================================================
  // QUALIFIER ASSESSMENT & AUTO-EVALUATION ENGINE
  // =============================================================
  async getExamQuizByCode(quizCode) {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM exam_quizzes WHERE quiz_code = $1', [quizCode]);
      return res.rows[0] || null;
    }
    return this.memoryDb.exam_quizzes.find(q => q.quiz_code === quizCode) || null;
  }

  async getAllExamQuizzes() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM exam_quizzes ORDER BY id ASC');
      return res.rows;
    }
    return this.memoryDb.exam_quizzes;
  }

  async autoEvaluateExamSubmission({ quizCode, roll, studentName, studentEmail, category = 'General', responses }) {
    const quiz = await this.getExamQuizByCode(quizCode);
    if (!quiz) {
      throw new Error(`Qualifier Exam with code '${quizCode}' not found.`);
    }

    const cutoffs = await this.getCutoffs();
    const catCutoff = cutoffs.find(c => c.category === category) || { min_score_percentage: 50.0 };

    // Auto-grading pipeline comparing student responses against official question keys
    let totalQuestions = quiz.questions.length;
    let correctAnswers = 0;
    let scoreObtained = 0;
    const questionGradingDetails = [];

    for (const q of quiz.questions) {
      const studentAns = responses[q.id];
      let isCorrect = false;

      if (studentAns !== undefined && studentAns !== null) {
        if (q.type === 'numerical') {
          // Normalize string & numeric values
          isCorrect = String(studentAns).trim() === String(q.correct_answer).trim();
        } else {
          isCorrect = String(studentAns).trim().toLowerCase() === String(q.correct_answer).trim().toLowerCase();
        }
      }

      if (isCorrect) {
        correctAnswers++;
        scoreObtained += (q.marks || 10);
      }

      questionGradingDetails.push({
        questionId: q.id,
        subject: q.subject,
        type: q.type,
        studentAnswer: studentAns || 'Unanswered',
        correctAnswer: q.correct_answer,
        isCorrect,
        marksAwarded: isCorrect ? (q.marks || 10) : 0,
        explanation: q.explanation
      });
    }

    const totalMarks = quiz.total_marks || (totalQuestions * 10);
    const percentage = totalMarks > 0 ? parseFloat(((scoreObtained / totalMarks) * 100).toFixed(2)) : 0;
    const passStatus = percentage >= quiz.pass_percentage ? 'Passed' : 'Failed';
    const cutoffCleared = percentage >= catCutoff.min_score_percentage;

    const evaluationResult = {
      quiz_id: quiz.id,
      quiz_code: quiz.quiz_code,
      roll,
      student_name: studentName,
      student_email: studentEmail,
      category,
      total_questions: totalQuestions,
      correct_answers: correctAnswers,
      score_obtained: scoreObtained,
      total_marks: totalMarks,
      percentage,
      pass_status: passStatus,
      category_cutoff_required: catCutoff.min_score_percentage,
      cutoff_cleared: cutoffCleared,
      responses,
      grading_breakdown: questionGradingDetails,
      auto_evaluated_at: new Date().toISOString()
    };

    // Save to Database
    if (this.isPg) {
      await this.pgPool.query(
        `INSERT INTO exam_scores (quiz_id, roll, student_name, student_email, category, total_questions, correct_answers, score_obtained, percentage, pass_status, cutoff_cleared, responses, auto_evaluated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
         ON CONFLICT (quiz_id, roll) DO UPDATE SET
         correct_answers = EXCLUDED.correct_answers,
         score_obtained = EXCLUDED.score_obtained,
         percentage = EXCLUDED.percentage,
         pass_status = EXCLUDED.pass_status,
         cutoff_cleared = EXCLUDED.cutoff_cleared,
         responses = EXCLUDED.responses,
         auto_evaluated_at = NOW()`,
        [quiz.id, roll, studentName, studentEmail, category, totalQuestions, correctAnswers, scoreObtained, percentage, passStatus, cutoffCleared, JSON.stringify(responses)]
      );
    } else {
      const idx = this.memoryDb.exam_scores.findIndex(s => s.quiz_id === quiz.id && s.roll === roll);
      if (idx >= 0) {
        this.memoryDb.exam_scores[idx] = {
          ...this.memoryDb.exam_scores[idx],
          ...evaluationResult
        };
      } else {
        this.memoryDb.exam_scores.push({
          id: this.memoryDb.exam_scores.length + 1,
          ...evaluationResult
        });
      }
      this.saveLocal();
    }

    await this.logAudit({
      action: 'EXAM_AUTO_EVALUATION',
      entityType: 'EXAM_SUBMISSION',
      entityId: `${quizCode}_${roll}`,
      actorRole: 'System Evaluator',
      actorName: 'CBT Auto-Grader Service',
      details: `Candidate ${studentName} (${roll}) evaluated for ${quizCode}. Score: ${scoreObtained}/${totalMarks} (${percentage}%). Result: ${passStatus}. Category Cutoff (${category}: ${catCutoff.min_score_percentage}%): ${cutoffCleared ? 'CLEARED' : 'NOT CLEARED'}.`
    });

    return evaluationResult;
  }

  async getExamScores({ quizId = null, roll = null, category = 'ALL', cutoffCleared = 'ALL' } = {}) {
    if (this.isPg) {
      let query = 'SELECT * FROM exam_scores WHERE 1=1';
      const params = [];
      if (quizId) {
        params.push(quizId);
        query += ` AND quiz_id = $${params.length}`;
      }
      if (roll) {
        params.push(roll);
        query += ` AND roll = $${params.length}`;
      }
      if (category && category !== 'ALL') {
        params.push(category);
        query += ` AND category = $${params.length}`;
      }
      if (cutoffCleared !== 'ALL') {
        params.push(cutoffCleared === 'true' || cutoffCleared === true);
        query += ` AND cutoff_cleared = $${params.length}`;
      }
      query += ' ORDER BY score_obtained DESC';
      const res = await this.pgPool.query(query, params);
      return res.rows;
    } else {
      let scores = [...this.memoryDb.exam_scores];
      if (quizId) scores = scores.filter(s => s.quiz_id === parseInt(quizId, 10));
      if (roll) scores = scores.filter(s => s.roll === roll);
      if (category && category !== 'ALL') scores = scores.filter(s => s.category === category);
      if (cutoffCleared !== 'ALL') {
        const flag = cutoffCleared === 'true' || cutoffCleared === true;
        scores = scores.filter(s => s.cutoff_cleared === flag);
      }
      return scores.sort((a, b) => b.score_obtained - a.score_obtained);
    }
  }

  // =============================================================
  // CUTOFF MANAGEMENT & SHORTLISTING
  // =============================================================
  async getCutoffs() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM cutoffs ORDER BY min_score_percentage DESC');
      return res.rows;
    }
    return this.memoryDb.cutoffs;
  }

  async updateCutoff(category, minScorePercentage, updaterUser) {
    const val = parseFloat(minScorePercentage);
    if (isNaN(val) || val < 0 || val > 100) {
      throw new Error('Cutoff percentage must be between 0 and 100.');
    }

    if (this.isPg) {
      await this.pgPool.query(
        `UPDATE cutoffs SET min_score_percentage = $1, updated_by = $2, updated_at = NOW() WHERE category = $3`,
        [val, updaterUser.id, category]
      );
      // Re-evaluate cutoff_cleared in exam_scores
      await this.pgPool.query(
        `UPDATE exam_scores SET cutoff_cleared = (percentage >= $1) WHERE category = $2`,
        [val, category]
      );
    } else {
      const co = this.memoryDb.cutoffs.find(c => c.category === category);
      if (co) {
        co.min_score_percentage = val;
        co.updated_at = new Date().toISOString();
      }
      // Re-evaluate in memory
      this.memoryDb.exam_scores.forEach(s => {
        if (s.category === category) {
          s.cutoff_cleared = s.percentage >= val;
        }
      });
      this.saveLocal();
    }

    await this.logAudit({
      action: 'UPDATE_CATEGORY_CUTOFF',
      entityType: 'CUTOFF_POLICY',
      entityId: category,
      actorRole: updaterUser.role,
      actorName: updaterUser.name,
      details: `Updated qualifier cutoff threshold for category '${category}' to ${val}%. Re-evaluated candidate shortlists.`
    });

    return await this.getCutoffs();
  }

  async getShortlistedCandidates() {
    const scores = await this.getExamScores({ cutoffCleared: true });
    return scores;
  }

  // =============================================================
  // STUDENTS & APPLICATIONS CRUD
  // =============================================================
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
      let orderCol = 'created_at';
      if (sortBy === 'name') orderCol = 'name';
      if (sortBy === 'roll') orderCol = 'roll';
      if (sortBy === 'status') orderCol = 'status';

      const orderSql = `ORDER BY ${orderCol} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
      const query = `SELECT * FROM students ${whereSql} ${orderSql} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);

      const res = await this.pgPool.query(query, params);
      return {
        students: res.rows.map(this.mapPgStudentToDto),
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit) || 1,
        limit: parseInt(limit, 10)
      };
    } else {
      let list = [...this.memoryDb.students];

      if (q) {
        const queryStr = q.toLowerCase();
        list = list.filter(s => 
          (s.name && s.name.toLowerCase().includes(queryStr)) ||
          (s.roll && s.roll.toLowerCase().includes(queryStr)) ||
          (s.email && s.email.toLowerCase().includes(queryStr)) ||
          (s.id && s.id.toLowerCase().includes(queryStr))
        );
      }

      if (status && status !== 'ALL') {
        list = list.filter(s => s.status === status);
      }

      if (level && level !== 'ALL') {
        list = list.filter(s => s.level === level);
      }

      list.sort((a, b) => {
        let valA = a[sortBy] || '';
        let valB = b[sortBy] || '';
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

  async getStudentByRoll(roll) {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT * FROM students WHERE roll = $1 OR id = $1', [roll]);
      return res.rows[0] ? this.mapPgStudentToDto(res.rows[0]) : null;
    }
    return this.memoryDb.students.find(s => s.roll === roll || s.id === roll) || null;
  }

  mapPgStudentToDto(row) {
    return {
      id: row.id,
      roll: row.roll,
      name: row.name,
      email: row.email,
      phone: row.phone,
      level: row.level,
      pathway: row.pathway,
      category: row.category,
      incomeTier: row.income_tier,
      status: row.status,
      rejectionReason: row.rejection_reason || '',
      submissionDate: row.submission_date,
      examCity: row.exam_city,
      docs: typeof row.docs === 'string' ? JSON.parse(row.docs) : (row.docs || {}),
      payment: typeof row.payment === 'string' ? JSON.parse(row.payment) : (row.payment || {})
    };
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
        `INSERT INTO students (id, roll, name, email, phone, category, city)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (roll) DO UPDATE SET
         name = EXCLUDED.name, email = EXCLUDED.email, phone = EXCLUDED.phone, category = EXCLUDED.category`,
        [student.id, student.roll, student.name, student.email, student.phone || '', student.category || 'General', student.examCity || 'Kharagpur']
      );

      await this.pgPool.query(
        `INSERT INTO applications (id, roll, student_id, name, email, phone, level, pathway, category, income_tier, status, rejection_reason, submission_date, exam_city, docs)
         VALUES ($1, $2, $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (id) DO UPDATE SET
         status = EXCLUDED.status, rejection_reason = EXCLUDED.rejection_reason, docs = EXCLUDED.docs`,
        [
          student.id, student.roll, student.name, student.email, student.phone || '',
          student.level || 'Foundation Level', student.pathway || 'Qualifier CBT',
          student.category || 'General', student.incomeTier || 'Standard',
          student.status, student.rejectionReason || '', student.submissionDate,
          student.examCity || 'Kharagpur', JSON.stringify(student.docs || {})
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
      details: `New student registration: ${student.name} (${student.roll}) for ${student.level}.`
    });

    return student;
  }

  async updateVerification(roll, newStatus, reason = '', actor = 'Admissions Officer') {
    if (this.isPg) {
      await this.pgPool.query(
        `UPDATE applications SET status = $1, rejection_reason = $2, updated_at = NOW() WHERE roll = $3 OR id = $3`,
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
      // In PG, update fee_transactions and applications
      await this.pgPool.query(
        `UPDATE fee_transactions SET status = $1, bank_status = $2, query_remarks = $3, updated_at = NOW() WHERE roll = $4`,
        [paymentStatus, bankStatus, queryRemarks, roll]
      );
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

  async deleteStudent(roll, actor = 'Super Administrator') {
    if (this.isPg) {
      await this.pgPool.query('DELETE FROM students WHERE roll = $1 OR id = $1', [roll]);
    } else {
      const idx = this.memoryDb.students.findIndex(s => s.roll === roll || s.id === roll);
      if (idx >= 0) {
        this.memoryDb.students.splice(idx, 1);
        this.saveLocal();
      }
    }

    await this.logAudit({
      action: 'DELETE_STUDENT_APPLICATION',
      entityType: 'STUDENT',
      entityId: roll,
      actorRole: 'Admin',
      actorName: actor,
      details: `Permanently expunged student application record ${roll} from database.`
    });

    return { success: true, roll };
  }

  async getTotalCount() {
    if (this.isPg) {
      const res = await this.pgPool.query('SELECT COUNT(*) FROM students');
      return parseInt(res.rows[0].count, 10);
    }
    return this.memoryDb.students.length;
  }

  // =============================================================
  // VISITOR LEADS & DROPDOWN INQUIRIES
  // =============================================================
  async saveVisitorLead(leadData) {
    const {
      fullName,
      email,
      mobileNumber,
      userType,
      institution,
      targetDropdown = '',
      sessionId = '',
      ipAddress = '',
      userAgent = ''
    } = leadData;

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const cleanName = String(fullName || '').trim();
    const cleanPhone = String(mobileNumber || '').trim();
    const cleanType = String(userType || 'Student').trim();
    const cleanInst = String(institution || '').trim();

    if (this.isPg) {
      // Check existing lead by email to prevent duplicate explosion
      const checkRes = await this.pgPool.query(
        'SELECT id FROM visitor_leads WHERE LOWER(email) = $1 LIMIT 1',
        [normalizedEmail]
      );

      let savedRecord;
      if (checkRes.rows.length > 0) {
        const updateRes = await this.pgPool.query(
          `UPDATE visitor_leads 
           SET full_name = $1, mobile_number = $2, user_type = $3, institution = $4, target_dropdown = $5, session_id = $6, ip_address = $7, user_agent = $8, updated_at = NOW()
           WHERE LOWER(email) = $9
           RETURNING *`,
          [cleanName, cleanPhone, cleanType, cleanInst, targetDropdown, sessionId, ipAddress, userAgent, normalizedEmail]
        );
        savedRecord = updateRes.rows[0];
      } else {
        const insertRes = await this.pgPool.query(
          `INSERT INTO visitor_leads (full_name, email, mobile_number, user_type, institution, target_dropdown, session_id, ip_address, user_agent, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
           RETURNING *`,
          [cleanName, normalizedEmail, cleanPhone, cleanType, cleanInst, targetDropdown, sessionId, ipAddress, userAgent]
        );
        savedRecord = insertRes.rows[0];
      }

      await this.logAudit({
        action: 'VISITOR_LEAD_SUBMISSION',
        entityType: 'LEAD',
        entityId: normalizedEmail,
        actorRole: cleanType,
        actorName: cleanName,
        details: `Visitor information captured before dropdown [${targetDropdown}]. Institution: ${cleanInst}, Phone: ${cleanPhone}.`
      });

      return savedRecord;
    } else {
      if (!this.memoryDb.visitor_leads) {
        this.memoryDb.visitor_leads = [];
      }

      const existingIndex = this.memoryDb.visitor_leads.findIndex(
        l => l.email && l.email.toLowerCase() === normalizedEmail
      );

      const now = new Date().toISOString();
      let record;

      if (existingIndex >= 0) {
        this.memoryDb.visitor_leads[existingIndex] = {
          ...this.memoryDb.visitor_leads[existingIndex],
          full_name: cleanName,
          mobile_number: cleanPhone,
          user_type: cleanType,
          institution: cleanInst,
          target_dropdown: targetDropdown,
          session_id: sessionId,
          ip_address: ipAddress,
          user_agent: userAgent,
          updated_at: now
        };
        record = this.memoryDb.visitor_leads[existingIndex];
      } else {
        record = {
          id: this.memoryDb.visitor_leads.length + 1,
          full_name: cleanName,
          email: normalizedEmail,
          mobile_number: cleanPhone,
          user_type: cleanType,
          institution: cleanInst,
          target_dropdown: targetDropdown,
          session_id: sessionId,
          ip_address: ipAddress,
          user_agent: userAgent,
          created_at: now,
          updated_at: now
        };
        this.memoryDb.visitor_leads.push(record);
      }

      this.saveLocal();

      await this.logAudit({
        action: 'VISITOR_LEAD_SUBMISSION',
        entityType: 'LEAD',
        entityId: normalizedEmail,
        actorRole: cleanType,
        actorName: cleanName,
        details: `Visitor information captured before dropdown [${targetDropdown}]. Institution: ${cleanInst}, Phone: ${cleanPhone}.`
      });

      return record;
    }
  }

  async getVisitorLeads() {
    if (this.isPg) {
      const res = await this.pgPool.query(
        'SELECT * FROM visitor_leads ORDER BY created_at DESC'
      );
      return res.rows;
    }
    return (this.memoryDb.visitor_leads || []).slice().reverse();
  }
}

export const db = new DatabaseAdapter();
