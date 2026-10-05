import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Key, 
  Lock, 
  Check, 
  CreditCard, 
  DollarSign, 
  Power, 
  RotateCw,
  Clock
} from 'lucide-react';

export const PulseSettingsTab: React.FC = () => {
  const { pulseSettings, updatePulseSettings, fetchPulseConfig } = useApp();
  const [dailyLimit, setDailyLimit] = useState(pulseSettings.dailyLimit);
  const [monthlyLimit, setMonthlyLimit] = useState(pulseSettings.monthlyLimit);
  const [monthlyBudgetCap, setMonthlyBudgetCap] = useState(pulseSettings.monthlyBudgetCap);
  const [saved, setSaved] = useState(false);

  const handleSaveLimits = (e: React.FormEvent) => {
    e.preventDefault();
    updatePulseSettings({
      dailyLimit: Number(dailyLimit),
      monthlyLimit: Number(monthlyLimit),
      monthlyBudgetCap: Number(monthlyBudgetCap),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleKillSwitch = () => {
    const newState = !pulseSettings.killSwitchActive;
    updatePulseSettings({ killSwitchActive: newState });
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Secret Safety & Integration Header */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-bold uppercase tracking-wider">
              Server-Side Secret Architecture &amp; Integration
            </span>
          </div>
          <span className="text-emerald-400 font-semibold text-[11px]">
            Zero-Client-Credential Policy Enforced
          </span>
        </div>

        <div className="p-3.5 bg-[#0d121c] border border-slate-850 rounded space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300">
            <span className="font-bold flex items-center gap-1.5 text-xs text-white">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>PERPLEXITY_API_KEY</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
              {pulseSettings.hasPerplexityKey ? 'CONFIGURED IN SERVER SECRETS' : 'SERVER-SIDE SEARCH ENGINE ACTIVE'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            API keys and tokens are strictly kept in the server-side environment. 
            The browser never communicates with external AI services directly, and credentials never appear in client bundles or network payloads.
          </p>
        </div>
      </div>

      {/* KILL SWITCH PANEL */}
      <div className={`p-5 rounded-lg border transition-all ${
        pulseSettings.killSwitchActive 
          ? 'bg-rose-950/20 border-rose-500/60' 
          : 'bg-[#0a0e17] border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Power className={`w-4 h-4 ${pulseSettings.killSwitchActive ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Studio Kill Switch // Emergency Freeze
              </h3>
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Instantly halts all outgoing PULSE web searches and automated research pipelines without deleting data.
            </p>
          </div>

          <button
            onClick={handleToggleKillSwitch}
            className={`px-4 py-2 rounded font-bold uppercase transition-colors whitespace-nowrap text-xs ${
              pulseSettings.killSwitchActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg'
                : 'bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 border border-slate-700'
            }`}
          >
            {pulseSettings.killSwitchActive ? 'DISABLE KILL SWITCH (RESUME)' : 'ACTIVATE KILL SWITCH'}
          </button>
        </div>

        {pulseSettings.killSwitchActive && (
          <div className="mt-3 p-3 bg-rose-950/40 border border-rose-500/60 rounded text-rose-300 text-xs font-sans">
            ⚠ All PULSE research requests are currently blocked. No external requests will be issued until disabled.
          </div>
        )}
      </div>

      {/* Rate Limits & Budget Allocation Form */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-white font-bold uppercase tracking-wider">
            Daily / Monthly Request Caps &amp; Budget Thresholds
          </span>
          {saved && (
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Updated
            </span>
          )}
        </div>

        <form onSubmit={handleSaveLimits} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Daily Request Cap</label>
              <input
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-bold"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Used today: {pulseSettings.dailyRequestsUsed} / {pulseSettings.dailyLimit}
              </span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Monthly Request Cap</label>
              <input
                type="number"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-bold"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Used this month: {pulseSettings.monthlyRequestsUsed} / {pulseSettings.monthlyLimit}
              </span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Monthly Budget Cap ($)</label>
              <input
                type="number"
                step="5.00"
                value={monthlyBudgetCap}
                onChange={(e) => setMonthlyBudgetCap(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-bold"
              />
              <span className="text-[10px] text-emerald-400 block mt-1">
                Spend: ${pulseSettings.currentMonthlySpend.toFixed(2)} / ${pulseSettings.monthlyBudgetCap.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#0d121c] border border-slate-850 rounded flex items-center justify-between">
            <span className="text-slate-300 font-sans text-xs">
              Require founder authorization before executing Deep Research ($0.35/query)?
            </span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pulseSettings.requiresApprovalForDeep}
                onChange={(e) => updatePulseSettings({ requiresApprovalForDeep: e.target.checked })}
                className="accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold">Enabled</span>
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded transition-colors"
            >
              Update Research Limits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
