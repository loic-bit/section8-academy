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

// The live interactive calculators, surfaced at the top of the Vault.
export const TOOLS = [
  {
    to: '/calculators',
    name: 'Deal Calculator',
    kind: 'Calculator',
    icon: '🧮',
    tagline: 'Run cash flow, cash-on-cash, and cap rate on any deal in seconds.',
  },
  {
    to: '/brrrr',
    name: 'BRRRR Calculator',
    kind: 'Calculator',
    icon: '♻️',
    tagline: 'See how much of your cash you get back out of a buy-rehab-refinance deal.',
  },
];
