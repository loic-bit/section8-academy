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
      name: 'Creative Financing Playbook',
      kind: 'Playbook',
      icon: '🎯',
      tagline: 'How to buy when you are low on cash: seller finance, private money, partnerships.',
      linkedTool: '/calculators',
      body: [
        { h: 'Why creative financing matters' },
        { p: 'Running out of down payment cash is the number one reason new investors stall. Creative financing is how I keep buying when the bank is not the answer. Here are the three structures I use most, how each one works, and how I pitch them.' },
        { h: 'Seller financing' },
        { p: 'The seller becomes my bank. Instead of paying all cash at closing, I pay them a down payment and monthly payments at an agreed rate and term. It works best on a property the seller owns free and clear.' },
        { steps: [
          'Find a motivated seller who owns it outright and does not need all the cash now.',
          'Pitch the benefit: steady monthly income, interest they would not earn in the bank, and spreading their capital gains tax over years instead of one lump.',
          'Structure it: for example, 10 percent down, 6 percent interest, 30 year amortization with a 5 year balloon. On a 200,000 dollar house that is 20,000 down and roughly 1,079 a month, and I refinance or sell before the balloon.'
        ] },
        { h: 'Private money' },
        { p: 'A private lender is a person, not an institution, who lends me money secured by the property. They earn a fixed return, I get funds fast without bank underwriting.' },
        { steps: [
          'Find someone with idle cash in savings or a retirement account earning almost nothing.',
          'Pitch a fixed return, often 8 to 12 percent, secured by a mortgage or deed of trust on the property so they are protected.',
          'Structure it: for example, borrow 150,000 at 10 percent interest-only for 12 months to buy and rehab a BRRRR, then refinance and pay them back in full.'
        ] },
        { h: 'Partnerships' },
        { p: 'I bring the deal and the work, a partner brings the capital. We agree on the split before anyone signs.' },
        { steps: [
          'Define roles: I find, fund the analysis, manage the rehab and the tenant. My partner funds the down payment.',
          'Pitch the split: a common structure is 50 to 50 on cash flow and equity, or the money partner takes a larger share until their capital is returned.',
          'Structure it: put it in writing, an operating agreement or joint venture agreement, so the exit and the split are clear.'
        ] },
        { link: { to: '/calculators', label: 'Open the Calculators' } },
        { tip: 'Creative financing is not a loophole, it is a relationship. Lead with what the other person gets, protect their money with real security, and do exactly what you said you would do.' }
      ]
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
