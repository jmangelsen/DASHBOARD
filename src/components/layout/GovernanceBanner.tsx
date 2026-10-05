import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GovernanceBanner: React.FC = () => {
  const { setActiveSection } = useApp();

  return (
    <aside aria-label="Data Governance Notice" className="bg-amber-950/25 border-b border-amber-500/25 px-6 py-2 flex items-center justify-between text-xs text-amber-200/90 font-mono">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="truncate">
          <strong className="text-amber-300 font-semibold tracking-wide">DATA GOVERNANCE PROTOCOL:</strong> Personal venture use only. Do not upload employer data, customer confidential data, restricted data, employer-generated IP, or any conflict-of-interest material.
        </span>
      </div>
      <button 
        onClick={() => setActiveSection('governance')}
        className="shrink-0 flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 ml-4 whitespace-nowrap"
      >
        <span>Audit Ledger</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </aside>
  );
};
