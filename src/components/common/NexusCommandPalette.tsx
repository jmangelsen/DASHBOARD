import React, { useState, useEffect } from 'react';
import { useNexus, OracleDepartment, ForgeDepartment, NexusNavSection } from '../../context/NexusContext';
import { 
  Search, 
  Target, 
  Briefcase, 
  Shield, 
  Cpu, 
  HardDrive, 
  Calendar, 
  Database, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Command,
  X
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  badge?: string;
  action: () => void;
}

export const NexusCommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setActiveDivision,
    setActiveNexusSection,
    setActiveOracleDepartment,
    setActiveForgeDepartment,
    oracleGames,
    oracleModels,
    forgeSignals,
    sharedMissions,
    sharedAssets,
    automations
  } = useNexus();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  // Build searchable index
  const allItems: SearchResult[] = [
    // Top-Level Views
    {
      id: 'view-floor',
      title: 'NEXUS FLOOR // Live Operating Map',
      category: 'Command Floor',
      subtitle: 'Primary visual navigation & real-time operational floorplan',
      badge: 'Home Map',
      action: () => {
        setActiveDivision('nexus');
        setActiveNexusSection('nexus-floor');
      }
    },
    {
      id: 'view-command-center',
      title: 'NEXUS Command Center (Division Select)',
      category: 'Overview',
      subtitle: 'Executive dual-division telemetry & hours allocation',
      action: () => {
        setActiveDivision('nexus');
        setActiveNexusSection('command-center');
      }
    },
    {
      id: 'view-workspace',
      title: 'Google Workspace Hub (Drive & Sheets)',
      category: 'Integrations',
      subtitle: 'Google Drive file explorer and Google Sheets synchronizer',
      badge: 'Active OAuth',
      action: () => {
        setActiveDivision('nexus');
        setActiveNexusSection('workspace');
      }
    },
    {
      id: 'view-governance',
      title: 'Governance & Audit Registry',
      category: 'Governance',
      subtitle: 'Airgapped isolation, restricted blocks, and compliance audit log',
      action: () => {
        setActiveDivision('nexus');
        setActiveNexusSection('governance');
      }
    },
    {
      id: 'view-cadence',
      title: 'Shared Mission Control (Cadence)',
      category: 'Missions',
      subtitle: 'Weekly priorities, deep-work hours, and milestone tracking',
      action: () => {
        setActiveDivision('nexus');
        setActiveNexusSection('shared-missions');
      }
    },

    // 12 ORACLE Departments
    {
      id: 'oracle-command',
      title: 'ORACLE Command',
      category: 'ORACLE NFL',
      subtitle: 'Current-week forecast readiness, data health, and priority decisions',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('command');
      }
    },
    {
      id: 'oracle-data-ops',
      title: 'Data Operations Bay',
      category: 'ORACLE NFL',
      subtitle: 'Statistical ingestion, source lineage, freshness, and data quality',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('data-ops');
      }
    },
    {
      id: 'oracle-model-lab',
      title: 'Model Lab',
      category: 'ORACLE NFL',
      subtitle: 'Bayesian Ridge, EPA weights, versioning, candidate models, and rollback',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('model-lab');
      }
    },
    {
      id: 'oracle-game-intel',
      title: 'Game Intelligence Desk',
      category: 'ORACLE NFL',
      subtitle: 'Game dossiers, script distributions, matchup analysis, and uncertainty',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('game-intel');
      }
    },
    {
      id: 'oracle-player-intel',
      title: 'Player Intelligence Desk',
      category: 'ORACLE NFL',
      subtitle: 'Player availability, role, snap share, injury drop-off, and projection inputs',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('player-intel');
      }
    },
    {
      id: 'oracle-parlays',
      title: 'Parlay Architecture Bay',
      category: 'ORACLE NFL',
      subtitle: 'Correlation-aware multi-leg scenario research (forecast analysis only)',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('parlays');
      }
    },
    {
      id: 'oracle-market-bench',
      title: 'Market Benchmark Console',
      category: 'ORACLE NFL',
      subtitle: 'Independent model outputs compared separately with market context',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('market-bench');
      }
    },
    {
      id: 'oracle-backtest',
      title: 'Backtest & Calibration Lab',
      category: 'ORACLE NFL',
      subtitle: 'Brier score (0.188), log loss, reliability curves, and rolling backtests',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('backtest');
      }
    },
    {
      id: 'oracle-change-control',
      title: 'Change Control Console',
      category: 'ORACLE NFL',
      subtitle: 'Preregistered model changes, hypotheses, approvals, and rollback plans',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('change-control');
      }
    },
    {
      id: 'oracle-weekly-review',
      title: 'Weekly Review Room',
      category: 'ORACLE NFL',
      subtitle: 'Post-week accountability, forecast-vs-outcome review, and learning loop',
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('weekly-review');
      }
    },

    // 13 FORGE Departments
    {
      id: 'forge-command',
      title: 'Venture Command',
      category: 'FORGE LABS',
      subtitle: 'Actual revenue, commercial bottlenecks, and highest-leverage actions',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('command');
      }
    },
    {
      id: 'forge-signals',
      title: 'Signal Radar',
      category: 'FORGE LABS',
      subtitle: 'Capture market signals, buyer pain, competitor gaps, and triggers',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('signals');
      }
    },
    {
      id: 'forge-buyer-research',
      title: 'Market & Buyer Research Bay',
      category: 'FORGE LABS',
      subtitle: 'Verify ICP, job to be done, willingness to pay, and purchase triggers',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('buyer-research');
      }
    },
    {
      id: 'forge-opportunity-lab',
      title: 'Opportunity Lab ($750/mo Gate)',
      category: 'FORGE LABS',
      subtitle: 'Score, test, narrow, scale, pause, or kill opportunities with economics',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('opportunity-lab');
      }
    },
    {
      id: 'forge-offer-pricing',
      title: 'Offer & Pricing Studio',
      category: 'FORGE LABS',
      subtitle: 'Package paid outcome, test price, and prepare payment-ready offers',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('offer-pricing');
      }
    },
    {
      id: 'forge-product-forge',
      title: 'Product Forge (Gate Enforced)',
      category: 'FORGE LABS',
      subtitle: 'Build minimum viable delivery system required for a paid outcome',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('product-forge');
      }
    },
    {
      id: 'forge-distribution',
      title: 'Distribution Engine',
      category: 'FORGE LABS',
      subtitle: 'Acquire buyers through measured content, outbound, SEO, and referrals',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('distribution');
      }
    },
    {
      id: 'forge-revenue-ops',
      title: 'Revenue Operations Desk',
      category: 'FORGE LABS',
      subtitle: 'Track customers, transactions, actual MRR ($350), margin, and churn',
      action: () => {
        setActiveDivision('forge');
        setActiveForgeDepartment('revenue-ops');
      }
    },

    // Dynamic Games, Signals & Missions
    ...oracleGames.map(g => ({
      id: `game-${g.id}`,
      title: `${g.awayTeam.name} at ${g.homeTeam.name}`,
      category: 'NFL Game Dossier',
      subtitle: `Model Win Prob: ${(g.independentWinProbHome * 100).toFixed(1)}% · Spread: ${g.projectedSpreadHome}`,
      badge: g.truthState.toUpperCase(),
      action: () => {
        setActiveDivision('oracle');
        setActiveOracleDepartment('game-intel');
      }
    })),
    ...sharedMissions.map(m => ({
      id: `mission-${m.id}`,
      title: m.title,
      category: `${m.division.toUpperCase()} Mission`,
      subtitle: `Due: ${m.dueDate} · Effort: ${m.effortHours}h · Status: ${m.status.toUpperCase()}`,
      badge: m.status.toUpperCase(),
      action: () => {
        if (m.division === 'oracle') {
          setActiveDivision('oracle');
          setActiveOracleDepartment('command');
        } else {
          setActiveDivision('forge');
          setActiveForgeDepartment('command');
        }
      }
    }))
  ];

  const filteredResults = allItems.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q)
    );
  }).slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="max-w-2xl w-full bg-[#080c16] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#0a0f1d]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, station, game, mission, or docket..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
            ESC
          </kbd>
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-850 p-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div
                key={result.id}
                onClick={() => {
                  result.action();
                  setCommandPaletteOpen(false);
                }}
                className="p-3 rounded-lg hover:bg-cyan-950/40 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="space-y-0.5 truncate pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-cyan-400/80">
                      {result.category}
                    </span>
                    {result.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {result.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-white font-sans text-xs font-semibold group-hover:text-cyan-300 truncate">
                    {result.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate font-sans">
                    {result.subtitle}
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              No matching stations, missions, or records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#05070c] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>NEXUS // Command Palette</span>
        </div>
      </div>
    </div>
  );
};
