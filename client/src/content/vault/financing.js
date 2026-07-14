export default {
  category: 'Financing',
  assets: [
    {
      slug: 'financing-options-matrix',
      name: 'Financing Options Matrix',
      kind: 'Matrix',
      icon: '🏦',
      tagline: 'Every way I fund a deal, side by side, with down payment and best use.',
      linkedTool: '/calculators',
      body: [
        { h: 'How to read this matrix' },
        { p: 'I do not marry one financing method. I match the method to the deal, the property condition, and how much cash I want to keep in my pocket. Here is every tool I actually use, with the real down payment range and the situation each one fits best.' },
        { h: 'The seven ways I fund deals' },
        { list: [
          'Conventional loan: 20 to 25 percent down on an investment property. Pros: lowest rates, 30 year fixed, predictable. Best fit: a clean, rent-ready property when I have W2 income and my debt-to-income still has room.',
          'DSCR loan: 20 to 25 percent down. Pros: qualifies on the property cash flow, no W2 or tax returns, no personal DTI cap, closes in an LLC. Best fit: when I already own a few doors and my DTI is maxed but the deal cash flows.',
          'FHA house hack: 3.5 percent down. Pros: lowest cash to close, low rate, one to four units. Best fit: my first deal when I am willing to live in one unit for a year and rent the others.',
          'Hard money: 10 to 20 percent down plus points. Pros: fast close, funds rehab, based on the after-repair value. Best fit: a BRRRR or flip where I refinance out within six to twelve months. Rates are 10 to 13 percent so it is short term only.',
          'Private money: negotiable, often zero to 20 percent down. Pros: flexible terms, fast, relationship based. Best fit: when I have a person who wants 8 to 12 percent on their money secured by real estate.',
          'Seller financing: often 5 to 15 percent down. Pros: no bank, negotiable rate and term, seller becomes the lender. Best fit: a free-and-clear property with a motivated seller who wants monthly income and to spread out taxes.',
          'Partnerships: zero of my own cash if my partner funds it. Pros: split the down payment or split money and work. Best fit: when I bring the deal and the operation and a partner brings the capital.'
        ] },
        { h: 'How I choose' },
        { steps: [
          'Ask how much cash I want to keep. Low cash pushes me to FHA, seller finance, private money, or a partner.',
          'Ask the property condition. Rent-ready fits conventional or DSCR. Needs rehab fits hard or private money into a BRRRR.',
          'Ask my qualification. Maxed DTI pushes me to DSCR, seller finance, or a partner.',
          'Run the numbers on the exact structure before I commit.'
        ] },
        { link: { to: '/calculators', label: 'Open the Calculators' } },
        { tip: 'The best financing is the one that keeps the most cash in your pocket while the deal still cash flows. Do not chase the lowest rate if it drains every dollar you have.' }
      ]
    },
    {
      slug: 'dscr-loan-guide',
      name: 'DSCR Loan Guide',
      kind: 'Guide',
      icon: '📄',
      tagline: 'The loan that qualifies on the property, not your W2.',
      linkedTool: '/calculators',
      body: [
        { h: 'What a DSCR loan actually is' },
        { p: 'DSCR stands for Debt Service Coverage Ratio. A DSCR lender does not care about my W2, my tax returns, or my personal debt-to-income. They care about one thing: does the rent cover the mortgage. That is why this loan is how most investors keep buying after the bank tells them their DTI is maxed out.' },
        { h: 'How the ratio works' },
        { p: 'The ratio is the monthly rent divided by the total monthly payment of principal, interest, taxes, insurance, and any HOA. A ratio of 1.0 means the rent exactly covers the payment. A ratio of 1.25 means the rent is 25 percent more than the payment.' },
        { list: [
          'DSCR of 1.25: strong, gets the best pricing.',
          'DSCR of 1.0 to 1.24: usually approvable, slightly higher rate.',
          'DSCR below 1.0: the property does not cover itself, many lenders decline or require more down.'
        ] },
        { h: 'Typical terms I see' },
        { list: [
          'Down payment: 20 to 25 percent.',
          'Rates: usually 1 to 2 percent above a conventional investor rate.',
          'Credit: most want a 660 minimum, better pricing above 700.',
          'Closes in an LLC, which keeps the loan off my personal credit.',
          'Seasoning: many allow a cash-out refinance after 3 to 6 months, which matters for BRRRR.'
        ] },
        { h: 'When I use it' },
        { steps: [
          'I have income but my personal DTI is full from earlier properties.',
          'I want to keep buying without a lender counting every door against me.',
          'I want the loan in an LLC for liability and clean bookkeeping.',
          'For Section 8, I count the full contract rent, the tenant portion plus the HAP payment, when I show the lender the numbers.'
        ] },
        { link: { to: '/brrrr', label: 'Open the BRRRR Calculator' } },
        { tip: 'DSCR is how you scale past four or five doors. Once the property qualifies itself, you are limited by cash and good deals, not by your paycheck.' }
      ]
    },
    {
      slug: 'creative-financing-playbook',
      name: 'Private Money & Partnerships Playbook',
      kind: 'Playbook',
      icon: '🎯',
      tagline: 'How I fund deals without a bank, and why I skip seller financing.',
      body: [
        { p: 'When people say creative financing they usually mean three things: seller financing, private money, and partnerships. I use two of them. This playbook covers how I structure the two that work, and why I want you to skip the one the internet will not stop selling you.' },
        { h: 'First: why I skip seller financing' },
        { list: [
          'Adverse selection: a seller with a clean, cash-flowing house gets full price on the open market. The ones offering terms are usually moving a problem.',
          'You pay for the terms: padded price, higher rate, or a balloon payment that comes due whether or not you are ready.',
          'It kills the recycle: this model runs on buy below market, renovate, refinance at the new value. Seller-carried notes and wrapped titles make that refinance messy or impossible.',
          'Bigger legal surface: due-on-sale exposure, note servicing, title complications. More ways for paperwork to go wrong.',
        ] },
        { h: 'Private money: how to structure it' },
        { steps: [
          'Find the lender in your own network first: a professional, a business owner, a family friend with idle savings.',
          'Lead with a specific deal, never a general ask. Address, numbers, rehab scope, exit.',
          'Offer a fixed return, typically 8 to 10 percent, secured by a lien on the property. Their name is on a recorded document, not a promise.',
          'Agree on the term and what happens at the refinance: they get repaid from the new loan, you keep the door.',
          'Have an attorney paper the note and the deed of trust. Every time, even with family.',
        ] },
        { h: 'Partnerships: how to split it' },
        { steps: [
          'Define the roles in one sentence each: you bring the deal, the numbers, and the Section 8 process. They bring the capital.',
          'Agree the split up front, in writing: equity split, cash flow split, and who decides what.',
          'Put the property in an entity both partners own per the agreement.',
          'Agree the exit before you enter: what happens at refinance, at sale, and if one of you wants out.',
        ] },
        { p: 'The pattern in both: a specific deal with real numbers does the convincing. Nobody funds enthusiasm. Everybody funds a documented deal with a clear return and a secured position.' },
        { tip: 'Skip seller financing: adverse selection plus a broken refinance is a bad trade. Private money and partnerships built on one specific, documented deal are how investors with skill and no cash get their first doors.' },
      ],
    },
    {
      slug: 'lender-questions-checklist',
      name: 'Lender Questions Checklist',
      kind: 'Checklist',
      icon: '❓',
      tagline: 'The questions I ask every lender before I trust them with a deal.',
      body: [
        { h: 'Ask before you apply' },
        { p: 'A bad lender can kill a deal with a slow close or a surprise at the closing table. Before I hand anyone my file, I run through this list on the phone. The way they answer tells me almost as much as the answers themselves.' },
        { h: 'Rate and cost questions' },
        { list: [
          'What is the rate today for this loan type and my credit band?',
          'What are the total closing costs and origination points?',
          'Are there prepayment penalties, and for how long?',
          'Is the rate fixed or does it adjust, and when?'
        ] },
        { h: 'Terms and product questions' },
        { list: [
          'Is this a conventional, DSCR, or portfolio product?',
          'What is the minimum DSCR you will approve, and how do you count Section 8 HAP income?',
          'What is the maximum loan-to-value on a purchase and on a cash-out refinance?',
          'What is the minimum credit score for this program?'
        ] },
        { h: 'Seasoning and scale questions' },
        { list: [
          'What is the seasoning period before I can do a cash-out refinance?',
          'Do you use the current appraised value or my purchase price for a refinance?',
          'How many loans can I have with you before you cut me off?',
          'Do you report to my personal credit or hold it in the LLC?'
        ] },
        { h: 'Timeline and reliability questions' },
        { list: [
          'What is your average close time from application to funding?',
          'Who is my point of contact, the loan officer or a processor?',
          'What is the one thing that most often delays your closings?',
          'Can you send me two investor references who closed with you this year?'
        ] },
        { h: 'How I score them' },
        { steps: [
          'Straight, specific answers score high. Vague or dodgy answers are a red flag.',
          'A lender who understands Section 8 HAP income is worth more than a slightly lower rate.',
          'Confirm the close time and seasoning in writing before I commit a deal to them.'
        ] },
        { link: { to: '/get-help', label: 'Get Help' } },
        { tip: 'You are interviewing the lender as much as they are underwriting you. A reliable lender who closes on time is worth a quarter point more than a cheap one who blows your deadline.' }
      ]
    }
  ]
};
