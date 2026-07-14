// Kit definitions: the 23 written vault assets grouped into 6 stage-aligned
// kits so the Toolkit reads as a handful of purposeful bundles, not a wall of
// cards. Intros (one paragraph each) live in kitIntros.js.
import kitIntros from './kitIntros.js';

export const KITS = [
  {
    slug: 'market-buy-box',
    name: 'Market & Buy Box Kit',
    icon: '🗺️',
    level: 2,
    tagline: 'Pick a market with real numbers and define exactly what you buy.',
    assets: ['market-scorecard', 'fmr-rent-research', 'buy-box-worksheet'],
  },
  {
    slug: 'deal-analysis',
    name: 'Deal Analysis Kit',
    icon: '✅',
    level: 2,
    tagline: 'Run the numbers the same way every time, before you offer.',
    assets: ['deal-analysis-checklist', 'rehab-cost-estimator', 'rule-1-and-50'],
  },
  {
    slug: 'financing',
    name: 'Financing Kit',
    icon: '🏦',
    level: 2,
    tagline: 'Every way to fund a deal, and the questions that vet a lender.',
    assets: ['financing-options-matrix', 'dscr-loan-guide', 'creative-financing-playbook', 'lender-questions-checklist'],
  },
  {
    slug: 'section8-paperwork',
    name: 'Section 8 Paperwork Kit',
    icon: '📋',
    level: 2,
    tagline: 'From inspection to first housing authority payment, step by step.',
    assets: ['hqs-inspection-checklist', 'rfta-hap-guide', 'tenant-screening-criteria', 'rent-reasonableness-guide'],
  },
  {
    slug: 'landlord',
    name: 'Landlord Kit',
    icon: '🛠️',
    level: 3,
    tagline: 'Operate the unit, handle problems, protect what you build.',
    assets: ['property-management-sop', 'lease-addendum-guide', 'eviction-process-map', 'entity-structure-guide'],
  },
  {
    slug: 'scale-wealth',
    name: 'Scale & Wealth Kit',
    icon: '🚀',
    level: 3,
    tagline: 'Recycle capital, keep more after tax, and map the path to 50.',
    assets: ['50-doors-roadmap', 'capital-recycling-playbook', 'tax-strategy-guide', 'net-worth-projection'],
  },
];

export const kitBySlug = (slug) => KITS.find((k) => k.slug === slug);
export const kitForAsset = (assetSlug) => KITS.find((k) => k.assets.includes(assetSlug));
export const kitIntro = (slug) => kitIntros[slug] || '';
