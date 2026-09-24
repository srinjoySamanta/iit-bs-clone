// Exact Block Diagram Data as specified for BS Programme IIT Kgp Portal

const P = {};
const I = (id, title, desc = "", linkType = "") => ({ id, title, desc, linkType });
const A = (id, title, items = [], note = "") => {
  P[id] = { id, title, items, note };
};

A("main", "Main", [
  I("website", "Website", "Main IIT Kharagpur BS Public Portal"),
  I("portal", "Portal", "Student & Admin Management System")
]);

A("website", "Website", [
  I("tagline", "Tagline", "Excellence in Digital Education - IIT Kharagpur"),
  I("intro", "Introduction", "Overview of BS Programme in Data Science & AI"),
  I("iit", "About IIT Kgp", "Estd 1951, First & Premier IIT of India"),
  I("course", "About the Course", "4-Year Flexible BS Degree Structure"),
  I("eligibility", "Eligibility", "WBJEE / JEE Adv / Tripura JEE / Qualifier", "Hyperlink"),
  I("structure", "Course Structure", "Foundation, Diploma, BSc & BS Levels", "Hyperlink"),
  I("fees", "Fees Structure", "Per-term modular fee with up to 75% waiver", "Hyperlink"),
  I("syllabus", "Syllabus", "Detailed 4-Year Curriculum", "Hyperlink"),
  I("academic", "Academic Aspects", "Online Lectures + Invigilated Offline Exams", "Hyperlink"),
  I("director", "Director's Message", "Visionary message from Director, IIT Kharagpur"),
  I("degree", "Sample Degree Certificate", "Official IIT Kharagpur Degree preview"),
  I("internship", "Internship & Placement", "Dedicated career placement cell & industry ecosystem"),
  I("campus", "Campus Immersion", "Annual Fest & 1-month campus experience at Kharagpur"),
  I("library", "Library Access", "Full Central Library digital & physical access"),
  I("alumni", "Alumni Status", "Official IIT KGP Alumni Association membership (Degree Level)"),
  I("faqs", "FAQs", "Bilingual Support: English & Bengali (বাংলা)"),
  I("contact", "Contact Details", "Helpline, Email & Kharagpur Campus Address"),
  I("howapply", "How to Apply", "Step-by-step application instructions", "Hyperlink"),
  I("portal", "Portal", "Student & Admin Login Gateway", "Hyperlink")
]);

A("contact", "Contact Details", [
  I("cmail", "Mail ID", "bs-admissions@iitkgp.ac.in"),
  I("cphone", "Ph No", "+91 (03222) 282000 / 282022"),
  I("caddress", "Address", "Indian Institute of Technology Kharagpur, Kharagpur, West Bengal - 721302")
]);

A("howapply", "How to Apply", [], "Hyperlink containing the complete set of application instructions and direct eligibility criteria.");

A("portal", "Portal", [
  I("student", "Student Login / Signup", "Learner Dashboard, Courses, Admit & Certificates"),
  I("admin", "Admin Login", "Faculty, Verification, Marks & Generation Console")
]);

A("student", "Student Login / Signup", [
  I("signup", "Sign Up", "New Applicant Profile Creation"),
  I("login", "Log In", "Existing Student Portal")
]);

A("signup", "Sign Up", [
  I("profile", "Profile Creation", "5-Stage Application Registration Wizard")
]);

A("profile", "Profile Creation", [
  I("general", "General Information", "Personal, Category, Address & Contacts"),
  I("education", "Education", "Class 10 / Higher & Direct Admission Eligibility"),
  I("photo", "Photo & Signature", "File format verification & Freeze"),
  I("declaration", "Declaration", "Applicant undertaking & terms"),
  I("submission", "Submission", "Fee payment, confirmation & profile pop-up")
]);

