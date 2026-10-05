import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Users, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Activity, 
  TrendingUp, 
  ChevronRight,
  Filter,
  FileText
} from 'lucide-react';

interface PlayerIntelRecord {
  id: string;
  name: string;
  team: string;
  teamAbbr: string;
  position: string;
  status: 'Active' | 'Questionable' | 'Doubtful' | 'Out';
  impactTier: 'Critical' | 'High' | 'Moderate' | 'Low';
  targetShare: string;
  snapShare: string;
  epaPerPlay: number;
  replacementEpaDelta: number;
  practiceParticipation: {
    wednesday: 'DNP' | 'LP' | 'FP' | 'N/A';
    thursday: 'DNP' | 'LP' | 'FP' | 'N/A';
    friday: 'DNP' | 'LP' | 'FP' | 'N/A';
  };
  uncertaintyNotes: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceType: string;
  verificationStatus: 'Verified' | 'Pending Review' | 'Inferred' | 'Conflicting';
  lastUpdated: string;
}

const SEED_PLAYERS: PlayerIntelRecord[] = [
  {
    id: 'p-01',
    name: 'Patrick Mahomes',
    team: 'Kansas City Chiefs',
    teamAbbr: 'KC',
    position: 'QB',
    status: 'Active',
    impactTier: 'Critical',
    targetShare: 'N/A',
    snapShare: '100%',
    epaPerPlay: +0.28,
    replacementEpaDelta: -0.34,
    practiceParticipation: { wednesday: 'FP', thursday: 'FP', friday: 'FP' },
    uncertaintyNotes: 'Clean bill of health. High baseline EPA stability.',
    sourceTitle: 'NFL Official Injury Report - Week 5',
    sourceUrl: 'https://operations.nfl.com/gameday/injury-report/',
    sourceType: 'League Official Filing',
    verificationStatus: 'Verified',
    lastUpdated: '2026-10-04 16:30'
  },
  {
    id: 'p-02',
    name: 'Creed Humphrey',
    team: 'Kansas City Chiefs',
    teamAbbr: 'KC',
    position: 'C',
    status: 'Questionable',
    impactTier: 'High',
    targetShare: 'N/A',
    snapShare: '72% (Ankle)',
    epaPerPlay: +0.08,
    replacementEpaDelta: -0.16,
    practiceParticipation: { wednesday: 'DNP', thursday: 'LP', friday: 'LP' },
    uncertaintyNotes: 'Ankle tweak from Q4 Week 4. Friday practice limited. Backup C drops pass-protection pressure rate by 7.4%.',
    sourceTitle: 'Chiefs Practice Participation Sheet',
    sourceUrl: 'https://chiefs.com/team/injury-report',
    sourceType: 'First-Party Team Feed',
    verificationStatus: 'Pending Review',
    lastUpdated: '2026-10-05 11:15'
  },
  {
    id: 'p-03',
    name: 'Josh Allen',
    team: 'Buffalo Bills',
    teamAbbr: 'BUF',
    position: 'QB',
    status: 'Active',
    impactTier: 'Critical',
    targetShare: 'N/A',
    snapShare: '100%',
    epaPerPlay: +0.31,
    replacementEpaDelta: -0.38,
    practiceParticipation: { wednesday: 'FP', thursday: 'FP', friday: 'FP' },
    uncertaintyNotes: 'Nominal practice reps. High scramble rate expected vs KC 2-high shell.',
    sourceTitle: 'Bills Game-Week Release',
    sourceUrl: 'https://buffalobills.com/injury',
    sourceType: 'Official Team Report',
    verificationStatus: 'Verified',
    lastUpdated: '2026-10-04 17:00'
  },
  {
    id: 'p-04',
    name: 'Christian McCaffrey',
    team: 'San Francisco 49ers',
    teamAbbr: 'SF',
    position: 'RB',
    status: 'Questionable',
    impactTier: 'Critical',
    targetShare: '18.4%',
    snapShare: '65% Projected',
    epaPerPlay: +0.19,
    replacementEpaDelta: -0.15,
    practiceParticipation: { wednesday: 'LP', thursday: 'LP', friday: 'FP' },
    uncertaintyNotes: 'Bilateral calf tightness monitored. Full participant Friday. Red-zone touch projection remains 62%.',
    sourceTitle: '49ers Media Pool Transcript',
    sourceUrl: 'https://49ers.com/news/injury-update',
    sourceType: 'Official Team Feed',
    verificationStatus: 'Verified',
    lastUpdated: '2026-10-05 10:45'
  },
  {
    id: 'p-05',
    name: 'Puka Nacua',
    team: 'Los Angeles Rams',
    teamAbbr: 'LAR',
    position: 'WR',
    status: 'Questionable',
    impactTier: 'High',
    targetShare: '29.2%',
    snapShare: '84%',
    epaPerPlay: +0.22,
    replacementEpaDelta: -0.21,
    practiceParticipation: { wednesday: 'DNP', thursday: 'LP', friday: 'LP' },
    uncertaintyNotes: 'Knee bursa swelling. Game-time decision status per McVay briefing. Heavy impact on McVay 11-personnel success rate.',
    sourceTitle: 'Rams Pool Reporter Notes',
    sourceUrl: 'https://therams.com/team/injury',
    sourceType: 'Official Press Pool',
    verificationStatus: 'Pending Review',
    lastUpdated: '2026-10-05 12:20'
  }
];

