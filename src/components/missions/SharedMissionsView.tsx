import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { SharedMission } from '../../types/nexus';
import { 
  Calendar, 
  Target, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Plus, 
  AlertTriangle, 
  ShieldCheck, 
  Filter 
} from 'lucide-react';

export const SharedMissionsView: React.FC = () => {
  const { sharedMissions, toggleMissionStatus, addMission } = useNexus();
  const [filterDivision, setFilterDivision] = useState<'all' | 'oracle' | 'forge'>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: '',
    division: 'oracle' as 'oracle' | 'forge',
    department: 'Game Intelligence',
    linkedEntity: '',
    purpose: '',
    expectedValue: '',
    effortHours: 2,
    dueDate: new Date().toISOString().split('T')[0],
    evidenceRequired: '',
    completionDefinition: '',
    status: 'active' as const,
    riskLevel: 'medium' as const
  });

  const filteredMissions = sharedMissions.filter(m => {
    if (filterDivision === 'all') return true;
    return m.division === filterDivision;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMission(formData);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Calendar className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              SHARED MISSIONS // WEEKLY FOUNDER OPERATING DISCIPLINE
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Strict division attribution. Every mission belongs to exactly one division with measurable evidence criteria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Strategic Mission</span>
          </button>
        </div>
      </div>

      {/* Weekly Planning Cadence Box */}
      <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-1 border-b border-slate-800">
          Weekly Mission Rules (Strict 1 + 1 Focus)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans text-slate-300">
          <div className="p-2.5 rounded bg-[#06080e] border border-cyan-500/20">
            <span className="text-cyan-400 font-bold block mb-1">1. ORACLE Analytical Anchor:</span>
            Limit to 1 major pre-registered backtest or game forecast calibration per week.
          </div>
          <div className="p-2.5 rounded bg-[#06080e] border border-violet-500/20">
            <span className="text-violet-400 font-bold block mb-1">2. FORGE Commercial Anchor:</span>
            Limit to 1 paid buyer validation experiment or direct distribution push per week.
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
        <span className="text-slate-500 text-[11px] uppercase mr-2">Filter Division:</span>
        <button
          onClick={() => setFilterDivision('all')}
          className={`px-3 py-1 rounded transition-colors ${
            filterDivision === 'all' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          All ({sharedMissions.length})
        </button>
        <button
          onClick={() => setFilterDivision('oracle')}
          className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
            filterDivision === 'oracle' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold' : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>ORACLE NFL ({sharedMissions.filter(m => m.division === 'oracle').length})</span>
        </button>
        <button
          onClick={() => setFilterDivision('forge')}
          className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
            filterDivision === 'forge' ? 'bg-violet-950 text-violet-300 border border-violet-700 font-bold' : 'text-slate-400 hover:text-violet-300'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>FORGE LABS ({sharedMissions.filter(m => m.division === 'forge').length})</span>
        </button>
      </div>

      {/* Missions List */}
      <div className="space-y-3">
        {filteredMissions.map((m) => (
          <div 
            key={m.id}
            className={`p-4 rounded-lg border transition-all space-y-3 ${
              m.status === 'completed'
                ? 'bg-[#080c14]/60 border-slate-850 opacity-70'
                : m.division === 'oracle'
                ? 'bg-[#090d16] border-cyan-500/30'
                : 'bg-[#090d16] border-violet-500/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-mono uppercase text-[10px] font-bold ${
                  m.division === 'oracle' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-violet-950 text-violet-300 border border-violet-800'
                }`}>
                  {m.division === 'oracle' ? 'ORACLE' : 'FORGE LABS'}
                </span>
                <span className="text-slate-400 font-sans">Dept: {m.department}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">{m.linkedEntity}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400">Due: <strong className="text-white">{m.dueDate}</strong></span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">Effort: <strong className="text-white">{m.effortHours}h</strong></span>
                <button
                  onClick={() => toggleMissionStatus(m.id)}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${
                    m.status === 'completed'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-800 hover:bg-emerald-900 text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{m.status === 'completed' ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>

            <div className="text-sm font-bold text-white font-sans">
              {m.title}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans text-slate-300">
              <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 space-y-0.5">
                <strong className="text-slate-400 block font-mono text-[10px] uppercase">Purpose &amp; Expected Decision Value:</strong>
                <p className="text-slate-300">{m.purpose} ({m.expectedValue})</p>
              </div>
              <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 space-y-0.5">
                <strong className="text-cyan-400 block font-mono text-[10px] uppercase">Evidence Required for Completion:</strong>
                <p className="text-slate-300">{m.evidenceRequired}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MISSION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#090d16] border border-cyan-500/40 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Create Strategic Mission
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Mission Title</label>
                <input
                  type="text"
                  placeholder="e.g. Audit Friday injury report on Chiefs vs Bills"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Division</label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value as any })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  >
                    <option value="oracle">ORACLE // NFL Forecast</option>
                    <option value="forge">FORGE LABS // Venture</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Evidence Required</label>
                <input
                  type="text"
                  placeholder="What document or test outcome proves completion?"
                  value={formData.evidenceRequired}
                  onChange={(e) => setFormData({ ...formData, evidenceRequired: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold"
                >
                  Save Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
