// Course curriculum + real lesson content for Cashflow 2.0 Academy.
// Voice: first person as Joseph (the instructor). No em dashes.
// Each lesson `body` is an array of blocks the LessonBody component renders:
//   { h: '...' }            heading
//   { p: '...' }            paragraph
//   { list: ['...'] }       bullet list
//   { steps: ['...'] }      numbered list
//   { tip: '...' }          highlighted takeaway
//   { link: {to,label} }    in-app link to a tool

export const MODULES = [
  {
    id: 'm1',
    title: 'Module 1: Section 8 Foundations',
    summary: 'What the program is, why the cash flow is so reliable, and how to read the rent numbers.',
    lessons: [
      {
        id: 'm1l1',
        title: 'Why Section 8 beats traditional rentals',
        minutes: 6,
        body: [
          { p: 'When I started buying rentals, I did what everyone else does: chase appreciation in "nice" areas and hope the tenant pays on time. Section 8 flipped that for me. The government pays most or all of the rent, direct deposit, on the first of the month, every month. My job stopped being rent collection and became buying the right house at the right price.' },
          { h: 'The three reasons I moved my whole portfolio to Section 8' },
          { list: [
            'Reliable rent. The housing authority pays its portion straight to me. That is the most predictable income in real estate.',
            'Rents that hold in a downturn. Voucher demand goes up when the economy gets hard, not down. My occupancy is strongest exactly when other landlords struggle.',
            'Below-market buy prices, at-or-above-market rent. I buy in working-class neighborhoods where prices are low, but the voucher pays the area Fair Market Rent. That gap is where the cash flow lives.',
          ] },
          { h: 'The tradeoff to go in with eyes open' },
          { p: 'Section 8 comes with an inspection before the tenant moves in, and a re-inspection each year. That is not a reason to avoid it. It is a checklist. Once you know what inspectors look for, you fix those items during your rehab and you pass on the first try. I cover the exact inspection items later in the course.' },
          { tip: 'The whole model is simple: buy cheap in a strong-voucher market, meet the inspection standard, and let the housing authority be your most dependable tenant.' },
        ],
      },
      {
        id: 'm1l2',
        title: 'How the voucher program actually works',
        minutes: 7,
        body: [
          { p: 'Section 8 is officially the Housing Choice Voucher program. A local Public Housing Authority (PHA) runs it in each area. Understanding the flow of money and paperwork is what makes the rest of this easy.' },
          { h: 'The flow, start to finish' },
          { steps: [
            'A tenant qualifies for a voucher based on income. The voucher sets how much rent the PHA will subsidize.',
            'The tenant finds my listing and applies. I screen them like any tenant: income, background, rental history, references.',
            'I submit a Request for Tenancy Approval (RFTA) to the PHA with my proposed rent.',
            'The PHA inspects the unit. It has to meet Housing Quality Standards (HQS).',
            'The PHA runs a rent reasonableness check so my rent is in line with comparable units.',
            'We sign a HAP (Housing Assistance Payments) contract. The PHA pays its portion to me directly; the tenant pays any small remainder.',
          ] },
          { h: 'Who pays what' },
          { p: 'The tenant generally pays around 30 percent of their income toward rent, and the voucher covers the rest up to the payment standard. In a lot of my deals the voucher covers the entire rent, so I collect one clean payment from the PHA and nothing from the tenant.' },
          { tip: 'Your relationship with the local PHA matters. Learn your caseworkers, submit clean paperwork, and you move to the front of the line every time.' },
        ],
      },
      {
        id: 'm1l3',
        title: 'Fair Market Rents (FMR) explained',
        minutes: 5,
        body: [
          { p: 'Fair Market Rent is the number everything hinges on. It is the rent estimate HUD publishes each year for every metro area, by bedroom count. The PHA uses it (via the payment standard) to decide how much voucher money a unit can command.' },
          { h: 'How I use FMR before I ever make an offer' },
          { list: [
            'Look up the FMR for the metro and bedroom count I am targeting. HUD publishes it free every year.',
            'Compare that rent against the purchase prices in the same zip codes.',
            'The markets where FMR is high relative to price are where I buy. That ratio is the entire game.',
          ] },
          { h: 'A quick example' },
          { p: 'A 3-bedroom FMR of 1,500 dollars against a purchase price of 120,000 dollars is a strong rent-to-price ratio. The same 1,500 dollar rent against a 260,000 dollar house is a weak one. Same rent, completely different deal. FMR tells me the rent side before I spend a dollar analyzing the house.' },
          { p: 'Once you have an FMR and a price, plug them straight into the deal calculator to see the cash flow.' },
          { link: { to: '/calculators', label: 'Open the Deal Calculator' } },
          { tip: 'High FMR relative to price is the single filter that decides which cities I even look at. Get this number first, always.' },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Finding & Analyzing Deals',
    summary: 'Define what you buy, run the numbers the same way every time, and pick the right strategy.',
    lessons: [
      {
        id: 'm2l1',
        title: 'Building your buy box',
        minutes: 6,
        body: [
          { p: 'A buy box is a one-page definition of exactly what you will buy. It is how I look at 100 listings and say no to 97 of them in minutes instead of agonizing over each one. Without it you buy on emotion. With it you buy on math.' },
          { h: 'What goes in my Section 8 buy box' },
          { list: [
            'Market: metros with high FMR-to-price and a PHA that pays close to full FMR.',
            'Property type: 3 bed / 1 to 2 bath single family or small multi. Three-bed vouchers are in the highest demand.',
            'Price range: what I can buy and rehab and still hit my cash flow target.',
            'Condition: light-to-moderate rehab only, until you have a crew you trust.',
            'Rent-to-price ratio: my minimum monthly rent as a percent of all-in cost.',
            'Cash flow floor: the minimum dollars per month per door I accept.',
          ] },
          { h: 'Why the floor matters' },
          { p: 'I set a hard minimum for cash flow per door and I do not break it, no matter how nice the house looks. The deals that broke other investors were the ones where they talked themselves past their own rules. Your buy box protects you from yourself.' },
          { tip: 'Write your buy box down. A rule in your head is a suggestion. A rule on paper is a filter.' },
        ],
      },
      {
        id: 'm2l2',
        title: 'Running the numbers',
        minutes: 7,
        body: [
          { p: 'Every deal I run goes through the same math, in the same order, so I can compare them apples to apples. The deal calculator in this dashboard does this for you. Here is what each number means and what I want to see.' },
          { h: 'The inputs that move the answer' },
          { list: [
            'Purchase price and down payment: sets your loan and your cash in.',
            'Section 8 monthly rent: use the FMR, not a hopeful number.',
            'Taxes and insurance: pull real numbers for the specific county, do not guess.',
            'Vacancy, maintenance, and management: I budget for these even when I self-manage, because my time is not free.',
          ] },
          { h: 'The outputs I actually judge on' },
          { list: [
            'Monthly cash flow: the dollars left after every expense and the mortgage. This is the number.',
            'Cash-on-cash return: annual cash flow divided by the cash I put in. Tells me how hard my money is working.',
            'Cap rate: net operating income over price. Useful for comparing properties independent of financing.',
          ] },
          { p: 'Plug your deal in and watch the monthly cash flow turn green. If it is red, the deal does not fit the box, and no amount of wishing changes that.' },
          { link: { to: '/calculators', label: 'Run a deal in the calculator' } },
          { tip: 'Conservative inputs, honest outputs. A deal that only works with perfect assumptions is not a deal.' },
        ],
      },
      {
        id: 'm2l3',
        title: 'Turnkey vs BRRRR for Section 8',
        minutes: 6,
        body: [
          { p: 'There are two ways I add a door, and the right one depends on how much time, cash, and appetite for rehab you have. Neither is better. They are tools for different situations.' },
          { h: 'Turnkey' },
          { p: 'I buy a property that is already renovated and often already rented to a voucher tenant. I pay a bit more, but I own cash flow on day one with almost no work. This is how I tell brand-new investors to start. Get one clean win, learn the paperwork, then get more aggressive.' },
          { h: 'BRRRR' },
          { p: 'Buy, Rehab, Rent, Refinance, Repeat. I buy a distressed house cheap, renovate it to the inspection standard, place a voucher tenant, then refinance to pull most of my cash back out. Done right, I recycle the same down payment into deal after deal. More work and more risk, far more scalable.' },
          { h: 'How I choose' },
          { list: [
            'Short on time, want a fast first win: turnkey.',
            'Have a rehab crew and want to recycle capital: BRRRR.',
            'Either way, the buy box and the calculator stay the same.',
          ] },
          { tip: 'Start turnkey to learn the game, move to BRRRR to scale it. That is the exact path I took.' },
        ],
      },
    ],
  },
  {
    id: 'm3',
    title: 'Module 3: Funding & Scaling to 50 Doors',
    summary: 'How to fund the first deal, recycle your capital, and put systems in so the portfolio runs without you.',
    lessons: [
      {
        id: 'm3l1',
        title: 'Financing your first deal',
        minutes: 6,
        body: [
          { p: 'The number one thing that stops new investors is thinking they need all cash. You do not. Here are the ways I have funded Section 8 deals, roughly in the order I reach for them.' },
          { list: [
            'Conventional loan: 20 to 25 percent down on an investment property. Cheapest money if you qualify.',
            'DSCR loan: qualifies on the property cash flow, not your W2. This is how a lot of my investors scale past the point where banks cap them.',
            'Local and community banks: they know the neighborhoods and will often lend on the smaller deals big banks ignore.',
            'Private money and partnerships: someone brings the capital, I bring the deal and the system, we split it.',
          ] },
          { h: 'What lenders want to see' },
          { p: 'A clean deal on paper. Realistic rent (the FMR), real expenses, and cash flow that covers the debt comfortably. When your calculator numbers are honest, financing gets a lot easier, because the property qualifies itself.' },
          { tip: 'You do not need to be rich to start. You need one fundable deal and one lender who understands the model.' },
        ],
      },
      {
        id: 'm3l2',
        title: 'Recycling capital with refinances',
        minutes: 6,
        body: [
          { p: 'This is the lesson that changed my trajectory. If every deal ties up a fresh down payment, you run out of money after a couple of houses. The refinance is how I stop that from happening.' },
          { h: 'How the recycle works' },
          { steps: [
            'Buy a property below market, usually one that needs work.',
            'Rehab it to the inspection standard and place a voucher tenant so it is producing income.',
            'Once it is rented and seasoned, refinance based on the new, higher value.',
            'Pull most or all of my original cash back out, tax-free because it is a loan, not income.',
            'Move that same cash into the next deal and do it again.',
          ] },
          { p: 'The house keeps cash flowing the whole time, and my capital is free to go to work somewhere else. That is how a modest amount of starting money turns into a portfolio.' },
          { tip: 'Forcing value through rehab is what makes the refinance work. You are not waiting on the market. You are creating the equity yourself.' },
        ],
      },
      {
        id: 'm3l3',
        title: 'Systems to scale past 10 units',
        minutes: 7,
        body: [
          { p: 'The first few doors you can run off your phone and a notebook. Somewhere around ten, the mess catches up with you. Scaling is not about working harder. It is about building the systems before you need them.' },
          { h: 'The systems I put in early' },
          { list: [
            'A repeatable deal pipeline: agents and wholesalers who know my buy box and send me deals that already fit.',
            'A rehab checklist built around the inspection, so every property passes the first time.',
            'Property management that understands Section 8, or a documented process if you self-manage.',
            'A simple dashboard for rents, inspections, and renewals so nothing slips.',
            'Clean bookkeeping from day one, because lenders and refinances live on your numbers.',
          ] },
          { h: 'The mindset shift' },
          { p: 'Past ten doors I stopped thinking like a handyman and started thinking like an operator. My job became the buy box, the capital, and the systems. Everything repeatable got documented and handed off. That is what let me keep growing without drowning.' },
          { tip: 'Build the system at three doors that you will need at thirty. The investors who scale are the ones who got organized before they had to.' },
        ],
      },
    ],
  },
];

export const TOTAL_LESSONS = MODULES.reduce((n, m) => n + m.lessons.length, 0);
