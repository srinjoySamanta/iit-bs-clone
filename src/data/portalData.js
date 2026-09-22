// Comprehensive content and configuration for IIT Kharagpur BS Programme Portal

export const IIT_KGP_INFO = {
  name: "Indian Institute of Technology Kharagpur",
  bengaliName: "ভারতীয় প্রযুক্তিবিদ্যা প্রতিষ্ঠান খড়গপুর",
  hindiName: "भारतीय प्रौद्योगिकी संस्थान खड़गपुर",
  motto: "योगः कर्मसु कौशलम् (Excellence in Action is Yoga)",
  shortName: "IIT KGP",
  programName: "Bachelor of Science (BS) in Data Science & Artificial Intelligence",
  programSubtitle: "A 4-Year Flagship Undergraduate Degree with Flexible Multi-Exit Pathways",
  established: 1951,
  nirfRank: "NIRF Top Institute of National Importance",
  campusArea: "2,100 Acres (Largest IIT Campus)",
  helpline: "+91 (03222) 282000 / 282022",
  email: "bs-admissions@iitkgp.ac.in",
  address: "Indian Institute of Technology Kharagpur, Kharagpur, Paschim Medinipur, West Bengal - 721302, India"
};

export const ANNOUNCEMENT_TICKER = [
  "🚨 Admissions Open for Qualifier Batch 2026! Last Date to Apply: 30 October 2026",
  "⭐ Direct Admission Pathway open for WBJEE, JEE Advanced Qualifiers & Tripura JEE rank holders",
  "🎓 Up to 75% Fee Waiver for eligible students with family income < ₹1 LPA",
  "📍 In-Person Invigilated Exam Centers across 100+ cities in West Bengal and Pan-India"
];

export const STATS = [
  { label: "Active Enrolled Learners", value: "32,500+", desc: "From all 28 states & 14 countries" },
  { label: "Exam Cities Worldwide", value: "115+", desc: "Invigilated in-person centers" },
  { label: "Top Hiring Partners", value: "480+", desc: "Google, Microsoft, TCS, Amazon & more" },
  { label: "Fee Scholarships Given", value: "₹24 Cr+", desc: "Up to 75% government & alumni aid" }
];

