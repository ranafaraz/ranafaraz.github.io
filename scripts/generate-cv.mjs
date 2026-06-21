/**
 * Generates /public/Rana_Faraz_Ahmed_CV.pdf from real profile data using a
 * headless Chromium print. Reproducible: `node scripts/generate-cv.mjs`.
 * All content is sourced from the facts in src/data/profile.ts — nothing here
 * is invented. Replace the output with a bespoke CV anytime.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/Rana_Faraz_Ahmed_CV.pdf');

const identity = {
  name: 'Rana Faraz Ahmed',
  title: 'Head of AI & Engineering Leader · CTO · AI/ML Architect',
  email: 'ranafarazahmed@gmail.com',
  linkedin: 'linkedin.com/in/ranafarazahmed',
  github: 'github.com/ranafaraz',
  summary:
    'AI and engineering leader with 11+ years building and shipping production systems. A rare combination of hands-on AI/ML engineering, PMP-grade delivery leadership, and tech-law literacy (LLB, cyber/IP focus) — building AI that is defensible on data privacy, IP, and governance.',
};

const experience = [
  {
    role: 'Chief Technology Officer, VP of Engineering & AI/ML Architect',
    org: 'Electus Global Education Co.',
    meta: 'Full-time · Remote (Florida, US) · Feb 2025 – Present',
    bullets: [
      'Define and own technology strategy, system architecture, and the engineering organization; lead teams building secure, high-performance, scalable platforms.',
      'Architect AI/ML personalization — NLP, deep learning, recommender systems, and RAG-based chatbots that match learner skills to career goals.',
      'Build AI-powered micro-tasking (“edu-jobs & rewards”) with gamified financial-literacy and career-readiness experiences.',
      'Own cloud and cybersecurity: high-availability AWS, GCP, Kubernetes, serverless; compliance with FERPA, COPPA, GDPR.',
      'Design blockchain-based digital credentials — verifiable badges and micro-certifications.',
    ],
  },
  {
    role: 'Product Owner & AI/ML Architect',
    org: 'Electus Global Education Co.',
    meta: 'Part-time · Remote · Aug 2024 – Jan 2025',
    bullets: [
      'Owned and prioritized the product backlog to deliver maximum value.',
      'Bridged stakeholders and engineering; set vision and aligned product with business goals.',
      'Spearheaded the AI/ML architecture for Electus.',
    ],
  },
  {
    role: 'Member, PMO Steering Committee',
    org: 'The Islamia University of Bahawalpur',
    meta: 'Part-time · Hybrid (Rahim Yar Khan, Pakistan) · Jan 2025 – Present',
    bullets: [
      'Provide strategic direction and high-level governance for the project portfolio.',
      'Review/approve project charters, business cases, and change requests by impact, value and risk.',
      'Identify and mitigate critical program-level risks; report outcomes to top leadership.',
    ],
  },
  {
    role: 'Senior Project Manager',
    org: 'The Islamia University of Bahawalpur',
    meta: 'Full-time · Hybrid (Bahawalpur, Pakistan) · Dec 2021 – Jan 2025',
    bullets: [
      'Managed HR, network, software and cloud infrastructure for ~100,000 daily active users across 5 sub-campuses.',
      'Supervised a 50+ person team; trained 1,000+ end users across departments.',
      'Delivered a 50M PKR CMS at 15% under budget and two weeks ahead of schedule.',
      'Delivered a budget-management program governing a 12 Billion PKR organizational budget.',
    ],
  },
  {
    role: 'Additional Director (BPS-19)',
    org: 'The Islamia University of Bahawalpur',
    meta: 'Part-time · Hybrid · Mar 2024 – Sep 2024',
    bullets: [
      'Partnered with the Director to establish and expand a franchise network of schools and colleges.',
      'Led initiatives to widen educational access in Bahawalpur District.',
    ],
  },
  {
    role: 'Deputy Director (BPS-18)',
    org: 'The Islamia University of Bahawalpur',
    meta: 'Part-time · On-site · Dec 2022 – Mar 2024',
    bullets: [
      'Oversaw all IT, procurement and administrative matters at the Islamia University School System.',
      'Streamlined operations and led cross-functional teams to deliver organizational goals.',
    ],
  },
  {
    role: 'Programmer (BPS-17)',
    org: 'The Islamia University of Bahawalpur',
    meta: 'Contract · On-site · Jun 2020 – Nov 2021',
    bullets: [
      'Led development of custom applications in PHP and JavaScript.',
      'Built an ERP solution; deployed iDempiere ERP to automate procurement.',
    ],
  },
  {
    role: 'Business Analyst',
    org: 'Al-Wakeel Institute',
    meta: 'Part-time · Hybrid · Mar 2024 – Jan 2026',
    bullets: [
      'Mentored and directed business developers to grow the institute’s profile.',
      'Served as Brand Ambassador; brought in new partnerships and opportunities.',
    ],
  },
  {
    role: 'Project Manager',
    org: 'Dexterous Developers',
    meta: 'Full-time · On-site (Rahim Yar Khan) · Jan 2017 – Jan 2020',
    bullets: [
      'Led cross-functional teams of engineers, marketers and analysts to deliver projects.',
      'Managed the full lifecycle with Asana and Jira; mitigated risks and strengthened client relationships.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Aerezona Developers',
    meta: 'Full-time · On-site (Lahore) · Jan 2015 – Apr 2017',
    bullets: [
      'Built and deployed web apps in PHP and JavaScript frameworks for international clients across the SDLC.',
      'Led development and launch of a complex LMS (+40% online sales).',
      'Introduced automated testing, reducing defects by 30%.',
    ],
  },
];

const education = [
  'PhD in Computer Science — research: Data Science in Finance (thesis submitted)',
  'MPhil Computer Science',
  'LLB (Law) — Cyber, IP & Copyright law focus',
  'BS Computer Science',
  'PMP — Project Management Institute (PMI)',
];

const publications = [
  'Ensemble Machine Learning Framework for PFAS Risk Screening in Public Water Systems — CMES – Computer Modeling in Engineering & Sciences (2026). Stacking ensemble; ROC-AUC 0.957.',
  'Collection of Autonomous System Level Topology Using Looking Glass Servers — Pakistan Journal of Science (2019). Discovered 378 new Autonomous Systems and 1,740 AS links.',
];

const skills = [
  ['AI / ML', 'LLMs, Generative AI, RAG, Recommender Systems, NLP, Deep Learning, MLOps, AI Agents, PyTorch, TensorFlow, LangChain, OpenAI API'],
  ['Cloud & Platform', 'AWS, GCP, Kubernetes (GKE), Docker, CI/CD, Serverless, Solution Architecture'],
  ['Engineering', 'Python, Node.js, React, Angular, Flutter, PHP/Laravel, Django, REST APIs, BigQuery, SQL & NoSQL'],
  ['Leadership & Governance', 'Technical Leadership, AI Governance, Program/Project Management (PMP), Data Privacy & Compliance (FERPA/COPPA/GDPR)'],
];

const li = (items) => items.map((b) => `<li>${b}</li>`).join('');
const exp = experience
  .map(
    (e) => `
  <div class="role">
    <div class="role-head">
      <div><span class="role-title">${e.role}</span> — <span class="org">${e.org}</span></div>
    </div>
    <div class="meta">${e.meta}</div>
    <ul>${li(e.bullets)}</ul>
  </div>`,
  )
  .join('');

const skillRows = skills
  .map(([k, v]) => `<tr><td class="sk">${k}</td><td>${v}</td></tr>`)
  .join('');

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<style>
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; margin: 0; font-size: 10.5px; line-height: 1.45; }
  .page { padding: 40px 46px; }
  header { border-bottom: 2px solid #0e7490; padding-bottom: 10px; margin-bottom: 14px; }
  h1 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 24px; margin: 0; letter-spacing: .3px; }
  .title { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0e7490; font-size: 11.5px; margin-top: 3px; font-weight: 600; }
  .contact { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 9.5px; color: #444; margin-top: 6px; }
  .contact span { margin-right: 12px; }
  h2 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11.5px; text-transform: uppercase; letter-spacing: 1.2px; color: #0e7490; border-bottom: 1px solid #ddd; padding-bottom: 3px; margin: 16px 0 8px; }
  p.summary { margin: 0; }
  .role { margin-bottom: 9px; }
  .role-title { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 700; font-size: 11px; }
  .org { font-weight: 600; color: #0e7490; }
  .meta { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 9px; color: #666; margin: 1px 0 3px; }
  ul { margin: 3px 0 0; padding-left: 16px; }
  li { margin-bottom: 1.5px; }
  table { width: 100%; border-collapse: collapse; }
  td { vertical-align: top; padding: 2px 0; }
  td.sk { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 700; width: 130px; padding-right: 10px; }
  .twocol { columns: 2; column-gap: 26px; }
  .twocol ul { margin-top: 0; }
</style></head>
<body><div class="page">
  <header>
    <h1>${identity.name}</h1>
    <div class="title">${identity.title}</div>
    <div class="contact">
      <span>${identity.email}</span><span>${identity.linkedin}</span><span>${identity.github}</span>
    </div>
  </header>

  <h2>Profile</h2>
  <p class="summary">${identity.summary}</p>

  <h2>Core Skills</h2>
  <table>${skillRows}</table>

  <h2>Experience</h2>
  ${exp}

  <h2>Education & Certification</h2>
  <ul>${li(education)}</ul>

  <h2>Selected Publications</h2>
  <ul>${li(publications)}</ul>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
});
await browser.close();
console.log('Wrote', out);
