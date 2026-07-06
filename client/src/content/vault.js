// Toolkit Vault assembler. Each category lives in ./vault/<name>.js as a default
// export { category, assets:[{ slug, name, kind, icon, tagline, linkedTool?, body:[blocks] }] }.
import analysis from './vault/analysis.js';
import market from './vault/market.js';
import financing from './vault/financing.js';
import processCat from './vault/process.js';
import management from './vault/management.js';
import scaling from './vault/scaling.js';

export const CATEGORIES = [analysis, market, financing, processCat, management, scaling];

// Flat list of every content asset, each stamped with its category.
export const VAULT = CATEGORIES.flatMap((c) => c.assets.map((a) => ({ ...a, category: c.category })));

export const vaultBySlug = (slug) => VAULT.find((a) => a.slug === slug);

// The live interactive tools, surfaced at the top of the Vault.
export const TOOLS = [
  {
    to: '/calculators',
    name: 'Deal Calculator',
    kind: 'Calculator',
    icon: '🧮',
    level: 2,
    tagline: 'Run cash flow, cash-on-cash, and cap rate on any deal in seconds.',
  },
  {
    to: '/brrrr',
    name: 'BRRRR Calculator',
    kind: 'Calculator',
    icon: '♻️',
    level: 2,
    tagline: 'See how much of your cash you get back out of a buy-rehab-refinance deal.',
  },
  {
    to: '/plan',
    name: 'Goal Planner',
    kind: 'Calculator',
    icon: '🎯',
    level: 2,
    tagline: 'Turnkey vs BRRRR: set a goal and see how fast each strategy gets you there.',
  },
  {
    to: '/fifty-doors',
    name: 'Path to 50 Doors',
    kind: 'Calculator',
    icon: '🚪',
    level: 3,
    tagline: 'The recycling math: your deals set the timeline, not your salary.',
  },
  {
    to: '/quiz',
    name: 'Readiness Quiz',
    kind: 'Quiz',
    icon: '🧭',
    level: 1,
    tagline: 'Eight questions. Your investor profile and next three moves.',
  },
  {
    to: '/compare',
    name: 'Strategy Comparison',
    kind: 'Interactive',
    icon: '⚖️',
    level: 1,
    tagline: 'Airbnb, flips, ADUs, rentals, Section 8: the same five filters, honestly.',
  },
];
