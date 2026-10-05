import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Target, 
  FileCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { 
    onboarding, 
    updateOnboarding, 
    showOnboardingModal, 
    setShowOnboardingModal,
    setActiveSection 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'form' | 'plan'>('plan');
  const [formData, setFormData] = useState(onboarding);

  if (!showOnboardingModal) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOnboarding({ ...formData, completed: true });
    setActiveTab('plan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#0d121f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono tracking-tight text-white">
                STUDIO ONBOARDING & OPERATING CADENCE
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                10-Point Venture Framing · 30-Day Plan · Data Governance Gate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono">
              <button
                onClick={() => setActiveTab('plan')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'plan' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                30-Day Mission Plan
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'form' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                10-Question Questionnaire
              </button>
            </div>

            <button
              onClick={() => setShowOnboardingModal(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'plan' ? (
            <div className="space-y-6 font-sans">
              {/* Executive Summary Card */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                  <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Venture Operating Blueprint Generated
                  </span>
                  <span>Approval Threshold: ${onboarding.defaultApprovalThreshold}/mo</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The studio operates on a <strong>content-first, evidence-validated model</strong>. Products must clear 
                  the <strong>${onboarding.defaultApprovalThreshold}/month recurring threshold</strong> or return capital and founder hours to the asset vault.
                </p>
              </div>

              {/* 30-Day Mission Plan */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>30-Day Phased Commercial Cadence</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#0d121c] border border-slate-800 rounded-md space-y-1.5">
                    <div className="text-cyan-400 font-bold">Week 1: Evidence Lock</div>
                    <p className="text-slate-400 font-sans text-[11px] leading-normal">
                      Ingest 5 primary regulatory filings. Eliminate all unsupported claims. Establish baseline Substation Delay Index.
                    </p>
                    <div className="text-[10px] text-emerald-400">✓ Target: 0 Source Gaps</div>
                  </div>

                  <div className="p-3 bg-[#0d121c] border border-slate-800 rounded-md space-y-1.5">
                    <div className="text-cyan-400 font-bold">Week 2: Offer & Checkout</div>
                    <p className="text-slate-400 font-sans text-[11px] leading-normal">
                      Publish executive briefing draft. Configure live Stripe checkout for $350 report and $150/mo subscription.
                    </p>
                    <div className="text-[10px] text-emerald-400">✓ Target: 1st Payment Link Active</div>
                  </div>

                  <div className="p-3 bg-[#0d121c] border border-slate-800 rounded-md space-y-1.5">
                    <div className="text-cyan-400 font-bold">Week 3: Targeted Outbound</div>
                    <p className="text-slate-400 font-sans text-[11px] leading-normal">
                      Send personalized 1-page docket teasers to 15 site planners. Conduct 2 customer discovery calls.
                    </p>
                    <div className="text-[10px] text-emerald-400">✓ Target: 1 Paid Customer</div>
                  </div>

                  <div className="p-3 bg-[#0d121c] border border-slate-800 rounded-md space-y-1.5">
                    <div className="text-cyan-400 font-bold">Week 4: Threshold Audit</div>
                    <p className="text-slate-400 font-sans text-[11px] leading-normal">
                      Audit progress toward $750/mo. If &lt;3 paid commitments, trigger formal project kill-or-pivot decision gate.
                    </p>
                    <div className="text-[10px] text-amber-400">⚠ Target: Decision Gate Reached</div>
                  </div>
                </div>
              </div>

              {/* Weekly Operating Cadence & Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0d121c] border border-slate-800 rounded-md space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Weekly Operating Cadence</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside font-sans">
                    <li><strong>Monday 07:00:</strong> Release weekly monitor dispatch to active subscribers.</li>
                    <li><strong>Tuesday:</strong> Publish 1 evidence-backed distribution excerpt with commercial CTA.</li>
                    <li><strong>Wednesday:</strong> Conduct 2 buyer discovery calls or targeted enterprise outreach.</li>
                    <li><strong>Thursday:</strong> Ingest new regulatory dockets and resolve Evidence Ledger flags.</li>
                    <li><strong>Friday 16:00:</strong> Audit Revenue Engine, review MRR progress, update Mission Queue.</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#0d121c] border border-slate-800 rounded-md space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Data Governance & Conflict Gates</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside font-sans">
                    <li>Strict personal equipment & time airgap from any employer obligations.</li>
                    <li>Zero confidential client, employer, or restricted third-party data permitted.</li>
                    <li>Every claim requires a public, official, or licensed verifiable source.</li>
                    <li>All AI syntheses must be reviewed and editable by founder prior to distribution.</li>
                    <li>Kill projects promptly when market evidence disproves commercial willingness to pay.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">1. Primary Commercial Goal</label>
                  <input
                    type="text"
                    value={formData.commercialGoal}
                    onChange={(e) => setFormData({ ...formData, commercialGoal: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">2. 12-Month Income Target ($)</label>
                  <input
                    type="number"
                    value={formData.incomeTarget12Months}
                    onChange={(e) => setFormData({ ...formData, incomeTarget12Months: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">3. Default Monthly Approval Threshold ($/mo)</label>
                  <input
                    type="number"
                    value={formData.defaultApprovalThreshold}
                    onChange={(e) => setFormData({ ...formData, defaultApprovalThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">4. Monthly Tool/API Budget ($)</label>
                  <input
                    type="number"
                    value={formData.maxMonthlyToolBudget}
                    onChange={(e) => setFormData({ ...formData, maxMonthlyToolBudget: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">5. Accessible Buyer Groups (ICP)</label>
                <textarea
                  rows={2}
                  value={formData.buyerGroups}
                  onChange={(e) => setFormData({ ...formData, buyerGroups: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">6. Expertise & Proprietary Data Advantage</label>
                <textarea
                  rows={2}
                  value={formData.expertiseAdvantage}
                  onChange={(e) => setFormData({ ...formData, expertiseAdvantage: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">7. Strictly Barred Employer/Confidential Data Notice</label>
                <textarea
                  rows={2}
                  value={formData.strictlyOutsideScopeNotice}
                  onChange={(e) => setFormData({ ...formData, strictlyOutsideScopeNotice: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-amber-900/60 rounded text-amber-200 focus:border-amber-400 focus:outline-none resize-none bg-amber-950/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">8. First Active Opportunity Name</label>
                  <input
                    type="text"
                    value={formData.firstOpportunity}
                    onChange={(e) => setFormData({ ...formData, firstOpportunity: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">9. Next Customer-Facing Action</label>
                  <input
                    type="text"
                    value={formData.nextCustomerAction}
                    onChange={(e) => setFormData({ ...formData, nextCustomerAction: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                >
                  Save & Regenerate Operating Plan
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0d121f] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Onboarding Status: Verified Active</span>
          </div>

          <button
            onClick={() => {
              setShowOnboardingModal(false);
              setActiveSection('command-center');
            }}
            className="px-4 py-1.5 text-xs font-mono font-medium text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1.5"
          >
            <span>Enter Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
