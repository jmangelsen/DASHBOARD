import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  TrendingUp, 
  Target, 
  DollarSign, 
  ShieldCheck 
} from 'lucide-react';

export const ForgeDistributionView: React.FC = () => {
  const { forgeCampaigns } = useNexus();

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Share2 className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              DISTRIBUTION ENGINE // BUYER ACQUISITION PIPELINE
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Strict distribution discipline: Every campaign must have an identified buyer, one single CTA, and source-grounded claims.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase block">Total Campaign Revenue</span>
          <span className="text-base font-bold text-emerald-400 tabular-nums">$700 Settled</span>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {forgeCampaigns.map((camp) => {
          const conversionRate = camp.clicks > 0 ? ((camp.sales / camp.clicks) * 100).toFixed(1) : '0';

          return (
            <div key={camp.id} className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm font-sans">{camp.title}</span>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800">
                    Channel: {camp.channel}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Target Buyer: <strong className="text-slate-200">{camp.targetBuyer}</strong>
                </div>
              </div>

              {/* Message & CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans">
                <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
                  <strong className="text-slate-400 block font-mono text-[10px] uppercase">Core Message:</strong>
                  <p className="text-slate-200">{camp.message}</p>
                </div>
                <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
                  <strong className="text-violet-400 block font-mono text-[10px] uppercase">Mandatory Single CTA:</strong>
                  <p className="text-white font-medium">{camp.cta}</p>
                </div>
              </div>

              {/* Conversion Funnel Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                <div className="p-2.5 rounded bg-[#070a12] border border-slate-850 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Outbound Sent</span>
                  <span className="text-sm font-bold text-white tabular-nums">{camp.impressions}</span>
                </div>
                <div className="p-2.5 rounded bg-[#070a12] border border-slate-850 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Link Clicks</span>
                  <span className="text-sm font-bold text-cyan-300 tabular-nums">{camp.clicks}</span>
                </div>
                <div className="p-2.5 rounded bg-[#070a12] border border-slate-850 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Qualified Leads</span>
                  <span className="text-sm font-bold text-white tabular-nums">{camp.qualifiedLeads}</span>
                </div>
                <div className="p-2.5 rounded bg-[#070a12] border border-slate-850 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Sales Closed</span>
                  <span className="text-sm font-bold text-emerald-400 tabular-nums">{camp.sales}</span>
                </div>
                <div className="p-2.5 rounded bg-[#070a12] border border-slate-850 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Click-to-Sale</span>
                  <span className="text-sm font-bold text-violet-300 tabular-nums">{conversionRate}%</span>
                </div>
                <div className="p-2.5 rounded bg-[#070a12] border border-slate-850 text-center">
                  <span className="text-[10px] text-slate-500 uppercase block">Cash Produced</span>
                  <span className="text-sm font-bold text-emerald-400 tabular-nums">${camp.revenueGenerated}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-sans border-t border-slate-850 pt-2 flex items-center justify-between">
                <span>Evidence Basis: <strong className="text-slate-300">{camp.evidenceBasis}</strong></span>
                <span className="text-emerald-400 font-bold">Cost: $0 (Direct Founder Outbound)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