export const LEVELS_DATA = [
  {
    id: "foundation",
    name: "Foundation Level",
    credits: 32,
    duration: "8 - 12 Months",
    exitAward: "Foundation Certificate in Programming & Data Science",
    badge: "Level 1",
    color: "from-blue-600 to-indigo-700",
    description: "Builds rigorous mathematical foundations, computational thinking, and foundational Python programming for beginners from any background.",
    courses: [
      { code: "BS101", title: "Mathematics for Data Science I", credits: 4, type: "Core" },
      { code: "BS102", title: "Statistics for Data Science I", credits: 4, type: "Core" },
      { code: "BS103", title: "Computational Thinking & Logic", credits: 4, type: "Core" },
      { code: "BS104", title: "Programming in Python", credits: 4, type: "Core" },
      { code: "BS105", title: "English for Professional Communication", credits: 4, type: "Skill" },
      { code: "BS106", title: "Mathematics for Data Science II", credits: 4, type: "Core" },
      { code: "BS107", title: "Statistics for Data Science II", credits: 4, type: "Core" },
      { code: "BS108", title: "English II & Technical Writing", credits: 4, type: "Skill" }
    ]
  },
  {
    id: "diploma",
    name: "Diploma Level",
    credits: 54,
    duration: "1 - 2 Years",
    exitAward: "Diploma in Programming and/or Diploma in Data Science",
    badge: "Level 2",
    color: "from-emerald-600 to-teal-700",
    description: "Two specialized tracks: Diploma in Programming (full-stack web apps, database systems, algorithms) and Diploma in Data Science (machine learning, deep learning, business analytics).",
    courses: [
      { code: "DP201", title: "Database Management Systems (DBMS)", credits: 4, type: "Diploma Programming" },
      { code: "DP202", title: "Programming, Data Structures & Algorithms using Python (PDSA)", credits: 4, type: "Diploma Programming" },
      { code: "DP203", title: "Modern Application Development I (Frontend & Backend)", credits: 4, type: "Diploma Programming" },
      { code: "DP204", title: "Modern Application Development II (DevOps & Distributed)", credits: 4, type: "Diploma Programming" },
      { code: "DP205", title: "App Development Project", credits: 3, type: "Hands-on Project" },
      { code: "DD206", title: "Machine Learning Foundations", credits: 4, type: "Diploma Data Science" },
      { code: "DD207", title: "Machine Learning Techniques", credits: 4, type: "Diploma Data Science" },
      { code: "DD208", title: "Machine Learning Practice & Model Ops", credits: 4, type: "Diploma Data Science" },
      { code: "DD209", title: "Business Data Management & Analytics", credits: 4, type: "Diploma Data Science" },
      { code: "DD210", title: "Data Science Capstone Project", credits: 3, type: "Hands-on Project" }
    ]
  },
  {
    id: "bsc",
    name: "B.Sc. Degree Level",
    credits: 114,
    duration: "3 Years",
    exitAward: "B.Sc. Degree in Data Science & Applications (IIT Kharagpur)",
    badge: "Level 3",
    color: "from-amber-600 to-orange-700",
    description: "Undergraduate bachelor degree level enabling eligibility for all competitive exams (UPSC, GATE, CAT) and masters admissions in India and abroad.",
    courses: [
      { code: "BC301", title: "Software Engineering & Architecture", credits: 4, type: "Degree Core" },
      { code: "BC302", title: "AI Search & Knowledge Representation", credits: 4, type: "Degree Core" },
      { code: "BC303", title: "Deep Learning for Computer Vision", credits: 4, type: "Elective" },
      { code: "BC304", title: "Natural Language Processing (NLP)", credits: 4, type: "Elective" },
      { code: "BC305", title: "Financial Engineering & Market Analytics", credits: 4, type: "Elective" },
      { code: "BC306", title: "Cloud Computing & Big Data Engineering", credits: 4, type: "Elective" }
    ]
  },
  {
    id: "bs",
    name: "BS Degree Level (4-Year)",
    credits: 142,
    duration: "4 Years",
    exitAward: "Bachelor of Science (BS) in Data Science & AI with Official Alumni Status",
    badge: "Level 4 (Flagship)",
    color: "from-kgp-crimson to-rose-900",
    description: "Premier 4-year undergraduate honours degree with advanced research specialization, 8-month industry internship / research thesis, and full IIT Kharagpur Alumni Association lifetime membership.",
    courses: [
      { code: "BS401", title: "Generative AI & Large Language Models (LLMs)", credits: 4, type: "Advanced Core" },
      { code: "BS402", title: "Reinforcement Learning & Autonomous Agents", credits: 4, type: "Advanced Core" },
      { code: "BS403", title: "Quantum Computing & Information Theory", credits: 4, type: "Specialization" },
      { code: "BS404", title: "Cybersecurity & Data Privacy Law", credits: 4, type: "Specialization" },
      { code: "BS405", title: "8-Month Research Apprenticeship / Industry Internship", credits: 12, type: "Capstone Thesis" }
    ]
  }
];

export const DIRECT_ADMISSION_ELIGIBILITY = [
  {
    title: "WBJEE Rank Holders",
    badge: "State Pioneer Pathway",
    criteria: "Candidates with a valid rank in the West Bengal Joint Entrance Examination (WBJEE) are granted direct admission into the Foundation Level without writing the Qualifier Exam.",
    icon: "Award",
    color: "border-blue-500 bg-blue-50/50"
  },
  {
    title: "IIT JEE Advanced Qualifiers",
    badge: "National Merit Pathway",
    criteria: "Anyone who has qualified to write or secured qualification rank in JEE Advanced in the current or previous two academic years is directly admitted into the Foundation Level.",
    icon: "Flame",
    color: "border-amber-500 bg-amber-50/50"
  },
  {
    title: "Tripura JEE Rank Holders",
    badge: "North-East Special Quota",
    criteria: "Candidates with a valid score and merit ranking in Tripura JEE (TJEE) are directly eligible for admission into the BS Programme Foundation Level.",
    icon: "Compass",
    color: "border-emerald-500 bg-emerald-50/50"
  },
  {
    title: "Regular Qualifier Process",
    badge: "Universal Access (No Quota Limits)",
    criteria: "Open to anyone who has completed Class 10/12 (any stream - Arts, Commerce, Science). Undergo 4 weeks of preparatory courses and score >= 40% in in-person Qualifier Exam to join.",
    icon: "CheckCircle2",
    color: "border-purple-500 bg-purple-50/50"
  }
];

