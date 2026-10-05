import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Wind, 
  Activity, 
  FileText, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

export const ResearchDeskView: React.FC = () => {
  const [activeResearchTopic, setActiveResearchTopic] = useState<'weather' | 'injury' | 'pace'>('weather');

  const researchTopics = [
    {
      id: 'weather' as const,
      title: 'High-Wind Pass Suppression Threshold Study',
      summary: 'Analysis of 312 outdoor games with sustained wind > 14 mph. Confirms that downfield completion percentage drops 14.2% while rush attempt rate increases by 22%.',
      findings: [
        'Wind speed < 12 mph has near-zero measurable effect on passing EPA.',
        'Sustained wind ≥ 15 mph reduces total game scoring by an average of 4.1 points.',
        'Crosswinds in non-symmetric stadium bowls (e.g. Cleveland, Buffalo) increase kicking variance on 48+ yard attempts by 31%.'
      ],
      updated: '2026-09-24'
    },
    {
      id: 'injury' as const,
      title: 'Starting Left Tackle Drop-off Non-Linearity',
      summary: 'Quantification of backup tackle pressure surrender against elite edge rush units. Shows that 3rd-and-long sack probability increases from 6.8% to 14.1% with replacement-level tackle.',
      findings: [
        'Backup tackles facing top-10 pass rush win rate defenders surrender pressure on 38% of true pass sets.',
        'Quarterback time to throw compresses by 0.32 seconds, eliminating deep dig and post combinations.'
      ],
      updated: '2026-09-28'
    },
    {
      id: 'pace' as const,
      title: 'Neutral-Situation Pace Decay in Multi-Score Leads',
      summary: 'Empirical review of 2nd-half pace compression when a team leads by 14+ points. Seconds per play slows from 26.4s to 33.1s.',
      findings: [
        'Leading teams reduce pass rate on 2nd down from 58% to 22%.',
        'Total offensive plays drop by an average of 7.2 plays per 60 minutes in blowout scripts.'
      ],
      updated: '2026-10-02'
    }
  ];

  const currentTopic = researchTopics.find(t => t.id === activeResearchTopic) || researchTopics[0];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              RESEARCH DESK // SYSTEMATIC ANALYTICAL STUDIES
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Empirical investigations of weather friction, positional replacement value, and pace suppression.
          </p>
        </div>
      </div>

      {/* Topic Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {researchTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setActiveResearchTopic(topic.id)}
            className={`p-3.5 rounded-lg border text-left transition-all space-y-1 ${
              activeResearchTopic === topic.id
                ? 'bg-cyan-950/60 border-cyan-400 text-white'
                : 'bg-[#090d16] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold font-sans text-white">{topic.title}</div>
            <div className="text-[10px] text-slate-400 line-clamp-2 font-sans">{topic.summary}</div>
            <div className="text-[9px] text-cyan-400 pt-1">Updated: {topic.updated}</div>
          </button>
        ))}
      </div>

      {/* Selected Study Deep Dive */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-sans">{currentTopic.title}</h3>
          <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
            {currentTopic.summary}
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold block">
            Verified Empirical Findings:
          </span>
          <div className="space-y-2 text-xs font-sans text-slate-200">
            {currentTopic.findings.map((f, idx) => (
              <div key={idx} className="p-2.5 rounded bg-[#06080e] border border-slate-850 flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold shrink-0">0{idx + 1}.</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
