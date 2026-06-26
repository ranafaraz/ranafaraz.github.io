import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Reveal from '../components/Reveal';

const EFFECTIVE_DATE = 'June 27, 2026';
const CONTACT_EMAIL = 'ranafarazahmed@gmail.com';

type Section = { id: string; title: string; content: React.ReactNode };

const sections: Section[] = [
  {
    id: 'overview',
    title: '1. Overview',
    content: (
      <>
        <p>
          This Privacy Policy describes how Rana Faraz Ahmed ("I", "me", "my") handles
          information in connection with:
        </p>
        <ul>
          <li>This portfolio website at <strong>ranafaraz.github.io</strong></li>
          <li>
            Android and mobile applications published under the developer account
            <strong> Rana Faraz Ahmed</strong> on the Google Play Store, App Store, and
            other distribution platforms
          </li>
        </ul>
        <p>
          I take your privacy seriously. My default posture is to collect as little data
          as possible and to be transparent about what I do collect.
        </p>
      </>
    ),
  },
  {
    id: 'portfolio-data',
    title: '2. Portfolio Website — Data Collected',
    content: (
      <>
        <p>
          The portfolio website (<strong>ranafaraz.github.io</strong>) itself does{' '}
          <strong>not</strong> set tracking cookies, fingerprint your browser, or run
          server-side analytics.
        </p>
        <h4>What is stored locally in your browser</h4>
        <ul>
          <li>
            <strong>Theme preference</strong> — If you toggle light/dark mode, that
            choice is saved in <code>localStorage</code> on your device only. It is never
            transmitted anywhere.
          </li>
        </ul>
        <h4>Contact form</h4>
        <p>
          If you send a message via the contact form, your <strong>name</strong>,{' '}
          <strong>email address</strong>, and <strong>message body</strong> are used solely
          to reply to your inquiry. This information is not sold, shared with third parties,
          or used for marketing.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    title: '3. Third-Party Services (Portfolio Website)',
    content: (
      <>
        <p>
          The portfolio website uses the following third-party services that may process
          data independently:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
                <th>Data that may be collected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Fonts</td>
                <td>Web typography</td>
                <td>IP address, browser user-agent, referrer per Google's privacy policy</td>
              </tr>
              <tr>
                <td>GitHub Pages</td>
                <td>Hosting</td>
                <td>IP address, access logs per GitHub's privacy policy</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          I do not currently use Google Analytics, Meta Pixel, or any other behavioural
          analytics tool on this site. If that changes, this policy will be updated.
        </p>
      </>
    ),
  },
  {
    id: 'android-apps',
    title: '4. Android & Mobile Applications',
    content: (
      <>
        <p>
          Applications I publish may collect data relevant to their specific function.
          Each app's data practices are described on its respective store listing and,
          where applicable, within the app itself.
        </p>
        <p>
          <strong>This page serves as the general umbrella Privacy Policy</strong> for
          all applications developed and published by Rana Faraz Ahmed where no
          separate, app-specific policy is provided. If you arrived here from a Google
          Play Store listing or an in-app link, the practices described in this document
          apply to that application.
        </p>
        <h4>Typical data handling in my apps</h4>
        <ul>
          <li>
            <strong>No data sold to third parties.</strong> I do not sell, rent, or trade
            your personal information.
          </li>
          <li>
            <strong>Minimal collection.</strong> I collect only what is necessary for the
            app's stated purpose.
          </li>
          <li>
            <strong>No behavioural advertising.</strong> I do not build advertising
            profiles or share data with ad networks.
          </li>
          <li>
            <strong>Permissions.</strong> Any sensitive Android permissions (camera,
            microphone, contacts, location) are requested only when needed and explained
            in context.
          </li>
        </ul>
        <p>
          For questions about a specific application's data practices, contact me at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: "5. Children's Privacy",
    content: (
      <p>
        My services are not directed at children under the age of 13 (or 16 in the EU
        under GDPR). I do not knowingly collect personal information from children. If
        you believe a child has provided personal information, please contact me
        immediately so I can delete it.
      </p>
    ),
  },
  {
    id: 'retention',
    title: '6. Data Retention',
    content: (
      <p>
        Contact form submissions are retained only as long as necessary to respond to
        your inquiry and are then deleted. App-specific data retention periods are
        described on the relevant store listing or in-app documentation.
      </p>
    ),
  },
  {
    id: 'rights',
    title: '7. Your Rights',
    content: (
      <>
        <p>
          Depending on your jurisdiction, you may have the right to access, correct,
          or delete personal data I hold about you. To exercise any of these rights,
          email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and I will
          respond within 30 days.
        </p>
        <ul>
          <li><strong>GDPR (EU/EEA):</strong> You have rights of access, rectification, erasure, restriction, portability, and objection.</li>
          <li><strong>CCPA (California):</strong> You have the right to know, delete, and opt out of sale. I do not sell data.</li>
          <li><strong>General:</strong> You may withdraw consent at any time where processing is based on consent.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: '8. Security',
    content: (
      <p>
        I take reasonable technical measures to protect any information in my custody.
        The portfolio site is served exclusively over HTTPS. However, no method of
        transmission or storage is 100% secure; I cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '9. Changes to This Policy',
    content: (
      <p>
        I may update this policy from time to time. Material changes will be reflected
        with an updated effective date at the top of this page. Continued use of my
        website or applications after changes are posted constitutes acceptance of the
        updated policy.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '10. Contact',
    content: (
      <p>
        Questions, data requests, or concerns? Email me at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. I aim to respond within
        5 business days.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
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
          <h1 className="heading gradient-text mb-4">Privacy Policy</h1>
          <p className="text-slate-400">
            Effective date: <strong className="text-slate-300">{EFFECTIVE_DATE}</strong>
          </p>
          <p className="mt-4 text-slate-400">
            This policy covers <strong className="text-slate-300">ranafaraz.github.io</strong> and
            all applications published by Rana Faraz Ahmed. It is suitable for linking
            from Google Play Store listings, App Store submissions, and other platforms
            that require a developer privacy policy URL.
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
        <div className="prose-policy space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <section id={s.id} className="glass rounded-2xl p-8 scroll-mt-32">
                <h2 className="mb-4 font-display text-xl font-bold text-white">{s.title}</h2>
                <div className="policy-body text-slate-400 leading-relaxed space-y-3 [&_h4]:mt-5 [&_h4]:mb-2 [&_h4]:font-semibold [&_h4]:text-slate-300 [&_a]:text-cyan [&_a]:hover:underline [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:list-disc [&_strong]:text-slate-300 [&_code]:text-cyan [&_code]:font-mono [&_code]:text-sm [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:text-slate-300 [&_th]:pb-2 [&_th]:border-b [&_th]:border-white/10 [&_td]:py-2 [&_td]:border-b [&_td]:border-white/5 [&_td]:align-top [&_td]:pr-4">
                  {s.content}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Footer nav */}
        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link to="/terms" className="hover:text-cyan transition-colors">Terms of Service →</Link>
          <Link to="/" className="hover:text-cyan transition-colors">← Back to Portfolio</Link>
        </Reveal>
      </div>
    </PageLayout>
  );
}