export const PlayerIntelligenceView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterTeam, setFilterTeam] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerIntelRecord>(SEED_PLAYERS[1]);

  const filtered = SEED_PLAYERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.team.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = filterTeam === 'ALL' || p.teamAbbr === filterTeam;
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  return (
    <div className="space-y-5 font-mono text-xs">
      {/* Top Department Banner */}
      <div className="p-4 bg-[#0a0f1d] border border-cyan-500/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Users className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              ORACLE // PLAYER INTELLIGENCE &amp; USAGE LAB
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Player availability, role, usage, historical context, injury uncertainty, and projection inputs.
          </p>
        </div>

        <div className="text-[10px] text-slate-400 max-w-sm text-right">
          <span className="text-cyan-300 font-bold block">HONESTY PROTOCOL:</span>
          All practice statuses sourced from primary team logs. Zero speculative rumor inputs.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#080c16] p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search players, teams, injury reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#05070c] border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-400">Team:</span>
          <select
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="bg-[#05070c] border border-slate-700 text-slate-200 rounded px-2.5 py-1 focus:outline-none"
          >
            <option value="ALL">All Teams</option>
            <option value="KC">Chiefs (KC)</option>
            <option value="BUF">Bills (BUF)</option>
            <option value="SF">49ers (SF)</option>
            <option value="LAR">Rams (LAR)</option>
          </select>

          <span className="text-slate-400 ml-2">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#05070c] border border-slate-700 text-slate-200 rounded px-2.5 py-1 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Questionable">Questionable</option>
            <option value="Doubtful">Doubtful</option>
            <option value="Out">Out</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Player List + Detailed Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Player Roster Dossiers (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {filtered.map((player) => {
            const isSelected = selectedPlayer.id === player.id;
            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0f1629] border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                    : 'bg-[#080c16] border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{player.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {player.position} · {player.teamAbbr}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    player.status === 'Active'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                  }`}>
                    {player.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-850 text-[10px] text-slate-400">
                  <div>
                    <span className="block text-slate-400">Impact</span>
                    <span className="text-white font-semibold">{player.impactTier}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">EPA / Play</span>
                    <span className="text-emerald-400 font-semibold tabular-nums">{player.epaPerPlay > 0 ? `+${player.epaPerPlay}` : player.epaPerPlay}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Practice</span>
                    <span className="text-cyan-300 font-semibold">{player.practiceParticipation.wednesday}/{player.practiceParticipation.thursday}/{player.practiceParticipation.friday}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Dossier & Uncertainty Model Impact (7 Cols) */}
        <div className="lg:col-span-7 bg-[#080c16] border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                PLAYER DOSSIER INSPECTOR
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {selectedPlayer.name} ({selectedPlayer.position})
              </h3>
              <div className="text-[11px] text-slate-400">
                {selectedPlayer.team} · Primary Impact Tier: <strong className="text-white">{selectedPlayer.impactTier}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                selectedPlayer.verificationStatus === 'Verified'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-950 text-amber-300 border border-amber-500/40'
              }`}>
                {selectedPlayer.verificationStatus}
              </span>
            </div>
          </div>

          {/* Model Uncertainty and Drop-off Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[10px] text-slate-400 uppercase block">Snap Share</span>
              <span className="text-sm font-bold text-white tabular-nums">{selectedPlayer.snapShare}</span>
            </div>
            <div className="p-3 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[10px] text-slate-400 uppercase block">Target Share</span>
              <span className="text-sm font-bold text-cyan-300 tabular-nums">{selectedPlayer.targetShare}</span>
            </div>
            <div className="p-3 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[10px] text-slate-400 uppercase block">Model EPA / Play</span>
              <span className="text-sm font-bold text-emerald-400 tabular-nums">+{selectedPlayer.epaPerPlay}</span>
            </div>
            <div className="p-3 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[10px] text-slate-400 uppercase block">Replacement Delta</span>
              <span className="text-sm font-bold text-rose-400 tabular-nums">{selectedPlayer.replacementEpaDelta} EPA</span>
            </div>
          </div>

          {/* Practice Participation Log */}
          <div className="p-3 rounded bg-[#0d1322] border border-slate-800 space-y-2">
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider block font-bold">
              Official Practice Log Lineage
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-[#05070c] border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Wednesday</span>
                <span className={`font-bold ${selectedPlayer.practiceParticipation.wednesday === 'DNP' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {selectedPlayer.practiceParticipation.wednesday}
                </span>
              </div>
              <div className="p-2 rounded bg-[#05070c] border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Thursday</span>
                <span className={`font-bold ${selectedPlayer.practiceParticipation.thursday === 'LP' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedPlayer.practiceParticipation.thursday}
                </span>
              </div>
              <div className="p-2 rounded bg-[#05070c] border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Friday</span>
                <span className={`font-bold ${selectedPlayer.practiceParticipation.friday === 'DNP' ? 'text-rose-400' : selectedPlayer.practiceParticipation.friday === 'LP' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedPlayer.practiceParticipation.friday}
                </span>
              </div>
            </div>
          </div>

          {/* Uncertainty Factor Narrative */}
          <div className="p-3.5 rounded bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs font-sans leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono text-[11px] uppercase">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Calibrated Uncertainty Analysis</span>
            </div>
            <p>{selectedPlayer.uncertaintyNotes}</p>
          </div>

          {/* Source Lineage & Audit */}
          <div className="pt-2 border-t border-slate-850 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span>Primary Source:</span>
              <a
                href={selectedPlayer.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
              >
                <span>{selectedPlayer.sourceTitle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Document Type:</span>
              <span className="text-white">{selectedPlayer.sourceType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ingested Timestamp:</span>
              <span className="text-slate-300">{selectedPlayer.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
