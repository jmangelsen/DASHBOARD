import React, { useState, useEffect } from 'react';
import { 
  googleSignIn, 
  googleLogout, 
  subscribeToAuth, 
  getCurrentUser, 
  getAccessToken,
  WORKSPACE_SCOPES 
} from '../../services/googleAuth';
import { GoogleDriveService, GoogleDriveFile } from '../../services/googleDriveService';
import { GoogleSheetsService, SheetMetadata } from '../../services/googleSheetsService';
import { useNexus } from '../../context/NexusContext';
import { 
  FileSpreadsheet, 
  HardDrive, 
  FolderPlus, 
  Upload, 
  ExternalLink, 
  Trash2, 
  RefreshCw, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  LogOut, 
  FileText, 
  Table,
  Plus,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { User } from 'firebase/auth';

export const GoogleWorkspaceHub: React.FC = () => {
  const { oracleGames, forgeSignals, forgeOpportunity } = useNexus();

  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'drive' | 'sheets'>('sheets');

  // Drive state
  const [driveFiles, setDriveFiles] = useState<GoogleDriveFile[]>([]);
  const [loadingDrive, setLoadingDrive] = useState<boolean>(false);
  const [driveSearch, setDriveSearch] = useState<string>('');
  const [driveError, setDriveError] = useState<string | null>(null);

  // Sheets state
  const [exportStatus, setExportStatus] = useState<{ message: string; url?: string; type: 'success' | 'error' | 'loading' } | null>(null);
  const [inspectSheetId, setInspectSheetId] = useState<string>('');
  const [inspectSheetData, setInspectSheetData] = useState<(string | number)[][] | null>(null);
  const [loadingSheet, setLoadingSheet] = useState<boolean>(false);

  // Destructive Action Confirmation Modal state (Mandatory per workspace-integration skill)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionLabel: '',
    onConfirm: async () => {},
  });

  // Subscribe to auth changes
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user, token) => {
      setCurrentUser(user);
      setHasToken(!!token);
      if (token) {
        loadDriveFiles();
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setDriveError(null);
      await googleSignIn();
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setDriveError(err.message || 'Google sign-in failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleLogout();
    setDriveFiles([]);
    setInspectSheetData(null);
  };

  const loadDriveFiles = async () => {
    const token = await getAccessToken();
    if (!token) return;
    try {
      setLoadingDrive(true);
      setDriveError(null);
      const res = await GoogleDriveService.listFiles(driveSearch ? `name contains '${driveSearch}' and trashed = false` : undefined);
      setDriveFiles(res.files || []);
    } catch (err: any) {
      console.error('Drive load error:', err);
      setDriveError(err.message || 'Failed to list Google Drive files');
    } finally {
      setLoadingDrive(false);
    }
  };

  // Google Drive: Create Folder with confirmation
  const handleCreateFolder = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Create Folder in Google Drive',
      description: 'This will create a new folder named "NEXUS // Research & Intelligence" in your Google Drive with your permission.',
      actionLabel: 'Create Folder',
      onConfirm: async () => {
        try {
          await GoogleDriveService.createFolder('NEXUS // Research & Intelligence');
          await loadDriveFiles();
        } catch (e: any) {
          alert(`Error creating folder: ${e.message}`);
        }
      },
    });
  };

  // Google Drive: Delete file with MANDATORY user confirmation dialog
  const handleDeleteFile = (file: GoogleDriveFile) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete File from Google Drive?`,
      description: `Are you sure you want to permanently delete "${file.name}"? This mutates your Google Drive contents and cannot be undone.`,
      actionLabel: 'Delete File',
      onConfirm: async () => {
        try {
          await GoogleDriveService.deleteFile(file.id);
          await loadDriveFiles();
        } catch (e: any) {
          alert(`Error deleting file: ${e.message}`);
        }
      },
    });
  };

  // Google Sheets: Export NFL Week 5 Forecast
  const handleExportNFLToSheets = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Export NFL Forecast to Google Sheets',
      description: `Create a new Google Spreadsheet titled "NEXUS ORACLE // NFL Week 5 Forecast" containing all ${oracleGames.length} game dossiers, win probabilities, and market spreads with permission from your Google account.`,
      actionLabel: 'Export Spreadsheet',
      onConfirm: async () => {
        try {
          setExportStatus({ message: 'Creating spreadsheet in Google Sheets...', type: 'loading' });
          const rows: (string | number)[][] = [
            ['Game ID', 'Matchup', 'Kickoff Time', 'Spread (Line)', 'Total O/U', 'ORACLE Win Prob (Home)', 'Projected Spread', 'Confidence Tier', 'Truth State'],
            ...oracleGames.map(g => [
              g.id,
              `${g.awayTeam.name} (${g.awayTeam.abbr}) at ${g.homeTeam.name} (${g.homeTeam.abbr})`,
              g.kickoffTime,
              g.marketBenchmarks.marketSpread,
              g.marketBenchmarks.marketTotal,
              `${(g.independentWinProbHome * 100).toFixed(1)}%`,
              g.projectedSpreadHome,
              g.forecastConfidence,
              g.truthState.toUpperCase()
            ])
          ];

          const res = await GoogleSheetsService.createSpreadsheet(
            `NEXUS ORACLE // NFL Week 5 Forecast (${new Date().toLocaleDateString()})`,
            'NFL_Forecast',
            rows
          );

          setExportStatus({
            message: `Spreadsheet created successfully! (${rows.length - 1} rows)`,
            url: res.spreadsheetUrl,
            type: 'success'
          });
          await loadDriveFiles();
        } catch (err: any) {
          setExportStatus({ message: err.message || 'Failed to export to Google Sheets', type: 'error' });
        }
      }
    });
  };

  // Google Sheets: Export Venture Radar / Infrastructure Signals
  const handleExportSignalsToSheets = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Export Venture Signals to Google Sheets',
      description: `Create a new Google Spreadsheet titled "NEXUS FORGE // Infrastructure Radar" containing ${forgeSignals.length} venture signals and opportunities with permission from your Google account.`,
      actionLabel: 'Export Spreadsheet',
      onConfirm: async () => {
        try {
          setExportStatus({ message: 'Creating spreadsheet in Google Sheets...', type: 'loading' });
          const rows: (string | number)[][] = [
            ['Signal ID', 'Title', 'Source Type', 'Organization', 'Classification', 'Date', 'Commercial Relevance', 'Source URL'],
            ...forgeSignals.map(s => [
              s.id,
              s.title,
              s.sourceType.toUpperCase(),
              s.organization,
              s.dataClassification.toUpperCase(),
              s.sourceDate,
              s.commercialRelevance,
              s.sourceUrl
            ])
          ];

          const res = await GoogleSheetsService.createSpreadsheet(
            `NEXUS FORGE // Infrastructure Signals Radar (${new Date().toLocaleDateString()})`,
            'Venture_Signals',
            rows
          );

          setExportStatus({
            message: `Spreadsheet created successfully! (${rows.length - 1} signals exported)`,
            url: res.spreadsheetUrl,
            type: 'success'
          });
          await loadDriveFiles();
        } catch (err: any) {
          setExportStatus({ message: err.message || 'Failed to export to Google Sheets', type: 'error' });
        }
      }
    });
  };

  // Google Sheets: Load existing sheet data
  const handleInspectSheet = async (sheetId: string) => {
    if (!sheetId.trim()) return;
    try {
      setLoadingSheet(true);
      setInspectSheetId(sheetId);
      const meta = await GoogleSheetsService.getSpreadsheet(sheetId);
      const firstSheetTitle = meta.sheets[0]?.properties.title || 'Sheet1';
      const values = await GoogleSheetsService.readRange(sheetId, `${firstSheetTitle}!A1:Z50`);
      setInspectSheetData(values);
    } catch (err: any) {
      alert(`Error reading Google Sheet: ${err.message}`);
    } finally {
      setLoadingSheet(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Integration Status */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 text-emerald-400">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Google Workspace Integration
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  Google Drive & Google Sheets
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Connect your Google account to read, create, and organize research files in Google Drive, and synchronize live venture signals and forecast models directly into Google Sheets.
              </p>
            </div>
          </div>

          {/* Auth State Button */}
          <div className="shrink-0">
            {currentUser && hasToken ? (
              <div className="flex items-center gap-3 bg-[#07090e] border border-slate-800 p-2 rounded-md">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-300 flex items-center justify-center font-bold text-xs">
                    {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-xs font-semibold text-white truncate max-w-[140px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Drive & Sheets Active
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out of Google"
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="gsi-material-button inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-white hover:bg-slate-100 text-slate-800 font-medium text-xs shadow-md transition-all border border-slate-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Scopes Overview & Notice */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Permissions:</span>
            <span className="text-slate-300">Google Drive API (v3)</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">Google Sheets API (v4)</span>
          </div>
          <div className="text-[10px] text-slate-400">
            Tokens cached in-memory only. All data mutations require explicit confirmation.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('sheets')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === 'sheets'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Google Sheets Sync</span>
        </button>
        <button
          onClick={() => setActiveTab('drive')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === 'drive'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4 text-cyan-400" />
          <span>Google Drive Explorer</span>
        </button>
      </div>

      {/* Tab 1: Google Sheets Synchronization */}
      {activeTab === 'sheets' && (
        <div className="space-y-6">
          {/* Quick Export Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase font-mono">
                      Export NFL Week 5 Forecast
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Creates a new Google Spreadsheet with matchup lines, win probabilities, and edge analysis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="text-[10px] font-mono text-slate-400">{oracleGames.length} Game Dossiers</span>
                <button
                  onClick={handleExportNFLToSheets}
                  disabled={!hasToken}
                  className="px-3 py-1.5 text-xs font-mono font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Export to Sheets</span>
                </button>
              </div>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-violet-950 text-violet-400 border border-violet-800/40">
                    <Table className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase font-mono">
                      Export Venture Radar Signals
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Syncs power grid, acoustic buffer, and cooling constraint signals into a structured Google Sheet.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="text-[10px] font-mono text-slate-400">{forgeSignals.length} Public Signals</span>
                <button
                  onClick={handleExportSignalsToSheets}
                  disabled={!hasToken}
                  className="px-3 py-1.5 text-xs font-mono font-semibold bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/40 rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Export to Sheets</span>
                </button>
              </div>
            </div>
          </div>

          {/* Export Status Banner */}
          {exportStatus && (
            <div className={`p-4 rounded-lg border text-xs font-mono flex items-center justify-between ${
              exportStatus.type === 'success' 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : exportStatus.type === 'error'
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
            }`}>
              <div className="flex items-center gap-2">
                {exportStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <RefreshCw className={`w-4 h-4 text-cyan-400 shrink-0 ${exportStatus.type === 'loading' ? 'animate-spin' : ''}`} />
                )}
                <span>{exportStatus.message}</span>
              </div>
              {exportStatus.url && (
                <a
                  href={exportStatus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-bold transition-all ml-4 shrink-0"
                >
                  <span>Open in Google Sheets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Interactive Sheet Inspector */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Table className="w-4 h-4 text-emerald-400" />
                  <span>Live Google Sheet Inspector</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Inspect or preview any Google Spreadsheet ID or range from your connected Drive.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste Google Spreadsheet ID..."
                  value={inspectSheetId}
                  onChange={(e) => setInspectSheetId(e.target.value)}
                  className="px-3 py-1.5 bg-[#07090e] border border-slate-700 rounded text-xs text-slate-200 font-mono w-64 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => handleInspectSheet(inspectSheetId)}
                  disabled={!hasToken || !inspectSheetId.trim() || loadingSheet}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-mono font-medium disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  {loadingSheet && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            {inspectSheetData && inspectSheetData.length > 0 ? (
              <div className="overflow-x-auto border border-slate-800 rounded max-h-80 overflow-y-auto">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-[#0e1424] text-slate-400 sticky top-0 border-b border-slate-800">
                    <tr>
                      {inspectSheetData[0].map((cell, idx) => (
                        <th key={idx} className="p-2.5 font-bold uppercase border-r border-slate-800/60 last:border-0 whitespace-nowrap">
                          {String(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {inspectSheetData.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/30">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 text-slate-300 border-r border-slate-850 last:border-0 whitespace-nowrap">
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-slate-400 border border-dashed border-slate-800 rounded bg-[#07090e]">
                Enter a Spreadsheet ID above or export a dataset to inspect sheet rows in real time.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Google Drive Explorer */}
      {activeTab === 'drive' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b0f19] p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2.5 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search files in your Google Drive..."
                value={driveSearch}
                onChange={(e) => setDriveSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadDriveFiles()}
                className="w-full bg-[#07090e] border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={loadDriveFiles}
                disabled={!hasToken || loadingDrive}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-mono disabled:opacity-40 transition-colors"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateFolder}
                disabled={!hasToken}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors disabled:opacity-40"
              >
                <FolderPlus className="w-3.5 h-3.5 text-cyan-400" />
                <span>New NEXUS Folder</span>
              </button>
              <button
                onClick={loadDriveFiles}
                disabled={!hasToken || loadingDrive}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-40"
                title="Refresh Drive files"
              >
                <RefreshCw className={`w-4 h-4 ${loadingDrive ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {driveError && (
            <div className="p-3 rounded bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{driveError}</span>
            </div>
          )}

          {/* Drive Files List */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-lg overflow-hidden">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 bg-[#0e1424]">
              <span>File Name & Type</span>
              <span>Actions & Links</span>
            </div>

            {loadingDrive ? (
              <div className="p-12 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Connecting to Google Drive API...</span>
              </div>
            ) : driveFiles.length > 0 ? (
              <div className="divide-y divide-slate-850">
                {driveFiles.map((file) => {
                  const isSpreadsheet = file.mimeType.includes('spreadsheet') || file.mimeType.includes('sheet');
                  const isFolder = file.mimeType.includes('folder');

                  return (
                    <div key={file.id} className="p-3 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center gap-3 truncate max-w-lg">
                        {isSpreadsheet ? (
                          <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isFolder ? (
                          <FolderPlus className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <div className="truncate">
                          <div className="text-xs font-mono text-slate-200 truncate">{file.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                            <span>ID: {file.id.slice(0, 12)}...</span>
                            {file.modifiedTime && (
                              <span>Updated {new Date(file.modifiedTime).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isSpreadsheet && (
                          <button
                            onClick={() => {
                              setActiveTab('sheets');
                              handleInspectSheet(file.id);
                            }}
                            className="px-2 py-1 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 rounded text-[11px] font-mono transition-colors"
                          >
                            Inspect Rows
                          </button>
                        )}
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-cyan-300 transition-colors"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteFile(file)}
                          className="p-1.5 hover:bg-rose-950/60 rounded text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete from Google Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center text-xs font-mono text-slate-400">
                {hasToken ? 'No files found in this view.' : 'Please sign in with Google to explore Drive.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MANDATORY User Confirmation Dialog for Destructive Operations */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b0e17] border border-cyan-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30">
                <AlertTriangle className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                {confirmModal.title}
              </h3>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {confirmModal.description}
            </p>

            <div className="p-3 bg-[#07090e] border border-slate-800 rounded text-[11px] font-mono text-slate-400 space-y-1">
              <div><strong>User Authority:</strong> {currentUser?.email || 'Authenticated User'}</div>
              <div><strong>Scope Checked:</strong> Google Drive / Sheets API</div>
              <div className="text-emerald-400">No silent mutations permitted.</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const action = confirmModal.onConfirm;
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                  await action();
                }}
                className="px-4 py-2 rounded text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              >
                {confirmModal.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
