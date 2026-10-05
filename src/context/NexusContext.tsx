import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DivisionId,
  DataClassification,
  NFLGameDossier,
  OracleModelRecord,
  ModelChangeRecord,
  ParlayAnalysisCard,
  WeeklyPostmortem,
  ForgeOpportunity,
  ForgeSignal,
  BuyerInterviewRecord,
  ForgeOffer,
  ForgeCustomer,
  ForgeTransaction,
  ForgeDistributionCampaign,
  SharedMission,
  SharedAssetRecord,
  AutomationJob,
  BlockedAttemptRecord,
  OpportunityScorecard
} from '../types/nexus';

import {
  SEED_ORACLE_MODELS,
  SEED_MODEL_CHANGES,
  SEED_ORACLE_GAMES,
  SEED_PARLAY_CARD,
  SEED_WEEKLY_POSTMORTEM,
  SEED_FORGE_OPPORTUNITY,
  SEED_FORGE_SIGNALS,
  SEED_BUYER_INTERVIEWS,
  SEED_FORGE_OFFERS,
  SEED_FORGE_CUSTOMERS,
  SEED_FORGE_TRANSACTIONS,
  SEED_FORGE_DISTRIBUTION,
  SEED_SHARED_MISSIONS,
  SEED_SHARED_ASSETS,
  SEED_AUTOMATIONS,
  SEED_BLOCKED_ATTEMPTS
} from '../data/nexusSeedData';

import { 
  AdvisorScheduleConfig 
} from '../types/advisor';

export type NexusNavSection = 
  | 'command-center'
  | 'system-map'
  | 'nexus-floor'
  | 'advisor'
  | 'operations-deck'
  | 'workspace'
  | 'shared-missions' 
  | 'asset-vault' 
  | 'automation-control' 
  | 'governance' 
  | 'settings';

export type OracleDepartment = 
  | 'command' 
  | 'data-ops' 
  | 'model-lab' 
  | 'game-intel' 
  | 'player-intel'
  | 'parlays' 
  | 'market-bench' 
  | 'backtest' 
  | 'research-desk' 
  | 'change-control' 
  | 'weekly-review' 
  | 'archive';

export type ForgeDepartment = 
  | 'command' 
  | 'signals' 
  | 'buyer-research' 
  | 'opportunity-lab' 
  | 'offer-pricing' 
  | 'product-forge' 
  | 'launch-deploy' 
  | 'distribution' 
  | 'revenue-ops' 
  | 'asset-vault' 
  | 'automations' 
  | 'portfolio-review' 
  | 'archive';

export interface NexusMessage {
  id: string;
  sender: 'user' | 'assistant';
  division: DivisionId;
  text: string;
  timestamp: string;
  structuredOutput?: {
    knownFacts: string[];
    modelEstimates: string[];
    analystInferences: string[];
    assumptions: string[];
    unknowns: string[];
    recommendation: string;
  };
}

interface NexusContextType {
  // Navigation
  activeDivision: DivisionId;
  setActiveDivision: (div: DivisionId) => void;
  activeNexusSection: NexusNavSection;
  setActiveNexusSection: (sec: NexusNavSection) => void;
  activeOracleDepartment: OracleDepartment;
  setActiveOracleDepartment: (dept: OracleDepartment) => void;
  activeForgeDepartment: ForgeDepartment;
  setActiveForgeDepartment: (dept: ForgeDepartment) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Attention & Compounding
  founderLevel: number;
  signalCredits: number;
  systemHealthScore: number;
  oracleHoursThisWeek: number;
  forgeHoursThisWeek: number;
  setOracleHoursThisWeek: (h: number) => void;
  setForgeHoursThisWeek: (h: number) => void;
  founderCompoundingIndex: number;
  oracleIntegrityScore: number;
  forgeRevenueThreshold: number; // 750
  currentForgeMRR: number;

