import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { track } from '../lib/track.js';
import PageHeader from '../components/PageHeader.jsx';
import ContentBlocks from '../components/ContentBlocks.jsx';
import { VAULT, TOOLS, vaultBySlug } from '../content/vault.js';
import { KITS, kitBySlug, kitForAsset, kitIntro } from '../content/kits.js';

// The Toolkit: interactive tools first, then six purposeful kits instead of a
// wall of 23 cards. Search cuts across everything.
export default function Vault() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  useEffect(() => {
    if (!q) return;
    const t = setTimeout(() => track('vault_search', { q }), 800);
    return () => clearTimeout(t);
  }, [q]);

  const hits = useMemo(() => {
    if (!q) return null;
    const tools = TOOLS.filter((t) => (t.name + ' ' + t.tagline).toLowerCase().includes(q));
    const assets = VAULT.filter((a) => (a.name + ' ' + a.tagline + ' ' + a.kind).toLowerCase().includes(q));
    return { tools, assets };
  }, [q]);

  return (
    <div>
      <PageHeader
        title="Toolkit"
        subtitle="Interactive tools to run your numbers, and six kits with every checklist, worksheet, and playbook, organized by the step you are on."
      />

      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools and kits…"
          className="field max-w-sm"
        />
      </div>

      {hits ? (
        <div className="space-y-8">
          {hits.tools.length === 0 && hits.assets.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              Nothing matches that search. Try a different term.
            </div>
          )}
          {hits.tools.length > 0 && (
            <div>
              <div className="eyebrow mb-3">Tools</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hits.tools.map((t) => <ToolCard key={t.to} t={t} />)}
              </div>
            </div>
          )}
          {hits.assets.length > 0 && (
            <div>
              <div className="eyebrow mb-3">Resources</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hits.assets.map((a) => (
                  <Link key={a.slug} to={`/vault/${a.slug}`} className="card card-hover">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl">{a.icon}</span>
                      <span className="badge-muted">{a.kind}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold">{a.name}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Interactive tools */}
          <div className="mb-10">
            <div className="eyebrow mb-3">Interactive tools</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((t) => <ToolCard key={t.to} t={t} />)}
            </div>
          </div>

          {/* Kits */}
          <div className="eyebrow mb-3">The kits · every checklist and playbook, bundled by step</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KITS.map((k) => (
              <Link key={k.slug} to={`/vault/kit/${k.slug}`} className="card card-hover flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">{k.icon}</span>
                  <span className="badge-muted">{k.assets.length} inside</span>
                </div>
                <h3 className="font-display font-bold">{k.name}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-500">{k.tagline}</p>
                <span className="mt-4 text-sm font-semibold text-brand">Open the kit →</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ToolCard({ t }) {
  return (
    <Link to={t.to} className="card card-hover flex items-center gap-4 border-brand/20 bg-brand/5">
      <span className="text-3xl">{t.icon}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-sm font-bold">{t.name}</h3>
          <span className="badge-brand">{t.kind}</span>
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{t.tagline}</p>
      </div>
    </Link>
  );
}

// A kit: intro + its assets. (/vault/kit/:slug)
export function KitPage() {
  const { slug } = useParams();
  const kit = kitBySlug(slug);

  useEffect(() => {
    if (kit) track('kit_open', { slug });
  }, [slug]);

  if (!kit) {
    return (
      <div>
        <PageHeader title="Not found" subtitle="That kit does not exist." />
        <Link to="/vault" className="btn-ghost !py-2 text-sm">← Back to the Toolkit</Link>
      </div>
    );
  }
  const assets = kit.assets.map((s) => vaultBySlug(s)).filter(Boolean);
  return (
    <div>
      <Link to="/vault" className="mb-4 inline-block text-sm font-semibold text-slate-400 hover:text-slate-600">← Toolkit</Link>
      <div className="mb-6 flex items-start gap-4">
        <span className="text-4xl">{kit.icon}</span>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{kit.name}</h1>
          <p className="mt-1 max-w-2xl leading-relaxed text-slate-500">{kitIntro(kit.slug)}</p>
        </div>
      </div>
      <div className="space-y-3">
        {assets.map((a) => (
          <Link
            key={a.slug}
            to={`/vault/${a.slug}`}
            className="card card-hover flex items-center gap-4 !p-5"
          >
            <span className="text-2xl">{a.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold">{a.name}</span>
                <span className="badge-muted">{a.kind}</span>
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-500">{a.tagline}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-brand">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// A single asset page (/vault/:slug) with kit breadcrumb.
export function VaultAsset() {
  const { slug } = useParams();
  const asset = vaultBySlug(slug);
  const kit = asset ? kitForAsset(asset.slug) : null;

  useEffect(() => {
    if (asset) track('vault_asset_open', { slug, kind: asset.kind, kit: kit?.slug });
  }, [slug]);

  if (!asset) {
    return (
      <div>
        <PageHeader title="Not found" subtitle="That resource does not exist." />
        <Link to="/vault" className="btn-ghost !py-2 text-sm">← Back to the Toolkit</Link>
      </div>
    );
  }

  const siblings = kit
    ? kit.assets.filter((s) => s !== asset.slug).map((s) => vaultBySlug(s)).filter(Boolean).slice(0, 3)
    : [];

  return (
    <div>
      <div className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-slate-400">
        <Link to="/vault" className="hover:text-slate-600">Toolkit</Link>
        {kit && (
          <>
            <span>/</span>
            <Link to={`/vault/kit/${kit.slug}`} className="hover:text-slate-600">{kit.name}</Link>
          </>
        )}
      </div>
      <div className="mb-6 flex items-start gap-4">
        <span className="text-4xl">{asset.icon}</span>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="badge-brand">{asset.kind}</span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{asset.name}</h1>
          <p className="mt-1 leading-relaxed text-slate-500">{asset.tagline}</p>
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

      {siblings.length > 0 && (
        <div className="mt-8">
          <div className="eyebrow mb-3">More in {kit.name}</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {siblings.map((a) => (
              <Link key={a.slug} to={`/vault/${a.slug}`} className="card card-hover">
                <div className="mb-2 text-2xl">{a.icon}</div>
                <h4 className="font-display text-sm font-bold">{a.name}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
