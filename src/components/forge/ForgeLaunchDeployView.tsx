import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Rocket, CheckCircle2, Clock, Globe, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const ForgeLaunchDeployView: React.FC = () => {
  const deploymentStages = [
    { name: 'Concept & Signal Validation', status: 'Completed', date: '2026-09-05' },
    { name: 'Private Prototype & Customer Discovery', status: 'Completed', date: '2026-09-18' },
    { name: 'Internal Regulatory QA Audit', status: 'Completed', date: '2026-09-22' },
    { name: 'Paid Pilot & Beta Operations', status: 'Active (Current)', date: '2026-09-26' },
    { name: 'Public Launch ($750/mo Gate)', status: 'Pending 3 More Customers', date: 'Est. Oct 2026' },
    { name: 'Corridor Scaling (Wyoming / Utah)', status: 'Planned Q1 2027', date: 'Future' }
  ];

  const launchChecklist = [
    { item: 'First-party domain: thephysicallayer.net registered', done: true },
    { item: 'Landing page copy verified against Colorado PUC Exhibit PSCo-T1', done: true },
    { item: 'Stripe payment integration placeholder configured', done: true },
    { item: 'Manual email delivery workflow tested with test PDF dispatch', done: true },
    { item: 'Legal & Conflict-of-interest review confirmed: 100% outside employment scope', done: true },
    { item: 'Subscriber onboarding welcome sequence with historical queue database access', done: true },
    { item: 'Support inbox (briefings@thephysicallayer.net) routed to founder email', done: true }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Rocket className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              LAUNCH &amp; DEPLOYMENT // COMMERCIAL PRODUCTION READINESS
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Stage progression and quality assurance checklist for the Front Range Monitor.
          </p>
        </div>
      </div>

      {/* Deployment Stages Pipeline */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-slate-800">
          Venture Deployment Stages
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {deploymentStages.map((stage, idx) => (
            <div key={idx} className="p-3.5 rounded bg-[#06080e] border border-slate-850 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono">Stage 0{idx + 1}</span>
                <span className={`px-1.5 py-0.2 rounded uppercase font-bold text-[10px] ${
                  stage.status.includes('Completed') ? 'bg-emerald-950 text-emerald-300' : stage.status.includes('Active') ? 'bg-violet-950 text-violet-300 border border-violet-800' : 'bg-slate-800 text-slate-400'
                }`}>
                  {stage.status}
                </span>
              </div>
              <div className="text-xs font-bold text-white font-sans">{stage.name}</div>
              <div className="text-[10px] text-slate-400">{stage.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Launch QA Checklist */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-slate-800">
          Production Launch &amp; Compliance Checklist
        </span>

        <div className="space-y-2">
          {launchChecklist.map((chk, idx) => (
            <div key={idx} className="p-2.5 rounded bg-[#06080e] border border-slate-850 flex items-center justify-between text-xs font-sans text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{chk.item}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold shrink-0">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
