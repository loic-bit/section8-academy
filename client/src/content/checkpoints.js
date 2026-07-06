// Level checkpoints. Pass 5 of 6 to rank up. Retake freely; a wrong answer
// teaches the point back. Unlocks persist via course_progress pseudo-lessons.

export const CHECKPOINTS = {
  operator: {
    id: 'unlock-operator',
    fromRank: 'Scout',
    toRank: 'Operator',
    title: 'Foundation Checkpoint',
    intro: 'Six questions on the foundations. Pass 5 and you rank up to Operator and open the First Deal level. Already experienced? This is your fast track.',
    passMark: 5,
    questions: [
      {
        q: 'What is Fair Market Rent (FMR)?',
        options: [
          'The average rent a landlord hopes to charge',
          'The rent estimate HUD publishes each year by metro and bedroom count',
          'The maximum price you should pay for a property',
          'A rent number negotiated tenant by tenant',
        ],
        correct: 1,
        teach: 'FMR is the number HUD publishes every year for each metro and bedroom count. The payment standard, and your rent, hang off it.',
      },
      {
        q: 'Who pays most of the rent on a Section 8 lease?',
        options: [
          'The tenant, with a government backstop if they miss',
          'A federal escrow account you invoice quarterly',
          'The housing authority, paid directly to the landlord',
          'The property manager collects it all in cash',
        ],
        correct: 2,
        teach: 'The housing authority pays its portion straight to you by direct deposit. The tenant typically pays around 30 percent of their income.',
      },
      {
        q: 'What happens to Section 8 demand in a recession?',
        options: [
          'It rises, because more families qualify for assistance',
          'It falls, because the government cuts vouchers first',
          'It stays flat regardless of the economy',
          'It only changes in tourist markets',
        ],
        correct: 0,
        teach: 'Hard times push more families into the voucher program. Your demand strengthens exactly when market landlords struggle.',
      },
      {
        q: 'Why does this course teach cash flow over appreciation?',
        options: [
          'Appreciation is illegal to underwrite',
          'Cash flow is income you control monthly; appreciation is a bet on future prices',
          'Appreciation only happens in coastal cities',
          'Cash flow properties never lose value',
        ],
        correct: 1,
        teach: 'Appreciation is speculation on what someone pays later. Cash flow pays you now, every month, whatever the market mood is.',
      },
      {
        q: 'The single most important market filter for this model is:',
        options: [
          'Year-over-year population growth',
          'Proximity to a major airport',
          'The ratio of Section 8 rent (FMR) to purchase price',
          'Average school ratings',
        ],
        correct: 2,
        teach: 'High FMR relative to price is the whole game: buy low, rent at the metro payment standard. That ratio decides which cities are even worth analyzing.',
      },
      {
        q: 'The main tradeoff Section 8 asks of a landlord is:',
        options: [
          'Accepting below-market rent forever',
          'An annual inspection standard (HQS) you must pass',
          'Giving the housing authority equity in the deal',
          'Paying the tenant’s utilities',
        ],
        correct: 1,
        teach: 'The HQS inspection is a checklist, not a mystery. Fix the known items during rehab and you pass on the first visit.',
      },
    ],
  },

  portfolio: {
    id: 'unlock-portfolio',
    fromRank: 'Operator',
    toRank: 'Portfolio Builder',
    title: 'First Deal Checkpoint',
    intro: 'Six questions on running a real deal. Pass 5 and you rank up to Portfolio Builder and open the Scale level.',
    passMark: 5,
    questions: [
      {
        q: 'Put the BRRRR steps in order:',
        options: [
          'Buy, Refinance, Rehab, Rent, Repeat',
          'Buy, Rehab, Rent, Refinance, Repeat',
          'Buy, Rent, Rehab, Refinance, Repeat',
          'Budget, Rehab, Refinance, Rent, Repeat',
        ],
        correct: 1,
        teach: 'Buy, Rehab, Rent, Refinance, Repeat. Rent before refinance: the lender wants a stabilized, income-producing property.',
      },
      {
        q: 'A DSCR loan qualifies you based on:',
        options: [
          'Your W2 income and tax returns',
          'Your credit card utilization',
          'The property’s cash flow versus its debt payment',
          'The number of doors you already own',
        ],
        correct: 2,
        teach: 'DSCR = the property qualifies itself. That is why investors use it to scale past what their personal income would support.',
      },
      {
        q: 'Rent reasonableness is:',
        options: [
          'A negotiation tactic for lowering property taxes',
          'The PHA check that your rent is in line with comparable units',
          'A federal cap on annual rent increases',
          'The tenant’s right to dispute rent in court',
        ],
        correct: 1,
        teach: 'Before approving your rent, the housing authority compares it to similar units. Support your number with comps and you get the most it will approve.',
      },
      {
        q: 'Cash-on-cash return is:',
        options: [
          'Annual cash flow divided by the cash you put in',
          'Monthly rent divided by purchase price',
          'Equity divided by loan balance',
          'Appreciation plus principal paydown',
        ],
        correct: 0,
        teach: 'Annual cash flow over cash invested. It tells you how hard your actual dollars are working. Bought right, 15 to 25 percent is the honest band.',
      },
      {
        q: 'A deal misses your cash flow floor by $40 a month, but the house is beautiful. You:',
        options: [
          'Buy it. Character is worth $40.',
          'Raise your rent assumption until it fits',
          'Pass. The buy box exists to protect you from yourself.',
          'Cut the maintenance budget to make it work',
        ],
        correct: 2,
        teach: 'The deals that break investors are the ones they talked themselves into. A written buy box is a filter, not a suggestion.',
      },
      {
        q: 'What makes the refinance recycle work in BRRRR?',
        options: [
          'Interest rates always fall over time',
          'Forced equity: the rehab makes the property worth more than your all-in cost',
          'Banks refund your closing costs after a year',
          'Appreciation during the rehab months',
        ],
        correct: 1,
        teach: 'You create the equity with the rehab. Refinancing against the new value hands your capital back so the same dollars buy the next deal.',
      },
    ],
  },
};

export const RANKS = [
  { key: 'scout', name: 'Scout', icon: '🧭', level: 1 },
  { key: 'operator', name: 'Operator', icon: '🔑', level: 2 },
  { key: 'portfolio', name: 'Portfolio Builder', icon: '🏘️', level: 3 },
];

// Rank from the completed-progress set (which contains unlock pseudo-ids).
export function rankFor(completedSet) {
  if (completedSet.has('unlock-portfolio')) return RANKS[2];
  if (completedSet.has('unlock-operator')) return RANKS[1];
  return RANKS[0];
}