A("general", "General Information", [
  I("first", "First Name", "Candidate Given Name"),
  I("last", "Last Name", "Candidate Surname"),
  I("birthday", "Birthday", "dd-mm-yyyy; minimum 15 years as on date"),
  I("ageproof", "Age Proof", "Dropdown: Birth Certificate / Class 10 Admit"),
  I("ageupload", "Upload Document", "Scanned copy of proof"),
  I("address", "Address", "Permanent & Present Address with PIN"),
  I("mail", "Mail ID", "OTP verification; pop-up if OTP does not go"),
  I("phone", "Ph No", "Country ISD code + 10 digits + OTP verification"),
  I("category", "Category", "GEN / SC / ST / OBC / EWS"),
  I("catdoc", "Upload Document", "For SC / ST / OBC / EWS verification"),
  I("ph", "Physically Handicapped", "Yes / No declaration"),
  I("phdoc", "Upload Document", "For Physically Handicapped certificate"),
  I("nationality", "Nationality", "Indian / International (NRI/OCI/Foreign)"),
  I("profession", "Profession", "Student / Service / Business / Teacher"),
  I("gender", "Gender", "Male / Female / Other"),
  I("guardian", "Guardian Name", "Father / Mother / Legal Guardian"),
  I("relation", "Relation with Guardian", "Relationship details"),
  I("gcontact", "Guardian's Contact No", "Emergency 10-digit mobile number"),
  I("income", "Annual Family Income", "< 1 LPA / 1-5 LPA / > 5 LPA (Scholarship calculation)")
]);

A("education", "Education", [
  I("highest", "Highest Qualification", "Dropdown: Class 10 / Higher"),
  I("direct", "Direct Admission Eligibility for BS Degree Course", "Dropdown: WBJEE Rank / IIT JEE Advanced Qualifier / Tripura JEE"),
  I("rank", "Rank", "Score/Rank Card upload & Roll validation")
]);

A("highest", "Highest Qualification", [
  I("class10", "Class 10", "Secondary School Certificate"),
  I("higher", "Higher", "Class 12 / Diploma / Bachelor's / Master's")
]);

A("class10", "Class 10", [
  I("c10result", "Class 10 Result", "Board name & Passing year"),
  I("c10marks", "Marks Obtained", "Total score secured"),
  I("c10total", "Total Marks", "Maximum aggregate marks"),
  I("c10upload", "Upload Class 10 Result", "Marksheet PDF/Image")
]);

A("higher", "Higher", [
  I("hc10result", "Class 10 Result", "Secondary examination details"),
  I("hc10marks", "Marks Obtained", "Class 10 aggregate marks"),
  I("hc10total", "Total Marks", "Class 10 total marks"),
  I("hc10upload", "Upload Class 10 Result", "Class 10 marksheet upload"),
  I("degreeResult", "Highest Degree Result", "Higher Secondary / Bachelor's stream"),
  I("degreemarks", "Marks Obtained", "Secured marks/CGPA"),
  I("degreetotal", "Total Marks", "Maximum total marks"),
  I("degreeupload", "Upload Highest Degree Result / Certificate", "Certificate document upload")
]);

A("photo", "Photo & Signature", [
  I("format", "File Format", ".jpg and .png accepted"),
  I("size", "File Size", "Upper limit: 200KB for photo, 100KB for signature"),
  I("freeze", "Save & Freeze", "Lock photo & signature before final submission")
]);

A("declaration", "Declaration", [
  I("decl", "Declaration Option", "Confirmation of authentic information & institute adherence")
]);

A("submission", "Submission", [
  I("payment", "Payment", "Online gateway: UPI / Netbanking / Cards"),
  I("confirmation", "Confirmation Mail", "Automated application acknowledgment"),
  I("created", "Profile Created Pop-up", "Applicant ID generated successfully")
]);

A("confirmation", "Confirmation Mail", [
  I("applied", "Application Confirmation", "Mail confirming successful application & fee receipt"),
  I("verified", "After Verification", "Login ID + Password + Course Card issuance")
]);

