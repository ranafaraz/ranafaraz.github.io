/**
 * Single source of truth for ALL site copy.
 * Edit text, projects, skills, and timeline here — components read from this file
 * and never hard-code content. Only verified, real facts belong here.
 */

export const site = {
  url: 'https://ranafaraz.github.io/',
  // CV download. File lives at /public/Rana_Faraz_Ahmed_CV.pdf — resolved
  // against Vite's BASE_URL so it works under any GitHub Pages base path.
  cvPath: `${import.meta.env.BASE_URL}Rana_Faraz_Ahmed_CV.pdf`,
  // Headshot at /public/profile.jpg
  photo: `${import.meta.env.BASE_URL}profile.jpg`,
  ogImage: `${import.meta.env.BASE_URL}og-image.png`,
};

export const identity = {
  name: 'Rana Faraz Ahmed',
  // Animated rotator in the hero
  roles: ['AI/ML Architect', 'RAG Engineer', 'Engineering Leader', 'CTO'],
  title: 'Head of AI & Engineering Leader · CTO · AI/ML Architect',
  oneLiner:
    'I build and lead the AI that ships — RAG assistants, recommender systems, and NLP/deep-learning personalization — on cloud-native, compliant infrastructure.',
  experienceYears: '11+',
  location: 'Remote',
  email: 'ranafarazahmed@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ranafarazahmed/',
  github: 'https://github.com/ranafaraz',
};

export const about = {
  // The differentiation hook.
  lead: 'A rare combination of hands-on AI/ML engineering, PMP-grade delivery leadership, and tech-law literacy.',
  body: [
    'I’m an AI and engineering leader with 11+ years building and shipping production systems. Today I’m CTO, VP of Engineering & AI/ML Architect at Electus Global Education Co., where I lead engineering and AI for Life Hub / Life Hub Infiniti AI — an adaptive AI EdTech + FinTech platform spanning personalized learning, career intelligence, micro-earning, and blockchain credentials.',
    'What makes me different is the intersection: I’m hands-on with AI/ML engineering, I run delivery at PMP grade, and I read the law (LLB, cyber/IP focus). The result is AI that is not only capable, but also defensible on data privacy, IP, and governance.',
  ],
  // Three pillars rendered as differentiator cards.
  pillars: [
    {
      title: 'AI/ML Engineering',
      desc: 'Hands-on with LLMs, RAG, recommender systems, NLP and deep learning — from prototype to production MLOps.',
      icon: 'brain',
    },
    {
      title: 'Delivery Leadership',
      desc: 'PMP-certified program leadership: shipping complex systems on time, on budget, with large cross-functional teams.',
      icon: 'rocket',
    },
    {
      title: 'Tech-Law Literacy',
      desc: 'LLB with cyber/IP focus — building AI that holds up on data privacy, IP, and governance (FERPA/COPPA/GDPR).',
      icon: 'scale',
    },
  ],
};

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 11, suffix: '+', label: 'Years of experience' },
  { value: 500, suffix: '+', label: 'People led on a program' },
  { value: 2, suffix: '', label: 'Peer-reviewed publications' },
  { value: 957, suffix: '', label: 'ROC-AUC ×1000 (0.957)' },
];

export type SkillNode = {
  id: string;
  label: string;
  cluster: 'ai' | 'cloud' | 'engineering' | 'leadership';
};

export const skillClusters: Record<
  SkillNode['cluster'],
  { title: string; blurb: string }
> = {
  ai: {
    title: 'AI / ML',
    blurb:
      'LLMs, Generative AI, RAG, recommender systems, NLP, deep learning, MLOps and AI agents.',
  },
  cloud: {
    title: 'Cloud & Platform',
    blurb:
      'Cloud-native architecture across AWS & GCP, Kubernetes, containers, CI/CD and serverless.',
  },
  engineering: {
    title: 'Engineering',
    blurb:
      'Full-stack delivery — Python, Node.js, React/Angular, mobile, APIs and data systems.',
  },
  leadership: {
    title: 'Leadership & Governance',
    blurb:
      'Technical leadership, AI governance, PMP program management, and data privacy & compliance.',
  },
};

