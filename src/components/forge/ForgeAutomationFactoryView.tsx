import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Cpu, Power, CheckCircle2, AlertTriangle, ShieldCheck, Play, Pause } from 'lucide-react';

export const ForgeAutomationFactoryView: React.FC = () => {
  const { automations, toggleAutomation } = useNexus();
  const forgeAutomations = automations.filter(a => a.division === 'forge');

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Cpu className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              AUTOMATION FACTORY // CONTROLLED WORKFLOW PIPELINES
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Human-in-the-loop business automations with strict rollback controls and test modes.
          </p>
        </div>
      </div>

      {/* Safety Policy Notice */}
      <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-slate-300 font-sans">
          <strong className="text-white block font-mono text-xs uppercase tracking-wide">
            AUTOMATION CONSTRAINTS &amp; SAFEGUARDS
          </strong>
          <p className="text-xs leading-relaxed text-slate-400">
            Automations are strictly forbidden from making external purchases, committing legal promises, or publishing factual claims without explicit founder human review.
          </p>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-3">
        {forgeAutomations.map((job) => (
          <div key={job.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span>{job.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold font-mono ${
                    job.status === 'active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {job.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Trigger: <strong className="text-slate-300">{job.trigger}</strong> · Schedule: <strong className="text-cyan-400">{job.schedule}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAutomation(job.id)}
                  className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    job.status === 'active'
                      ? 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {job.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{job.status === 'active' ? 'Pause Pipeline' : 'Resume Pipeline'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans text-slate-300">
              <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 space-y-0.5">
                <strong className="text-slate-400 block font-mono text-[10px] uppercase">Input Stream:</strong>
                <p className="text-slate-300">{job.inputsDescription}</p>
              </div>
              <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 space-y-0.5">
                <strong className="text-violet-400 block font-mono text-[10px] uppercase">Output Action:</strong>
                <p className="text-slate-300">{job.outputsDescription}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-850 pt-2 font-mono">
              <span>Human Review Gate: <strong className="text-emerald-400">{job.hasHumanReviewGate ? 'Mandatory' : 'Bypassed (Read-only)'}</strong></span>
              <span>Last Run: <strong className="text-white">{job.lastRunTimestamp}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