A("login", "Log In", [
  I("dashboard", "Dashboard", "Learner statistics & Venn diagram progress"),
  I("applicationStatus", "Application Status", "Document verification & admission state"),
  I("pd", "Profile Details", "Candidate biodata & credentials"),
  I("payd", "Payment Details", "Term fees, transaction receipts & passbook"),
  I("sub1", "Subject 1 Course Links", "Mathematics for Data Science I"),
  I("sub2", "Subject 2 Course Links", "Statistics for Data Science I"),
  I("sub3", "Subject 3 Course Links", "Computational Thinking"),
  I("sub4", "Subject 4 Course Links", "Python Programming"),
  I("result", "Result", "Weekly assignments, final score & marksheet"),
  I("admit", "Admit Issue Permission", "Center allotment & proctor authorization"),
  I("download", "Download Admit", "In-person Qualifier / Term Exam Admit Card"),
  I("qualifier", "Qualifier Result", "Status: Passed / Failed"),
  I("retest", "Applying for Retest", "Next term qualifier repeat option"),
  I("certificates", "Download Certificates", "Digitally verifiable IIT KGP certificates")
]);

A("dashboard", "Dashboard", [
  I("courseVenn", "Course Follow-up", "Interactive Venn Diagram of completed vs active modules"),
  I("marksVenn", "Total Marks", "Venn Diagram representation of scoring distribution")
]);

A("certificates", "Download Certificates", [
  I("foundation", "Foundation Level", "Certificate in Programming & Data Science"),
  I("diploma", "Diploma Level", "Diploma in Programming / Data Science"),
  I("bsc", "B.Sc Level", "B.Sc. Degree in Data Science & Applications"),
  I("bs", "BS Level", "Bachelor of Science (BS) Degree - IIT Kharagpur")
]);

for (let n = 1; n <= 4; n++) {
  let s = "sub" + n;
  let subNames = [
    "",
    "Mathematics for Data Science I",
    "Statistics for Data Science I",
    "Computational Thinking",
    "Python Programming"
  ];
  A(s, `Subject ${n} Course Links (${subNames[n]})`, [
    I(s + "links", "Links", "Live lecture portals, video archives & reading materials"),
    I(s + "a1", "Assignment 1", "Week 1 graded submission"),
    I(s + "a2", "Assignment 2", "Week 2 graded submission"),
    I(s + "a3", "Assignment 3", "Week 3 graded submission"),
    I(s + "a4", "Assignment 4", "Week 4 graded submission")
  ]);
  for (let a = 1; a <= 4; a++) {
    A(s + "a" + a, `Subject ${n} - Assignment ${a}`, [
      I(s + "sol" + a, `Solution ${a}`, `Official step-by-step solution key for Assignment ${a}`),
      I(s + "qa" + a, `Queries & Answers`, `Discussion forum and TA answers for Assignment ${a}`)
    ]);
  }
}

A("result", "Result", [
  I("subjectsResult", "Subjects Result", "Detailed breakdown for Subject 1 to 4"),
  I("finalMarks", "Subject-wise Final Marks", "Summary table & Cut-off percentage"),
  I("qualifierMarksheet", "Qualifier Examination Marksheet", "Proctored exam score card")
]);

A("subjectsResult", "Subjects Result", [
  I("sr1", "Subject 1 Result", "Mathematics for Data Science"),
  I("sr2", "Subject 2 Result", "Statistics for Data Science"),
  I("sr3", "Subject 3 Result", "Computational Thinking"),
  I("sr4", "Subject 4 Result", "Python Programming")
]);

for (let n = 1; n <= 4; n++) {
  A("sr" + n, `Subject ${n} Result`, [
    I("a1m", "Assignment 1 Marks", "Score out of 100"),
    I("a2m", "Assignment 2 Marks", "Score out of 100"),
    I("a3m", "Assignment 3 Marks", "Score out of 100"),
    I("a4m", "Assignment 4 Marks", "Score out of 100"),
    I("total", "Total Marks", "Average score & qualifier eligibility")
  ]);
}

A("finalMarks", "Subject-wise Final Marks", [
  I("chart", "Final Marks Chart", "Subject 1–4 Marks / Total Marks / Cut-off Percentage Marks")
]);

A("qualifierMarksheet", "Qualifier Examination Marksheet", [
  I("qchart", "Qualifier Examination Chart", "No. of Attempts / Subject-wise Marks / Total Marks / Eligibility Calculation of the Degree Programme")
]);

