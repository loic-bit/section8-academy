export default {
  category: 'Section 8 Process',
  assets: [
    {
      slug: 'hqs-inspection-checklist',
      name: 'HQS Inspection Checklist',
      kind: 'Checklist',
      icon: '📋',
      tagline: 'Pass the housing inspection on the first try.',
      body: [
        { h: 'Why the first pass matters' },
        { p: 'HQS stands for Housing Quality Standards. Before the PHA pays a dime of HAP, an inspector walks the unit against this standard. A failed inspection means a re-inspection weeks later, and weeks of no rent. I walk every unit myself with this list before the inspector ever shows up.' },
        { h: 'Safety systems in every room' },
        { list: [
          'Smoke detector on every level and inside or near each sleeping area, tested and working.',
          'Carbon monoxide detector on every level with fuel-burning appliances or an attached garage.',
          'Working heat source that reaches every room, no space heaters as the primary heat.',
          'No exposed or frayed wiring, all outlet and switch cover plates in place.',
          'GFCI outlets working near every sink, in the bathroom, and in the kitchen.'
        ] },
        { h: 'Walls, paint, and surfaces' },
        { list: [
          'No peeling, chipping, or flaking paint inside or outside, this is critical in any home built before 1978 due to lead paint rules.',
          'No holes in walls or ceilings.',
          'Floors are safe with no tripping hazards or torn covering.'
        ] },
        { h: 'Windows, doors, and stairs' },
        { list: [
          'Every window that is meant to open, opens, closes, and locks.',
          'Screens present where required, no broken or cracked glass.',
          'Handrails on any stairway with four or more steps.',
          'Every exterior door locks and a bedroom used for sleeping has a window for egress.'
        ] },
        { h: 'Kitchen, bath, and plumbing' },
        { list: [
          'No leaks under sinks, at the water heater, or at any fixture.',
          'Hot and cold running water at every faucet.',
          'Toilet flushes and is sealed to the floor, no rocking.',
          'Working stove and oven, and a refrigerator if the lease says the landlord provides it.'
        ] },
        { h: 'My walkthrough order' },
        { steps: [
          'Start at the exterior: paint, handrails, roof, and gutters.',
          'Move room by room: detectors, outlets, windows, heat, and paint.',
          'Finish with plumbing: run every faucet and check under every sink.',
          'Fix everything on this list before I request the inspection, not after.'
        ] },
        { link: { to: '/get-help', label: 'Get Help' } },
        { tip: 'Detectors and peeling paint fail more inspections than anything else. Spend twenty dollars on batteries and an hour on paint touch-up and you save yourself a month of lost rent.' }
      ]
    },
    {
      slug: 'rfta-hap-guide',
      name: 'RFTA & HAP Paperwork Guide',
      kind: 'Guide',
      icon: '🗂️',
      tagline: 'The paperwork from request to getting paid, demystified.',
      body: [
        { h: 'The paperwork path' },
        { p: 'Section 8 pays reliably, but only after the paperwork is clean. There are three documents that move a voucher tenant from approved to paying: the RFTA, the rent reasonableness review, and the HAP contract. Here is what each one is and how I submit it without delays.' },
        { h: 'Step one: the RFTA' },
        { p: 'RFTA stands for Request for Tenancy Approval. The tenant gives it to me once they pick my unit, and I fill in my side: the address, the rent I am asking, what utilities I pay versus the tenant, the owner and payee information, and my tax details.' },
        { list: [
          'Fill in the requested rent and the utility responsibility exactly.',
          'Attach a W-9 and any direct deposit form the PHA requires.',
          'Submit it the same day the tenant hands it to me, delays here delay everything downstream.'
        ] },
        { h: 'Step two: rent reasonableness' },
        { p: 'After the RFTA, the PHA runs a rent reasonableness review. They compare my requested rent to similar unassisted units nearby. The rent I get is capped by both this review and the payment standard for the area.' },
        { list: [
          'They look at unit size, condition, location, and amenities.',
          'If my rent is at or below comparable market rent, it usually clears.',
          'If it is above, I either lower it or provide support for the higher number.'
        ] },
        { h: 'Step three: the HAP contract' },
        { p: 'HAP stands for Housing Assistance Payment. Once the unit passes HQS inspection and the rent clears reasonableness, I sign the HAP contract with the PHA. This is the agreement that the housing authority pays their portion of the rent directly to me each month.' },
        { list: [
          'The HAP contract runs alongside my lease with the tenant.',
          'The PHA portion hits my account, the tenant pays their portion to me.',
          'Payment is retroactive to the effective date once everything is signed.'
        ] },
        { h: 'Typical timeline' },
        { steps: [
          'Submit the RFTA the day I receive it.',
          'Inspection is usually scheduled within one to two weeks.',
          'Rent reasonableness runs in parallel.',
          'Sign the HAP contract after the pass, first payment follows within the next pay cycle. Budget four to eight weeks start to finish.'
        ] },
        { link: { to: '/get-help', label: 'Get Help' } },
        { tip: 'Speed at the RFTA stage sets the pace for everything. Return it same day, complete and legible, and you shave weeks off the wait for your first HAP check.' }
      ]
    },
    {
      slug: 'tenant-screening-criteria',
      name: 'Tenant Screening Criteria',
      kind: 'Template',
      icon: '🧾',
      tagline: 'The screening standard I use on every voucher applicant.',
      body: [
        { h: 'One standard for everyone' },
        { p: 'A voucher guarantees most of the rent, it does not guarantee a good tenant. I still screen every voucher applicant, and I apply the exact same written criteria to every person. Consistency is not just smart, it is how I stay on the right side of fair housing law.' },
        { h: 'Income and voucher verification' },
        { list: [
          'Confirm the voucher is active and the bedroom size matches the unit, verified directly with the PHA.',
          'Confirm the tenant portion of the rent fits their income, I look for the tenant portion to be affordable so they do not fall behind.',
          'Verify any income the tenant reports for their share.'
        ] },
        { h: 'Background and history' },
        { list: [
          'Run a criminal background check within what local law allows, focused on relevant recent history, not blanket denials.',
          'Pull eviction history, a recent formal eviction is a serious flag.',
          'Review credit only for patterns of unpaid rent or utilities, not for the score alone since many voucher holders have thin credit.'
        ] },
        { h: 'Landlord references' },
        { list: [
          'Call the two most recent landlords, not just the current one who may want them gone.',
          'Ask: did they pay their portion on time, did they keep the unit clean, and would you rent to them again?',
          'Ask about damage beyond normal wear and about complaints from neighbors.'
        ] },
        { h: 'Red flags I do not ignore' },
        { list: [
          'A recent eviction for nonpayment.',
          'A landlord who will not confirm they would rent to them again.',
          'Refusal to complete the application or provide references.',
          'A story that does not match what the PHA or a prior landlord tells me.'
        ] },
        { h: 'How I apply it fairly' },
        { steps: [
          'Write the criteria down before I list the unit.',
          'Run every applicant through the exact same steps in the same order.',
          'Document the reason for any denial in writing.',
          'Never make an exception for one person that I would not make for all, that is where fair housing trouble starts.'
        ] },
        { link: { to: '/get-help', label: 'Get Help' } },
        { tip: 'The voucher covers the rent, your screening covers the property. Apply one written standard to everyone and you protect both your asset and yourself.' }
      ]
    },
    {
      slug: 'rent-reasonableness-guide',
      name: 'Rent Reasonableness Guide',
      kind: 'Guide',
      icon: '⚖️',
      tagline: 'How the PHA decides your rent, and how to get the most it will approve.',
      body: [
        { h: 'What rent reasonableness means' },
        { p: 'Rent reasonableness is the check the PHA runs to make sure they are not overpaying for my unit. It is separate from the payment standard. The payment standard sets a ceiling for the area, rent reasonableness makes sure my specific unit is priced in line with similar unassisted units nearby.' },
        { h: 'How the PHA builds comps' },
        { p: 'The housing authority compares my unit to recent market rents for similar properties that are not on assistance. They are answering one question: would an ordinary renter pay this rent for this unit?' },
        { list: [
          'Unit size and bedroom count.',
          'Condition and age of the property.',
          'Location and neighborhood.',
          'Amenities like in-unit laundry, off-street parking, central air, and updated kitchens.',
          'Which utilities are included in the rent.'
        ] },
        { h: 'How I support my requested rent' },
        { steps: [
          'Pull my own comps first from market listings of similar unassisted units in the same area and save them.',
          'Document every upgrade: new flooring, updated kitchen or bath, new appliances, fresh paint, and photograph them.',
          'Note amenities that raise value, such as included appliances, parking, or central heat and air.',
          'Present the comps and the upgrade list with the RFTA so the reviewer has evidence for the number I asked for.'
        ] },
        { h: 'What lowers the approved rent' },
        { list: [
          'Asking above nearby market comps with nothing to justify it.',
          'Deferred maintenance and dated finishes.',
          'Fewer amenities than comparable units.',
          'A location that comps lower than I assumed.'
        ] },
        { h: 'My approach' },
        { steps: [
          'Improve the unit before I set the rent, upgrades pay back through a higher approved number.',
          'Ask at the top of what the comps support, not above them.',
          'Bring evidence, a reviewer with documentation approves more than one without.',
          'If the number comes back low, ask which comps they used and provide better ones.'
        ] },
        { link: { to: '/calculators', label: 'Open the Calculators' } },
        { tip: 'You do not negotiate rent reasonableness with opinions, you win it with comps and proof of condition. Upgrade the unit, document it, and ask at the top of what the evidence supports.' }
      ]
    }
  ]
};
