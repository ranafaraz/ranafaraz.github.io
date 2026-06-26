import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Reveal from '../components/Reveal';

type Tool = { name: string; desc: string; url?: string };
type Category = { id: string; label: string; eyebrow: string; tools: Tool[] };

const categories: Category[] = [
  {
    id: 'languages',
    label: 'Languages',
    eyebrow: 'What I write',
    tools: [
      { name: 'Python', desc: 'Primary language for all AI/ML work — model training, RAG pipelines, data processing, FastAPI services.' },
      { name: 'TypeScript', desc: 'React frontends, Node.js backends, and all web-facing code. Type safety is non-negotiable on large teams.' },
      { name: 'PHP / Laravel', desc: 'Battle-tested for multi-tenant SaaS and ERP systems. Still my go-to for rapid full-stack delivery.' },
      { name: 'Dart / Flutter', desc: 'Cross-platform mobile — single codebase shipping to Android and iOS.' },
      { name: 'SQL', desc: 'PostgreSQL for production, BigQuery for analytics-scale queries. I write queries by hand.' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML Stack',
    eyebrow: 'Intelligence layer',
    tools: [
      { name: 'PyTorch', desc: 'Research and production deep learning — custom architectures, fine-tuning, embeddings.' },
      { name: 'TensorFlow / Keras', desc: 'Established pipelines, especially when deploying to TFServing or Vertex AI.' },
      { name: 'LangChain', desc: 'RAG orchestration, agent chains, and LLM tool use. I pair it with custom eval harnesses.' },
      { name: 'OpenAI API', desc: 'GPT-4o and the Realtime API for voice-enabled AI and structured generation.' },
      { name: 'Claude (Anthropic)', desc: 'Long-context reasoning, complex document processing, and AI code assistance.' },
      { name: 'Hugging Face', desc: 'Model hub, Transformers library, and dataset tooling for NLP and embedding models.' },
      { name: 'Vertex AI', desc: 'Managed ML on GCP — model registry, pipelines, and Gemini for enterprise RAG.' },
      { name: 'scikit-learn', desc: 'Classical ML, feature engineering, model selection, and eval pipelines.' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    eyebrow: 'Where code runs',
    tools: [
      { name: 'AWS', desc: 'Primary cloud. Lambda, ECS, S3, RDS, CloudFront — standard production stack.' },
      { name: 'GCP', desc: 'BigQuery, GKE, Cloud Run, and Vertex AI. Used alongside AWS for analytics-heavy workloads.' },
      { name: 'Kubernetes (GKE)', desc: 'Container orchestration for ML model serving, microservices, and auto-scaling.' },
      { name: 'Docker', desc: 'All services containerised from day one. Reproducibility is not optional.' },
      { name: 'GitHub Actions', desc: 'CI/CD for every project — tests, lint, build, deploy, and eval gates.' },
      { name: 'Terraform', desc: 'Infrastructure as code for repeatable, auditable cloud environments.' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Mobile',
    eyebrow: 'Surfaces and interfaces',
    tools: [
      { name: 'React + Vite', desc: 'Default SPA stack. Fast builds, great DX, and the ecosystem to handle anything.' },
      { name: 'Tailwind CSS', desc: 'Utility-first CSS. Works at every scale and enforces a consistent design system.' },
      { name: 'Framer Motion', desc: 'Animation library for polished, accessible UI transitions.' },
      { name: 'Angular', desc: 'Used for large enterprise frontends where strong opinions and structure pay off.' },
      { name: 'Flutter', desc: 'When a mobile-first, native-feeling UI matters more than web parity.' },
    ],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    eyebrow: 'Daily workflow',
    tools: [
      { name: 'VS Code', desc: 'Editor of choice across all languages. Python, TypeScript, PHP, Dart — one editor rules them all.' },
      { name: 'Claude Code', desc: 'AI-assisted coding directly in the terminal. Dramatically accelerates complex refactors and architecture work.' },
      { name: 'GitHub', desc: 'All code, issues, PR reviews, and CI live here. GitHub Actions for the full automation pipeline.' },
      { name: 'Postman / Insomnia', desc: 'API design, testing, and documentation. Every API gets a collection before it ships.' },
      { name: 'Jupyter Lab', desc: 'Exploratory data analysis, model prototyping, and research notebooks.' },
      { name: 'Warp', desc: 'Modern terminal with AI-assisted command recall and collaborative sessions.' },
      { name: 'Linear', desc: 'Issue tracking and sprint planning. Replaces Jira for any team willing to move fast.' },
      { name: 'Notion', desc: 'Knowledge base, architecture docs, and project wikis.' },
    ],
  },
  {
    id: 'platform',
    label: 'Operating System',
    eyebrow: 'Environment',
    tools: [
      { name: 'Windows 11', desc: 'Primary development machine. WSL2 for Linux tooling when needed, PowerShell for automation.' },
      { name: 'Git Bash / WSL2', desc: 'Unix shell experience on Windows. Most scripts are POSIX-compatible by convention.' },
      { name: 'Remote dev on VPS', desc: 'Production-like environment for testing server-side workloads without leaving the local machine.' },
    ],
  },
];

export default function Uses() {
  return (
    <PageLayout>
      <div className="container-x max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="eyebrow mb-4 block">Setup</span>
          <h1 className="heading gradient-text mb-4">/uses</h1>
          <p className="max-w-2xl text-slate-400 leading-relaxed">
            The tools, languages, and services I use day-to-day to build AI systems,
            lead engineering teams, and ship production software. Inspired by{' '}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              uses.tech
            </a>
            .
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((cat, ci) => (
            <Reveal key={cat.id} delay={ci * 0.05}>
              <section id={cat.id} className="scroll-mt-32">
                <div className="mb-6">
                  <span className="eyebrow mb-1 block text-xs">{cat.eyebrow}</span>
                  <h2 className="font-display text-2xl font-bold text-white">{cat.label}</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {cat.tools.map((tool, ti) => (
                    <Reveal key={tool.name} delay={ci * 0.04 + ti * 0.03}>
                      <div className="glass rounded-2xl p-5 h-full">
                        <h3 className="mb-1.5 font-display font-semibold text-white">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{tool.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Footer nav */}
        <Reveal delay={0.1} className="mt-16 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link to="/now" className="hover:text-cyan transition-colors">What I'm doing now →</Link>
          <Link to="/" className="hover:text-cyan transition-colors">← Back to Portfolio</Link>
        </Reveal>
      </div>
    </PageLayout>
  );
}
