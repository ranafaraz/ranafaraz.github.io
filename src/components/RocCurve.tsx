import { motion } from 'framer-motion';

/**
 * Illustrative ROC-curve motif. The curve shape is decorative — only the
 * labeled 0.957 ROC-AUC value is a real reported metric.
 */
export default function RocCurve() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-cyan">
          ROC-AUC
        </span>
        <span className="font-display text-2xl font-bold gradient-text">
          0.957
        </span>
      </div>
      <svg viewBox="0 0 120 120" className="w-full" role="img" aria-label="Illustrative ROC curve">
        {/* grid */}
        {[0, 30, 60, 90, 120].map((g) => (
          <g key={g} stroke="rgba(148,163,184,0.12)" strokeWidth="0.5">
            <line x1={g} y1="0" x2={g} y2="120" />
            <line x1="0" y1={g} x2="120" y2={g} />
          </g>
        ))}
        {/* chance diagonal */}
        <line
          x1="0"
          y1="120"
          x2="120"
          y2="0"
          stroke="rgba(148,163,184,0.4)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />
        {/* ROC curve (decorative shape) */}
        <motion.path
          d="M0 120 C 12 50, 30 22, 60 12 C 85 4, 105 2, 120 0"
          fill="none"
          stroke="url(#rocGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="rocGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-slate-500">
        <span>False positive rate</span>
        <span className="italic">illustrative</span>
      </div>
    </div>
  );
}