export const skills: SkillNode[] = [
  // AI / ML
  { id: 'llms', label: 'LLMs', cluster: 'ai' },
  { id: 'genai', label: 'Generative AI', cluster: 'ai' },
  { id: 'rag', label: 'RAG', cluster: 'ai' },
  { id: 'recsys', label: 'Recommender Systems', cluster: 'ai' },
  { id: 'nlp', label: 'NLP', cluster: 'ai' },
  { id: 'dl', label: 'Deep Learning', cluster: 'ai' },
  { id: 'mlops', label: 'MLOps', cluster: 'ai' },
  { id: 'agents', label: 'AI Agents', cluster: 'ai' },
  { id: 'pytorch', label: 'PyTorch', cluster: 'ai' },
  { id: 'tensorflow', label: 'TensorFlow', cluster: 'ai' },
  { id: 'langchain', label: 'LangChain', cluster: 'ai' },
  { id: 'openai', label: 'OpenAI API', cluster: 'ai' },
  // Cloud & Platform
  { id: 'aws', label: 'AWS', cluster: 'cloud' },
  { id: 'gcp', label: 'GCP', cluster: 'cloud' },
  { id: 'k8s', label: 'Kubernetes (GKE)', cluster: 'cloud' },
  { id: 'docker', label: 'Docker', cluster: 'cloud' },
  { id: 'cicd', label: 'CI/CD', cluster: 'cloud' },
  { id: 'serverless', label: 'Serverless', cluster: 'cloud' },
  { id: 'arch', label: 'Solution Architecture', cluster: 'cloud' },
  // Engineering
  { id: 'python', label: 'Python', cluster: 'engineering' },
  { id: 'node', label: 'Node.js', cluster: 'engineering' },
  { id: 'react', label: 'React', cluster: 'engineering' },
  { id: 'angular', label: 'Angular', cluster: 'engineering' },
  { id: 'flutter', label: 'Flutter', cluster: 'engineering' },
  { id: 'laravel', label: 'PHP/Laravel', cluster: 'engineering' },
  { id: 'django', label: 'Django', cluster: 'engineering' },
  { id: 'rest', label: 'REST APIs', cluster: 'engineering' },
  { id: 'bigquery', label: 'BigQuery', cluster: 'engineering' },
  { id: 'sql', label: 'SQL & NoSQL', cluster: 'engineering' },
  // Leadership & Governance
  { id: 'techlead', label: 'Technical Leadership', cluster: 'leadership' },
  { id: 'aigov', label: 'AI Governance', cluster: 'leadership' },
  { id: 'pmp', label: 'Program Mgmt (PMP)', cluster: 'leadership' },
  { id: 'privacy', label: 'Data Privacy & Compliance', cluster: 'leadership' },
];

// Filter categories for the projects catalog. 'All' is implicit in the UI.
export const projectCategories = [
  'AI / ML',
  'Generative AI & RAG',
  'FinTech',
  'Blockchain',
  'Platform & Cloud',
  'Research',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  categories: ProjectCategory[];
  tagline: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  accent: 'cyan' | 'indigo' | 'violet';
  // Optional external link (e.g. published paper). `todo: true` => not yet live.
  link?: { label: string; url: string; todo?: boolean };
};

