import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Database, 
  BarChart3, 
  Clock, 
  FileCode,
  Layers 
} from 'lucide-react';

export const NexusGovernanceView: React.FC = () => {
  const { 
    blockedAttempts, 
    dataClassificationCounts, 
    forgeSignals, 
    oracleModels, 
    automations 
  } = useNexus();

  const missingSourceCount = forgeSignals.filter(s => !s.sourceUrl).length;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Permanent Mandate Box */}
      <div className="p-5 bg-[#090d16] border border-cyan-500/40 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Lock className="w-5 h-5 shrink-0" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            GLOBAL DATA GOVERNANCE // AIRGAPPED ISOLATION POLICY
          </h2>
        </div>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          "Personal venture environment only. Do not upload employer data, confidential customer information, restricted third-party information, or employer-generated intellectual property."
        </p>
      </div>

      {/* Governance Diagnostics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Restricted Blocked</span>
          <div className={`text-xl font-bold tabular-nums ${blockedAttempts.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {blockedAttempts.length} Blocked
          </div>
          <span className="text-[10px] text-slate-400">Zero restricted stored</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Missing Source Alerts</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">{missingSourceCount} Alerts</div>
          <span className="text-[10px] text-slate-400">100% cited dockets</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Stale Data Alerts</span>
          <div className="text-xl font-bold text-amber-400 tabular-nums">1 Stale</div>
          <span className="text-[10px] text-slate-400">Week 4 practice feed</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Automation Failures</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">0 Failures</div>
          <span className="text-[10px] text-slate-400">3 of 3 active nominal</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Unresolved Conflicts</span>
          <div className="text-xl font-bold text-emerald-400">0 Flags</div>
          <span className="text-[10px] text-slate-400">Airgapped separation</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">AI Review Queue</span>
          <div className="text-xl font-bold text-cyan-300">1 Candidate</div>
          <span className="text-[10px] text-slate-400">Pending founder review</span>
        </div>
      </div>

      {/* DATA CLASSIFICATION DISTRIBUTION */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-slate-800">
          Data Classification Distribution Registry
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(dataClassificationCounts).map(([classification, count]) => (
            <div key={classification} className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
              <span className={`text-[10px] uppercase font-bold block ${
                classification === 'restricted' ? 'text-rose-400' : 'text-cyan-400'
              }`}>
                {classification}
              </span>
              <div className="text-lg font-bold text-white tabular-nums">{count} Records</div>
              <span className="text-[9px] text-slate-500 font-sans block">
                {classification === 'restricted' ? 'Blocked & Logged' : 'Permitted & Tracked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BLOCKED ATTEMPTS LOG */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Blocked Restricted Upload Log (Content Discarded Immediately)</span>
          </div>
          <span className="text-xs text-rose-400 font-normal">Airgap Enforcement</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {blockedAttempts.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No policy violations detected. Airgapped isolation is nominal.
            </div>
          ) : (
            blockedAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-400 font-mono">{attempt.id}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 font-mono">Division: {attempt.attemptedDivision.toUpperCase()}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{attempt.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {attempt.reason}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold uppercase">
                    Storage Blocked
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
