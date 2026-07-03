import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ContentBlocks from '../components/ContentBlocks.jsx';
import { VAULT, vaultBySlug } from '../content/vault.js';

// List of all five assets.
export default function Vault() {
  return (
    <div>
      <PageHeader
        title="Toolkit Vault"
        subtitle="The systems, templates, and playbooks I use to find and fund Section 8 deals."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VAULT.map((a) => (
          <Link
            key={a.slug}
            to={`/vault/${a.slug}`}
            className="card flex flex-col transition hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl">{a.icon}</span>
              <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
                {a.kind}
              </span>
            </div>
            <h3 className="font-bold">{a.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{a.tagline}</p>
            <span className="mt-4 text-sm font-semibold text-brand">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Detail view for a single asset (/vault/:slug).
export function VaultAsset() {
  const { slug } = useParams();
  const asset = vaultBySlug(slug);

  if (!asset) {
    return (
      <div>
        <PageHeader title="Not found" subtitle="That asset does not exist." />
        <Link to="/vault" className="btn-ghost !py-2 text-sm">← Back to the Vault</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/vault" className="mb-4 inline-block text-sm font-semibold text-slate-400 hover:text-slate-600">
        ← Toolkit Vault
      </Link>
      <div className="mb-6 flex items-start gap-4">
        <span className="text-4xl">{asset.icon}</span>
        <div>
          <div className="mb-1 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
            {asset.kind}
          </div>
          <h1 className="text-2xl font-extrabold">{asset.name}</h1>
          <p className="mt-1 text-slate-500">{asset.tagline}</p>
        </div>
      </div>

      <div className="card">
        <ContentBlocks blocks={asset.body} />
        {asset.linkedTool && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <Link to={asset.linkedTool.to} className="btn-primary !py-2 text-sm">
              {asset.linkedTool.label} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