  // ORACLE Division
  oracleGames: NFLGameDossier[];
  selectedGame: NFLGameDossier | null;
  setSelectedGameId: (id: string) => void;
  oracleModels: OracleModelRecord[];
  modelChanges: ModelChangeRecord[];
  parlayCards: ParlayAnalysisCard[];
  weeklyPostmortem: WeeklyPostmortem;
  addModelChange: (change: Omit<ModelChangeRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  activateModelChange: (changeId: string) => void;
  saveGameDossier: (dossier: NFLGameDossier) => void;
  saveParlayCard: (card: ParlayAnalysisCard) => void;

  // FORGE LABS Division
  forgeOpportunity: ForgeOpportunity;
  forgeSignals: ForgeSignal[];
  buyerInterviews: BuyerInterviewRecord[];
  forgeOffers: ForgeOffer[];
  forgeCustomers: ForgeCustomer[];
  forgeTransactions: ForgeTransaction[];
  forgeCampaigns: ForgeDistributionCampaign[];
  updateScorecard: (scorecard: OpportunityScorecard) => void;
  addSignal: (signal: Omit<ForgeSignal, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  addBuyerInterview: (interview: Omit<BuyerInterviewRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  addForgeOffer: (offer: Omit<ForgeOffer, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  setOpportunityStage: (stage: ForgeOpportunity['stage']) => void;

  // Shared Systems
  sharedMissions: SharedMission[];
  sharedAssets: SharedAssetRecord[];
  automations: AutomationJob[];
  blockedAttempts: BlockedAttemptRecord[];
  addMission: (mission: Omit<SharedMission, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  toggleMissionStatus: (id: string) => void;
  toggleAutomation: (id: string) => void;
  dataClassificationCounts: Record<DataClassification, number>;

  // Governance & Policy Guard
  checkDataClassification: (classification: DataClassification, division: DivisionId) => { allowed: boolean; reason?: string };
  lastBlockedAlert: string | null;
  clearBlockedAlert: () => void;

  // NEXUS ORCHESTRATOR
  orchestratorOpen: boolean;
  setOrchestratorOpen: (open: boolean) => void;
  orchestratorMode: DivisionId;
  setOrchestratorMode: (mode: DivisionId) => void;
  orchestratorMessages: NexusMessage[];
  orchestratorLoading: boolean;
  sendOrchestratorQuery: (query: string, targetDivision?: DivisionId) => Promise<void>;
  resetAllDemoData: () => void;

  // NEXUS ADVISOR Weekly Schedule
  advisorSchedule: AdvisorScheduleConfig;
  setAdvisorSchedule: (cfg: AdvisorScheduleConfig) => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const NexusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence Helpers
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`nexus_os_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStored = <T,>(key: string, val: T) => {
    try {
      localStorage.setItem(`nexus_os_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn(`Failed to persist ${key}`, e);
    }
  };

  // Division Navigation
  const [activeDivision, setActiveDivisionState] = useState<DivisionId>(() => loadStored('activeDivision', 'nexus'));
  const [activeNexusSection, setActiveNexusSection] = useState<NexusNavSection>('command-center');
  const [activeOracleDepartment, setActiveOracleDepartment] = useState<OracleDepartment>('command');
  const [activeForgeDepartment, setActiveForgeDepartment] = useState<ForgeDepartment>('command');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const setActiveDivision = (div: DivisionId) => {
    setActiveDivisionState(div);
    saveStored('activeDivision', div);
  };

  // Allocation & Scores
  const [oracleHoursThisWeek, setOracleHours] = useState<number>(() => loadStored('oracleHours', 14));
  const [forgeHoursThisWeek, setForgeHours] = useState<number>(() => loadStored('forgeHours', 18));
  const [lastBlockedAlert, setLastBlockedAlert] = useState<string | null>(null);

  const setOracleHoursThisWeek = (h: number) => {
    setOracleHours(h);
    saveStored('oracleHours', h);
  };

  const setForgeHoursThisWeek = (h: number) => {
    setForgeHours(h);
    saveStored('forgeHours', h);
  };

  // ORACLE Data
  const [oracleGames, setOracleGames] = useState<NFLGameDossier[]>(() => loadStored('oracleGames', SEED_ORACLE_GAMES));
  const [selectedGameId, setSelectedGameId] = useState<string>(SEED_ORACLE_GAMES[0].id);
  const [oracleModels, setOracleModels] = useState<OracleModelRecord[]>(() => loadStored('oracleModels', SEED_ORACLE_MODELS));
  const [modelChanges, setModelChanges] = useState<ModelChangeRecord[]>(() => loadStored('modelChanges', SEED_MODEL_CHANGES));
  const [parlayCards, setParlayCards] = useState<ParlayAnalysisCard[]>(() => loadStored('parlays', [SEED_PARLAY_CARD]));
  const [weeklyPostmortem, setWeeklyPostmortem] = useState<WeeklyPostmortem>(() => loadStored('postmortem', SEED_WEEKLY_POSTMORTEM));

  // FORGE Data
  const [forgeOpportunity, setForgeOpportunity] = useState<ForgeOpportunity>(() => loadStored('forgeOpp', SEED_FORGE_OPPORTUNITY));
  const [forgeSignals, setForgeSignals] = useState<ForgeSignal[]>(() => loadStored('forgeSignals', SEED_FORGE_SIGNALS));
  const [buyerInterviews, setBuyerInterviews] = useState<BuyerInterviewRecord[]>(() => loadStored('buyerInterviews', SEED_BUYER_INTERVIEWS));
  const [forgeOffers, setForgeOffers] = useState<ForgeOffer[]>(() => loadStored('forgeOffers', SEED_FORGE_OFFERS));
  const [forgeCustomers, setForgeCustomers] = useState<ForgeCustomer[]>(() => loadStored('forgeCust', SEED_FORGE_CUSTOMERS));
  const [forgeTransactions, setForgeTransactions] = useState<ForgeTransaction[]>(() => loadStored('forgeTx', SEED_FORGE_TRANSACTIONS));
  const [forgeCampaigns, setForgeCampaigns] = useState<ForgeDistributionCampaign[]>(() => loadStored('forgeCamp', SEED_FORGE_DISTRIBUTION));

  // Shared Data
  const [sharedMissions, setSharedMissions] = useState<SharedMission[]>(() => loadStored('missions', SEED_SHARED_MISSIONS));
  const [sharedAssets, setSharedAssets] = useState<SharedAssetRecord[]>(() => loadStored('assets', SEED_SHARED_ASSETS));
  const [automations, setAutomations] = useState<AutomationJob[]>(() => loadStored('automations', SEED_AUTOMATIONS));
  const [blockedAttempts, setBlockedAttempts] = useState<BlockedAttemptRecord[]>(() => loadStored('blockedAttempts', SEED_BLOCKED_ATTEMPTS));

  // NEXUS ADVISOR Weekly Schedule State
  const [advisorSchedule, setAdvisorScheduleState] = useState<AdvisorScheduleConfig>(() => loadStored('advisorSchedule', {
    cutoffDay: 'Sunday',
    cutoffTime: '18:00',
    generationWindow: 'Sunday 18:00 – Monday 07:00',
    dueDay: 'Monday',
    dueTime: '08:00',
    reviewTargetDay: 'Monday',
    reviewTargetTime: '12:00',
    autoGenerateDraft: true
  }));

  const setAdvisorSchedule = (cfg: AdvisorScheduleConfig) => {
    setAdvisorScheduleState(cfg);
    saveStored('advisorSchedule', cfg);
  };

  // ORCHESTRATOR Assistant State
  const [orchestratorOpen, setOrchestratorOpen] = useState<boolean>(false);
  const [orchestratorMode, setOrchestratorMode] = useState<DivisionId>('nexus');
  const [orchestratorLoading, setOrchestratorLoading] = useState<boolean>(false);
  const [orchestratorMessages, setOrchestratorMessages] = useState<NexusMessage[]>([
    {
      id: 'init-msg',
      sender: 'assistant',
      division: 'nexus',
      text: 'NEXUS ORCHESTRATOR online. Ready to route inquiries to ORACLE (NFL Forecast Rigor & Calibration) or FORGE LABS (Venture Deployment & Commercial Validation). What would you like to review today?',
      timestamp: new Date().toISOString()
    }
  ]);

  // Derived Metrics
  const currentForgeMRR = forgeCustomers
    .filter(c => c.status === 'active_subscriber')
    .reduce((sum, c) => sum + c.mrrContribution, 0);

  const oracleIntegrityScore = Math.min(100, Math.round(
    (oracleModels[0]?.brierScore ? (1 - oracleModels[0].brierScore) * 80 : 70) +
    (modelChanges.filter(c => c.result === 'pass').length * 5) +
    (weeklyPostmortem ? 10 : 0)
  ));

  const founderCompoundingIndex = Math.min(100, Math.round(
    (currentForgeMRR >= 750 ? 30 : (currentForgeMRR / 750) * 25) +
    (buyerInterviews.length * 6) +
    (sharedAssets.reduce((sum, a) => sum + Math.min(a.reuseCount, 5), 0) * 1.5) +
    (oracleIntegrityScore * 0.3) +
    (sharedMissions.filter(m => m.status === 'completed').length * 4)
  ));

  // Auto-Save effects
  useEffect(() => saveStored('oracleGames', oracleGames), [oracleGames]);
  useEffect(() => saveStored('oracleModels', oracleModels), [oracleModels]);
  useEffect(() => saveStored('modelChanges', modelChanges), [modelChanges]);
  useEffect(() => saveStored('parlays', parlayCards), [parlayCards]);
  useEffect(() => saveStored('forgeOpp', forgeOpportunity), [forgeOpportunity]);
  useEffect(() => saveStored('forgeSignals', forgeSignals), [forgeSignals]);
  useEffect(() => saveStored('buyerInterviews', buyerInterviews), [buyerInterviews]);
  useEffect(() => saveStored('forgeOffers', forgeOffers), [forgeOffers]);
  useEffect(() => saveStored('forgeCust', forgeCustomers), [forgeCustomers]);
  useEffect(() => saveStored('forgeTx', forgeTransactions), [forgeTransactions]);
  useEffect(() => saveStored('missions', sharedMissions), [sharedMissions]);
  useEffect(() => saveStored('assets', sharedAssets), [sharedAssets]);
  useEffect(() => saveStored('automations', automations), [automations]);
  useEffect(() => saveStored('blockedAttempts', blockedAttempts), [blockedAttempts]);

  // Global Data Governance Guard
  const checkDataClassification = (classification: DataClassification, division: DivisionId): { allowed: boolean; reason?: string } => {
    if (classification === 'restricted') {
      const reason = `GOVERNANCE POLICY VIOLATION: Upload or storage attempted with classification "restricted" in division [${division.toUpperCase()}]. Action blocked immediately to protect personal venture isolation. Content was discarded without persistence.`;
      const blockedRecord: BlockedAttemptRecord = {
        id: `blk-${Date.now()}`,
        timestamp: new Date().toISOString(),
        attemptedDivision: division,
        reason,
        attemptedBy: 'Founder (Admin)'
      };
      setBlockedAttempts(prev => [blockedRecord, ...prev]);
      setLastBlockedAlert(reason);
      return { allowed: false, reason };
    }
    return { allowed: true };
  };

  const clearBlockedAlert = () => setLastBlockedAlert(null);

  // Distribution counts across all datasets
  const dataClassificationCounts: Record<DataClassification, number> = {
    public: forgeSignals.filter(s => s.dataClassification === 'public').length + 3,
    licensed: 2, // sports data / weather feeds
    'user-created': buyerInterviews.length + sharedAssets.length + modelChanges.length,
    'customer-provided': 2,
    private: 3,
    restricted: blockedAttempts.length // Track blocked attempts count
  };

  // ORACLE Actions
  const selectedGame = oracleGames.find(g => g.id === selectedGameId) || oracleGames[0] || null;

  const addModelChange = (changeData: Omit<ModelChangeRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    if (!changeData.hypothesis.trim()) {
      return { success: false, error: 'Mandatory Rule: Pre-registered hypothesis must be stated before evaluating candidate metrics.' };
    }
    const newRecord: ModelChangeRecord = {
      ...changeData,
      id: `chg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)'
    };
    setModelChanges(prev => [newRecord, ...prev]);
    return { success: true };
  };

  const activateModelChange = (changeId: string) => {
    const target = modelChanges.find(c => c.id === changeId);
    if (!target) return;
    if (target.result !== 'pass') {
      alert('Cannot activate model change: Result must be "pass" with verified backtest metrics.');
      return;
    }
    setModelChanges(prev => prev.map(c => c.id === changeId ? { ...c, activationDecision: 'approved', updatedAt: new Date().toISOString() } : c));
    setOracleModels(prev => prev.map(m => m.id === 'model-v2.4' ? {
      ...m,
      version: `${m.version.split('.').slice(0, 2).join('.')}.${Number(m.version.split('.')[2] || 0) + 1}`,
      changeRationale: target.exactChangeDescription,
      updatedAt: new Date().toISOString()
    } : m));
  };

  const saveGameDossier = (dossier: NFLGameDossier) => {
    setOracleGames(prev => prev.map(g => g.id === dossier.id ? dossier : g));
  };

  const saveParlayCard = (card: ParlayAnalysisCard) => {
    setParlayCards(prev => [card, ...prev.filter(c => c.id !== card.id)]);
  };

  // FORGE Actions
  const updateScorecard = (scorecard: OpportunityScorecard) => {
    // Recalculate scores
    const commercialReadiness = Math.round(
      ((scorecard.painSeverity * 2) + 
       (scorecard.willingnessToPay * 2) + 
       (scorecard.buyerAccess * 1.5) + 
       (scorecard.differentiation * 1.5)) * 3.3
    );

    const revenuePotential = Math.round(
      ((scorecard.recurringRevenuePotential * 2.5) + 
       (scorecard.grossMarginPotential * 2) + 
       (scorecard.distributionStrength * 1.5)) * 3.3
    );

    const penaltySum = scorecard.supportBurdenPenalty + scorecard.operatingCostPenalty + scorecard.dataDependencyRisk + scorecard.legalConflictRisk;
    const riskAdjusted = Math.max(10, Math.round(((commercialReadiness + revenuePotential) / 2) - (penaltySum * 2.5)));

    setForgeOpportunity(prev => ({
      ...prev,
      scorecard,
      commercialReadinessScore: Math.min(100, commercialReadiness),
      revenuePotentialScore: Math.min(100, revenuePotential),
      riskAdjustedScore: Math.min(100, riskAdjusted),
      updatedAt: new Date().toISOString()
    }));
  };

  const addSignal = (signalData: Omit<ForgeSignal, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = checkDataClassification(signalData.dataClassification, 'forge');
    if (!check.allowed) {
      return { success: false, error: check.reason };
    }
    const newSignal: ForgeSignal = {
      ...signalData,
      id: `sig-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)'
    };
    setForgeSignals(prev => [newSignal, ...prev]);
    return { success: true };
  };

  const addBuyerInterview = (interviewData: Omit<BuyerInterviewRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = checkDataClassification(interviewData.dataClassification, 'forge');
    if (!check.allowed) {
      return { success: false, error: check.reason };
    }
    const newInterview: BuyerInterviewRecord = {
      ...interviewData,
      id: `int-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)'
    };
    setBuyerInterviews(prev => [newInterview, ...prev]);
    return { success: true };
  };

  const addForgeOffer = (offerData: Omit<ForgeOffer, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newOffer: ForgeOffer = {
      ...offerData,
      id: `offer-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)'
    };
    setForgeOffers(prev => [newOffer, ...prev]);
  };

  const setOpportunityStage = (stage: ForgeOpportunity['stage']) => {
    setForgeOpportunity(prev => ({ ...prev, stage, updatedAt: new Date().toISOString() }));
  };

  // Shared Missions Actions
  const addMission = (missionData: Omit<SharedMission, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newMission: SharedMission = {
      ...missionData,
      id: `msn-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)'
    };
    setSharedMissions(prev => [newMission, ...prev]);
  };

  const toggleMissionStatus = (id: string) => {
    setSharedMissions(prev => prev.map(m => {
      if (m.id !== id) return m;
      return {
        ...m,
        status: m.status === 'completed' ? 'active' : 'completed',
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => {
      if (a.id !== id) return a;
      return {
        ...a,
        status: a.status === 'active' ? 'paused' : 'active',
        updatedAt: new Date().toISOString()
      };
    }));
  };

  // NEXUS ORCHESTRATOR API Integration
  const sendOrchestratorQuery = async (query: string, targetDivision?: DivisionId) => {
    if (!query.trim()) return;

    const divisionToRoute = targetDivision || (
      query.toLowerCase().includes('nfl') || query.toLowerCase().includes('game') || query.toLowerCase().includes('spread') || query.toLowerCase().includes('chiefs') || query.toLowerCase().includes('model')
        ? 'oracle'
        : query.toLowerCase().includes('venture') || query.toLowerCase().includes('revenue') || query.toLowerCase().includes('buyer') || query.toLowerCase().includes('price') || query.toLowerCase().includes('mrr')
        ? 'forge'
        : activeDivision
    );

    const userMsg: NexusMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      division: divisionToRoute,
      text: query,
      timestamp: new Date().toISOString()
    };

    setOrchestratorMessages(prev => [...prev, userMsg]);
    setOrchestratorLoading(true);

    try {
      const response = await fetch('/api/nexus/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          division: divisionToRoute,
          context: {
            currentMRR: currentForgeMRR,
            oracleActiveModel: oracleModels[0]?.name,
            oracleActiveBrier: oracleModels[0]?.brierScore,
            targetThreshold: 750,
            activeOpportunity: forgeOpportunity.name,
            activeWeek: 5
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: NexusMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          division: divisionToRoute,
          text: data.text || data.recommendation || 'Analysis completed.',
          timestamp: new Date().toISOString(),
          structuredOutput: data.structuredOutput
        };
        setOrchestratorMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      // High-rigor structured fallback
      const fallbackMsg: NexusMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        division: divisionToRoute,
        text: divisionToRoute === 'oracle'
          ? `ORACLE Rigor Assessment for query: "${query}"`
          : `FORGE Commercial Truth for query: "${query}"`,
        timestamp: new Date().toISOString(),
        structuredOutput: divisionToRoute === 'oracle' ? {
          knownFacts: [
            'ORACLE Ensemble v2.4 holds an active rolling Brier score of 0.188 across 1,360 regular season games.',
            'Chiefs vs Bills Week 5 spread benchmark sits at KC -3.0 (Market) vs KC -2.8 (Model).',
            'No wager or staking recommendation is ever produced.'
          ],
          modelEstimates: [
            'Projected pace: 66.5 total offensive plays.',
            'Median total score distribution centers on 49.2 points (54% over 48.0).'
          ],
          analystInferences: [
            'Buffalo 2-high safety shell creates high pass attempt volume underneath for Travis Kelce and running backs.'
          ],
          assumptions: [
            'Turnover margin is non-stationary and regresses 45% week-over-week.',
            'Home field advantage at Arrowhead is quantified at +2.1 points in non-division matchups.'
          ],
          unknowns: [
            'Starting center Creed Humphrey inactives confirmation at 90-minute pre-game window.',
            'Final wind velocity gusts exceeding 10 mph at Arrowhead.'
          ],
          recommendation: 'Audit Friday final injury participation report before finalizing game dossier probability distribution.'
        } : {
          knownFacts: [
            `Current MRR sits at $${currentForgeMRR}/mo from 2 active enterprise subscribers ($175/mo).`,
            `Mandatory $750/mo approval threshold requires 3 additional customers by October 25 deadline.`,
            `Primary regulatory filing (Colorado PUC Docket 24A-0899E) proves 54-month substation delays.`
          ],
          modelEstimates: [
            'Conversion rate on targeted outbound executive memos to transmission consultants is currently 11.1% (2 sales / 18 clicks).'
          ],
          analystInferences: [
            'Site selectors are willing to pay $350 for immediate diligence reports to avoid non-refundable earnest money loss on blocked substation land.'
          ],
          assumptions: [
            'Utility cost allocation tariffs will remain unresolved through Q4 2026.',
            'Weld County acoustic buffer code (1,500 ft) will not be granted administrative variances.'
          ],
          unknowns: [
            'Willingness of out-of-state developers to commit to annual upfront $1,750 license vs $175/mo.',
            'Decision date on City of Greeley senior C-BT water dedication ordinance.'
          ],
          recommendation: 'Execute Mission F1: Send Executive Memo to 12 Weld County Site Acquisition Directors to secure 2 remaining subscribers to reach $700 MRR.'
        }
      };
      setOrchestratorMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setOrchestratorLoading(false);
    }
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setOracleGames(SEED_ORACLE_GAMES);
    setOracleModels(SEED_ORACLE_MODELS);
    setModelChanges(SEED_MODEL_CHANGES);
    setParlayCards([SEED_PARLAY_CARD]);
    setWeeklyPostmortem(SEED_WEEKLY_POSTMORTEM);
    setForgeOpportunity(SEED_FORGE_OPPORTUNITY);
    setForgeSignals(SEED_FORGE_SIGNALS);
    setBuyerInterviews(SEED_BUYER_INTERVIEWS);
    setForgeOffers(SEED_FORGE_OFFERS);
    setForgeCustomers(SEED_FORGE_CUSTOMERS);
    setForgeTransactions(SEED_FORGE_TRANSACTIONS);
    setForgeCampaigns(SEED_FORGE_DISTRIBUTION);
    setSharedMissions(SEED_SHARED_MISSIONS);
    setSharedAssets(SEED_SHARED_ASSETS);
    setAutomations(SEED_AUTOMATIONS);
    setBlockedAttempts(SEED_BLOCKED_ATTEMPTS);
    setOracleHours(14);
    setForgeHours(18);
  };

  return (
    <NexusContext.Provider
      value={{
        activeDivision,
        setActiveDivision,
        activeNexusSection,
        setActiveNexusSection,
        activeOracleDepartment,
        setActiveOracleDepartment,
        activeForgeDepartment,
        setActiveForgeDepartment,
        commandPaletteOpen,
        setCommandPaletteOpen,
        founderLevel: 4,
        signalCredits: 820,
        systemHealthScore: 96,
        oracleHoursThisWeek,
        forgeHoursThisWeek,
        setOracleHoursThisWeek,
        setForgeHoursThisWeek,
        founderCompoundingIndex,
        oracleIntegrityScore,
        forgeRevenueThreshold: 750,
        currentForgeMRR,
        oracleGames,
        selectedGame,
        setSelectedGameId,
        oracleModels,
        modelChanges,
        parlayCards,
        weeklyPostmortem,
        addModelChange,
        activateModelChange,
        saveGameDossier,
        saveParlayCard,
        forgeOpportunity,
        forgeSignals,
        buyerInterviews,
        forgeOffers,
        forgeCustomers,
        forgeTransactions,
        forgeCampaigns,
        updateScorecard,
        addSignal,
        addBuyerInterview,
        addForgeOffer,
        setOpportunityStage,
        sharedMissions,
        sharedAssets,
        automations,
        blockedAttempts,
        addMission,
        toggleMissionStatus,
        toggleAutomation,
        dataClassificationCounts,
        checkDataClassification,
        lastBlockedAlert,
        clearBlockedAlert,
        orchestratorOpen,
        setOrchestratorOpen,
        orchestratorMode,
        setOrchestratorMode,
        orchestratorMessages,
        orchestratorLoading,
        sendOrchestratorQuery,
        resetAllDemoData,
        advisorSchedule,
        setAdvisorSchedule
      }}
    >
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
};