export const FAQS = [
  {
    id: 1,
    category: "Eligibility",
    qEn: "What is the age limit or educational stream requirement for the BS Programme at IIT Kharagpur?",
    qBn: "আইআইটি খড়গপুর বিএস প্রোগ্রামের জন্য বয়সের কোনো ঊর্ধ্বসীমা বা শিক্ষাগত শাখার বাধ্যবাধকতা আছে কি?",
    aEn: "There is NO upper age limit. Anyone who has completed Class 12th (or equivalent) from any stream (Science, Commerce, Arts, Vocational) with Mathematics and English in Class 10th is eligible to apply. Working professionals and college students can pursue this concurrently.",
    aBn: "কোনো বয়সের ঊর্ধ্বসীমা নেই। যে কোনো শাখা (বিজ্ঞান, বাণিজ্য, কলা) থেকে দ্বাদশ শ্রেণি উত্তীর্ণ প্রার্থীরা আবেদন করতে পারেন, শর্ত হলো দশম শ্রেণিতে গণিত ও ইংরেজি থাকতে হবে। চাকুরিজীবী ও কলেজ শিক্ষার্থীরাও এই ডিগ্রি করতে পারেন।"
  },
  {
    id: 2,
    category: "Admissions",
    qEn: "How does the Direct Admission via WBJEE, JEE Advanced, or Tripura JEE work?",
    qBn: "WBJEE, JEE Advanced অথবা Tripura JEE-র মাধ্যমে সরাসরি ভর্তি প্রক্রিয়া কীভাবে কাজ করে?",
    aEn: "Candidates possessing a valid rank in WBJEE, JEE Advanced, or Tripura JEE can directly bypass the 4-week Qualifier course and examination. Upon document and rank card verification, you will receive direct entry into the Foundation Level.",
    aBn: "যাঁদের WBJEE, JEE Advanced অথবা Tripura JEE-তে বৈধ র‍্যাঙ্ক রয়েছে, তাঁদের ৪ সপ্তাহের কোয়ালিফায়ার পরীক্ষা দিতে হবে না। র‍্যাঙ্ক কার্ড ও নথি যাচাইকরণের পরেই সরাসরি ফাউন্ডেশন স্তরে ভর্তির সুযোগ মিলবে।"
  },
  {
    id: 3,
    category: "Fees & Waiver",
    qEn: "What fee waivers or scholarships are provided to students?",
    qBn: "শিক্ষার্থীদের জন্য ফি মকুব বা স্কলারশিপের কী ধরনের সুবিধা রয়েছে?",
    aEn: "IIT Kharagpur provides up to 75% fee waiver for students with annual family income less than ₹1 Lakh, and 50% fee waiver for income between ₹1 Lakh and ₹5 Lakhs. Additional CSR and state government scholarships apply to SC, ST, and PwD learners.",
    aBn: "যাঁদের বার্ষিক পারিবারিক আয় ১ লাখ টাকার নিচে, তাঁরা পাবেন ৭৫% ফি মকুব। ১ থেকে ৫ লাখ টাকা বার্ষিক আয়ের ক্ষেত্রে মিলবে ৫০% ফি মকুব। এছাড়াও SC/ST/PwD প্রার্থীদের জন্য বিশেষ সহায়তা রয়েছে।"
  },
  {
    id: 4,
    category: "Exams & Centers",
    qEn: "Are exams conducted online or offline in person?",
    qBn: "পরীক্ষাগুলি কি অনলাইনে হয় নাকি নির্দিষ্ট পরীক্ষাকেন্দ্রে সশরীরে গিয়ে দিতে হয়?",
    aEn: "Weekly lectures and assignments are completely online, allowing learners to study at their own pace. However, all quizzes, term-end exams, and the Qualifier Exam are conducted in-person under strict invigilation across 100+ cities across West Bengal and India.",
    aBn: "সাপ্তাহিক ক্লাস ও অ্যাসাইনমেন্ট সম্পূর্ণ অনলাইন হয়। তবে মূল কোয়ালিফায়ার ও টার্ম-এন্ড পরীক্ষাগুলি পশ্চিমবঙ্গ সহ সমগ্র ভারতের ১০০টিরও বেশি কেন্দ্রে সশরীরে ইনভিজিলেটেড পদ্ধতিতে অনুষ্ঠিত হয়।"
  },
  {
    id: 5,
    category: "Degree & Alumni",
    qEn: "Do BS Degree graduates receive official IIT Kharagpur Alumni status?",
    qBn: "বিএস ডিগ্রি সম্পূর্ণ করার পর শিক্ষার্থীরা কি আইআইটি খড়গপুরের অফিশিয়াল অ্যালামনাই মর্যাদা পাবেন?",
    aEn: "Yes! Students who graduate with the 4-Year BS Degree receive full and formal IIT Kharagpur Alumni status, complete with an official Alumni ID card, access to the Global Alumni Network, library access, and convocation participation.",
    aBn: "হ্যাঁ! ৪ বছরের বিএস ডিগ্রি সফলভাবে সম্পন্ন করা শিক্ষার্থীরা আইআইটি খড়গপুরের অফিশিয়াল অ্যালামনাই মর্যাদা, অ্যালামনাই কার্ড এবং গ্লোবাল নেটওয়ার্কের আজীবন সদস্যপদ লাভ করেন।"
  },
  {
    id: 6,
    category: "Campus Immersion",
    qEn: "What is Campus Immersion and Library Access for BS students?",
    qBn: "ক্যাম্পাস ইমার্শন ও লাইব্রেরি ব্যবহারের সুবিধা কেমন?",
    aEn: "BS students are invited to the iconic 2,100-acre Kharagpur campus for an annual student festival, hackathons, and a structured 1-month campus immersion workshop with full access to the Central Library, research labs, and faculty interactions.",
    aBn: "বিএস শিক্ষার্থীরা ঐতিহাসিক ২১০০ একরের খড়গপুর ক্যাম্পাসে বাৎসরিক টেকনো-কালচারাল উৎসব, হ্যাকাথন এবং ১ মাসের ক্যাম্পাস ইমার্শন প্রোগ্রামে অংশ নিতে পারেন এবং সেন্ট্রাল লাইব্রেরি ও ল্যাব ব্যবহারের সুযোগ পান।"
  }
];

