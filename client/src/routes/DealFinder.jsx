import PageHeader, { ComingSoon } from '../components/PageHeader.jsx';

export default function DealFinder() {
  return (
    <div>
      <PageHeader
        title="Deal Finder"
        subtitle="Find the markets and properties that fit the Section 8 model best."
      />
      <ComingSoon note="We're building this now. Soon you'll browse the markets and properties that fit the Section 8 model best, ranked by rent-to-price ratio and cash flow. Want deals sooner? Book a call from the Get Help tab." />
    </div>
  );
}
