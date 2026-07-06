// Strategy Comparison data. Honest, defensible ranges. Educational estimates,
// not promises. Scores are 1 (weak) to 5 (strong) per filter, used to highlight
// winners per criterion in the Compare tool.

export const FILTERS = [
  { key: 'cashIn', label: 'Cash to get in', hint: 'What it takes to start one unit' },
  { key: 'cashFlow', label: 'Monthly cash flow', hint: 'Income after all expenses' },
  { key: 'time', label: 'Your time', hint: 'Hours it costs you each week' },
  { key: 'risk', label: 'Risk profile', hint: 'What can go wrong, and how badly' },
  { key: 'scale', label: 'Scalability', hint: 'How far the model stretches' },
];

export const STRATEGIES = [
  {
    slug: 'section8',
    name: 'Section 8 Rentals',
    icon: '🏛️',
    color: 'brand',
    summary: 'Buy below market in working-class neighborhoods, rent at the metro payment standard, and the housing authority pays most of the rent directly.',
    scores: { cashIn: 4, cashFlow: 5, time: 4, risk: 5, scale: 5 },
    breakdown: {
      cashIn: '$20,000 to $30,000 per door (down payment, closing, reserves). BRRRR can cut the cash that stays stuck to $10,000 to $17,000.',
      cashFlow: '$300 to $500 per door per month is the realistic band. 15 to 25 percent cash-on-cash when bought right. Rent arrives from the housing authority on schedule.',
      time: 'Front-loaded: learning, inspection prep, tenant placement. A stabilized door needs a few hours a month, less with management.',
      risk: 'Demand rises in downturns. Voucher tenants risk losing the voucher if they violate the lease, which protects you. Main risks: inspection prep and buying in the wrong market.',
      scale: 'The refinance recycle means the same capital buys door after door. This is the strategy the 50 door math is built on.',
    },
    verdict: 'The strongest cash flow per dollar and per hour on this list, with income that holds up when the economy does not.',
  },
  {
    slug: 'traditional',
    name: 'Traditional Rentals',
    icon: '🏠',
    color: 'slate',
    summary: 'Same asset class, market tenants. You collect rent from a private tenant and carry the vacancy and payment risk yourself.',
    scores: { cashIn: 3, cashFlow: 2, time: 4, risk: 3, scale: 4 },
    breakdown: {
      cashIn: '$25,000 to $60,000 per door depending on market. Retail-priced markets need more cash for thinner returns.',
      cashFlow: '$150 to $300 per door is common at today’s rates when bought at market price. Single-digit cash-on-cash is typical without a deep discount.',
      time: 'Similar to Section 8 once stabilized, without the inspection cycle.',
      risk: 'Your tenant is one job loss away from a missed month. Vacancy demand softens exactly when the economy does.',
      scale: 'Scales the same way, but thinner cash flow means each door contributes less and your reserves matter more.',
    },
    verdict: 'The same vehicle with a weaker engine: every risk you carry on Section 8, plus payment risk, minus the guaranteed portion of the rent.',
  },
  {
    slug: 'airbnb',
    name: 'Airbnb / Short-Term',
    icon: '🛏️',
    color: 'sky',
    summary: 'Nightly rentals. Revenue looks big until you subtract the operating load, and it is a hospitality business, not passive income.',
    scores: { cashIn: 2, cashFlow: 3, time: 1, risk: 2, scale: 2 },
    breakdown: {
      cashIn: '$30,000 to $60,000+ per unit: down payment plus furnishing, photography, supplies, and setup before the first booking.',
      cashFlow: 'Gross revenue can be 2 to 3 times a long-term rent, but cleaning, supplies, utilities, platform fees, and 20 to 30 percent management eat most of the gap. Net is seasonal and swings month to month.',
      time: '10+ hours a week self-managed: messages, turnovers, pricing, reviews. Or give up 20 to 30 percent to a manager.',
      risk: 'One city council vote can end your business model. Platform dependency, seasonality, and review fragility stack on top of normal property risk.',
      scale: 'Each unit adds operational load. Scaling means building a hospitality company with staff.',
    },
    verdict: 'A real business that can pay well in the right tourist market, but it buys you a second job, not freedom.',
  },
  {
    slug: 'flip',
    name: 'Fix & Flip',
    icon: '🔨',
    color: 'warning',
    summary: 'Buy distressed, renovate, sell. It generates chunks of cash, not income. The day you stop flipping, the money stops.',
    scores: { cashIn: 2, cashFlow: 1, time: 1, risk: 2, scale: 2 },
    breakdown: {
      cashIn: '$40,000 to $80,000 of exposure per project, or hard money at 10 to 12 percent with points.',
      cashFlow: 'Zero. A good flip pays $20,000 to $60,000 once, taxed as ordinary income. There is no monthly check.',
      time: 'It is a project-management job: contractors, timelines, budgets, listings. Full attention for months per deal.',
      risk: 'You are betting on the sale price months from now. A soft market, a slow rehab, or a surprise system failure eats the margin fast.',
      scale: 'More flips means more of your time. Income scales linearly with effort, like any job.',
    },
    verdict: 'A powerful way to build capital to buy rentals with. It is a paycheck, not a portfolio.',
  },
  {
    slug: 'adu',
    name: 'ADU Build',
    icon: '🏗️',
    color: 'violet',
    summary: 'Build an accessory dwelling unit on property you own. Great rent afterward, but the capital and the wait are enormous.',
    scores: { cashIn: 1, cashFlow: 3, time: 2, risk: 2, scale: 1 },
    breakdown: {
      cashIn: '$100,000 to $250,000 to build, before carrying costs. Financing an ADU build is its own challenge.',
      cashFlow: 'Solid once rented: often $1,000 to $2,000 a month in strong markets. But the cash-on-cash math struggles against the build cost.',
      time: '6 to 18 months of permits, contractors, and inspections before the first dollar of rent.',
      risk: 'Zoning, permit delays, construction overruns. Your capital is illiquid the entire build.',
      scale: 'You can only build so many units in your own backyard. It does not repeat.',
    },
    verdict: 'A fine one-time move if you already own the land. It is a project, not a repeatable path to 50 doors.',
  },
];
