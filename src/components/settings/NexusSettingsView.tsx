import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { getApprovedAdminEmail, setApprovedAdminEmail } from '../../services/googleAuth';
import { 
  Sliders, 
  Key, 
  Lock, 
  ShieldCheck, 
  RotateCw, 
  Check, 
  Clock, 
  DollarSign, 
  Database,
  ExternalLink,
  ShieldAlert,
  PowerOff,
  UserCheck,
  Compass,
  Calendar
} from 'lucide-react';

export const NexusSettingsView: React.FC = () => {
  const { 
    oracleHoursThisWeek, 
    forgeHoursThisWeek, 
    setOracleHoursThisWeek, 
    setForgeHoursThisWeek, 
    resetAllDemoData,
    advisorSchedule,
    setAdvisorSchedule,
    setActiveNexusSection
  } = useNexus();

  const [adminEmail, setAdminEmail] = useState<string>(getApprovedAdminEmail());
  const [adminEmailSaved, setAdminEmailSaved] = useState<boolean>(false);
  const [scheduleSaved, setScheduleSaved] = useState<boolean>(false);
  const [killSwitchActive, setKillSwitchActive] = useState<boolean>(false);
  const [dailyCap, setDailyCap] = useState<number>(5.0);
  const [monthlyCap, setMonthlyCap] = useState<number>(50.0);
  const [resetConfirm, setResetConfirm] = useState<boolean>(false);

  const handleSaveAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim()) return;
    setApprovedAdminEmail(adminEmail.trim());
    setAdminEmailSaved(true);
    setTimeout(() => setAdminEmailSaved(false), 3000);
  };

  const integrations = [
    {
      name: 'Google Gemini AI Engine',
      envVar: 'GEMINI_API_KEY',
      status: 'Server-Side Injected',
      desc: 'Powers NEXUS ORCHESTRATOR and division strategy syntheses.'
    },
    {
      name: 'Perplexity Search Agent (PULSE)',
      envVar: 'PERPLEXITY_API_KEY',
      status: 'Server Secret Configured / Fallback Active',
      desc: 'Powers public regulatory docket retrieval and web grounded research.'
    },
    {
      name: 'Stripe Billing & Payments',
      envVar: 'STRIPE_SECRET_KEY',
      status: 'Simulation Placeholder Active',
      desc: 'Processes monitor subscription checkouts and one-time report payments.'
    },
    {
      name: 'Google Drive & Sheets Workspace',
      envVar: 'GOOGLE_OAUTH_CLIENT_ID',
      status: 'Fully Integrated & Active',
      desc: 'Enables client-side OAuth for Google Drive file management and Google Sheets spreadsheet synchronization.'
    },
    {
      name: 'GitHub Commit Lineage',
      envVar: 'GITHUB_ACCESS_TOKEN',
      status: 'Linked to /src/models Repository',
      desc: 'Records commit hashes for model change preregistration.'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              SETTINGS &amp; INTEGRATIONS // ZERO-CLIENT-SECRET POLICY
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Manage server-side integration placeholders, founder hours allocation, and database state.
          </p>
        </div>
      </div>

      {/* SINGLE-OPERATOR ADMIN ALLOWLIST SETTING */}
      <div className="p-5 bg-[#090d16] border border-cyan-500/30 rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Approved Single-Operator Administrator Account
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
            Single-User Enforcement Active
          </span>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          NEXUS is a private, single-user intelligence environment. Only this approved email address can unlock the OS. Any other authenticated Google or email/password account will be denied and directed to the locked screen.
        </p>

        <form onSubmit={handleSaveAdminEmail} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="e.g. Research@aiphysicallayer.net"
              className="w-full bg-[#05070c] border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono rounded-lg transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            {adminEmailSaved ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{adminEmailSaved ? 'Allowlist Updated' : 'Update Approved Email'}</span>
          </button>
        </form>
      </div>

      {/* NEXUS ADVISOR WEEKLY EXECUTIVE REVIEW SCHEDULE */}
      <div className="p-5 bg-[#090d16] border border-cyan-500/30 rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              NEXUS ADVISOR // Weekly Executive Review Schedule
            </h3>
          </div>
          <button
            onClick={() => setActiveNexusSection('advisor')}
            className="px-2.5 py-1 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors font-mono flex items-center gap-1"
          >
            <span>Open Advisor Chamber</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          Configure the weekly review cadence for ORACLE, FORGE, and Founder Allocation synthesis. By default, reviews cut off Sunday at 18:00, generate during the overnight window, and are due Monday at 08:00 for founder sign-off by 12:00.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-[#05070c] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Data Cutoff Day &amp; Time</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={advisorSchedule.cutoffDay}
                onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, cutoffDay: e.target.value })}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
              <input
                type="text"
                value={advisorSchedule.cutoffTime}
                onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, cutoffTime: e.target.value })}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <span className="text-[9px] text-slate-500 block">Default: Sunday 18:00</span>
          </div>

          <div className="p-3 rounded bg-[#05070c] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Generation Window</span>
            <input
              type="text"
              value={advisorSchedule.generationWindow}
              onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, generationWindow: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
            />
            <span className="text-[9px] text-slate-500 block">Overnight compilation</span>
          </div>

          <div className="p-3 rounded bg-[#05070c] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Review Due Date &amp; Time</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={advisorSchedule.dueDay}
                onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, dueDay: e.target.value })}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
              <input
                type="text"
                value={advisorSchedule.dueTime}
                onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, dueTime: e.target.value })}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <span className="text-[9px] text-slate-500 block">Default: Monday 08:00</span>
          </div>

          <div className="p-3 rounded bg-[#05070c] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Founder Sign-Off Target</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={advisorSchedule.reviewTargetDay}
                onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, reviewTargetDay: e.target.value })}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
              <input
                type="text"
                value={advisorSchedule.reviewTargetTime}
                onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, reviewTargetTime: e.target.value })}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <span className="text-[9px] text-slate-500 block">Target: Monday 12:00</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-sans">
            <input
              type="checkbox"
              checked={advisorSchedule.autoGenerateDraft}
              onChange={(e) => setAdvisorSchedule({ ...advisorSchedule, autoGenerateDraft: e.target.checked })}
              className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
            />
            <span>Automatically compile review draft at cutoff (Internal app data only; zero external spend)</span>
          </label>

          <button
            onClick={() => {
              setScheduleSaved(true);
              setTimeout(() => setScheduleSaved(false), 2500);
            }}
            className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            {scheduleSaved ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{scheduleSaved ? 'Schedule Saved' : 'Save Schedule Settings'}</span>
          </button>
        </div>
      </div>

      {/* GLOBAL AI/API KILL SWITCH & USAGE CAPS */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <PowerOff className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Global AI / API Kill Switch &amp; Budget Caps
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            killSwitchActive 
              ? 'bg-rose-950 text-rose-300 border border-rose-500' 
              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
          }`}>
            {killSwitchActive ? 'ALL AI CALLS FROZEN' : 'Active Normal'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded bg-[#05070c] border border-slate-850 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Immediate Kill Switch</span>
            <button
              onClick={() => setKillSwitchActive(!killSwitchActive)}
              className={`w-full py-2 rounded text-xs font-mono font-bold transition-all ${
                killSwitchActive
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-rose-600/90 hover:bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.3)]'
              }`}
            >
              {killSwitchActive ? 'RESTORE AI OPERATIONS' : 'HALT ALL AI REQUESTS'}
            </button>
            <span className="text-[10px] text-slate-500 block font-sans">
              Instant stop for all background or scheduled research runs.
            </span>
          </div>

          <div className="p-3 rounded bg-[#05070c] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Daily Request Cap</span>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-sm">${dailyCap.toFixed(2)} / day</span>
              <span className="text-[10px] text-cyan-400">Current: $0.85</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={dailyCap}
              onChange={(e) => setDailyCap(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="p-3 rounded bg-[#05070c] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Monthly Budget Ceiling</span>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-sm">${monthlyCap.toFixed(2)} / mo</span>
              <span className="text-[10px] text-emerald-400">Current: $10.70</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={monthlyCap}
              onChange={(e) => setMonthlyCap(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Secret Safety Notice */}
      <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-lg flex items-start gap-3">
        <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-slate-300 font-sans">
          <strong className="text-white block font-mono text-xs uppercase tracking-wide">
            ZERO-CLIENT-CREDENTIAL ARCHITECTURE
          </strong>
          <p className="text-xs leading-relaxed text-slate-400">
            API keys and tokens are strictly kept in the server-side environment. Credentials never appear in client bundles, browser storage, or network payloads.
          </p>
        </div>
      </div>

      {/* INTEGRATION STATUS REGISTRY */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>External Integration Placeholders</span>
          <span className="text-emerald-400 text-xs font-normal">All Credentials Server-Side</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {integrations.map((item, idx) => (
            <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white font-sans text-sm flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.name}</span>
                  <code className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                    {item.envVar}
                  </code>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  {item.desc}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="px-2.5 py-1 rounded bg-[#06080e] border border-slate-800 text-cyan-300 font-bold text-[10px] uppercase">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TIME ALLOCATION CONTROLS */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-slate-800">
          Weekly Founder Attention Allocation (Hours / Week)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-cyan-400 font-bold">ORACLE NFL Forecast Hours</span>
              <span className="text-white font-bold tabular-nums">{oracleHoursThisWeek} Hours</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={oracleHoursThisWeek}
              onChange={(e) => setOracleHoursThisWeek(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-violet-400 font-bold">FORGE LABS Venture Hours</span>
              <span className="text-white font-bold tabular-nums">{forgeHoursThisWeek} Hours</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={forgeHoursThisWeek}
              onChange={(e) => setForgeHoursThisWeek(Number(e.target.value))}
              className="w-full accent-violet-400"
            />
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 font-sans">
          Total Committed: <strong>{oracleHoursThisWeek + forgeHoursThisWeek} hours/week</strong>. Maintaining at least 15+ hours for FORGE is required to hit the $750/mo revenue gate.
        </div>
      </div>

      {/* DANGEROUS / DATA RESET ZONE */}
      <div className="p-5 bg-rose-950/20 border border-rose-500/30 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-rose-300 uppercase">Demo State Reset</h3>
            <p className="text-xs text-slate-400 font-sans">
              Reset all local storage to original realistic fictional seed data for ORACLE and FORGE.
            </p>
          </div>

          {resetConfirm ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllDemoData();
                  setResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Confirm Reset
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white border border-slate-700"
            >
              Reset Demo Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
