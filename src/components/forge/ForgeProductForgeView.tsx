import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Hammer, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Code2 
} from 'lucide-react';

export const ForgeProductForgeView: React.FC = () => {
  const { currentForgeMRR, forgeRevenueThreshold } = useNexus();

  const backlogFeatures = [
    {
      feature: 'Automated Monday 07:00 MT PDF Generation & Dispatch',
      buyerEvidence: 'Confirmed requirement by Pilot Subscriber #01 (Henderson) to review before 08:30 weekly partner meetings.',
      approved: true,
      status: 'Implemented'
    },
    {
      feature: 'Substation Queue Interactive GIS Map Widget',
      buyerEvidence: 'Requested by 0 buyers. Pure vanity visualization. Delivering PDF tables satisfies 100% of diligence needs.',
      approved: false,
      status: 'Rejected under Build-vs-Sell Guardrail'
    },
    {
      feature: 'Aurora Water Resolution R26-44 Cooling Tariff Calculation Model',
      buyerEvidence: 'Direct buyer quote from Interview #01: "Need to model annual water OPEX under tiered conservation surcharges."',
      approved: true,
      status: 'In Production'
    },
    {
      feature: 'Client Self-Serve Authentication Portal with OAuth',
      buyerEvidence: 'Current subscriber base is 2 enterprise accounts. Email dispatch has zero friction. Portal premature.',
      approved: false,
      status: 'Deferred until 15+ Active Subscribers'
    }
  ];

  const buildVsSellQuestions = [
    'Is this feature strictly required by a paying customer today?',
    'Is there documentary evidence a buyer offered to pay for it?',
    'Does it improve activation, retention, or margin?',
    'Can this outcome be delivered manually via spreadsheet or email first?',
    'What is the smallest reversible test before writing production code?'
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Build vs Sell Guardrail Header */}
      <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-slate-300 font-sans">
          <strong className="text-white block font-mono text-xs uppercase tracking-wide">
            BUILD VS. SELL GUARDRAIL // DISCIPLINED ENGINEERING POLICY
          </strong>
          <p className="text-xs leading-relaxed text-slate-400">
            Build only what paid evidence justifies. Features not demanded by paying customers are classified as vanity distraction. Current MRR ($350) is below $750/mo gate: engineering new software widgets is currently frozen.
          </p>
        </div>
      </div>

      {/* 5 Guardrail Questions */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-slate-800">
          5 Mandatory Pre-Build Questions
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 font-sans text-xs">
          {buildVsSellQuestions.map((q, idx) => (
            <div key={idx} className="p-2.5 rounded bg-[#06080e] border border-slate-850 flex items-start gap-2">
              <span className="text-violet-400 font-mono font-bold shrink-0">Q{idx + 1}.</span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Backlog Audit Table */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Feature Backlog // Buyer Evidence Audit</span>
          <span className="text-slate-400 text-xs font-normal">Only Evidence-Backed Features Allowed</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {backlogFeatures.map((item, idx) => (
            <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1 max-w-xl">
                <div className="font-bold text-white font-sans text-sm flex items-center gap-2">
                  <span>{item.feature}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  <strong>Buyer Evidence:</strong> {item.buyerEvidence}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className={`px-2.5 py-1 rounded uppercase font-bold text-[10px] inline-flex items-center gap-1 ${
                  item.approved 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {item.approved ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>{item.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
