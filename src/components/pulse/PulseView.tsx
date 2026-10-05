import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PulseConsole } from './PulseConsole';
import { PulseResultsView } from './PulseResultsView';
import { EvidenceQualityDashboard } from './EvidenceQualityDashboard';
import { PulseSettingsTab } from './PulseSettingsTab';
import { 
  Globe, 
  Search, 
  FileCheck, 
  Activity, 
  History, 
  Sliders, 
  AlertTriangle,
  Lock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const PulseView: React.FC = () => {
  const { 
    pulseRuns, 
    activePulseRun, 
    setActivePulseRun, 
    pulseSettings 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'console' | 'results' | 'quality' | 'history' | 'settings'>('console');

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="p-5 bg-[#0a0e17] border border-cyan-500/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="uppercase tracking-widest font-semibold">PULSE // WEB RESEARCH &amp; EVIDENCE AGENT</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Perplexity-Powered</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight">
            Grounded Research Terminal
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-2xl">
            PULSE retrieves public regulatory dockets, municipal resolutions, and utility filings. 
            All findings are candidate drafts requiring human verification before entering the Evidence Ledger.
          </p>
        </div>

        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6 font-mono text-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block">Agent Status</span>
            <span className={`font-semibold ${pulseSettings.killSwitchActive ? 'text-rose-400' : 'text-emerald-400'}`}>
              {pulseSettings.killSwitchActive ? 'KILL SWITCH ACTIVE' : 'NOMINAL (READY)'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block">Monthly Budget</span>
            <span className="font-semibold text-cyan-400 tabular-nums">
              ${pulseSettings.currentMonthlySpend.toFixed(2)} / ${pulseSettings.monthlyBudgetCap.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('console')}
          className={`pb-2 px-2 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'console' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Research Console</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`pb-2 px-2 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'results' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Candidate Evidence Results ({activePulseRun?.output?.candidate_evidence.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('quality')}
          className={`pb-2 px-2 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'quality' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Evidence Quality Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-2 px-2 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'history' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Run History ({pulseRuns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-2 px-2 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'settings' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Agent Guardrails &amp; Settings</span>
        </button>
      </div>

      {/* Tab Views */}
      {activeTab === 'console' && (
        <PulseConsole onSuccess={() => setActiveTab('results')} />
      )}

      {activeTab === 'results' && (
        <PulseResultsView run={activePulseRun} />
      )}

      {activeTab === 'quality' && (
        <EvidenceQualityDashboard />
      )}

      {activeTab === 'history' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
            <span>Historical Research Runs ({pulseRuns.length})</span>
            <span>Click to load candidate claims in Results tab</span>
          </div>

          {pulseRuns.map((r) => (
            <div
              key={r.runId}
              onClick={() => {
                setActivePulseRun(r);
                setActiveTab('results');
              }}
              className={`p-4 rounded-lg border cursor-pointer transition-all space-y-2 ${
                activePulseRun?.runId === r.runId
                  ? 'bg-[#0d121f] border-cyan-500/50'
                  : 'bg-[#0a0e17] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">{r.runId}</span>
                  <span>·</span>
                  <span className="uppercase">{r.mode}</span>
                  <span>·</span>
                  <span className="text-white font-sans">{r.geography}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-semibold">
                    {r.output?.candidate_evidence.length || 0} claims
                  </span>
                  <span>·</span>
                  <span>${r.estimatedCost.toFixed(2)}</span>
                  <span>·</span>
                  <span>{new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="text-sm font-semibold font-sans text-white">
                "{r.query}"
              </div>

              <p className="text-xs text-slate-400 font-sans line-clamp-1">
                {r.output?.research_summary}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <PulseSettingsTab />
      )}
    </div>
  );
};
