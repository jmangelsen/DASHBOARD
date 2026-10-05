import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { BuyerInterviewRecord, DataClassification } from '../../types/nexus';
import { 
  Users, 
  Plus, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  DollarSign 
} from 'lucide-react';

export const ForgeBuyerResearchView: React.FC = () => {
  const { buyerInterviews, addBuyerInterview } = useNexus();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    participantRole: '',
    participantType: 'enterprise' as BuyerInterviewRecord['participantType'],
    dataClassification: 'user-created' as DataClassification,
    interviewDate: new Date().toISOString().split('T')[0],
    jobToBeDone: '',
    painIntensity: 8,
    currentWorkaround: '',
    directQuotes: '',
    recurringThemes: '',
    priceReaction: '',
    keyObjections: '',
    purchaseSignal: 'strong' as BuyerInterviewRecord['purchaseSignal'],
    followUpAction: '',
    linkedOpportunityId: 'opp-front-range-monitor'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const res = addBuyerInterview({
      ...formData,
      directQuotes: formData.directQuotes.split('\n').filter(q => q.trim().length > 0),
      recurringThemes: formData.recurringThemes.split(',').map(t => t.trim()),
      keyObjections: formData.keyObjections.split(',').map(o => o.trim())
    });

    if (!res.success) {
      setFormError(res.error || 'Failed to log interview.');
      return;
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-400" />
            <span>MARKET &amp; BUYER RESEARCH // DISCOVERY DOSSIERS</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Document primary buyer discovery conversations, pain severity (1-10), and verified purchase signals.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Log Buyer Interview</span>
        </button>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {buyerInterviews.map((interview) => (
          <div key={interview.id} className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-white font-sans">
                <span className="text-violet-400 font-mono text-xs">{interview.participantRole}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300 uppercase text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800">
                  {interview.participantType}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-mono text-[10px]">Date: {interview.interviewDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px]">Purchase Signal:</span>
                <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                  interview.purchaseSignal === 'strong' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300'
                }`}>
                  {interview.purchaseSignal} Signal
                </span>
                <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/40 border border-amber-900/60 text-[10px]">
                  Pain: {interview.painIntensity}/10
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Job To Be Done</span>
              <p className="text-xs text-white font-sans font-medium">{interview.jobToBeDone}</p>
            </div>

            {/* Direct Quotes Callout */}
            <div className="p-3 bg-[#06080e] rounded border border-slate-850 space-y-1.5">
              <span className="text-[10px] text-violet-400 uppercase font-bold block flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Verbatim Buyer Quotes:</span>
              </span>
              <div className="space-y-1 text-slate-300 font-sans italic text-xs">
                {interview.directQuotes.map((quote, idx) => (
                  <div key={idx} className="border-l-2 border-violet-500 pl-2">
                    "{quote}"
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans text-slate-300 bg-[#070a12] p-3 rounded border border-slate-850">
              <div>
                <strong className="text-white block font-mono text-[10px] uppercase">Current Workaround:</strong>
                <p className="text-slate-400 mt-0.5">{interview.currentWorkaround}</p>
              </div>
              <div>
                <strong className="text-white block font-mono text-[10px] uppercase">Price Reaction:</strong>
                <p className="text-emerald-400 mt-0.5">{interview.priceReaction}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Follow-up Action: <strong className="text-white">{interview.followUpAction}</strong></span>
              <span className="text-[10px] uppercase bg-slate-900 px-2 py-0.5 rounded text-slate-500">
                Classification: {interview.dataClassification}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090d16] border border-violet-500/40 rounded-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-400" />
                <span>Log Buyer Discovery Interview</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/60 rounded text-rose-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Participant Role</label>
                  <input
                    type="text"
                    placeholder="e.g. VP of Site Acquisition"
                    value={formData.participantRole}
                    onChange={(e) => setFormData({ ...formData, participantRole: e.target.value })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Participant Type</label>
                  <select
                    value={formData.participantType}
                    onChange={(e) => setFormData({ ...formData, participantType: e.target.value as any })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  >
                    <option value="enterprise">Enterprise Developer</option>
                    <option value="operator">Infrastructure Operator</option>
                    <option value="consultant">Engineering Consultant</option>
                    <option value="agency">Real Estate Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Job To Be Done</label>
                <input
                  type="text"
                  placeholder="What was the buyer trying to accomplish?"
                  value={formData.jobToBeDone}
                  onChange={(e) => setFormData({ ...formData, jobToBeDone: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Direct Quotes (One per line)</label>
                <textarea
                  rows={2}
                  placeholder="Paste exact verbatim quotes from buyer conversation..."
                  value={formData.directQuotes}
                  onChange={(e) => setFormData({ ...formData, directQuotes: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Pain Severity (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.painIntensity}
                    onChange={(e) => setFormData({ ...formData, painIntensity: Number(e.target.value) })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Purchase Signal</label>
                  <select
                    value={formData.purchaseSignal}
                    onChange={(e) => setFormData({ ...formData, purchaseSignal: e.target.value as any })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  >
                    <option value="strong">Strong (Prepayment / immediate trial)</option>
                    <option value="moderate">Moderate (Requested follow-up sample)</option>
                    <option value="weak">Weak (Polite interest, no timeline)</option>
                    <option value="none">None (No pain / satisfied with workaround)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Price Reaction</label>
                <input
                  type="text"
                  placeholder="e.g. Willing to prepay $1,500/year"
                  value={formData.priceReaction}
                  onChange={(e) => setFormData({ ...formData, priceReaction: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  Save Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
