import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Target, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

export const ForgeVentureCommandView: React.FC = () => {
  const { 
    forgeOpportunity, 
    currentForgeMRR, 
    forgeRevenueThreshold, 
    forgeCustomers, 
    forgeTransactions, 
    setActiveForgeDepartment,
    setOrchestratorOpen,
    setOrchestratorMode
  } = useNexus();

  const targetShortfall = Math.max(0, forgeRevenueThreshold - currentForgeMRR);
  const customersNeeded = Math.ceil(targetShortfall / 175);
  const thresholdPercentage = Math.min(100, Math.round((currentForgeMRR / forgeRevenueThreshold) * 100));

  const totalSettledRevenue = forgeTransactions
    .filter(t => t.status === 'settled')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Focus Venture & Approval Gate */}
      <div className="p-5 bg-[#0a0e19] border border-violet-500/30 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-400">
            <Briefcase className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold text-[11px]">PRIMARY VENTURE IN FOCUS</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Stage: {forgeOpportunity.stage.toUpperCase().replace('_', ' ')}</span>
          </div>
          <h1 className="text-lg font-bold font-display text-white">
            {forgeOpportunity.name}
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-2xl">
            Target Buyer: <strong className="text-slate-200">{forgeOpportunity.buyer}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-3 lg:pt-0 lg:pl-6">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block">Monthly Recurring</span>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums">${currentForgeMRR}</div>
            <span className="text-[10px] text-slate-400">ARR: ${currentForgeMRR * 12}</span>
          </div>
          <button
            onClick={() => {
              setOrchestratorMode('forge');
              setOrchestratorOpen(true);
            }}
            className="px-3.5 py-2 rounded bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold transition-colors whitespace-nowrap"
          >
            Audit with ORCHESTRATOR
          </button>
        </div>
      </div>

      {/* $750 MONTHLY REVENUE THRESHOLD PANEL */}
      <div className="p-5 bg-[#0d091a] border border-violet-500/40 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              $750/MO APPROVAL THRESHOLD // COMMERCIAL VIABILITY GATE
            </h2>
          </div>
          <span className={`text-xs font-bold uppercase ${currentForgeMRR >= forgeRevenueThreshold ? 'text-emerald-400' : 'text-amber-400'}`}>
            {currentForgeMRR >= forgeRevenueThreshold ? 'THRESHOLD CLEARED' : `${customersNeeded} CUSTOMERS NEEDED TO CLEAR`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Current Progress: ${currentForgeMRR} of ${forgeRevenueThreshold} / mo</span>
            <span className="text-violet-300 font-bold tabular-nums">{thresholdPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-500 to-emerald-400 h-full rounded-full transition-all"
              style={{ width: `${thresholdPercentage}%` }}
            />
          </div>
        </div>

        {/* Financial Mechanics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded bg-[#070512] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Active Subscribers</span>
            <div className="text-base font-bold text-white tabular-nums">
              {forgeCustomers.filter(c => c.status === 'active_subscriber').length} Firms
            </div>
            <span className="text-[10px] text-slate-400">Avg. $175/mo</span>
          </div>

          <div className="p-3 rounded bg-[#070512] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Total Settled Cash</span>
            <div className="text-base font-bold text-emerald-400 tabular-nums">
              ${totalSettledRevenue}
            </div>
            <span className="text-[10px] text-slate-400">Includes $350 report</span>
          </div>

          <div className="p-3 rounded bg-[#070512] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Monthly Operating Cost</span>
            <div className="text-base font-bold text-white tabular-nums">$6.20</div>
            <span className="text-[10px] text-emerald-400">Gross Margin: 98.2%</span>
          </div>

          <div className="p-3 rounded bg-[#070512] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Kill Criterion Date</span>
            <div className="text-base font-bold text-amber-400">{forgeOpportunity.nextDecisionDate}</div>
            <span className="text-[10px] text-slate-400">Day 45 Hard Gate</span>
          </div>
        </div>

        {/* Bottleneck Diagnostic */}
        <div className="p-3.5 rounded bg-amber-950/20 border border-amber-500/30 text-slate-300 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Bottleneck Diagnostic: Distribution Friction (No Automated Inbound Magnet)</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            The buyer pain (54-month substation delays) is validated by customer interviews and 2 paid commitments. The current constraint is manual founder outbound. Immediate action: Execute Mission F1 (deploy 1-page executive memo to 12 site planners) before adding any software features.
          </p>
        </div>
      </div>

      {/* QUICK WORKFLOW SHORTCUTS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div 
          onClick={() => setActiveForgeDepartment('buyer-research')}
          className="p-4 rounded-lg bg-[#090d16] border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[10px] text-violet-400 uppercase font-bold block">Stage 03 // Research</span>
          <div className="text-sm font-bold text-white font-sans">Buyer Interview Dossiers</div>
          <p className="text-[11px] text-slate-400 font-sans">Review quotes and willingness to pay from enterprise site selectors.</p>
        </div>

        <div 
          onClick={() => setActiveForgeDepartment('offer-pricing')}
          className="p-4 rounded-lg bg-[#090d16] border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[10px] text-violet-400 uppercase font-bold block">Stage 05 // Packaging</span>
          <div className="text-sm font-bold text-white font-sans">Offer &amp; Pricing Studio</div>
          <p className="text-[11px] text-slate-400 font-sans">Weekly Monitor ($175/mo) &amp; Substation Delay Index ($350) offers.</p>
        </div>

        <div 
          onClick={() => setActiveForgeDepartment('distribution')}
          className="p-4 rounded-lg bg-[#090d16] border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[10px] text-violet-400 uppercase font-bold block">Stage 08 // Acquisition</span>
          <div className="text-sm font-bold text-white font-sans">Distribution Engine</div>
          <p className="text-[11px] text-slate-400 font-sans">Track outbound campaigns, click-to-lead rates, and sales conversions.</p>
        </div>
      </div>
    </div>
  );
};
