import React from 'react';
import { Archive, XCircle, CheckCircle2, History } from 'lucide-react';

export const ForgeArchiveView: React.FC = () => {
  const killedVentures = [
    {
      name: 'General AI Energy & Datacenter Newsletter',
      killedDate: '2026-08-20',
      reason: 'Killed on Day 12 after landing page test yielded 0% paid conversions on $5/mo consumer subscription. Unfocused audience; no willingness to pay.',
      hoursSaved: '80+ Engineering Hours Preserved',
      verdict: 'Disciplined Kill'
    },
    {
      name: 'GPU Cloud Compute Price Comparison Tool',
      killedDate: '2026-07-15',
      reason: 'Commoditized API scraping space with heavy incumbents; low switching cost and low margin.',
      hoursSaved: '60+ Hours Preserved',
      verdict: 'Disciplined Kill'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Archive className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              VENTURE ARCHIVE // KILLED PROJECTS &amp; POSTMORTEMS
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Hall of disciplined kills. Killing unvalidated projects early protects founder capital and focus.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {killedVentures.map((proj, idx) => (
          <div key={idx} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <span className="text-sm font-bold text-slate-300 font-sans line-through">
                {proj.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                {proj.verdict}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {proj.reason}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Killed Date: {proj.killedDate}</span>
              <span className="text-emerald-400 font-bold">{proj.hoursSaved}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
