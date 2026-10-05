import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  GitBranch, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  FileCode 
} from 'lucide-react';

export const ChangeControlView: React.FC = () => {
  const { modelChanges, activateModelChange } = useNexus();

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <GitBranch className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              CHANGE CONTROL LEDGER // PREREGISTERED MODEL AUDIT
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Immutable log of proposed, evaluated, approved, and rejected model parameter changes.
          </p>
        </div>

        <span className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Non-Destructive Audit Trail</span>
        </span>
      </div>

      <div className="space-y-4">
        {modelChanges.map((change) => (
          <div key={change.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-cyan-400">{change.id}</span>
                <span className="text-slate-400">·</span>
                <span className="text-white font-bold">{change.modelAffected}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-400">Proposed: {change.dateProposed}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                  change.result === 'pass'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  Result: {change.result.toUpperCase()}
                </span>
                <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                  change.activationDecision === 'approved'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  Status: {change.activationDecision}
                </span>
              </div>
            </div>

            <div className="text-sm text-white font-sans font-semibold">
              "{change.exactChangeDescription}"
            </div>

            <div className="p-3 bg-[#06080e] rounded border border-slate-850 space-y-1 font-sans text-xs text-slate-300">
              <span className="text-cyan-400 font-mono text-[10px] uppercase font-bold block">
                Preregistered Hypothesis (Filed Before Evaluation):
              </span>
              <p className="leading-relaxed">{change.hypothesis}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-slate-400 bg-[#070a12] p-2.5 rounded border border-slate-850">
              <div>Sample Size: <strong className="text-white">{change.sampleSize} Games</strong></div>
              <div>Baseline: <strong className="text-slate-300">{change.baselineMetric}</strong></div>
              <div>Candidate: <strong className="text-emerald-400">{change.candidateMetric}</strong></div>
              <div>Reviewer: <strong className="text-slate-200">{change.reviewer}</strong></div>
            </div>

            <div className="text-[11px] text-slate-400 font-sans">
              <strong>Notes:</strong> {change.notes}
            </div>

            {change.result === 'pass' && change.activationDecision === 'pending' && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => activateModelChange(change.id)}
                  className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                >
                  Activate in Serving Pipeline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
