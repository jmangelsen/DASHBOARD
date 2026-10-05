import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Target, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, XCircle } from 'lucide-react';

export const ForgePortfolioReviewView: React.FC = () => {
  const { forgeOpportunity, setOpportunityStage } = useNexus();
  const [selectedDecision, setSelectedDecision] = useState<string>('Validate');

  const decisions = ['Scale', 'Maintain', 'Validate', 'Narrow', 'Pause', 'Kill'];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Target className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              PORTFOLIO REVIEW // RATIONAL ATTENTION ALLOCATION
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Weekly evaluation of active venture initiatives. Require an explicit Scale, Maintain, Validate, Narrow, Pause, or Kill decision.
          </p>
        </div>
      </div>

      {/* Primary Project Card */}
      <div className="p-5 bg-[#090d16] border border-violet-500/30 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
          <div>
            <span className="text-[10px] text-violet-400 uppercase font-bold tracking-widest block">
              CURRENT ACTIVE VENTURE
            </span>
            <h3 className="text-base font-bold text-white font-sans mt-0.5">
              {forgeOpportunity.name}
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded uppercase">
            Current Stage: {forgeOpportunity.stage.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Kill Criterion</span>
            <p className="text-[11px] text-amber-300 font-sans">{forgeOpportunity.killCriterion}</p>
          </div>
          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Next Gate Deadline</span>
            <div className="text-base font-bold text-white">{forgeOpportunity.nextDecisionDate}</div>
            <span className="text-[10px] text-slate-400">Day 45 Milestone</span>
          </div>
          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Required Evidence</span>
            <p className="text-[11px] text-slate-300 font-sans">{forgeOpportunity.minimumEvidenceRequired}</p>
          </div>
        </div>

        {/* Required Decision Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-850">
          <span className="text-xs font-bold text-white uppercase block">
            Required Weekly Decision for this Initiative:
          </span>
          <div className="flex flex-wrap gap-2">
            {decisions.map((dec) => (
              <button
                key={dec}
                onClick={() => setSelectedDecision(dec)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                  selectedDecision === dec
                    ? dec === 'Kill'
                      ? 'bg-rose-600 text-white shadow-md'
                      : dec === 'Validate'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {dec}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-sans pt-1">
            Selected stance: <strong className="text-white">{selectedDecision}</strong> — Focus attention exclusively on distribution to secure 3 more subscribers before Oct 25.
          </p>
        </div>
      </div>
    </div>
  );
};
