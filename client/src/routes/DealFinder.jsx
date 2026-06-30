import PageHeader, { ComingSoon } from '../components/PageHeader.jsx';

export default function DealFinder() {
  return (
    <div>
      <PageHeader
        title="Deal Finder"
        subtitle="Find the markets and properties that fit the Section 8 model best."
      />
      <ComingSoon note="v1 scaffold. Next: a filterable list of vetted markets/properties (manual/curated to start), ranked by Section 8 rent-to-price ratio and cash flow — then auto-sourced from a live data feed." />
    </div>
  );
}
