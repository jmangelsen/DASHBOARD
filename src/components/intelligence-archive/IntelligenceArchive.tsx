import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IntelligenceItem } from '../../types';
import { 
  Archive, 
  Search, 
  Plus, 
  FileText, 
  Download, 
  ExternalLink, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';

export const IntelligenceArchive: React.FC = () => {
  const { intelligence } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<IntelligenceItem | null>(intelligence[0] || null);

  const filteredItems = intelligence.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleExportJSON = (item: IntelligenceItem) => {
    const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Archive className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 09 // DURABLE KNOWLEDGE ARCHIVE</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Intelligence Archive
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Searchable institutional repository of research briefs, decision logs, customer interviews, 
            and postmortems. Preserves studio learnings and intellectual property.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedItem && (
            <button
              onClick={() => handleExportJSON(selectedItem)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Record (JSON)</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search archive briefs, decision logs, entities, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#0a0e17] border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-[#0a0e17] border border-slate-800 rounded">
          {['all', 'brief', 'rejected_hypothesis', 'case_study'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                typeFilter === t ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Archive View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List Column (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-4 rounded-lg border cursor-pointer transition-all space-y-2 ${
                selectedItem?.id === item.id
                  ? 'bg-[#0d121f] border-cyan-500/50 shadow-md'
                  : 'bg-[#0a0e17] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="uppercase text-cyan-400 font-semibold">
                  {item.type.replace('_', ' ')}
                </span>
                <span>{item.createdAt.split('T')[0]}</span>
              </div>

              <h3 className="text-sm font-semibold font-sans text-white leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 font-sans line-clamp-2">
                {item.summary}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {item.tags.map((tg, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-slate-400">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Reader Column (7 cols) */}
        <div className="lg:col-span-7">
          {selectedItem ? (
            <div className="p-6 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-5 font-sans">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="uppercase font-semibold">{selectedItem.type.replace('_', ' ')}</span>
                  <span>·</span>
                  <span>{selectedItem.linkedProject}</span>
                  <span>·</span>
                  <span className="text-slate-400">Logged {selectedItem.createdAt.split('T')[0]}</span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug font-display">
                  {selectedItem.title}
                </h2>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  {selectedItem.summary}
                </p>
              </div>

              {/* Key Takeaways Callout */}
              <div className="p-4 bg-[#0d121f] border border-slate-800 rounded space-y-2 font-mono text-xs">
                <div className="text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
                  Key Strategic Takeaways
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-200 font-sans text-xs">
                  {selectedItem.keyTakeaways.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>

              {/* Full Content */}
              <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                {selectedItem.fullContent}
              </div>

              {/* Tags & Entities */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Entities:</span>
                  <span className="text-slate-200">{selectedItem.entities.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Audit Status:</span>
                  <span className="text-emerald-400 font-semibold">{selectedItem.evidenceStatus.toUpperCase()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-center p-8 bg-[#0a0e17] border border-slate-800 rounded-lg text-slate-500 font-mono text-xs">
              Select an intelligence record from the archive to review
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
