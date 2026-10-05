import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldAlert, PlusCircle, Compass } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { 
    signalCredits, 
    currentLevel, 
    compoundingIndex, 
    askOracle, 
    oracleLoading,
    setShowOnboardingModal,
    setActiveSection,
    currentUserRole
  } = useApp();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand wordmark */}
      <div className="flex items-center gap-4">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); setActiveSection('command-center'); }}
          className="group flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs shadow-inner">
            FG
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors font-display">
              FORGE <span className="text-xs font-mono font-normal text-slate-400">// Venture Intelligence OS</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono tracking-wider -mt-0.5">
              Research · Build · Validate · Compound
            </div>
          </div>
        </a>
      </div>

      {/* Zone 2: Contextual Navigation & Telemetry Proofs */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Level:</span>
          <span className="text-slate-100 font-medium">{currentLevel.levelNumber}. {currentLevel.name}</span>
        </div>
        <span className="text-slate-700" aria-hidden="true">·</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Signal Credits:</span>
          <span className="text-cyan-400 font-semibold tabular-nums">+{signalCredits} SC</span>
        </div>
        <span className="text-slate-700" aria-hidden="true">·</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Compounding Index:</span>
          <span className="text-emerald-400 font-semibold tabular-nums">{compoundingIndex}/100</span>
        </div>
        <span className="text-slate-700" aria-hidden="true">·</span>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Role:</span>
          <span className="text-violet-300 uppercase text-[10px] tracking-wider">{currentUserRole.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowOnboardingModal(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-md transition-colors whitespace-nowrap"
          title="Review studio onboarding & 30-day operating cadence"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cadence</span>
        </button>

        <button
          onClick={() => askOracle()}
          disabled={oracleLoading}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{oracleLoading ? 'Analyzing...' : 'ORACLE Terminal'}</span>
        </button>
      </div>
    </header>
  );
};