export const DIRECTORS_MESSAGE = {
  directorName: "Prof. V. K. Tewari",
  directorTitle: "Director, Indian Institute of Technology Kharagpur",
  quote: "Democratizing world-class education without boundaries, upholding the historic heritage of India's first IIT.",
  body: `Indian Institute of Technology Kharagpur, the mother institution of the IIT system founded in 1951 on the historic grounds of Hijli Detention Camp, has pioneered national nation-building for over seven decades.

With the launch of our Bachelor of Science (BS) Programme in Data Science & Artificial Intelligence, we take a quantum leap towards fulfilling the National Education Policy (NEP 2020) vision: providing equitable, uncompromising, and accessible quality education to every aspirational Indian youth.

Whether you enter through WBJEE, JEE Advanced, Tripura JEE, or our universal Qualifier process, you will be mentored by the same distinguished faculty, experience the same intellectual rigor, and become an integral part of the IIT Kharagpur legacy. I invite you to embark on this transformative journey.`
};

export const RECRUITERS = [
  "Google", "Microsoft", "Amazon", "Tata Consultancy Services", "Infosys",
  "Tiger Analytics", "Ford Motor Co.", "Goldman Sachs", "IBM Research",
  "Flipkart", "PwC", "Deloitte", "American Express", "Wipro", "Accenture"
];

export const SAMPLE_STUDENT = {
  name: "Arindam Banerjee",
  rollNo: "24BS0941",
  email: "arindam.b@iitkgp.ac.in",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  category: "General",
  income: "< 1 Lakh (75% Waiver Applied)",
  level: "Diploma in Programming & Data Science",
  creditsEarned: 58,
  cgpa: 9.14,
  qualifierStatus: "Passed (92.5%)",
  courses: [
    { code: "BS101", name: "Mathematics for Data Science I", score: 94, weekMarks: [95, 90, 96, 95], status: "Completed" },
    { code: "BS102", name: "Statistics for Data Science I", score: 91, weekMarks: [88, 92, 90, 94], status: "Completed" },
    { code: "BS103", name: "Computational Thinking", score: 89, weekMarks: [85, 90, 90, 91], status: "Completed" },
    { code: "BS104", name: "Programming in Python", score: 96, weekMarks: [98, 95, 94, 97], status: "Completed" }
  ]
};

export const SAMPLE_ALL_STUDENTS = [
  { roll: "24BS0001", name: "Subhashis Roy", email: "subho.roy@kgp.ac.in", app: "Enrolled", status: "Active", marks: 372, cut: "Pass", exam: "Appeared", level: "Foundation" },
  { roll: "24BS0002", name: "Priyanka Sen", email: "priyanka.s@kgp.ac.in", app: "Enrolled", status: "Active", marks: 384, cut: "Pass", exam: "Appeared", level: "Diploma" },
  { roll: "24BS0003", name: "Debojyoti Ghosh", email: "debo.g@kgp.ac.in", app: "Enrolled", status: "Active", marks: 345, cut: "Pass", exam: "Appeared", level: "Foundation" },
  { roll: "24BS0004", name: "Ananya Mukherjee", email: "ananya.m@kgp.ac.in", app: "Enrolled", status: "Active", marks: 391, cut: "Pass", exam: "Appeared", level: "B.Sc" },
  { roll: "24BS0005", name: "Rohit Sharma", email: "rohit.s@kgp.ac.in", app: "Enrolled", status: "Active", marks: 360, cut: "Pass", exam: "Appeared", level: "Foundation" }
];
