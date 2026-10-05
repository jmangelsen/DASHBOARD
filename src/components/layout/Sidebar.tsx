import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Inbox,
  Scale,
  FlaskConical,
  Hammer,
  Share2,
  DollarSign,
  Database,
  Cpu,
  Archive,
  Shield,
  Sliders,
  ExternalLink,
  Globe,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number | string;
  alert?: boolean;
}

export const Sidebar: React.FC = () => {
  const { 
    activeSection, 
    setActiveSection,
    signals,
    evidence,
    opportunity,
    products,
    distribution,
    transactions,
    assets,
    automations,
    intelligence,
    conflictChecks,
    monthlyRecurringRevenue,
    pulseRuns
  } = useApp();

  const missingSourceCount = evidence.filter(e => !e.sourceUrl || e.isUnsupportedInference).length;
  const staleSignals = signals.filter(s => s.reviewStatus === 'inbox').length;
  const unlinkedDistribution = distribution.filter(d => !d.linkedOfferId || !d.cta).length;
  const pendingPulseClaims = pulseRuns.flatMap(r => r.output?.candidate_evidence || []).filter(c => c.reviewStatus === 'pending').length;

  const navItems: NavItem[] = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'signal-inbox', label: 'Signal Inbox', icon: Inbox, count: staleSignals > 0 ? staleSignals : undefined, alert: staleSignals > 0 },
    { id: 'pulse-agent', label: 'PULSE Agent', icon: Globe, count: pendingPulseClaims > 0 ? `${pendingPulseClaims} pending` : 'Ready', alert: pendingPulseClaims > 0 },
    { id: 'evidence-ledger', label: 'Evidence Ledger', icon: Scale, count: evidence.length, alert: missingSourceCount > 0 },
    { id: 'opportunity-lab', label: 'Opportunity Lab', icon: FlaskConical, count: opportunity.stage.replace('_', ' ') },
    { id: 'product-forge', label: 'Product Forge', icon: Hammer, count: products.length },
    { id: 'distribution-engine', label: 'Distribution Engine', icon: Share2, alert: unlinkedDistribution > 0 },
    { id: 'revenue-engine', label: 'Revenue Engine', icon: DollarSign, count: `$${monthlyRecurringRevenue}/mo` },
    { id: 'asset-vault', label: 'Asset Vault', icon: Database, count: assets.length },
    { id: 'automation-console', label: 'Automation Console', icon: Cpu, count: automations.filter(a => a.status === 'active').length },
    { id: 'intelligence-archive', label: 'Intelligence Archive', icon: Archive, count: intelligence.length },
    { id: 'governance', label: 'Governance', icon: Shield, count: conflictChecks.length },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <nav aria-label="Main Navigation" className="w-64 shrink-0 bg-[#090c13] border-r border-slate-800/80 flex flex-col justify-between p-4 h-[calc(100vh-84px)] overflow-y-auto">
      <div className="space-y-6">
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Venture Operating Loop
          </div>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono rounded-md transition-colors text-left ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2.5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count !== undefined && (
                    <span className={`text-[11px] tabular-nums shrink-0 ml-2 ${
                      item.alert ? 'text-amber-400 font-medium' : 'text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Operating Thesis Card */}
        <div className="p-3 bg-[#0d121c] border border-slate-800/90 rounded-md">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Studio Thesis
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            AI scales through electricity, water, land, substations, and local permits. Commercial progress is measured in verified cash flow and reusable IP, not prompt volume.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Target Approval</span>
          <span className="text-slate-200 tabular-nums font-medium">$750 / mo</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Environment</span>
          <span className="text-emerald-400">Airgapped / Private</span>
        </div>
      </div>
    </nav>
  );
};
