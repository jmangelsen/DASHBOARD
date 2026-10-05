import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { subscribeToAuth, getCurrentUser, googleLogout, getCurrentOperatorEmail } from '../../services/googleAuth';
import { User } from 'firebase/auth';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Layers,
  Activity,
  AlertTriangle,
  HardDrive,
  LogOut,
  ChevronLeft,
  Coins,
  Cpu
} from 'lucide-react';

export const NexusTopBar: React.FC = () => {
  const {
    activeDivision,
    setActiveDivision,
    activeNexusSection,
    setActiveNexusSection,
    oracleHoursThisWeek,
    forgeHoursThisWeek,
    founderCompoundingIndex,
    oracleIntegrityScore,
    currentForgeMRR,
    forgeRevenueThreshold,
    setOrchestratorOpen,
    setOrchestratorMode,
    lastBlockedAlert,
    clearBlockedAlert
  } = useNexus();

  const [googleUser, setGoogleUser] = useState<User | null>(getCurrentUser());
  const [hasToken, setHasToken] = useState<boolean>(false);
  const operatorEmail = getCurrentOperatorEmail() || 'Admin';

  useEffect(() => {
    const unsub = subscribeToAuth((user, token) => {
      setGoogleUser(user);
      setHasToken(!!token);
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await googleLogout();
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col bg-[#070a12]/95 backdrop-blur-md border-b border-slate-800">
      {/* Blocked Attempt Banner (if triggered) */}
      {lastBlockedAlert && (
        <div className="bg-rose-950/80 border-b border-rose-500/50 px-4 py-2 flex items-center justify-between text-xs font-mono text-rose-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{lastBlockedAlert}</span>
          </div>
          <button 
            onClick={clearBlockedAlert}
            className="text-xs px-2 py-0.5 rounded bg-rose-900/60 hover:bg-rose-800 text-white font-bold"
          >
            DISMISS
          </button>
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-2.5">
        {/* Zone 1: Brand & Division Switcher */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => {
              setActiveDivision('nexus');
              setActiveNexusSection('command-center');
            }}
            className="cursor-pointer group flex items-center gap-2.5"
            title="Return to NEXUS COMMAND CENTER"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-violet-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-black text-xs shadow-inner">
              NX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors font-display">
                  NEXUS <span className="text-[11px] font-mono font-normal text-slate-400">// Personal Intelligence OS</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#0d1322] border border-cyan-900/50 text-[9px] font-mono text-cyan-300 uppercase tracking-widest">
                  PRIVATE // SINGLE-OPERATOR ENVIRONMENT
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono tracking-wider">
                Forecast with rigor · Build with speed · Compound with discipline
              </div>
            </div>
          </div>

          {/* If inside a division: Show Return to NEXUS COMMAND CENTER Button */}
          {activeDivision !== 'nexus' && (
            <button
              onClick={() => {
                setActiveDivision('nexus');
                setActiveNexusSection('command-center');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d1322] hover:bg-[#131c33] text-cyan-400 border border-cyan-500/40 text-xs font-mono font-semibold transition-all ml-2"
              title="Return to Command Center"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </button>
          )}

          {/* Division Indicator Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a0e19] border border-slate-800 text-[11px] font-mono">
            <span className="text-slate-500">Active:</span>
            {activeDivision === 'nexus' && activeNexusSection === 'system-map' && (
              <span className="text-white font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                NEXUS SYSTEM MAP // Flow Architecture
              </span>
            )}
            {activeDivision === 'nexus' && activeNexusSection !== 'system-map' && (
              <span className="text-white font-bold">NEXUS COMMAND CENTER</span>
            )}
            {activeDivision === 'oracle' && (
              <span className="text-cyan-300 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                ORACLE // NFL Intelligence
              </span>
            )}
            {activeDivision === 'forge' && (
              <span className="text-violet-300 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                FORGE // Venture Deployment
              </span>
            )}
          </div>
        </div>

        {/* Zone 2: Attention, Telemetry, Signal Credits & Cost */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5" title="Signal Credits earned via rigorous verification">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Credits:</span>
            <span className="text-amber-300 font-bold tabular-nums">820 SC</span>
          </div>

          <span className="text-slate-800" aria-hidden="true">|</span>

          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
            <span>Compounding:</span>
            <span className="text-cyan-300 font-bold tabular-nums">{founderCompoundingIndex}/100</span>
          </div>

          <span className="text-slate-800" aria-hidden="true">|</span>

          <div className="flex items-center gap-1.5" title="Server-side API usage & budget cap">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>API Cap:</span>
            <span className="text-white font-semibold tabular-nums">$10.70</span>
            <span className="text-[10px] text-slate-500">/ $50.00</span>
          </div>

          <span className="text-slate-800" aria-hidden="true">|</span>

          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Governance: Nominal</span>
          </div>
        </div>

        {/* Zone 3: Workspace, Orchestrator & Secure Logout */}
        <div className="flex items-center gap-2.5">
          {/* Google Workspace Shortcut */}
          <button
            onClick={() => {
              setActiveDivision('nexus');
              setActiveNexusSection('workspace');
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono transition-all border ${
              googleUser && hasToken
                ? 'bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700'
            }`}
          >
            <HardDrive className={`w-3.5 h-3.5 ${googleUser && hasToken ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>{googleUser && hasToken ? 'Drive & Sheets' : 'Drive/Sheets'}</span>
          </button>

          {/* AI Orchestrator */}
          <button
            onClick={() => {
              setOrchestratorMode(activeDivision);
              setOrchestratorOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ORCHESTRATOR</span>
          </button>

          {/* Secure Operator Logout */}
          <button
            onClick={handleLogout}
            title={`Signed in as approved operator: ${operatorEmail}. Click to securely lock.`}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
