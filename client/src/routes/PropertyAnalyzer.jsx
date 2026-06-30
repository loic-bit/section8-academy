import PageHeader, { ComingSoon } from '../components/PageHeader.jsx';

export default function PropertyAnalyzer() {
  return (
    <div>
      <PageHeader
        title="Property Analyzer"
        subtitle="Paste an address and get an instant Section 8 verdict — rent vs FMR, cash flow, and a buy-box score."
      />
      <ComingSoon note="v1 scaffold. Next: address input + manual rent/price entry that scores a property against your buy box, then wire a live data API (RentCast/ATTOM) to auto-pull comps, rents, and Section 8 FMR." />
    </div>
  );
}
