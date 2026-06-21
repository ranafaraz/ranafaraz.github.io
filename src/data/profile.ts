/**
 * Single source of truth for ALL site copy.
 * Edit text, projects, skills, and timeline here — components read from this file
 * and never hard-code content. Only verified, real facts belong here.
 */

export const site = {
  url: 'https://ranafaraz.github.io/',
  // Path to the CV PDF. Drop the file at /public/Rana_Faraz_Ahmed_CV.pdf
  cvPath: '/Rana_Faraz_Ahmed_CV.pdf',
  // Headshot. Drop the file at /public/profile.jpg
  photo: '/profile.jpg',
  ogImage: '/og-image.png',
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

export type Project = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  accent: 'cyan' | 'indigo' | 'violet';
};

export const projects: Project[] = [
  {
    id: 'rag-copilot',
    title: 'Enterprise RAG Knowledge Copilot',
    tagline: 'Secure internal knowledge search over documents.',
    problem:
      'Leadership decisions were slowed by knowledge scattered across documents with no trustworthy way to search it.',
    approach:
      'Built a retrieval-augmented assistant over an internal document corpus with a vector store and grounded responses, deployed on GCP.',
    result:
      'Reduced decision latency and improved executive reporting through fast, source-grounded answers.',
    stack: ['LangChain', 'Vertex AI', 'Vector Store', 'GCP'],
    accent: 'cyan',
  },
  {
    id: 'fraud-intel',
    title: 'AI Risk & Fraud Intelligence for FinTech',
    tagline: 'ML risk scoring + anomaly detection for fraud prevention.',
    problem:
      'FinTech flows needed to catch fraudulent and anomalous behaviour before it caused loss.',
    approach:
      'Designed ML-based risk scoring combined with anomaly detection to flag suspicious activity in the transaction pipeline.',
    result:
      'A risk-intelligence layer focused on proactive fraud prevention.',
    stack: ['Python', 'ML', 'Anomaly Detection', 'Risk Scoring'],
    accent: 'indigo',
  },
  {
    id: 'voice-ai',
    title: 'Real-time Voice AI Assistant',
    tagline: 'Live voice agent over the OpenAI Realtime API + WebRTC.',
    problem:
      'Conversations needed a natural, low-latency voice interface rather than text-only chat.',
    approach:
      'Built a live voice agent using the OpenAI Realtime API and WebRTC, with a Node.js backend on GCP.',
    result:
      'A real-time, speak-and-listen assistant with natural turn-taking.',
    stack: ['OpenAI Realtime API', 'WebRTC', 'Node.js', 'GCP'],
    accent: 'violet',
  },
  {
    id: 'life-hub',
    title: 'Life Hub Infiniti AI',
    tagline: 'Adaptive AI EdTech / FinTech ecosystem.',
    problem:
      'Learners needed personalized learning, career intelligence, micro-earning and verifiable credentials in one adaptive platform.',
    approach:
      'Led engineering and AI: a personalization engine, a RAG assistant, career intelligence, and blockchain credentials on AWS/GCP/Kubernetes.',
    result:
      'A compliant (FERPA/COPPA/GDPR) AI ecosystem spanning EdTech and FinTech.',
    stack: ['AWS', 'GCP', 'Kubernetes', 'RAG', 'Blockchain'],
    accent: 'cyan',
  },
  {
    id: 'erp-modernization',
    title: 'Cloud-Native ERP Modernization (MyIUB)',
    tagline: 'Monolith → cloud-native services + secure APIs.',
    problem:
      'A monolithic ERP limited scalability and integration for a large institution.',
    approach:
      'Migrated to cloud-native services with secure APIs using iDempiere, Java/Spring Boot, Postgres and Docker.',
    result:
      'A modernized, API-driven ERP foundation ready to scale.',
    stack: ['iDempiere', 'Java/Spring Boot', 'Postgres', 'Docker'],
    accent: 'indigo',
  },
  {
    id: 'budget-system',
    title: 'University Budget Management System',
    tagline: 'ML-assisted forecasting at institutional scale.',
    problem:
      'Budgeting cycles were slow and manual across a large organization.',
    approach:
      'Delivered an ML-assisted forecasting system, leading 500+ people across the program.',
    result:
      'Cut budgeting cycle time by roughly 50%.',
    stack: ['Machine Learning', 'Forecasting', 'Program Leadership'],
    accent: 'violet',
  },
  {
    id: 'blockchain-voting',
    title: 'Blockchain Biometric Election System',
    tagline: 'Thumbprint voting with real-time web results.',
    problem:
      'Elections needed tamper-resistant identity and transparent, real-time tallying.',
    approach:
      'Built thumbprint-based biometric voting on a blockchain ledger with a live web results dashboard.',
    result:
      'Secure biometric voting with real-time, verifiable results.',
    stack: ['Blockchain', 'Biometrics', 'Web'],
    accent: 'cyan',
  },
];

export type TimelineItem = {
  role: string;
  org: string;
  period: string;
  detail: string;
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    role: 'CTO / VP Engineering & AI/ML Architect',
    org: 'Electus Global Education Co.',
    period: 'Feb 2025 – Present',
    detail:
      'Leading engineering and AI for Life Hub / Life Hub Infiniti AI — an adaptive AI EdTech + FinTech platform.',
    current: true,
  },
  {
    role: 'Member, PMO Steering Committee',
    org: 'The Islamia University of Bahawalpur',
    period: 'Jan 2025 – Present · Part-time',
    detail:
      'Contributing to program governance and project oversight on the PMO steering committee.',
  },
  {
    role: 'Senior Project Manager',
    org: 'The Islamia University of Bahawalpur',
    period: 'Dec 2021 – Jan 2025',
    detail:
      'Ran IT for ~100k daily users with a 50+ person team; delivered a 50M PKR system under budget.',
  },
  {
    role: 'Software Engineer / Programmer (BPS-17)',
    org: 'The Islamia University of Bahawalpur',
    period: '2020 – 2021',
    detail:
      'Built and maintained core institutional software systems.',
  },
  {
    role: 'Project Manager',
    org: 'Dexterous Developers',
    period: '2017 – 2020',
    detail:
      'Led delivery of client software projects end to end.',
  },
  {
    role: 'Software Engineer',
    org: 'Aerezona Developers',
    period: '2015 – 2017',
    detail:
      'Launched an LMS that drove +40% sales and −30% defects.',
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
