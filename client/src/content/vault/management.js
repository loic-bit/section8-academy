export default {
  category: 'Management & Legal',
  assets: [
    {
      slug: 'property-management-sop',
      name: 'Property Management SOP',
      kind: 'SOP',
      icon: '🛠️',
      tagline: 'The system I use to run a unit so it runs itself.',
      body: [
        {
          p: 'A unit only becomes passive after I write down how it runs. This is the standard operating procedure I hand to a property manager, a virtual assistant, or my future self so nothing depends on my memory.'
        },
        { h: 'Rent collection' },
        {
          steps: [
            'Set rent due on the 1st with a hard late fee after the 5th, and put both in the lease so there is no debate later.',
            'Confirm the housing authority portion posts by the same date each month, and reconcile it against the HAP contract amount.',
            'Collect the tenant portion through one method only, an online portal, so every payment leaves a timestamp.',
            'Flag any tenant who is late two months in a row for a direct conversation before it becomes a pattern.'
          ]
        },
        { h: 'Maintenance requests' },
        {
          steps: [
            'Give tenants one channel to report issues, a form or a number, and log every request with a date.',
            'Triage same day: health and safety items get a vendor within 24 hours, cosmetic items get scheduled.',
            'Keep a short list of licensed vendors per trade so I am never sourcing a plumber during an emergency.',
            'Close the loop with the tenant once the work is done, because silence is how small issues turn into complaints.'
          ]
        },
        { h: 'Turn process' },
        {
          list: [
            'Inspect within 48 hours of move-out and compare against the move-in documentation.',
            'Paint, deep clean, and repair before the unit is ever shown, so it inspects and rents faster.',
            'Book the housing inspection early, since a failed inspection is the most common cause of a slow turn.',
            'Target a turn under 14 days, because vacancy is the single most expensive line in the P and L.'
          ]
        },
        { h: 'Reserves' },
        {
          list: [
            'Hold a reserve equal to at least three to six months of expenses per property.',
            'Fund capital expense reserves separately for the roof, HVAC, and water heater, since those are when, not if.',
            'Refill the reserve out of monthly cash flow before I ever count a dollar as profit.'
          ]
        },
        { h: 'Communication cadence' },
        {
          list: [
            'Acknowledge every tenant message within 24 hours, even if the fix takes longer.',
            'Send one short renewal check-in 90 days before the lease ends.',
            'Review the rent roll, delinquencies, and open work orders once a week, on the same day.'
          ]
        },
        {
          tip: 'The goal is not to work harder on a unit. It is to write the process once so the unit runs the same whether I am watching it or not.'
        }
      ]
    },
    {
      slug: 'lease-addendum-guide',
      name: 'Lease & Addendum Guide',
      kind: 'Guide',
      icon: '📑',
      tagline: 'What belongs in the lease alongside the HAP contract.',
      body: [
        {
          p: 'With a voucher tenant I am really working with two documents: the lease I sign with the tenant, and the HAP contract I sign with the housing authority. The lease has to line up with the HAP contract, and the addendums are where I protect the property.'
        },
        { h: 'Key lease terms' },
        {
          list: [
            'Rent amount split clearly into the tenant portion and the housing authority portion.',
            'Term length, usually 12 months, and how it renews.',
            'Late fees, returned payment fees, and the exact due date.',
            'Occupancy limits and the named residents on the lease.',
            'Maintenance and repair responsibilities for both sides.',
            'Rules on smoking, subletting, and unauthorized occupants.'
          ]
        },
        { h: 'Useful addendums' },
        {
          list: [
            'Maintenance responsibility addendum: spells out that the tenant handles minor items like light bulbs, batteries, and clogs they cause, while I handle systems and structure.',
            'Pet addendum: lists any approved pet, a pet deposit or fee where allowed, and damage responsibility.',
            'Damage and cleaning addendum: defines normal wear and tear versus tenant damage so the move-out is not an argument.',
            'Lead-based paint disclosure for any property built before 1978, which is federally required.'
          ]
        },
        { h: 'Documentation at move-in' },
        {
          steps: [
            'Walk the unit with the tenant and complete a written condition report together.',
            'Take dated photos or video of every room, including appliances and floors, before keys change hands.',
            'Record utility meter readings and note who is responsible for each utility.',
            'Have the tenant sign the condition report, and give them a copy the same day.'
          ]
        },
        {
          p: 'This is general education, not legal advice. Lease and addendum requirements vary by state and by housing authority, so I always have a local attorney review my documents before I use them.'
        },
        {
          tip: 'Photos at move-in are the cheapest insurance I own. A dated video of an empty unit ends most deposit disputes before they start.'
        }
      ]
    },
    {
      slug: 'eviction-process-map',
      name: 'Eviction Process Map',
      kind: 'Playbook',
      icon: '🚪',
      tagline: 'The high-level eviction path, and why voucher tenants rarely make you use it.',
      body: [
        {
          p: 'Eviction is the tool I want to understand and almost never use. With voucher tenants the incentives are set up so that the vast majority want to keep the unit and keep the payment stable. Here is the path, and why it usually does not get walked.'
        },
        { h: 'Prevention through screening' },
        {
          list: [
            'Verify income, rental history, and prior landlord references before I sign anyone.',
            'Confirm the voucher and the housing authority paperwork are current.',
            'Set clear expectations in writing at move-in so problems are rare and easy to point to.'
          ]
        },
        { h: 'The high-level path' },
        {
          steps: [
            'Notice: I serve the proper written notice, such as a notice to pay or quit, following the exact timeline my state requires.',
            'Filing: if the notice period passes with no resolution, I file the eviction case with the local court.',
            'Court: both sides appear, I present the lease, ledger, and documentation, and the judge rules.',
            'Enforcement: if I win and the tenant still does not leave, a law enforcement officer, not me, carries out the removal.'
          ]
        },
        { h: 'Why voucher tenants rarely make you go this far' },
        {
          list: [
            'The voucher is hard to obtain and can be lost, so a tenant risks their housing subsidy by violating the lease.',
            'A lease violation or eviction on record makes it much harder to get a landlord to accept them next time.',
            'The housing authority pays a large share of the rent on time, so staying current is realistic for the tenant.',
            'These incentives together mean most issues get resolved with a conversation, long before a filing.'
          ]
        },
        {
          p: 'Eviction law is strictly local and unforgiving of mistakes. A single procedural error can restart the whole process. This is not legal advice, and I always consult a local attorney before serving any notice.'
        },
        {
          tip: 'The best eviction is the one I never file. Screening on the front end does more to protect my cash flow than any courtroom on the back end.'
        }
      ]
    },
    {
      slug: 'entity-structure-guide',
      name: 'Entity Structure & Asset Protection',
      kind: 'Guide',
      icon: '🛡️',
      tagline: 'How investors hold property to protect what they build.',
      body: [
        {
          p: 'Once I own real estate, a tenant lawsuit or a slip and fall can reach my personal savings if I hold the property in my own name. Asset protection is how I put a wall between the business and my personal life. Here is how investors commonly think about it.'
        },
        { h: 'Holding property in an LLC' },
        {
          list: [
            'A limited liability company owns the property, so a claim against the property generally stops at the LLC, not my personal accounts.',
            'Many investors use a separate LLC per property, or per small group of properties, so a problem with one does not expose the others.',
            'The LLC needs its own bank account, and the property income and expenses flow only through it.'
          ]
        },
        { h: 'Umbrella insurance' },
        {
          list: [
            'A landlord policy covers each property, and an umbrella policy sits on top to add liability coverage across everything I own.',
            'Insurance is the first line of defense, since it pays claims. The entity is the second line, since it limits what a claim can reach.',
            'Many investors carry one to two million in umbrella coverage as a starting point and raise it as the portfolio grows.'
          ]
        },
        { h: 'Separating personal and business' },
        {
          steps: [
            'Open a dedicated business bank account for each entity and never pay personal expenses from it.',
            'Sign leases, contracts, and loans in the name of the entity, not my personal name.',
            'Keep clean books and file the entity taxes correctly, because mixing funds can let a court ignore the LLC entirely.'
          ]
        },
        { h: 'When to set it up' },
        {
          list: [
            'Some investors form the entity before the first purchase, others hold the first door personally and restructure as equity grows.',
            'The more equity and the more doors I hold, the more I have to protect, and the more the structure matters.',
            'Financing can complicate this, since some lenders lend to individuals, so I plan the entity and the loan together.'
          ]
        },
        {
          p: 'Entity choice and asset protection depend on my state and my personal situation. This is general education, not legal or tax advice, so I set this up with a real estate attorney and a CPA.'
        },
        {
          tip: 'Insurance pays the claim, the entity limits the reach. I want both in place before I need either, because I cannot buy an umbrella once it is already raining.'
        }
      ]
    }
  ]
};
