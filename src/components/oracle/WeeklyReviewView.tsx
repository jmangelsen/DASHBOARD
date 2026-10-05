import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  Clock 
} from 'lucide-react';

export const WeeklyReviewView: React.FC = () => {
  const { weeklyPostmortem } = useNexus();

  const postmortemSteps = [
    {
      num: '01',
      question: 'What was forecast?',
      answer: '16 pre-game game dossiers issued with independent win probability, point spread distribution, and pace projections prior to Thursday kickoff. Average projected spread margin: 4.8 points.'
    },
    {
      num: '02',
      question: 'What happened?',
      answer: '14 of 16 games finished within the projected interquartile scoring margin range. 2 extreme tail blowouts occurred (Ravens by 25 over Bills; Tampa Bay over Eagles).'
    },
    {
      num: '03',
      question: 'Was the forecast wrong, poorly calibrated, or just uncertain?',
      answer: 'Properly calibrated. The Brier score on the week was 0.184 (better than the 0.208 seasonal benchmark). The Baltimore blowout was a 3-turnover tail event, not a systematic model miss.'
    },
    {
      num: '04',
      question: 'Were the inputs incomplete or stale?',
      answer: 'One input failure: Weather crosswind shear in Denver was updated 2 hours late due to an upstream NOAA radar cache delay.'
    },
    {
      num: '05',
      question: 'Was the error foreseeable?',
      answer: 'No. Fumble recoveries in the first quarter carry high random noise that cannot be projected in advance.'
    },
    {
      num: '06',
      question: 'What must change, if anything?',
      answer: 'Implement automated webhook alert for 90-minute inactives window to accelerate backup player status updates into Game Dossiers.'
    },
    {
      num: '07',
      question: 'Does the backtest support that change?',
      answer: 'Yes. Backtest change record CHG-2026-04 confirmed a -0.008 Brier score improvement when backup offensive tackle WAR drop-off is weighted rapidly.'
    },
    {
      num: '08',
      question: 'What should NOT be changed due to noise?',
      answer: 'Do NOT overreact to Buffalo defensive EPA after single Derrick Henry blowout. Sample size is 1 game; EPA regression weight should remain steady.'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Postmortem Header */}
      <div className="p-4 bg-[#0a0e19] border border-cyan-500/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <FileText className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              WEEKLY REVIEW // 8-STEP FORECAST POSTMORTEM
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Accountability review for NFL Season {weeklyPostmortem.season} · Week {weeklyPostmortem.week}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#06080e] border border-slate-850 text-right">
            <span className="text-[10px] text-slate-500 uppercase block">Weekly Brier</span>
            <span className="text-sm font-bold text-emerald-400 tabular-nums">{weeklyPostmortem.brierScoreResult}</span>
          </div>
          <div className="p-2 rounded bg-[#06080e] border border-slate-850 text-right">
            <span className="text-[10px] text-slate-500 uppercase block">Outcomes Tracked</span>
            <span className="text-sm font-bold text-white tabular-nums">{weeklyPostmortem.outcomesTracked}/16</span>
          </div>
        </div>
      </div>

      {/* 8-Step Postmortem Container */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-white uppercase text-xs">
            Mandatory Postmortem Framework
          </span>
          <span className="text-cyan-400 text-[11px]">Signoff: {weeklyPostmortem.analystSignoff}</span>
        </div>

        <div className="space-y-3">
          {postmortemSteps.map((step) => (
            <div key={step.num} className="p-3.5 bg-[#06080e] border border-slate-850 rounded-lg space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 font-mono">
                  STEP {step.num}
                </span>
                <span className="text-sm text-white font-sans">{step.question}</span>
              </div>
              <p className="text-xs text-slate-300 font-sans pl-1 leading-relaxed">
                {step.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
