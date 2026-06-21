/**
 * Generates /public/og-image.png (1200×630) for social sharing previews.
 * Run with: npm run generate:og
 * Pure build-time tooling — sharp is a devDependency only.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/og-image.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06070D"/>
      <stop offset="1" stop-color="#0A0C16"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22D3EE"/>
      <stop offset="0.5" stop-color="#6366F1"/>
      <stop offset="1" stop-color="#A78BFA"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#6366F1" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#6366F1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- neural motif -->
  <g stroke="url(#accent)" stroke-width="2" opacity="0.5">
    <line x1="820" y1="140" x2="980" y2="100"/>
    <line x1="980" y1="100" x2="1080" y2="220"/>
    <line x1="820" y1="140" x2="900" y2="300"/>
    <line x1="1080" y1="220" x2="980" y2="380"/>
    <line x1="900" y1="300" x2="980" y2="380"/>
    <line x1="980" y1="100" x2="900" y2="300"/>
  </g>
  <g fill="url(#accent)">
    <circle cx="820" cy="140" r="8"/>
    <circle cx="980" cy="100" r="11"/>
    <circle cx="1080" cy="220" r="8"/>
    <circle cx="900" cy="300" r="9"/>
    <circle cx="980" cy="380" r="11"/>
  </g>

  <!-- accent bar -->
  <rect x="80" y="104" width="64" height="6" rx="3" fill="url(#accent)"/>

  <text x="80" y="152" font-family="Arial, sans-serif" font-size="22" letter-spacing="6" fill="#22D3EE">HEAD OF AI &amp; ENGINEERING LEADER</text>

  <text x="78" y="280" font-family="Arial, sans-serif" font-weight="700" font-size="92" fill="#ffffff">Rana Faraz Ahmed</text>

  <text x="80" y="350" font-family="Arial, sans-serif" font-weight="600" font-size="40" fill="url(#accent)">CTO · AI/ML Architect · RAG Engineer</text>

  <text x="80" y="430" font-family="Arial, sans-serif" font-size="28" fill="#94A3B8">I build and lead the AI that ships — RAG assistants, recommender</text>
  <text x="80" y="470" font-family="Arial, sans-serif" font-size="28" fill="#94A3B8">systems, and NLP/deep-learning personalization.</text>

  <g font-family="Arial, sans-serif" font-size="22" fill="#CBD5E1">
    <text x="80" y="560">11+ years</text>
    <text x="240" y="560" fill="#475569">•</text>
    <text x="270" y="560">PhD · PMP · LLB</text>
    <text x="520" y="560" fill="#475569">•</text>
    <text x="550" y="560">ranafaraz.github.io</text>
  </g>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
