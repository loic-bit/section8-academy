import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ContentBlocks from '../components/ContentBlocks.jsx';
import { CATEGORIES, VAULT, TOOLS, vaultBySlug } from '../content/vault.js';

// Vault library: interactive tools on top, then a searchable, filterable
// library of every guide, checklist, worksheet, and playbook.
export default function Vault() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      VAULT.filter((a) => {
        if (cat !== 'All' && a.category !== cat) return false;
        if (!q) return true;
        return (a.name + ' ' + a.tagline + ' ' + a.kind).toLowerCase().includes(q);
      }),
    [q, cat]
  );

  return (
    <div>
      <PageHeader
        title="Toolkit Vault"
        subtitle="The systems, templates, checklists, and playbooks I use to find, fund, and run Section 8 deals."
      />

      {/* Interactive tools */}
      <div className="mb-8">
        <div className="eyebrow mb-3">Interactive tools</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="card card-hover flex items-center gap-4 border-brand/20 bg-brand/5"
            >
              <span className="text-3xl">{t.icon}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{t.name}</h3>
                  <span className="badge-brand">{t.kind}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">{t.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Library controls */}
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="eyebrow">Resource library · {VAULT.length} assets</div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the vault…"
            className="field max-w-xs"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES.map((c) => c.category)].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`chip ${cat === c ? 'chip-active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Assets */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No assets match that search. Try a different term or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link key={a.slug} to={`/vault/${a.slug}`} className="card card-hover flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-3xl">{a.icon}</span>
                <span className="badge-muted">{a.kind}</span>
              </div>
              <h3 className="font-bold">{a.name}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-500">{a.tagline}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">{a.category}</span>
                <span className="text-sm font-semibold text-brand">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
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

  const related = VAULT.filter((a) => a.category === asset.category && a.slug !== asset.slug).slice(0, 3);

  return (
    <div>
      <Link to="/vault" className="mb-4 inline-block text-sm font-semibold text-slate-400 hover:text-slate-600">
        ← Toolkit Vault
      </Link>
      <div className="mb-6 flex items-start gap-4">
        <span className="text-4xl">{asset.icon}</span>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="badge-brand">{asset.kind}</span>
            <span className="text-xs text-slate-400">{asset.category}</span>
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

      {related.length > 0 && (
        <div className="mt-8">
          <div className="eyebrow mb-3">More in {asset.category}</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} to={`/vault/${a.slug}`} className="card card-hover">
                <div className="mb-2 text-2xl">{a.icon}</div>
                <h4 className="text-sm font-bold">{a.name}</h4>
                <p className="mt-1 text-xs text-slate-500">{a.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