export const projects: Project[] = [
  // ── AI / ML & Generative AI ─────────────────────────────────────────────
  {
    id: 'life-hub',
    title: 'Life Hub Infiniti AI — Adaptive Learning & Career Intelligence',
    categories: ['AI / ML'],
    tagline: 'Adaptive AI ecosystem for an EdTech/FinTech platform.',
    problem:
      'Learners needed personalized learning paths and career mapping inside a single adaptive platform.',
    approach:
      'Architected an adaptive AI ecosystem using NLP, deep learning and recommender systems; cloud-native on AWS/GCP/Kubernetes.',
    result:
      'A FERPA/COPPA/GDPR-compliant ecosystem personalizing learning and optimizing career pathways.',
    stack: ['NLP', 'Deep Learning', 'Recommender Systems', 'AWS', 'GCP', 'Kubernetes'],
    accent: 'cyan',
  },
  {
    id: 'rag-copilot',
    title: 'Enterprise RAG Knowledge Copilot',
    categories: ['Generative AI & RAG'],
    tagline: '“Chat with our documents” for secure internal knowledge search.',
    problem:
      'Executives needed trustworthy search across scattered PDFs and internal documents.',
    approach:
      'Built ingestion + chunking, a vector store, and LLM orchestration (LangChain / Vertex AI) with answer-quality evaluation.',
    result:
      'Reduced decision latency and improved executive reporting with source-grounded answers.',
    stack: ['LangChain', 'Vertex AI', 'Vector Store', 'GCP', 'LLM Eval'],
    accent: 'indigo',
  },
  {
    id: 'voice-ai',
    title: 'Real-time Voice AI Assistant',
    categories: ['Generative AI & RAG'],
    tagline: 'Low-latency spoken AI agent over the OpenAI Realtime API.',
    problem:
      'Conversations needed a natural, low-latency voice interface rather than text-only chat.',
    approach:
      'Built a live audio agent using the OpenAI Realtime API + WebRTC with a TTS loop, on a Node.js/Express backend.',
    result:
      'A real-time, speak-and-listen assistant with natural turn-taking, deployed on GCP.',
    stack: ['OpenAI Realtime API', 'WebRTC', 'Node.js/Express', 'GCP'],
    accent: 'violet',
  },
  {
    id: 'doc-intelligence',
    title: 'AI Document Intelligence Pipeline',
    categories: ['AI / ML'],
    tagline: 'Automated extraction and structuring from documents.',
    problem:
      'Invoices, forms and documents required slow, manual data entry before they could be used.',
    approach:
      'Built an NLP + OCR pipeline that extracts and structures data, feeding downstream business workflows.',
    result: 'Cut manual data-entry effort and accelerated document processing.',
    stack: ['NLP', 'OCR', 'Python', 'Workflow Integration'],
    accent: 'cyan',
  },
  {
    id: 'recommender',
    title: 'Recommender & Personalization Engine',
    categories: ['AI / ML'],
    tagline: 'Behavioral-analytics-driven recommendations.',
    problem:
      'Learners needed relevant content, skills and career pathways matched to their behavior.',
    approach:
      'Combined collaborative and content-based filtering with deep-learning embeddings over behavioral analytics.',
    result:
      'Personalized matching of learners to skills, content and career pathways.',
    stack: ['Collaborative Filtering', 'Embeddings', 'Deep Learning', 'Python'],
    accent: 'indigo',
  },
  {
    id: 'agentic-automation',
    title: 'Agentic Workflow Automation',
    categories: ['Generative AI & RAG'],
    tagline: 'AI agents automating multi-step business processes.',
    problem:
      'Repetitive, multi-step processes (document processing, notifications, data sync) consumed manual effort.',
    approach:
      'Built AI agents combining workflow tooling with custom code and LLM reasoning to orchestrate the steps.',
    result:
      'Automated repetitive business workflows end to end.',
    stack: ['AI Agents', 'LLM Reasoning', 'Workflow Tooling', 'APIs'],
    accent: 'violet',
  },
  {
    id: 'mlops-platform',
    title: 'MLOps Platform & Model Lifecycle',
    categories: ['AI / ML', 'Platform & Cloud'],
    tagline: 'Reproducible training-to-production pipeline.',
    problem:
      'Models needed a reproducible path from experiment to production with ongoing monitoring.',
    approach:
      'Built experiment tracking, CI/CD for models, containerized serving on Kubernetes, and drift/performance observability.',
    result:
      'A reproducible model lifecycle with monitoring for drift and performance.',
    stack: ['MLOps', 'CI/CD', 'Kubernetes', 'Model Monitoring', 'Containers'],
    accent: 'cyan',
  },

  // ── FinTech & Data Science in Finance ───────────────────────────────────
  {
    id: 'fraud-intel',
    title: 'AI Risk & Fraud Intelligence for FinTech',
    categories: ['AI / ML', 'FinTech'],
    tagline: 'ML risk scoring + anomaly detection for fraud prevention.',
    problem:
      'Financial flows needed to catch fraudulent and anomalous behavior before it caused loss.',
    approach:
      'Designed ML risk scoring combined with anomaly detection across the transaction pipeline.',
    result:
      'Enabled faster, safer financial operations through proactive fraud prevention.',
    stack: ['Python', 'ML', 'Anomaly Detection', 'Risk Scoring'],
    accent: 'indigo',
  },
  {
    id: 'fin-forecasting',
    title: 'Financial Forecasting & Decision Models',
    categories: ['FinTech', 'Research'],
    tagline: 'Data-science-in-finance forecasting and analytics.',
    problem:
      'Corporate finance decisions needed quantitative forecasting and analytics support.',
    approach:
      'Built data-science models for forecasting and corporate-finance analytics, aligned with PhD research on data science applied to banking and finance.',
    result:
      'Forecasting and decision models grounded in finance-focused data science.',
    stack: ['Data Science', 'Forecasting', 'Corporate Finance', 'Python'],
    accent: 'violet',
  },
  {
    id: 'budget-system',
    title: 'University Budget Management System',
    categories: ['FinTech'],
    tagline: 'ML-assisted budgeting at institutional scale.',
    problem:
      'Budgeting was slow and manual across one of Pakistan’s largest public universities.',
    approach:
      'Delivered an end-to-end budgeting platform with ML-assisted forecasting, leading 500+ contributors.',
    result: '~50% reduction in budgeting cycle time.',
    stack: ['Machine Learning', 'Forecasting', 'Program Leadership'],
    accent: 'cyan',
  },

  // ── Blockchain ──────────────────────────────────────────────────────────
  {
    id: 'blockchain-credentials',
    title: 'Blockchain Digital Credentials Platform',
    categories: ['Blockchain'],
    tagline: 'Verifiable badges and micro-certifications.',
    problem:
      'Learner credentials needed to be tamper-proof, portable and independently verifiable.',
    approach:
      'Built verifiable badges and micro-certifications on a blockchain trust layer.',
    result:
      'Tamper-proof, portable learner credentials anchored to a trust layer.',
    stack: ['Blockchain', 'Verifiable Credentials', 'Smart Contracts'],
    accent: 'indigo',
  },
  {
    id: 'blockchain-voting',
    title: 'Blockchain-based Biometric Election System',
    categories: ['Blockchain'],
    tagline: 'Thumbprint-authenticated voting with an immutable audit trail.',
    problem:
      'A bar-association election needed tamper-resistant identity and transparent, real-time tallying.',
    approach:
      'Built a multi-tenant, thumbprint-authenticated voting system on a blockchain ledger with a live web results dashboard.',
    result:
      'Biometric voting with an immutable audit trail and real-time, verifiable results.',
    stack: ['Blockchain', 'Biometrics', 'Multi-tenant', 'Web'],
    accent: 'violet',
  },

  // ── Platform & Cloud ────────────────────────────────────────────────────
  {
    id: 'erp-modernization',
    title: 'Cloud-Native ERP Modernization (MyIUB)',
    categories: ['Platform & Cloud'],
    tagline: 'Monolith → cloud-native services + secure APIs.',
    problem:
      'A monolithic ERP limited scalability and integration for a large institution.',
    approach:
      'Migrated modules to cloud-native services with secure REST/SOAP APIs and automation; deployed iDempiere (Java/Spring Boot, Postgres, Docker).',
    result:
      'Automated procurement, accounts and billing on a modernized, API-driven ERP.',
    stack: ['iDempiere', 'Java/Spring Boot', 'Postgres', 'Docker', 'REST/SOAP'],
    accent: 'cyan',
  },
  {
    id: 'school-saas',
    title: 'Multi-tenant School-Management SaaS ("Institute on Cloud")',
    categories: ['Platform & Cloud'],
    tagline: 'Full multi-tenancy for educational institutes.',
    problem:
      'Institutes needed attendance, fees, exams, payroll and analytics in one hosted product.',
    approach:
      'Built a multi-tenant SaaS covering biometric attendance, fees, exams, payroll and analytics.',
    result:
      'A SaaS platform serving multiple institutes with full multi-tenancy.',
    stack: ['SaaS', 'Multi-tenant', 'Biometrics', 'Analytics'],
    accent: 'indigo',
  },

  // ── Research (peer-reviewed) ─────────────────────────────────────────────
  {
    id: 'pfas-research',
    title: 'Ensemble ML Framework for PFAS Risk Screening in Public Water Systems',
    categories: ['Research', 'AI / ML'],
    tagline: 'Large-scale ML screening of PFAS “forever chemicals”.',
    problem:
      'PFAS contamination needed scalable risk screening across US public water systems.',
    approach:
      'Built an ML framework using SMOTE for class imbalance and a stacking ensemble (gradient boosting + bagging + meta-learning).',
    result:
      'ROC-AUC 0.957. Published in CMES – Computer Modeling in Engineering & Sciences (2026).',
    stack: ['Stacking Ensemble', 'Gradient Boosting', 'SMOTE', 'Python'],
    accent: 'violet',
    // TODO: replace with the published DOI once available.
    link: { label: 'Read paper', url: '#', todo: true },
  },
  {
    id: 'as-topology',
    title: 'Autonomous-System-Level Internet Topology Mapping',
    categories: ['Research'],
    tagline: 'Reconstructing BGP routing topology from Looking Glass Servers.',
    problem:
      'Internet AS-level topology was incompletely mapped from public vantage points.',
    approach:
      'Reconstructed BGP routing topology from Looking Glass Servers to discover previously unseen ASes and links.',
    result:
      'Discovered 378 new Autonomous Systems and 1,740 new AS links. Published in Pakistan Journal of Science (2019).',
    stack: ['BGP', 'Looking Glass Servers', 'Network Topology'],
    accent: 'cyan',
  },
];

