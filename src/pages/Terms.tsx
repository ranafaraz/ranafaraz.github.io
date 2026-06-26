import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Reveal from '../components/Reveal';

const EFFECTIVE_DATE = 'June 27, 2026';
const CONTACT_EMAIL = 'ranafarazahmed@gmail.com';

type Section = { id: string; title: string; content: React.ReactNode };

const sections: Section[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <p>
        By accessing or using <strong>ranafaraz.github.io</strong> (the "Site") or any
        applications developed by Rana Faraz Ahmed ("I", "me"), you agree to be bound by
        these Terms of Service. If you do not agree, please discontinue use immediately.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: '2. Intellectual Property',
    content: (
      <>
        <p>
          All content on this Site — including text, code, design, graphics, and
          project descriptions — is the intellectual property of Rana Faraz Ahmed unless
          otherwise noted, and is protected by applicable copyright and IP laws.
        </p>
        <p>
          Open-source projects linked from this Site are governed by their individual
          licences (MIT, Apache 2.0, etc.) as stated in each repository. Those licences
          take precedence over these terms for those projects.
        </p>
        <p>
          You may <strong>share links</strong> to this Site and <strong>reference my
          work</strong> with proper attribution. You may <strong>not</strong> reproduce,
          republish, or distribute substantial portions of the content for commercial
          purposes without prior written consent.
        </p>
      </>
    ),
  },
  {
    id: 'permitted-use',
    title: '3. Permitted Use',
    content: (
      <>
        <p>You may use the Site for lawful, personal, and non-commercial purposes. You agree not to:</p>
        <ul>
          <li>Scrape, harvest, or systematically extract content beyond reasonable indexing</li>
          <li>Attempt to disrupt or overload the Site's hosting infrastructure</li>
          <li>Misrepresent your affiliation with me or impersonate me</li>
          <li>Use the Site in any way that violates applicable law</li>
        </ul>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: '4. Disclaimer of Warranties',
    content: (
      <p>
        The Site and its content are provided <strong>"as is"</strong> without warranties
        of any kind, express or implied, including but not limited to warranties of
        merchantability, fitness for a particular purpose, or non-infringement. I do not
        warrant that the Site will be error-free, uninterrupted, or free of viruses.
        Project descriptions, metrics, and technical details reflect information available
        at the time of writing and may not be current.
      </p>
    ),
  },
  {
    id: 'limitation',
    title: '5. Limitation of Liability',
    content: (
      <p>
        To the maximum extent permitted by law, I shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from your use of
        (or inability to use) the Site or any linked resources, even if I have been
        advised of the possibility of such damages.
      </p>
    ),
  },
  {
    id: 'external-links',
    title: '6. External Links',
    content: (
      <p>
        The Site contains links to third-party websites, live demos, GitHub repositories,
        and publications. These links are provided for convenience and information only.
        I have no control over the content, privacy practices, or availability of
        external sites, and I do not endorse or assume responsibility for them.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: '7. Privacy',
    content: (
      <p>
        Your use of the Site is also governed by my{' '}
        <Link to="/privacy-policy" className="text-cyan hover:underline">
          Privacy Policy
        </Link>
        , which is incorporated into these Terms by reference.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '8. Changes to These Terms',
    content: (
      <p>
        I reserve the right to modify these Terms at any time. Changes take effect when
        posted with an updated effective date. Continued use of the Site after changes
        are posted constitutes your acceptance of the updated Terms.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: (
      <p>
        These Terms are governed by and construed in accordance with applicable laws,
        without regard to conflict-of-law provisions. Any disputes arising under these
        Terms shall be subject to the exclusive jurisdiction of the competent courts.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '10. Contact',
    content: (
      <p>
        Questions about these Terms? Email me at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <PageLayout>
      <div className="container-x max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="eyebrow mb-4 block">Legal</span>
          <h1 className="heading gradient-text mb-4">Terms of Service</h1>
          <p className="text-slate-400">
            Effective date: <strong className="text-slate-300">{EFFECTIVE_DATE}</strong>
          </p>
        </motion.div>

        {/* Table of Contents */}
        <Reveal delay={0.1}>
          <nav className="glass mb-10 rounded-2xl p-6" aria-label="Table of contents">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan">Contents</h2>
            <ol className="space-y-1 text-sm text-slate-400">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-cyan transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <section id={s.id} className="glass rounded-2xl p-8 scroll-mt-32">
                <h2 className="mb-4 font-display text-xl font-bold text-white">{s.title}</h2>
                <div className="text-slate-400 leading-relaxed space-y-3 [&_a]:text-cyan [&_a]:hover:underline [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:list-disc [&_strong]:text-slate-300">
                  {s.content}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Footer nav */}
        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link to="/privacy-policy" className="hover:text-cyan transition-colors">Privacy Policy →</Link>
          <Link to="/" className="hover:text-cyan transition-colors">← Back to Portfolio</Link>
        </Reveal>
      </div>
    </PageLayout>
  );
}
