import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Reveal from '../components/Reveal';

const UPDATED = 'June 2026';
const LOCATION = 'Remote';

type NowItem = { label: string; content: React.ReactNode };

const items: NowItem[] = [
  {
    label: 'Day job',
    content: (
      <p>
        CTO, VP of Engineering &amp; AI/ML Architect at{' '}
        <strong>Electus Global Education Co.</strong> (Florida, US — remote).
        I'm leading the architecture and build of <strong>Life Hub Infiniti AI</strong> —
        an adaptive EdTech + FinTech platform that personalises learning, maps careers,
        and powers micro-earning through gamified AI experiences.
        The stack spans NLP, deep learning, RAG chatbots, recommender systems, AWS, GCP,
        Kubernetes, Flutter, React, and Angular.
      </p>
    ),
  },
  {
    label: 'Research',
    content: (
      <>
        <p>
          PhD thesis submitted (Computer Science, Data Science in Finance focus). Waiting
          on the viva while continuing to publish. My most recent paper —
          an ensemble ML framework for PFAS risk screening — was accepted in{' '}
          <em>CMES – Computer Modeling in Engineering &amp; Sciences</em> (2026).
        </p>
        <p>
          Also serving on the <strong>PMO Steering Committee</strong> at The Islamia
          University of Bahawalpur, providing governance and strategic direction for the
          university's project portfolio.
        </p>
      </>
    ),
  },
  {
    label: 'Open source',
    content: (
      <p>
        Just shipped <strong>10 production-grade AI/ML demos</strong> as an open-source
        portfolio — each with a live browser demo, green CI, and a real eval gate.
        Projects span RAG with citations, LLM safety guardrails, causal interpretability,
        financial backtesting, pronunciation assessment, and more. All available on
        GitHub under the <a href="https://github.com/ranafaraz" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">ranafaraz</a> account.
      </p>
    ),
  },
  {
    label: 'Learning',
    content: (
      <ul>
        <li>Agentic AI architectures — multi-step planning, tool use, and verification loops</li>
        <li>AI governance frameworks and compliance requirements (EU AI Act, NIST AI RMF)</li>
        <li>Advanced RAG patterns — hybrid retrieval, reranking, and faithfulness evaluation</li>
        <li>Scaling ML systems — distributed training, inference optimisation, and cost management</li>
      </ul>
    ),
  },
  {
    label: 'Reading',
    content: (
      <ul>
        <li><em>Designing Machine Learning Systems</em> — Chip Huyen</li>
        <li><em>The Alignment Problem</em> — Brian Christian</li>
        <li>AI safety research from Anthropic, DeepMind, and the AI Safety community</li>
        <li>Corporate finance and investment analysis (PhD research intersection)</li>
      </ul>
    ),
  },
  {
    label: 'Location',
    content: (
      <p>
        Working fully remote from <strong>Pakistan</strong>, collaborating with teams
        across the US and globally. Occasional hybrid presence at IUB in Bahawalpur.
      </p>
    ),
  },
];

export default function Now() {
  return (
    <PageLayout>
      <div className="container-x max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="eyebrow mb-4 block">Present</span>
          <h1 className="heading gradient-text mb-4">/now</h1>
          <p className="max-w-2xl text-slate-400 leading-relaxed">
            A snapshot of what I'm focused on right now. Inspired by{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              Derek Sivers' /now page movement
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 font-mono">
            <span>Last updated: {UPDATED}</span>
            <span>Location: {LOCATION}</span>
          </div>
        </motion.div>

        {/* Items */}
        <div className="space-y-6">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="glass rounded-2xl p-8">
                <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-cyan">
                  {item.label}
                </h2>
                <div className="text-slate-400 leading-relaxed space-y-3 [&_a]:text-cyan [&_a]:hover:underline [&_ul]:mt-2 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_strong]:text-slate-300 [&_em]:text-slate-300">
                  {item.content}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Call to action */}
        <Reveal delay={0.2}>
          <div className="mt-10 glass rounded-2xl p-8 text-center">
            <p className="text-slate-400 mb-6">
              Want to collaborate, discuss AI, or just say hello?
            </p>
            <a
              href="/#contact"
              className="btn-primary inline-flex px-6 py-2.5 text-sm"
            >
              Get in touch
            </a>
          </div>
        </Reveal>

        {/* Footer nav */}
        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link to="/uses" className="hover:text-cyan transition-colors">What I use →</Link>
          <Link to="/" className="hover:text-cyan transition-colors">← Back to Portfolio</Link>
        </Reveal>
      </div>
    </PageLayout>
  );
}