A("qualifier", "Qualifier Result", [
  I("passed", "Passed", "Qualified for formal admission to Foundation level"),
  I("failed", "Failed", "Eligible for next term retest / remedial study")
]);

/* ADMIN PORTAL */
A("admin", "Admin Login", [
  I("studentProfile", "Student Profile", "Inspect & manage student records by Roll No"),
  I("allStudents", "All Students' Details", "Comprehensive student sheet & aggregate analytics"),
  I("employee", "Employee Details", "Course coordinators, TAs, & faculties"),
  I("mailing", "Common Mailing System", "Bulk announcement & broadcast emails"),
  I("notice", "Notice Board", "Publish official term notices & circulars"),
  I("exam", "Exam", "Hall ticket schedules, center master & proctoring"),
  I("courseFlow", "Course Flow", "Weekly upload schedules, student progress & doubt clearance"),
  I("generation", "Generation & Upload", "Batch Roll No, Passwords, Admit & Alumni Cards"),
  I("lastEditor", "Last Editor's Details", "Audit trail of administrative edits")
]);

A("studentProfile", "Student Profile", [
  I("rollInput", "Roll No.", "Lookup student by Roll / Application ID"),
  I("adminProfile", "Profile", "Biodata verification, tickets & administrative notes"),
  I("adminCourses", "Courses & Assignments", "Course enrollment, week-wise links & marks"),
  I("adminResult", "Result", "Grade sheet generation, cutoff calculations"),
  I("passbook", "Passbook", "Payment ledger & refund logs")
]);

A("adminProfile", "Profile", [
  I("biodata", "Biodata", "Edit / Verified / Rejected actions for each section"),
  I("ticket", "Ticket Generation", "Issue Admit, Alumni & Degree cards"),
  I("notes", "Notes", "Internal confidential remarks & flag reasons")
]);

A("biodata", "Biodata", [
  I("genInfo", "General Information", "Edit / Verified / Rejected"),
  I("eduEdit", "Education", "Edit / Verified / Rejected"),
  I("photoEdit", "Photo & Signature", "Edit / Verified / Rejected"),
  I("payEdit", "Payment Status", "Edit / Verified / Rejected"),
  I("loginPass", "Login Password", "Generate / Reset candidate password"),
  I("rollNoGen", "Roll No.", "Generate / Freeze permanent student Roll No")
]);

A("ticket", "Ticket Generation", [
  I("admitCard", "Admit Card", "Qualifier & Term exam hall ticket"),
  I("alumniCard", "Alumni Card", "Alumni card for Degree graduates"),
  I("bsDegreeAdmit", "BS Degree Admit Card", "Final Convocation & BS Degree hall pass")
]);

A("adminCourses", "Courses & Assignments", [
  I("as1", "Subject 1", "Mathematics"),
  I("as2", "Subject 2", "Statistics"),
  I("as3", "Subject 3", "Computational Thinking"),
  I("as4", "Subject 4", "Python Programming")
]);

for (let n = 1; n <= 4; n++) {
  A("as" + n, `Subject ${n}`, [
    I("wlinks" + n, "Week-wise Course Links", "Configure lecture URLs & PDF readings"),
    I("wassign" + n, "Week-wise Assignments", "Edit / Delete / Upload assignment papers"),
    I("wanswers" + n, "Week-wise Answers", "Upload / Delete / Edit official answer keys"),
    I("wmarks" + n, "Week-wise Marks", "Batch upload grading & CSV synchronization")
  ]);
}

A("adminResult", "Result", [
  I("resultSheet", "Result Sheet", "One sheet — Edit / Delete master grades")
]);

A("resultSheet", "Result Sheet", [
  I("weekly", "Subject-wise Weekly Assignment Marks", "Week 1 / Week 2 / Week 3 / Week 4"),
  I("totals", "Subject Totals", "Subjects 1–4 computed aggregates"),
  I("grand", "Total of 4 Subjects", "Overall percentage & standard deviation"),
  I("cutoff", "Cut-off Marks to Qualifier Exam", "Adjust qualification thresholds"),
  I("edit", "Edit", "Modify student score with audit reason"),
  I("delete", "Delete", "Purge invalid record")
]);

