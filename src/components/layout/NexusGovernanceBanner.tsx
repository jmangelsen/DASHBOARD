import React from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

export const NexusGovernanceBanner: React.FC = () => {
  const { setActiveDivision, setActiveNexusSection } = useNexus();

  const handleOpenGovernance = () => {
    setActiveDivision('nexus');
    setActiveNexusSection('governance');
  };

  return (
    <aside 
      aria-label="Data Governance Notice"
      className="bg-[#06080d] border-b border-slate-800/80 px-6 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400"
    >
      <div className="flex items-center gap-2 truncate">
        <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
        <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
          DATA GOVERNANCE PROTOCOL:
        </span>
        <span className="truncate text-slate-300">
          Personal venture use only. Do not upload employer data, customer-confidential data, restricted data, employer-generated intellectual property, or conflict-of-interest material.
        </span>
      </div>

      <button
        onClick={handleOpenGovernance}
        className="shrink-0 flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 font-medium pl-3 transition-colors"
      >
        <span>Governance Registry</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </aside>
  );
};
