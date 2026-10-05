import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReusableAssetRecord, AssetType, DataClassification } from '../../types';
import { DataClassificationBadge } from '../common/DataClassificationBadge';
import { 
  Database, 
  Plus, 
  Repeat, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const AssetVault: React.FC = () => {
  const { assets, addAsset, recordAssetReuse } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const totalAssets = assets.length;
  const multiProductAssets = assets.filter(a => a.linkedProducts.length > 1).length;
  const totalReuses = assets.reduce((sum, a) => sum + a.reuseCount, 0);
  const totalHoursSaved = assets.reduce((sum, a) => sum + a.estimatedHoursSaved, 0);
  const orphanedAssets = assets.filter(a => a.linkedProducts.length === 0 || a.status === 'orphaned').length;

  const filteredAssets = assets.filter(a => filterType === 'all' || a.type === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Database className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 07 // COMPOUNDING ASSETS</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Asset Vault
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Inventory of durable, reusable intellectual property, GIS layers, docket datasets, 
            and templates that compound founder leverage across multiple products.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Catalog Reusable Asset</span>
        </button>
      </div>

      {/* Asset Compounding Telemetry Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Total Cataloged Assets</span>
          <div className="text-xl font-bold text-white tabular-nums">{totalAssets}</div>
          <span className="text-slate-400 text-[10px]">Reusable IP units</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Multi-Product Assets</span>
          <div className="text-xl font-bold text-cyan-400 tabular-nums">{multiProductAssets}</div>
          <span className="text-slate-400 text-[10px]">Powers $\ge$2 offerings</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Aggregate Reuses</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">{totalReuses}</div>
          <span className="text-slate-400 text-[10px]">Compounding cycles</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Founder Hours Saved</span>
          <div className="text-xl font-bold text-amber-400 tabular-nums">~{totalHoursSaved}h</div>
          <span className="text-slate-400 text-[10px]">Avoided rebuild time</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-400 text-[11px] shrink-0">Asset Type:</span>
        {['all', 'source_library', 'map_layer', 'report_template', 'dataset', 'scoring_framework'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              filterType === t ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="space-y-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-5 bg-[#0a0e17] border border-slate-800/90 rounded-lg space-y-4 hover:border-slate-700 transition-colors font-mono text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-slate-400">
                  <DataClassificationBadge classification={asset.accessClassification} />
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan-400 uppercase font-semibold">{asset.type.replace('_', ' ')}</span>
                  <span aria-hidden="true">·</span>
                  <span>Compounding Score: {asset.compoundingScore}/100</span>
                  <span aria-hidden="true">·</span>
                  <span>Updated: {asset.lastUpdated.split('T')[0]}</span>
                </div>

                <h3 className="text-sm font-semibold font-sans text-white">
                  {asset.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => recordAssetReuse(asset.id)}
                  className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 rounded transition-colors flex items-center gap-1.5"
                  title="Record an instance of this asset being used to fulfill or publish"
                >
                  <Repeat className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Record Reuse (+20 SC)</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {asset.valueCreatedDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2 border-t border-slate-850">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Linked Products</span>
                <span className="text-slate-200">{asset.linkedProducts.join(', ') || 'Internal Only'}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Reuse Count</span>
                <span className="text-emerald-400 font-bold tabular-nums">{asset.reuseCount} times</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Time Saved</span>
                <span className="text-amber-400 font-bold tabular-nums">~{asset.estimatedHoursSaved}h</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Dependency Risk</span>
                <span className="text-slate-300 uppercase">{asset.dependencyRisk}</span>
              </div>
            </div>

            {asset.notes && (
              <div className="text-[11px] text-slate-400 font-sans">
                <span className="font-mono text-slate-300 text-[10px] uppercase">Notes: </span>
                {asset.notes}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>CATALOG REUSABLE ASSET</span>
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                addAsset({
                  name: fd.get('name') as string,
                  type: fd.get('type') as AssetType,
                  linkedProject: 'Front Range Infrastructure Constraint Monitor',
                  linkedProducts: ['prod-001', 'prod-002'],
                  locationOrUrl: fd.get('locationOrUrl') as string,
                  owner: 'Founder',
                  valueCreatedDescription: fd.get('valueCreatedDescription') as string,
                  reuseCount: 1,
                  status: 'active',
                  lastUpdated: new Date().toISOString(),
                  accessClassification: 'public',
                  dependencyRisk: 'low',
                  compoundingScore: 85,
                  estimatedHoursSaved: 10,
                  notes: fd.get('notes') as string,
                });
                setShowAddModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-slate-400 mb-1">Asset Name *</label>
                <input required name="name" placeholder="e.g. Substation Transformer Lead Time Model" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Asset Type *</label>
                  <select name="type" className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200">
                    <option value="source_library">Source Library</option>
                    <option value="research_methodology">Research Methodology</option>
                    <option value="map_layer">GIS Map Layer</option>
                    <option value="report_template">Report Template</option>
                    <option value="dataset">Structured Dataset</option>
                    <option value="scoring_framework">Scoring Framework</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Location or URL *</label>
                  <input required name="locationOrUrl" defaultValue="internal://evidence-ledger" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Value Created &amp; Compounding Description *</label>
                <textarea required rows={3} name="valueCreatedDescription" placeholder="How does this asset save hours or create durable value across multiple products?" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 resize-none font-sans" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Notes</label>
                <input name="notes" placeholder="e.g. Derived strictly from public filings" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-1.5 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-1.5 bg-cyan-400 text-black font-semibold rounded">Save to Vault (+35 SC)</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
