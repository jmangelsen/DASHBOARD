import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Cpu, Power, CheckCircle2, AlertTriangle, ShieldCheck, Play, Pause } from 'lucide-react';

export const NexusAutomationControlView: React.FC = () => {
  const { automations, toggleAutomation } = useNexus();

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Cpu className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              AUTOMATION CONTROL // GLOBAL WORKFLOW SUPERVISION
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Active cron schedules, webhooks, and data sync pipelines across ORACLE and FORGE divisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
            {automations.filter(a => a.status === 'active').length} Active Jobs
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {automations.map((job) => (
          <div key={job.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span>{job.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                    job.division === 'oracle' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-violet-950 text-violet-300 border border-violet-800'
                  }`}>
                    {job.division.toUpperCase()}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold font-mono ${
                    job.status === 'active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {job.status}
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
                <strong className="text-cyan-400 block font-mono text-[10px] uppercase">Output Action:</strong>
                <p className="text-slate-300">{job.outputsDescription}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-850 pt-2 font-mono">
              <span>Human Review Gate: <strong className="text-emerald-400">{job.hasHumanReviewGate ? 'Enforced' : 'Automated (Read-Only)'}</strong></span>
              <span>Last Run: <strong className="text-white">{job.lastRunTimestamp}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
