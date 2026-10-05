import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DistributionRecord, DistributionAssetType, DataClassification } from '../../types';
import { 
  Share2, 
  Plus, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  ExternalLink, 
  Eye, 
  MousePointer, 
  Mail, 
  DollarSign, 
  CheckCircle2,
  Users
} from 'lucide-react';

export const DistributionEngine: React.FC = () => {
  const { distribution, products, addDistribution, updateDistribution } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Missing Link Warning
  const unlinkedAssets = distribution.filter(d => !d.linkedOfferId || !d.cta);

  const funnelSteps = [
    { name: 'Signal & Evidence', desc: 'Raw regulatory dockets' },
    { name: 'Grounded Insight', desc: 'Synthesized constraint brief' },
    { name: 'Content Asset', desc: 'Executive teaser memo' },
    { name: 'Explicit CTA', desc: '$350 report / $150 monitor' },
    { name: 'Lead Qualified', desc: 'Infrastructure decision-maker' },
    { name: 'Paid Customer', desc: 'Verified Stripe deposit' },
    { name: 'Renewal', desc: '30-day retention loop' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Share2 className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 05 // DISTRIBUTION ENGINE</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Distribution Engine
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Ensure every piece of published research connects to an explicit commercial offer. 
            Vanity posts lacking a linked product, CTA, or audience telemetry are flagged.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Distribution Asset</span>
        </button>
      </div>

      {/* Content to Revenue Funnel Diagram */}
      <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
        <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
          The Closed Content-to-Revenue Funnel
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1 font-mono text-xs">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="p-2.5 bg-[#0d121f] border border-slate-800 rounded flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-cyan-400 font-bold">Step 0{idx + 1}</div>
                <div className="text-xs font-bold text-white mt-0.5">{step.name}</div>
              </div>
              <div className="text-[10px] text-slate-400 font-sans mt-2">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DISCIPLINE WARNING: UNLINKED ASSETS */}
      {unlinkedAssets.length > 0 && (
        <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>COMMERCIAL DISCIPLINE VIOLATION: {unlinkedAssets.length} Unlinked Content Item</span>
          </div>
          <p className="text-slate-300 font-sans text-xs">
            Distribution asset <strong className="text-amber-200">"{unlinkedAssets[0].title}"</strong> has no linked paid offer or call-to-action. In TPL venture architecture, publishing content without a measurement plan or offer connection is prohibited vanity activity.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => updateDistribution(unlinkedAssets[0].id, {
                linkedOfferId: products[0]?.id,
                cta: 'Download the complete Front Range Substation Delay Index ($350)',
              })}
              className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 rounded transition-colors text-[11px]"
            >
              Attach Product prod-001 &amp; $350 CTA
            </button>
          </div>
        </div>
      )}

      {/* Distribution Assets Grid */}
      <div className="space-y-4">
        {distribution.map((dist) => {
          const linkedProduct = products.find(p => p.id === dist.linkedOfferId);

          return (
            <div
              key={dist.id}
              className="p-5 bg-[#0a0e17] border border-slate-800/90 rounded-lg space-y-4 hover:border-slate-700 transition-colors font-mono text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-slate-400">
                    <span className="text-cyan-400 uppercase font-semibold">{dist.channel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Stage: {dist.stage}</span>
                    <span aria-hidden="true">·</span>
                    <span>Launched: {dist.dateLaunched}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-[10px] text-slate-300">{dist.assetType}</span>
                  </div>

                  <h3 className="text-sm font-semibold font-sans text-white">
                    {dist.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-emerald-400 tabular-nums">
                    ${dist.revenueAttributed} Revenue Attributed
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {dist.purchases} verified customer purchase{dist.purchases === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              {/* Linked Offer & CTA Banner */}
              <div className="p-3 bg-[#0d121c] border border-slate-850 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase block">Linked Paid Offer</span>
                  <span className="text-xs text-cyan-300 font-semibold font-sans">
                    {linkedProduct ? `${linkedProduct.name} ($${linkedProduct.price})` : '⚠️ NO LINKED OFFER'}
                  </span>
                </div>
                <div className="space-y-0.5 sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Mandatory Call to Action</span>
                  <span className="text-xs text-white font-sans italic">
                    {dist.cta || '⚠️ MISSING CTA'}
                  </span>
                </div>
              </div>

              {/* Conversion Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center pt-2 border-t border-slate-850">
                <div className="p-2 bg-[#080c14] border border-slate-800/80 rounded">
                  <span className="text-[9px] text-slate-400 uppercase block">Views</span>
                  <span className="text-sm font-bold text-white tabular-nums">{dist.views}</span>
                </div>
                <div className="p-2 bg-[#080c14] border border-slate-800/80 rounded">
                  <span className="text-[9px] text-slate-400 uppercase block">Clicks</span>
                  <span className="text-sm font-bold text-white tabular-nums">{dist.clicks}</span>
                </div>
                <div className="p-2 bg-[#080c14] border border-slate-800/80 rounded">
                  <span className="text-[9px] text-slate-400 uppercase block">Captures</span>
                  <span className="text-sm font-bold text-cyan-300 tabular-nums">{dist.emailCaptures}</span>
                </div>
                <div className="p-2 bg-[#080c14] border border-slate-800/80 rounded">
                  <span className="text-[9px] text-slate-400 uppercase block">Qualified Leads</span>
                  <span className="text-sm font-bold text-cyan-400 tabular-nums">{dist.qualifiedLeads}</span>
                </div>
                <div className="p-2 bg-[#080c14] border border-slate-800/80 rounded">
                  <span className="text-[9px] text-slate-400 uppercase block">Calls Booked</span>
                  <span className="text-sm font-bold text-amber-400 tabular-nums">{dist.callsBooked}</span>
                </div>
                <div className="p-2 bg-[#080c14] border border-slate-800/80 rounded">
                  <span className="text-[9px] text-slate-400 uppercase block">Purchases</span>
                  <span className="text-sm font-bold text-emerald-400 tabular-nums">{dist.purchases}</span>
                </div>
              </div>

              {dist.notes && (
                <div className="text-[11px] text-slate-400 font-sans">
                  <span className="text-slate-300 font-mono text-[10px] uppercase">Telemetry Notes: </span>
                  {dist.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>CREATE DISTRIBUTION ASSET</span>
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                addDistribution({
                  title: fd.get('title') as string,
                  linkedOfferId: fd.get('linkedOfferId') as string,
                  targetAudience: fd.get('targetAudience') as string,
                  channel: fd.get('channel') as string,
                  cta: fd.get('cta') as string,
                  assetType: fd.get('assetType') as DistributionAssetType,
                  stage: 'live',
                  dateLaunched: new Date().toISOString().split('T')[0],
                  views: 0,
                  clicks: 0,
                  emailCaptures: 0,
                  qualifiedLeads: 0,
                  callsBooked: 0,
                  purchases: 0,
                  revenueAttributed: 0,
                  nextOptimizationAction: 'Distribute to primary contact list',
                  dataClassification: 'public',
                });
                setShowAddModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-slate-400 mb-1">Asset Headline / Title *</label>
                <input required name="title" placeholder="e.g. Substation Delay Briefing: Weld County Analysis" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Linked Product Offer *</label>
                  <select required name="linkedOfferId" className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200">
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Channel *</label>
                  <input required name="channel" defaultValue="Direct Executive Email / LinkedIn" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Target Audience (ICP) *</label>
                <input required name="targetAudience" defaultValue="Data Center Site Acquisition Directors" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Direct Call to Action (CTA) *</label>
                <input required name="cta" placeholder="e.g. Buy the Full 24-Page Substation Capacity Report ($350)" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-1.5 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-1.5 bg-cyan-400 text-black font-semibold rounded">Deploy Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
