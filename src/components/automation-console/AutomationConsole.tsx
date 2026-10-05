import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AutomationRecord } from '../../types';
import { 
  Cpu, 
  Play, 
  Pause, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sliders,
  Lock
} from 'lucide-react';

export const AutomationConsole: React.FC = () => {
  const { automations, toggleAutomationStatus, triggerAutomationRun, addAutomation } = useApp();
  const [runningId, setRunningId] = useState<string | null>(null);

  const handleTestRun = (id: string) => {
    setRunningId(id);
    setTimeout(() => {
      triggerAutomationRun(id);
      setRunningId(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 08 // AUTOMATION &amp; GOVERNANCE</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Automation Console
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Governed pipeline execution with mandatory human-in-the-loop review guards. 
            Automated publishing of customer claims without verified evidence is prohibited.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Active Pipelines:</span>
          <span className="text-cyan-400 font-bold tabular-nums">
            {automations.filter(a => a.status === 'active').length} / {automations.length}
          </span>
        </div>
      </div>

      {/* Human-in-the-Loop Governance Notice */}
      <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex items-start gap-3 text-xs font-mono">
        <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-cyan-300 font-bold uppercase tracking-wider">
            HUMAN REVIEW GUARDRAILS ACTIVE
          </div>
          <p className="text-slate-300 font-sans leading-relaxed">
            All pipelines that draft content, synthesize regulatory dockets, or extract public claims mandate 
            founder approval prior to final publication. Zero autonomous public claims permitted.
          </p>
        </div>
      </div>

      {/* Automation Cards Grid */}
      <div className="space-y-4 font-mono text-xs">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-slate-400 text-[11px]">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    auto.status === 'active' 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {auto.status}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan-400">{auto.schedule}</span>
                  <span aria-hidden="true">·</span>
                  <span>Runs: {auto.runsCount}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400">
                    {auto.approvalRequirement ? 'Mandatory Founder Review' : 'Auto-Execute'}
                  </span>
                </div>

                <h3 className="text-sm font-semibold font-sans text-white">
                  {auto.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleTestRun(auto.id)}
                  disabled={runningId === auto.id}
                  className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 rounded transition-colors flex items-center gap-1.5"
                >
                  <Play className={`w-3 h-3 ${runningId === auto.id ? 'animate-spin' : ''}`} />
                  <span>{runningId === auto.id ? 'Testing...' : 'Test Run (+5 SC)'}</span>
                </button>

                <button
                  onClick={() => toggleAutomationStatus(auto.id)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                >
                  {auto.status === 'active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                Execution Pipeline Sequence:
              </div>
              <ol className="list-decimal list-inside space-y-1 font-sans text-xs text-slate-300">
                {auto.steps.map((st, idx) => (
                  <li key={idx}>{st}</li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1 border-t border-slate-850">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Input Trigger</span>
                <span className="text-slate-200 font-sans">{auto.inputDescription}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Output Artifact</span>
                <span className="text-slate-200 font-sans">{auto.outputDescription}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Failure Mode Guard</span>
                <span className="text-amber-300/90 font-sans">{auto.failureMode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
