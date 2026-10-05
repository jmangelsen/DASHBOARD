import React from 'react';
import { useNexus, NexusNavSection, OracleDepartment, ForgeDepartment } from '../../context/NexusContext';
import {
  LayoutDashboard,
  Target,
  Database,
  Cpu,
  Shield,
  Sliders,
  HardDrive,
  Layers,
  Activity,
  FileText,
  Percent,
  CheckCircle2,
  Calendar,
  Archive,
  BarChart3,
  GitBranch,
  BookOpen,
  Inbox,
  Users,
  FlaskConical,
  Hammer,
  Rocket,
  Share2,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Compass
} from 'lucide-react';

export const NexusSidebar: React.FC = () => {
  const {
    activeDivision,
    setActiveDivision,
    activeNexusSection,
    setActiveNexusSection,
    activeOracleDepartment,
    setActiveOracleDepartment,
    activeForgeDepartment,
    setActiveForgeDepartment,
    currentForgeMRR,
    forgeRevenueThreshold,
    sharedMissions,
    oracleGames,
    forgeSignals,
    blockedAttempts
  } = useNexus();

  const pendingMissions = sharedMissions.filter(m => m.status === 'active').length;

  // Root Navigation Items
  const rootNavItems: { id: NexusNavSection | 'oracle-div' | 'forge-div'; label: string; icon: any; count?: string | number; alert?: boolean }[] = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard, count: 'Home' },
    { id: 'system-map', label: 'NEXUS System Map', icon: Activity, count: 'Flow Map' },
    { id: 'advisor', label: 'NEXUS ADVISOR', icon: Compass, count: 'Weekly' },
    { id: 'oracle-div', label: 'ORACLE // NFL Forecast', icon: Target, count: 'Week 5 Active' },
    { id: 'forge-div', label: 'FORGE LABS // Venture', icon: Briefcase, count: `$${currentForgeMRR}/$${forgeRevenueThreshold}`, alert: currentForgeMRR < forgeRevenueThreshold },
    { id: 'workspace', label: 'Google Workspace', icon: HardDrive, count: 'Drive · Sheets' },
    { id: 'shared-missions', label: 'Shared Missions', icon: Calendar, count: pendingMissions },
    { id: 'asset-vault', label: 'Asset Vault', icon: Database },
    { id: 'automation-control', label: 'Automation Control', icon: Cpu },
    { id: 'governance', label: 'Governance & Audit', icon: Shield, count: blockedAttempts.length > 0 ? `${blockedAttempts.length} alert` : undefined, alert: blockedAttempts.length > 0 },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  // 12 ORACLE Departments
  const oracleNavItems: { id: OracleDepartment; label: string; icon: any; count?: string | number }[] = [
    { id: 'command', label: 'ORACLE Command', icon: LayoutDashboard },
    { id: 'data-ops', label: 'Data Operations', icon: Database, count: 'Nominal' },
    { id: 'model-lab', label: 'Model Lab', icon: GitBranch, count: 'v2.4' },
    { id: 'game-intel', label: 'Game Intelligence', icon: Activity, count: oracleGames.length },
    { id: 'player-intel', label: 'Player Intelligence', icon: Users, count: 'Active' },
    { id: 'parlays', label: 'Parlay Architecture', icon: Layers, count: 'Analysis Only' },
    { id: 'market-bench', label: 'Market Benchmark', icon: BarChart3 },
    { id: 'backtest', label: 'Backtest & Calibration', icon: Percent, count: 'Brier 0.188' },
    { id: 'change-control', label: 'Change Control', icon: CheckCircle2, count: '2 Logs' },
    { id: 'weekly-review', label: 'Weekly Review', icon: FileText, count: 'Week 4' },
    { id: 'research-desk', label: 'Research Desk', icon: BookOpen },
    { id: 'archive', label: 'Historical Archive', icon: Archive },
  ];

  // 13 FORGE Departments
  const forgeNavItems: { id: ForgeDepartment; label: string; icon: any; count?: string | number; alert?: boolean }[] = [
    { id: 'command', label: 'Venture Command', icon: LayoutDashboard },
    { id: 'signals', label: 'Signal Radar', icon: Inbox, count: forgeSignals.length },
    { id: 'buyer-research', label: 'Market & Buyer Research', icon: Users, count: '1 Interview' },
    { id: 'opportunity-lab', label: 'Opportunity Lab', icon: FlaskConical, count: 'Score 86' },
    { id: 'offer-pricing', label: 'Offer & Pricing Studio', icon: DollarSign, count: '2 Offers' },
    { id: 'product-forge', label: 'Product Forge', icon: Hammer, count: 'Paid Pilot' },
    { id: 'launch-deploy', label: 'Launch & Deployment', icon: Rocket },
    { id: 'distribution', label: 'Distribution Engine', icon: Share2, count: '1 Campaign' },
    { id: 'revenue-ops', label: 'Revenue Operations', icon: TrendingUp, count: `$${currentForgeMRR}/mo` },
    { id: 'asset-vault', label: 'Asset Vault', icon: Database, count: '3 Assets' },
    { id: 'automations', label: 'Automation Factory', icon: Cpu, count: '3 Workflows' },
    { id: 'portfolio-review', label: 'Portfolio Review', icon: Target },
    { id: 'archive', label: 'Venture Archive', icon: Archive },
  ];

  return (
    <nav 
      aria-label="Sidebar Navigation" 
      className="w-64 shrink-0 bg-[#07090e] border-r border-slate-800 flex flex-col justify-between p-3.5 h-[calc(100vh-84px)] overflow-y-auto font-mono text-xs"
    >
      <div className="space-y-4">
        {/* Navigation Breadcrumb / Division Header */}
        {activeDivision !== 'nexus' ? (
          <div className="space-y-1.5 pb-2 border-b border-slate-800">
            <button
              onClick={() => setActiveDivision('nexus')}
              className="flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to NEXUS Root</span>
            </button>
            <div className="px-1 text-xs font-bold text-white uppercase flex items-center justify-between">
              <span>{activeDivision === 'oracle' ? 'ORACLE // NFL' : 'FORGE LABS'}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-normal ${
                activeDivision === 'oracle' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' : 'bg-violet-950/80 text-violet-300 border border-violet-800/60'
              }`}>
                {activeDivision === 'oracle' ? '12 Depts' : '13 Depts'}
              </span>
            </div>
          </div>
        ) : (
          <div className="px-2 pt-1 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
            <span>Root Operations</span>
            <span className="text-cyan-400">NEXUS OS</span>
          </div>
        )}

        {/* Division 00: NEXUS Root List */}
        {activeDivision === 'nexus' && (
          <div className="space-y-0.5">
            {rootNavItems.map((item) => {
              const Icon = item.icon;
              const isDivisionLink = item.id === 'oracle-div' || item.id === 'forge-div';
              const isSelected = !isDivisionLink && activeNexusSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'oracle-div') {
                      setActiveDivision('oracle');
                      setActiveOracleDepartment('command');
                    } else if (item.id === 'forge-div') {
                      setActiveDivision('forge');
                      setActiveForgeDepartment('command');
                    } else {
                      setActiveNexusSection(item.id as NexusNavSection);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-2.5'
                      : isDivisionLink
                      ? 'text-slate-300 hover:text-white hover:bg-[#0e1422] border border-slate-800/60 my-1'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${
                      item.id === 'oracle-div' ? 'text-cyan-400' : item.id === 'forge-div' ? 'text-violet-400' : isSelected ? 'text-cyan-400' : 'text-slate-400'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count && (
                    <span className={`text-[10px] tabular-nums shrink-0 ml-1.5 px-1.5 py-0.5 rounded ${
                      item.alert
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                        : isDivisionLink
                        ? 'bg-slate-800/80 text-slate-300'
                        : 'text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Division 01: ORACLE NFL Departments */}
        {activeDivision === 'oracle' && (
          <div className="space-y-0.5">
            {oracleNavItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeOracleDepartment === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveOracleDepartment(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left text-[11px] ${
                    isSelected
                      ? 'bg-cyan-950/60 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-2'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count && (
                    <span className="text-[10px] text-slate-400 tabular-nums shrink-0 ml-1">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Division 02: FORGE LABS Departments */}
        {activeDivision === 'forge' && (
          <div className="space-y-0.5">
            {forgeNavItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeForgeDepartment === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveForgeDepartment(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left text-[11px] ${
                    isSelected
                      ? 'bg-violet-950/60 text-violet-300 font-bold border-l-2 border-violet-400 pl-2'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-violet-400' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count && (
                    <span className={`text-[10px] tabular-nums shrink-0 ml-1 ${item.alert ? 'text-amber-400' : 'text-slate-400'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info Box */}
      <div className="pt-3 border-t border-slate-800/80 space-y-2 text-[10px] text-slate-400">
        <div className="p-2.5 rounded bg-[#0b0e17] border border-slate-850 space-y-1">
          <div className="text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Isolation Gate</span>
            <span className="text-emerald-400">Enforced</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans leading-tight">
            NFL forecast metrics and venture cash flow do not cross-inflate.
          </p>
        </div>
      </div>
    </nav>
  );
};
