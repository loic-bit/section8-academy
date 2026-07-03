import PageHeader, { ComingSoon } from '../components/PageHeader.jsx';

export default function PropertyAnalyzer() {
  return (
    <div>
      <PageHeader
        title="Property Analyzer"
        subtitle="Paste an address and get an instant Section 8 verdict: rent vs FMR, cash flow, and a buy-box score."
      />
      <ComingSoon note="We're building this now. Soon you'll enter an address and instantly see how a property scores against Section 8 rents and your buy box. In the meantime, run any deal through the Calculators tab." />
    </div>
  );
}