A("passbook", "Passbook", [
  I("history", "Payment History", "Transactions, bank reference & UTR tracking"),
  I("status", "Payment Status", "Confirmed / Pending / Refunded")
]);

A("allStudents", "All Students' Details", [
  I("studentSheet", "All Students' Details Sheet", "Master grid with multi-column filters"),
  I("allDash", "Dashboard", "Venn diagrams for attendance & progression")
]);

A("studentSheet", "All Students' Details Sheet", [
  I("name", "Name", "Student Full Name"),
  I("roll", "Roll No.", "Unique 8-digit institute roll number"),
  I("email", "Mail ID", "Registered email address"),
  I("app", "Application Status", "Draft / Submitted / Verified / Enrolled"),
  I("courseStatus", "Course Follow Status", "Active / Dropped / On-leave"),
  I("weeklyTotal", "Subject-wise Weekly Total Marks", "Continuous assessment score"),
  I("examCut", "Exam Cut-off Mark", "Target threshold met / missed"),
  I("examStatus", "Exam Status", "Registered / Appeared / Absent"),
  I("qmarksheet", "Qualifier Exam Marksheet", "Proctored score breakdown"),
  I("certLevel", "Certificate Level", "Foundation / Diploma / BSc / BS")
]);

A("allDash", "Dashboard", [
  I("attendance", "All Students' Attendance", "Venn Diagram of live vs async lecture attendance"),
  I("progress", "Course-wise Students' Progress", "Venn Diagram of assignment completion rates")
]);

A("courseFlow", "Course Flow", [
  I("uploadFlow", "Subject-wise Weekly Upload Flow", "Scheduled lecture releases"),
  I("progressCourse", "Students' Progress According to Course", "Cohort completion funnel"),
  I("doubt", "Doubt Clearance Details", "TA and Faculty doubt desk")
]);

A("doubt", "Doubt Clearance Details", [
  I("pending", "Pending Doubts", "Queued student questions"),
  I("clearance", "Doubt Clearance", "Resolved answers archive"),
  I("pendingCounter", "No. of Pending Doubts", "Live Counter: 14 queries"),
  I("solvedCounter", "No. of Solved Doubts", "Live Counter: 1,842 resolved")
]);

A("generation", "Generation & Upload", [
  I("gname", "Student Name", "Search candidate"),
  I("groll", "Roll No.", "Roll No assignment engine"),
  I("passGen", "Password Generation", "Auto-generate secure student credentials"),
  I("rollGen", "Roll No. Generation", "Batch sequential roll generation"),
  I("qualifierAdmit", "Upload Qualifier Exam Admit Card", "Bulk PDF hall ticket generation"),
  I("alumniGen", "Alumni Card", "Digital Alumni ID card with QR verification")
]);

A("employee", "Employee Details", [
  I("empList", "Faculty & TA Directory", "Professors in-charge, system admins and academic associates"),
  I("empRoles", "Role Allocation", "Assign grading rights and module coordinators")
]);

A("mailing", "Common Mailing System", [
  I("broadcast", "Broadcast Email", "Send mass circular to all enrolled candidates"),
  I("templates", "Notification Templates", "Admit card notification, fees reminder, exam schedule")
]);

A("notice", "Notice Board", [
  I("newNotice", "Publish Notice", "Add urgent notification with PDF attachment"),
  I("activeNotices", "Active Circulars", "Qualifier Exam Schedule 2026, Fee Waiver Circular")
]);

A("exam", "Exam", [
  I("centers", "Exam Centers Master", "100+ Centers across West Bengal & Pan-India"),
  I("slots", "Slot Scheduling", "Morning & Afternoon shift management")
]);

A("lastEditor", "Last Editor's Details", [
  I("auditLogs", "Activity Audit Logs", "Timestamp, User ID, IP Address & Modified Field"),
  I("revertAction", "Revert Changes", "Roll back unapproved modifications")
]);

export { P };
