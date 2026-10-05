import React from 'react';
import { useNexus, OracleDepartment } from '../../context/NexusContext';
import { OracleCommandView } from './OracleCommandView';
import { DataOperationsView } from './DataOperationsView';
import { ModelLabView } from './ModelLabView';
import { GameIntelligenceView } from './GameIntelligenceView';
import { PlayerIntelligenceView } from './PlayerIntelligenceView';
import { ParlayArchitectureView } from './ParlayArchitectureView';
import { MarketBenchmarkView } from './MarketBenchmarkView';
import { BacktestCalibrationView } from './BacktestCalibrationView';
import { ResearchDeskView } from './ResearchDeskView';
import { ChangeControlView } from './ChangeControlView';
import { WeeklyReviewView } from './WeeklyReviewView';
import { OracleArchiveView } from './OracleArchiveView';
import { 
  Target, 
  Database, 
  GitBranch, 
  Activity, 
  Users,
  Layers, 
  BarChart3, 
  Percent, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Archive,
  AlertTriangle
} from 'lucide-react';

export const OracleDivisionContainer: React.FC = () => {
  const { activeOracleDepartment, setActiveOracleDepartment } = useNexus();

  const departments: { id: OracleDepartment; label: string; icon: any }[] = [
    { id: 'command', label: 'Command', icon: Target },
    { id: 'data-ops', label: 'Data Ops', icon: Database },
    { id: 'model-lab', label: 'Model Lab', icon: GitBranch },
    { id: 'game-intel', label: 'Game Intel', icon: Activity },
    { id: 'player-intel', label: 'Player Intel', icon: Users },
    { id: 'parlays', label: 'Parlays', icon: Layers },
    { id: 'market-bench', label: 'Market Bench', icon: BarChart3 },
    { id: 'backtest', label: 'Calibration', icon: Percent },
    { id: 'change-control', label: 'Change Control', icon: CheckCircle2 },
    { id: 'weekly-review', label: 'Weekly Review', icon: FileText },
    { id: 'research-desk', label: 'Research Desk', icon: BookOpen },
    { id: 'archive', label: 'Archive', icon: Archive },
  ];

  const renderDepartment = () => {
    switch (activeOracleDepartment) {
      case 'command':
        return <OracleCommandView />;
      case 'data-ops':
        return <DataOperationsView />;
      case 'model-lab':
        return <ModelLabView />;
      case 'game-intel':
        return <GameIntelligenceView />;
      case 'player-intel':
        return <PlayerIntelligenceView />;
      case 'parlays':
        return <ParlayArchitectureView />;
      case 'market-bench':
        return <MarketBenchmarkView />;
      case 'backtest':
        return <BacktestCalibrationView />;
      case 'research-desk':
        return <ResearchDeskView />;
      case 'change-control':
        return <ChangeControlView />;
      case 'weekly-review':
        return <WeeklyReviewView />;
      case 'archive':
        return <OracleArchiveView />;
      default:
        return <OracleCommandView />;
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Division Header Banner */}
      <div className="p-4 bg-[#0a0f1d] border border-cyan-500/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400">
            <Target className="w-4 h-4" />
            <span className="font-bold uppercase tracking-widest text-[11px]">
              DIVISION 01 // ORACLE NFL FORECAST INTELLIGENCE
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Independent statistical modeling, probability distributions, pace simulations, and honest post-week calibration.
          </p>
        </div>

        {/* Permanent Honesty / Zero-Wagering Guarantee Badge */}
        <div className="p-2.5 rounded bg-[#06080e] border border-cyan-500/20 text-[10px] text-slate-400 max-w-md">
          <strong className="text-cyan-300 block mb-0.5">MANDATORY FORECAST HONESTY RULE:</strong>
          ORACLE models are probabilistic distributions, never guarantees or wagering instructions. Market lines are contextual benchmarks.
        </div>
      </div>

      {/* Department Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-slate-800 text-xs font-mono overflow-x-auto pb-1">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isSelected = activeOracleDepartment === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => setActiveOracleDepartment(dept.id)}
              className={`px-3 py-1.5 rounded-t font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#0f172a] text-cyan-300 border-t-2 border-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{dept.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Selected Department */}
      <div>{renderDepartment()}</div>
    </div>
  );
};