export type TimelineItem = {
  role: string;
  org: string;
  type: string;
  period: string;
  location: string;
  summary?: string;
  responsibilities: string[];
  achievements?: string[];
  stack?: string[];
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    role: 'Chief Technology Officer, VP of Engineering & AI/ML Architect',
    org: 'Electus Global Education Co.',
    type: 'Full-time',
    period: 'Feb 2025 – Present',
    location: 'Remote · Florida, US',
    summary:
      'Lead engineering and AI for Life Hub (an “Earn & Learn” EdTech/FinTech platform) and architect Life Hub Infiniti AI — an adaptive AI ecosystem that personalizes learning, optimizes career pathways, and bridges education with financial empowerment.',
    responsibilities: [
      'Define and own technology strategy, system architecture, and the engineering organization; lead teams building secure, high-performance, scalable platforms.',
      'Architect AI/ML personalization — NLP, deep learning, recommender systems, and RAG-based chatbots that match learner skills to career goals.',
      'Build “edu-jobs & rewards”: AI-powered micro-tasking that lets learners earn while they learn, with gamified financial-literacy and career-readiness experiences.',
      'Own cloud and cybersecurity: high-availability infrastructure on AWS, GCP, Kubernetes, and serverless; compliance with FERPA, COPPA, and GDPR.',
      'Design blockchain-based digital credentials — verifiable badges and micro-certifications.',
    ],
    achievements: [
      'Shipped an AI-powered financial-literacy and career-readiness platform with gamification.',
      'Architected corporate-sponsored learning programs and micro-internships.',
      'Built automated career-mapping tools for students entering high-growth fields.',
    ],
    stack: [
      'NLP',
      'Deep Learning',
      'Recommender Systems',
      'RAG Chatbots',
      'AWS',
      'GCP',
      'Kubernetes',
      'Serverless',
      'Flutter',
      'React',
      'Angular',
      'Python',
      'PHP',
    ],
    current: true,
  },
  {
    role: 'Product Owner & AI/ML Architect',
    org: 'Electus Global Education Co.',
    type: 'Part-time',
    period: 'Aug 2024 – Jan 2025',
    location: 'Remote',
    responsibilities: [
      'Owned the product backlog — defined and prioritized work so the team delivered maximum value.',
      'Bridged stakeholders and engineering: set the vision, gathered requirements, and made the key decisions aligning product with business goals.',
      'Spearheaded the AI/ML architecture for Electus, strengthening AI-enabled applications.',
      'Collaborated across functions to drive innovation and streamline the development process.',
    ],
  },
  {
    role: 'Member, PMO Steering Committee',
    org: 'The Islamia University of Bahawalpur',
    type: 'Part-time',
    period: 'Jan 2025 – Present',
    location: 'Hybrid · Rahim Yar Khan, Pakistan',
    responsibilities: [
      'Provide strategic direction and high-level governance for the project portfolio, ensuring alignment with organizational goals.',
      'Review and approve project charters, business cases, and change requests based on strategic impact, business value, and risk.',
      'Identify and mitigate critical program-level risks escalated by project teams; enforce governance best practices through performance monitoring.',
      'Advocate for initiatives across senior leadership, secure buy-in, resolve competing priorities, and report performance and outcomes to top leadership.',
    ],
    current: true,
  },
  {
    role: 'Senior Project Manager',
    org: 'The Islamia University of Bahawalpur',
    type: 'Full-time',
    period: 'Dec 2021 – Jan 2025',
    location: 'Hybrid · Bahawalpur, Pakistan',
    responsibilities: [
      'Managed HR, network, software, and cloud infrastructure supporting ~100,000 daily active users across 5 distributed sub-campuses.',
      'Supervised a 50+ person team of back-end/front-end developers, testers, and IT support staff; trained 1,000+ end users across departments.',
      'Aligned technical development and IT projects with overall organizational plans and goals.',
    ],
    achievements: [
      'Delivered a 50M PKR CMS deployment at 15% under budget and two weeks ahead of schedule.',
      'Delivered a budget-management program governing a 12 Billion PKR organizational budget.',
    ],
  },
  {
    role: 'Additional Director (BPS-19)',
    org: 'The Islamia University of Bahawalpur',
    type: 'Part-time',
    period: 'Mar 2024 – Sep 2024',
    location: 'Hybrid',
    responsibilities: [
      'Partnered with the Director to establish and expand a franchise network of schools and colleges for the university.',
      'Led initiatives to widen educational access in Bahawalpur District; promoted academic excellence and community engagement.',
    ],
  },
  {
    role: 'Deputy Director (BPS-18)',
    org: 'The Islamia University of Bahawalpur',
    type: 'Part-time',
    period: 'Dec 2022 – Mar 2024',
    location: 'On-site',
    responsibilities: [
      'Oversaw all IT, procurement, and administrative matters at the Islamia University School System, reporting to the Director.',
      'Implemented initiatives to streamline operations; led cross-functional teams to deliver projects and organizational goals.',
    ],
  },
  {
    role: 'Programmer (BPS-17)',
    org: 'The Islamia University of Bahawalpur',
    type: 'Contract',
    period: 'Jun 2020 – Nov 2021',
    location: 'On-site',
    responsibilities: [
      'Led development of custom applications in PHP and JavaScript.',
      'Built an ERP solution for the university; deployed iDempiere ERP to automate procurement processes.',
    ],
  },
  {
    role: 'Business Analyst',
    org: 'Al-Wakeel Institute',
    type: 'Part-time',
    period: 'Mar 2024 – Jan 2026',
    location: 'Hybrid',
    responsibilities: [
      'Mentored and directed a team of business developers to generate business and raise the institute’s profile.',
      'Served as Brand Ambassador to external stakeholders; brought in new partnerships and opportunities.',
    ],
  },
  {
    role: 'Project Manager',
    org: 'Dexterous Developers',
    type: 'Full-time',
    period: 'Jan 2017 – Jan 2020',
    location: 'On-site · Rahim Yar Khan',
    responsibilities: [
      'Led cross-functional teams of engineers, marketers, and analysts to deliver projects successfully.',
      'Managed the full project lifecycle with Asana and Jira; mitigated risks to minimize disruption and strengthen client relationships.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Aerezona Developers',
    type: 'Full-time',
    period: 'Jan 2015 – Apr 2017',
    location: 'On-site · Lahore',
    responsibilities: [
      'Built and deployed web applications in PHP and JavaScript frameworks for international clients across the full SDLC.',
      'Contributed to code reviews and best practices for quality, maintainability, and scalability; worked in an agile environment.',
    ],
    achievements: [
      'Led the development and launch of a complex LMS for high-profile clients (+40% online sales).',
      'Introduced automated testing, reducing defects by 30%.',
    ],
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  highlight: string;
};

export const publications: Publication[] = [
  {
    title:
      'Ensemble Machine Learning Framework for PFAS Risk Screening in Public Water Systems',
    venue: 'CMES – Computer Modeling in Engineering & Sciences',
    year: '2026',
    highlight: 'Stacking ensemble · ROC-AUC 0.957',
  },
  {
    title:
      'Collection of Autonomous System Level Topology Using Looking Glass Servers',
    venue: 'Pakistan Journal of Science',
    year: '2019',
    highlight: 'Discovered 378 new Autonomous Systems and 1,740 AS links',
  },
];

export type Credential = { title: string; detail: string };

export const credentials: Credential[] = [
  {
    title: 'PhD in Computer Science',
    detail: 'Research: Data Science in Finance · thesis submitted',
  },
  { title: 'MPhil Computer Science', detail: 'Advanced CS research' },
  {
    title: 'LLB (Law)',
    detail: 'Cyber, IP & Copyright law focus',
  },
  { title: 'BS Computer Science', detail: 'Foundations in CS' },
  {
    title: 'PMP Certified',
    detail: 'Project Management Institute (PMI)',
  },
];

// Tech marquee — only tech actually used.
export const techMarquee: string[] = [
  'PyTorch',
  'TensorFlow',
  'LangChain',
  'OpenAI',
  'AWS',
  'GCP',
  'Kubernetes',
  'Docker',
  'Python',
  'Node.js',
  'React',
  'Angular',
  'Flutter',
  'Django',
  'Laravel',
  'BigQuery',
];

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];
