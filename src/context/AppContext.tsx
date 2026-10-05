import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SignalRecord,
  EvidenceRecord,
  OpportunityRecord,
  ProductRecord,
  DistributionRecord,
  RevenueTransaction,
  CustomerRecord,
  ReusableAssetRecord,
  AutomationRecord,
  IntelligenceItem,
  MissionAction,
  BossBattle,
  MissionChain,
  ConflictOfInterestCheck,
  OnboardingAnswers,
  FounderLevelInfo,
  FounderLevelName,
  DataClassification,
  UserRole,
  PulseRunRecord,
  PulseSettings,
  CandidateEvidenceItem,
  EvidenceConfidence,
} from '../types';
import {
  SEED_SIGNALS,
  SEED_EVIDENCE,
  SEED_OPPORTUNITY,
  SEED_PRODUCTS,
  SEED_DISTRIBUTION,
  SEED_TRANSACTIONS,
  SEED_CUSTOMERS,
  SEED_ASSETS,
  SEED_AUTOMATIONS,
  SEED_INTELLIGENCE,
  SEED_MISSIONS,
  SEED_BOSS_BATTLES,
  SEED_MISSION_CHAINS,
  SEED_CONFLICT_CHECKS,
  SEED_PULSE_RUNS,
  SEED_PULSE_SETTINGS,
} from '../data/seedData';

export const FOUNDER_LEVELS: FounderLevelInfo[] = [
  { levelNumber: 1, name: 'Signal Scout', minCredits: 0, revenueGate: '$0', evidenceGate: '3 verified primary sources', current: false },
  { levelNumber: 2, name: 'Research Operator', minCredits: 100, revenueGate: '$0', evidenceGate: '5 approved evidence claims', current: false },
  { levelNumber: 3, name: 'Validation Builder', minCredits: 250, revenueGate: '1 paid customer ($50+)', evidenceGate: '10 approved evidence claims', current: true },
  { levelNumber: 4, name: 'Product Architect', minCredits: 500, revenueGate: '$750/mo project approval threshold', evidenceGate: '1 reusable methodology asset', current: false },
  { levelNumber: 5, name: 'Revenue Systems Operator', minCredits: 1000, revenueGate: '$1,000 MRR & 5 recurring customers', evidenceGate: 'Zero unresolved source gaps', current: false },
  { levelNumber: 6, name: 'Portfolio Builder', minCredits: 2000, revenueGate: '2 validated products $\ge$ $750/mo each', evidenceGate: '1 killed project documented', current: false },
  { levelNumber: 7, name: 'Compounding Founder', minCredits: 4000, revenueGate: '$3,000+ MRR with 85%+ margin', evidenceGate: '5 multi-product compounding assets', current: false },
  { levelNumber: 8, name: 'Intelligence Platform Owner', minCredits: 8000, revenueGate: '$10,000+ MRR with automated pipelines', evidenceGate: 'Industry benchmark authority registry', current: false },
];

interface AppContextType {
  // Navigation & User
  activeSection: string;
  setActiveSection: (sec: string) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  
  // Data Records
  signals: SignalRecord[];
  evidence: EvidenceRecord[];
  opportunity: OpportunityRecord;
  products: ProductRecord[];
  distribution: DistributionRecord[];
  transactions: RevenueTransaction[];
  customers: CustomerRecord[];
  assets: ReusableAssetRecord[];
  automations: AutomationRecord[];
  intelligence: IntelligenceItem[];
  missions: MissionAction[];
  bossBattles: BossBattle[];
  missionChains: MissionChain[];
  conflictChecks: ConflictOfInterestCheck[];

  // Gamification Metrics
  signalCredits: number;
  currentLevel: FounderLevelInfo;
  compoundingIndex: number;
  founderOperatingScore: number;
  
  // Financial Metrics
  oneTimeRevenue: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  grossMarginPercent: number;
  monthlyOperatingCost: number;
  netContribution: number;
  revenuePerHour: number;
  totalFounderHours: number;
  daysSinceLastConversation: number;
  daysSinceLastPaidAttempt: number;

  // Actions
  addSignal: (signal: Omit<SignalRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  updateSignal: (id: string, updates: Partial<SignalRecord>) => void;
  addEvidence: (evidence: Omit<EvidenceRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  updateEvidence: (id: string, updates: Partial<EvidenceRecord>) => void;
  updateOpportunity: (updates: Partial<OpportunityRecord>) => void;
  addProduct: (product: Omit<ProductRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  updateProduct: (id: string, updates: Partial<ProductRecord>) => void;
  addDistribution: (dist: Omit<DistributionRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  updateDistribution: (id: string, updates: Partial<DistributionRecord>) => void;
  addTransaction: (tx: Omit<RevenueTransaction, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  addCustomer: (cust: Omit<CustomerRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  addAsset: (asset: Omit<ReusableAssetRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  recordAssetReuse: (id: string) => void;
  addAutomation: (auto: Omit<AutomationRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  toggleAutomationStatus: (id: string) => void;
  triggerAutomationRun: (id: string) => void;
  addIntelligence: (item: Omit<IntelligenceItem, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => { success: boolean; error?: string };
  completeMission: (id: string) => void;
  deferMission: (id: string) => void;
  addConflictCheck: (check: Omit<ConflictOfInterestCheck, 'id'>) => void;

  // Onboarding
  onboarding: OnboardingAnswers;
  updateOnboarding: (answers: Partial<OnboardingAnswers>) => void;
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;

  // ORACLE AI
  oracleOpen: boolean;
  setOracleOpen: (open: boolean) => void;
  oracleLoading: boolean;
  oracleResponse: string | null;
  askOracle: (prompt?: string, mode?: string) => Promise<void>;

  // Governance Safety Check
  validateDataClassification: (classification: DataClassification) => { allowed: boolean; message?: string };
  resetToDemonstrationData: () => void;

  // PULSE Research Agent
  pulseRuns: PulseRunRecord[];
  activePulseRun: PulseRunRecord | null;
  setActivePulseRun: (run: PulseRunRecord | null) => void;
  pulseSettings: PulseSettings;
  isPulseRunning: boolean;
  runPulseResearch: (params: any) => Promise<{ success: boolean; run?: PulseRunRecord; error?: string }>;
  approveCandidateEvidence: (runId: string, candidateId: string, reviewNotes: string, confidence: EvidenceConfidence) => void;
  rejectCandidateEvidence: (runId: string, candidateId: string, reason: string) => void;
  requestDeeperVerification: (runId: string, candidateId: string) => void;
  updatePulseSettings: (updates: Partial<PulseSettings>) => Promise<void>;
  fetchPulseConfig: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeSection, setActiveSection] = useState<string>('command-center');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('admin');

  // Persistence helpers
  const loadState = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`forge_os_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveState = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`forge_os_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed saving ${key} to localStorage`, e);
    }
  };

  // Datasets
  const [signals, setSignals] = useState<SignalRecord[]>(() => loadState('signals', SEED_SIGNALS));
  const [evidence, setEvidence] = useState<EvidenceRecord[]>(() => loadState('evidence', SEED_EVIDENCE));
  const [opportunity, setOpportunity] = useState<OpportunityRecord>(() => loadState('opportunity', SEED_OPPORTUNITY));
  const [products, setProducts] = useState<ProductRecord[]>(() => loadState('products', SEED_PRODUCTS));
  const [distribution, setDistribution] = useState<DistributionRecord[]>(() => loadState('distribution', SEED_DISTRIBUTION));
  const [transactions, setTransactions] = useState<RevenueTransaction[]>(() => loadState('transactions', SEED_TRANSACTIONS));
  const [customers, setCustomers] = useState<CustomerRecord[]>(() => loadState('customers', SEED_CUSTOMERS));
  const [assets, setAssets] = useState<ReusableAssetRecord[]>(() => loadState('assets', SEED_ASSETS));
  const [automations, setAutomations] = useState<AutomationRecord[]>(() => loadState('automations', SEED_AUTOMATIONS));
  const [intelligence, setIntelligence] = useState<IntelligenceItem[]>(() => loadState('intelligence', SEED_INTELLIGENCE));
  const [missions, setMissions] = useState<MissionAction[]>(() => loadState('missions', SEED_MISSIONS));
  const [bossBattles, setBossBattles] = useState<BossBattle[]>(() => loadState('bossBattles', SEED_BOSS_BATTLES));
  const [missionChains, setMissionChains] = useState<MissionChain[]>(() => loadState('missionChains', SEED_MISSION_CHAINS));
  const [conflictChecks, setConflictChecks] = useState<ConflictOfInterestCheck[]>(() => loadState('conflictChecks', SEED_CONFLICT_CHECKS));
  const [signalCredits, setSignalCredits] = useState<number>(() => loadState('signalCredits', 345));

  // PULSE Agent State
  const [pulseRuns, setPulseRuns] = useState<PulseRunRecord[]>(() => loadState('pulseRuns', SEED_PULSE_RUNS as any));
  const [activePulseRun, setActivePulseRun] = useState<PulseRunRecord | null>(() => (SEED_PULSE_RUNS[0] as any) || null);
  const [pulseSettings, setPulseSettings] = useState<PulseSettings>(() => loadState('pulseSettings', SEED_PULSE_SETTINGS));
  const [isPulseRunning, setIsPulseRunning] = useState<boolean>(false);

  // Onboarding
  const defaultOnboarding: OnboardingAnswers = {
    commercialGoal: 'Build an independent recurring research & data intelligence asset tracking physical constraints of compute infrastructure.',
    incomeTarget12Months: 18000, // $1,500/mo
    defaultApprovalThreshold: 750,
    productTypes: ['Recurring intelligence monitor', 'Paid research briefs & data exports', 'Substation interconnect indexes'],
    buyerGroups: 'Data Center Site Acquisition Directors, Utility Interconnect Consultants, Infrastructure Private Equity',
    expertiseAdvantage: 'Direct translation of Colorado PUC dockets, water utility tariffs, and county setback resolutions into commercial risk models',
    maxMonthlyToolBudget: 150,
    strictlyOutsideScopeNotice: 'Employer confidential IP, proprietary internal data, enterprise software codebases, and employer client lists are strictly barred from this system.',
    firstOpportunity: 'Front Range Infrastructure Constraint Monitor',
    nextCustomerAction: 'Dispatch Adams County 54-month delay executive brief to 15 site planners with $350 report CTA',
    completed: true,
  };
  const [onboarding, setOnboarding] = useState<OnboardingAnswers>(() => loadState('onboarding', defaultOnboarding));
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);

  // ORACLE AI
  const [oracleOpen, setOracleOpen] = useState<boolean>(false);
  const [oracleLoading, setOracleLoading] = useState<boolean>(false);
  const [oracleResponse, setOracleResponse] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => saveState('signals', signals), [signals]);
  useEffect(() => saveState('evidence', evidence), [evidence]);
  useEffect(() => saveState('opportunity', opportunity), [opportunity]);
  useEffect(() => saveState('products', products), [products]);
  useEffect(() => saveState('distribution', distribution), [distribution]);
  useEffect(() => saveState('transactions', transactions), [transactions]);
  useEffect(() => saveState('customers', customers), [customers]);
  useEffect(() => saveState('assets', assets), [assets]);
  useEffect(() => saveState('automations', automations), [automations]);
  useEffect(() => saveState('intelligence', intelligence), [intelligence]);
  useEffect(() => saveState('missions', missions), [missions]);
  useEffect(() => saveState('bossBattles', bossBattles), [bossBattles]);
  useEffect(() => saveState('missionChains', missionChains), [missionChains]);
  useEffect(() => saveState('conflictChecks', conflictChecks), [conflictChecks]);
  useEffect(() => saveState('signalCredits', signalCredits), [signalCredits]);
  useEffect(() => saveState('onboarding', onboarding), [onboarding]);
  useEffect(() => saveState('pulseRuns', pulseRuns), [pulseRuns]);
  useEffect(() => saveState('pulseSettings', pulseSettings), [pulseSettings]);

  // Financial Calculations
  const oneTimeRevenue = transactions
    .filter(t => t.type === 'one-time' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyRecurringRevenue = customers
    .filter(c => c.status === 'active_subscriber')
    .reduce((sum, c) => sum + c.mrrContribution, 0);

  const annualRecurringRevenue = monthlyRecurringRevenue * 12;

  const monthlyOperatingCost = products.reduce((sum, p) => sum + p.operatingCostMonthly, 0) + 25; // + $25 misc
  const currentMonthRevenue = oneTimeRevenue + monthlyRecurringRevenue;
  const grossMarginPercent = currentMonthRevenue > 0
    ? Math.round(((currentMonthRevenue - monthlyOperatingCost) / currentMonthRevenue) * 100)
    : 92;

  const netContribution = currentMonthRevenue - monthlyOperatingCost;

  const totalFounderHours = transactions.reduce((sum, t) => sum + (t.founderHoursSpent || 0), 0) + 12;
  const revenuePerHour = totalFounderHours > 0 ? Math.round(currentMonthRevenue / totalFounderHours) : 0;

  const daysSinceLastConversation = 3;
  const daysSinceLastPaidAttempt = 1;

  // Founder Level calculation
  const currentLevel = FOUNDER_LEVELS.slice().reverse().find(lvl => signalCredits >= lvl.minCredits) || FOUNDER_LEVELS[0];

  // Compounding Index calculation (1-100)
  // Factors: Approved Evidence, Paying Customers, Reusable Assets & Reuses, Automation Runs, Kills Documented
  const approvedEvidenceCount = evidence.filter(e => e.approvalStatus === 'approved').length;
  const totalReuses = assets.reduce((sum, a) => sum + a.reuseCount, 0);
  const paidCustomerCount = customers.filter(c => c.status === 'active_subscriber').length;
  const compoundingIndex = Math.min(
    99,
    Math.round(
      (approvedEvidenceCount * 5) +
      (paidCustomerCount * 15) +
      (totalReuses * 2) +
      (monthlyRecurringRevenue > 0 ? 20 : 0) +
      (assets.length * 4)
    )
  );

  const founderOperatingScore = Math.min(
    98,
    Math.round(
      (grossMarginPercent * 0.4) +
      (compoundingIndex * 0.3) +
      (monthlyRecurringRevenue >= 750 ? 30 : (monthlyRecurringRevenue / 750) * 30)
    )
  );

  // DATA GOVERNANCE ENFORCEMENT
  const validateDataClassification = (classification: DataClassification) => {
    if (classification === 'restricted') {
      return {
        allowed: false,
        message: 'This environment is not approved for restricted, employer, or confidential third-party data.',
      };
    }
    return { allowed: true };
  };

  // Signal CRUD
  const addSignal = (sigData: Omit<SignalRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = validateDataClassification(sigData.dataClassification);
    if (!check.allowed) return { success: false, error: check.message };

    const newSig: SignalRecord = {
      ...sigData,
      id: `sig-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setSignals(prev => [newSig, ...prev]);
    // Reward verified sources
    if (sigData.sourceType === 'official' || sigData.sourceType === 'primary') {
      setSignalCredits(c => c + 10);
    }
    return { success: true };
  };

  const updateSignal = (id: string, updates: Partial<SignalRecord>) => {
    if (updates.dataClassification && updates.dataClassification === 'restricted') {
      alert('This environment is not approved for restricted, employer, or confidential third-party data.');
      return;
    }
    setSignals(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s));
  };

  // Evidence CRUD
  const addEvidence = (eviData: Omit<EvidenceRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = validateDataClassification(eviData.dataClassification);
    if (!check.allowed) return { success: false, error: check.message };

    const newEvi: EvidenceRecord = {
      ...eviData,
      id: `evi-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setEvidence(prev => [newEvi, ...prev]);
    setSignalCredits(c => c + 15);
    return { success: true };
  };

  const updateEvidence = (id: string, updates: Partial<EvidenceRecord>) => {
    if (updates.dataClassification && updates.dataClassification === 'restricted') {
      alert('This environment is not approved for restricted, employer, or confidential third-party data.');
      return;
    }
    setEvidence(prev => prev.map(e => e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e));
    if (updates.approvalStatus === 'approved') {
      setSignalCredits(c => c + 10);
    }
  };

  // Opportunity Updates
  const updateOpportunity = (updates: Partial<OpportunityRecord>) => {
    setOpportunity(prev => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      // recalculate threshold
      updated.meetsApprovalThreshold = updated.expectedMonthlyRevenue >= (onboarding.defaultApprovalThreshold || 750);
      return updated;
    });
  };

  // Product CRUD
  const addProduct = (prodData: Omit<ProductRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = validateDataClassification(prodData.dataClassification);
    if (!check.allowed) return { success: false, error: check.message };

    const newProd: ProductRecord = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setProducts(prev => [...prev, newProd]);
    setSignalCredits(c => c + 25);
    return { success: true };
  };

  const updateProduct = (id: string, updates: Partial<ProductRecord>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
  };

  // Distribution CRUD
  const addDistribution = (distData: Omit<DistributionRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = validateDataClassification(distData.dataClassification);
    if (!check.allowed) return { success: false, error: check.message };

    const newDist: DistributionRecord = {
      ...distData,
      id: `dist-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setDistribution(prev => [newDist, ...prev]);
    return { success: true };
  };

  const updateDistribution = (id: string, updates: Partial<DistributionRecord>) => {
    setDistribution(prev => prev.map(d => d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d));
  };

  // Transactions & Customers
  const addTransaction = (txData: Omit<RevenueTransaction, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newTx: RevenueTransaction = {
      ...txData,
      id: `tx-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setTransactions(prev => [newTx, ...prev]);
    // Reward verified revenue heavily
    setSignalCredits(c => c + 75);

    // Auto-update or add customer
    const existing = customers.find(c => c.email.toLowerCase() === txData.customerEmail.toLowerCase());
    if (existing) {
      setCustomers(prev => prev.map(c => c.id === existing.id ? {
        ...c,
        totalPaid: c.totalPaid + txData.amount,
        mrrContribution: txData.type.includes('subscription') ? txData.amount : c.mrrContribution,
        status: 'active_subscriber',
      } : c));
    } else {
      addCustomer({
        name: txData.customerName,
        email: txData.customerEmail,
        company: txData.customerCompany,
        activeProductId: txData.productId,
        activeProductName: txData.productName,
        status: 'active_subscriber',
        mrrContribution: txData.type.includes('subscription') ? txData.amount : 0,
        totalPaid: txData.amount,
        joinedDate: new Date().toISOString().split('T')[0],
        onboardingCompleted: true,
      });
    }
  };

  const addCustomer = (custData: Omit<CustomerRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newCust: CustomerRecord = {
      ...custData,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setCustomers(prev => [...prev, newCust]);
  };

  // Asset Vault CRUD
  const addAsset = (assetData: Omit<ReusableAssetRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = validateDataClassification(assetData.accessClassification);
    if (!check.allowed) return { success: false, error: check.message };

    const newAsset: ReusableAssetRecord = {
      ...assetData,
      id: `asset-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setAssets(prev => [...prev, newAsset]);
    setSignalCredits(c => c + 35);
    return { success: true };
  };

  const recordAssetReuse = (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? {
      ...a,
      reuseCount: a.reuseCount + 1,
      estimatedHoursSaved: a.estimatedHoursSaved + 4,
      lastUpdated: new Date().toISOString(),
    } : a));
    // Reward reuse heavily (compounding)
    setSignalCredits(c => c + 20);
  };

  // Automation CRUD
  const addAutomation = (autoData: Omit<AutomationRecord, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newAuto: AutomationRecord = {
      ...autoData,
      id: `auto-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setAutomations(prev => [...prev, newAuto]);
  };

  const toggleAutomationStatus = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? {
      ...a,
      status: a.status === 'active' ? 'paused' : 'active',
      updatedAt: new Date().toISOString(),
    } : a));
  };

  const triggerAutomationRun = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? {
      ...a,
      lastRunTime: new Date().toISOString(),
      lastStatus: 'success',
      runsCount: a.runsCount + 1,
    } : a));
    setSignalCredits(c => c + 5);
  };

  // Intelligence Archive
  const addIntelligence = (intelData: Omit<IntelligenceItem, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const check = validateDataClassification(intelData.dataClassification);
    if (!check.allowed) return { success: false, error: check.message };

    const newIntel: IntelligenceItem = {
      ...intelData,
      id: `intel-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Founder (Admin)',
    };
    setIntelligence(prev => [newIntel, ...prev]);
    setSignalCredits(c => c + 20);
    return { success: true };
  };

  // Missions
  const completeMission = (id: string) => {
    const target = missions.find(m => m.id === id);
    if (!target) return;
    setMissions(prev => prev.map(m => m.id === id ? {
      ...m,
      status: 'completed',
      completedAt: new Date().toISOString(),
    } : m));
    setSignalCredits(c => c + (target.rewardCredits || 25));
  };

  const deferMission = (id: string) => {
    setMissions(prev => prev.map(m => m.id === id ? {
      ...m,
      status: 'deferred',
    } : m));
  };

  // Conflict of Interest
  const addConflictCheck = (checkData: Omit<ConflictOfInterestCheck, 'id'>) => {
    const newCheck: ConflictOfInterestCheck = {
      ...checkData,
      id: `coi-${Date.now()}`,
    };
    setConflictChecks(prev => [newCheck, ...prev]);
  };

  // Onboarding
  const updateOnboarding = (answers: Partial<OnboardingAnswers>) => {
    setOnboarding(prev => ({ ...prev, ...answers }));
  };

  // ORACLE AI
  const askOracle = async (prompt?: string, mode?: string) => {
    setOracleLoading(true);
    setOracleOpen(true);
    try {
      const payload = {
        prompt,
        mode: mode || 'strategic_audit',
        project: {
          name: opportunity.name,
          stage: opportunity.stage,
          expectedMonthlyRevenue: opportunity.expectedMonthlyRevenue,
          threshold: onboarding.defaultApprovalThreshold,
          currentMRR: monthlyRecurringRevenue,
          oneTimeRev: oneTimeRevenue,
          nextExperiment: opportunity.nextExperiment,
          killCriteria: opportunity.killCriteria,
        },
        context: {
          approvedEvidenceCount,
          activeProducts: products.length,
          activeSubscribers: customers.filter(c => c.status === 'active_subscriber').length,
          topDistributionAsset: distribution[0]?.title,
          staleEvidenceCount: evidence.filter(e => e.isUnsupportedInference).length,
        }
      };

      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOracleResponse(data.analysis);
    } catch (err: any) {
      console.warn('ORACLE server call failed, using client-grounded strategic engine fallback', err);
      // Fallback
      setOracleResponse(`### 1. Current Commercial Truth
The Front Range Infrastructure Constraint Monitor has 1 validated pilot subscriber ($150/mo) and $650 in pipeline across 2 qualified leads. Current MRR ($150) sits below your mandatory $750/mo approval threshold. The primary value proposition—unmasking substation queue delays and water consumption caps before municipal zoning filings—is validated by 3 primary regulatory filings, but conversion speed is limited by manual report distribution.

### 2. Biggest Constraint
Distribution friction: lack of an automated public teaser/lead magnet linking high-severity grid queue evidence directly to the paid weekly monitor checkout. The sales cycle is still high-touch founder outreach rather than systematic inbound capture.

### 3. Highest-Leverage Action
Deploy the "Substation Interconnect Delay Index" briefing as an ungated one-page executive memo to the 14 identified power-infrastructure developers and site acquisition directors in the Colorado Front Range corridor, with an immediate $350 one-off report purchase CTA.

### 4. Evidence Needed
Verifiable willingness-to-pay from at least 3 enterprise site planners confirming they will pay $\ge$$350 for recurring transmission queue telemetry rather than relying on delayed 6-month public docket releases.

### 5. Failure Mode to Avoid
Building software dashboard features before securing 5 prepaid annual commitments. Productization without customer-requested schema will waste developer hours on unused visual widgets.

### 6. One Decision Required
Decide whether to enforce the $750 threshold deadline on Day 45: if 3 paid commitments are not locked by October 25, freeze feature build and pivot distribution to direct enterprise advisory briefings or kill the project.`);
    } finally {
      setOracleLoading(false);
    }
  };

  // PULSE Research Agent Methods
  const fetchPulseConfig = async () => {
    try {
      const res = await fetch('/api/pulse/config');
      if (res.ok) {
        const data = await res.json();
        setPulseSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn('Failed to fetch PULSE config from server:', err);
    }
  };

  const updatePulseSettings = async (updates: Partial<PulseSettings>) => {
    setPulseSettings(prev => ({ ...prev, ...updates }));
    try {
      await fetch('/api/pulse/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn('Failed to push PULSE settings to server:', err);
    }
  };

  const runPulseResearch = async (params: any) => {
    setIsPulseRunning(true);
    try {
      const res = await fetch('/api/pulse/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.run) {
        setPulseRuns(prev => [data.run, ...prev]);
        setActivePulseRun(data.run);
        // Award Signal Credits for disciplined research
        setSignalCredits(c => c + 15);
        // Update local settings count
        setPulseSettings(prev => ({
          ...prev,
          dailyRequestsUsed: prev.dailyRequestsUsed + 1,
          monthlyRequestsUsed: prev.monthlyRequestsUsed + 1,
          currentMonthlySpend: Number((prev.currentMonthlySpend + data.run.estimatedCost).toFixed(2)),
        }));
        return { success: true, run: data.run };
      }
      throw new Error('No run record returned from PULSE server.');
    } catch (err: any) {
      return { success: false, error: err.message || 'PULSE research request failed.' };
    } finally {
      setIsPulseRunning(false);
    }
  };

  const approveCandidateEvidence = (
    runId: string, 
    candidateId: string, 
    reviewNotes: string, 
    confidence: EvidenceConfidence
  ) => {
    let candidateToApprove: CandidateEvidenceItem | null = null;

    setPulseRuns(prev => prev.map(run => {
      if (run.runId !== runId || !run.output) return run;

      const updatedCandidates = run.output.candidate_evidence.map(item => {
        if (item.id === candidateId) {
          candidateToApprove = {
            ...item,
            confidence,
            reviewStatus: 'approved',
            reviewNotes,
            approvedAt: new Date().toISOString(),
            approvedBy: 'Founder (Admin)',
          };
          return candidateToApprove;
        }
        return item;
      });

      return {
        ...run,
        output: {
          ...run.output,
          candidate_evidence: updatedCandidates,
        },
        approvedClaimsCount: run.approvedClaimsCount + 1,
        reviewStatus: 'partially_reviewed',
      };
    }));

    // Also update activePulseRun if matching
    setActivePulseRun(prev => {
      if (!prev || prev.runId !== runId || !prev.output) return prev;
      return {
        ...prev,
        output: {
          ...prev.output,
          candidate_evidence: prev.output.candidate_evidence.map(c => 
            c.id === candidateId ? {
              ...c,
              confidence,
              reviewStatus: 'approved',
              reviewNotes,
              approvedAt: new Date().toISOString(),
              approvedBy: 'Founder (Admin)',
            } : c
          ),
        },
        approvedClaimsCount: prev.approvedClaimsCount + 1,
      };
    });

    // Automatically create and insert audited EvidenceRecord into EvidenceLedger!
    if (candidateToApprove) {
      const c = candidateToApprove as CandidateEvidenceItem;
      addEvidence({
        claim: c.claim,
        claimCategory: c.risk_category || 'Grid & Power Infrastructure',
        sourceTitle: `${c.source_publisher}: ${c.source_title}`,
        sourceUrl: c.source_url,
        directEvidenceExcerpt: c.evidence_excerpt,
        sourcePublicationDate: c.publication_date || new Date().toISOString().split('T')[0],
        dateAccessed: new Date().toISOString().split('T')[0],
        sourceTier: c.source_quality,
        confidence,
        geography: c.geography || 'Colorado Front Range',
        associatedEntity: c.entity || 'Regional Infrastructure',
        associatedProject: c.project || 'Front Range Infrastructure Constraint Monitor',
        associatedOpportunity: 'opp-front-range-monitor',
        associatedProduct: 'prod-001',
        riskCategory: c.risk_category || 'Operational Risk',
        commercialImplication: `Verified by PULSE Web Research. Review Note: ${reviewNotes}`,
        dataClassification: 'public',
        approvalStatus: 'approved',
        isUnsupportedInference: c.classification === 'unknown' || c.source_quality === 'unverified',
        reviewedBy: 'Founder (Admin)',
        reviewedAt: new Date().toISOString(),
        notes: `Imported from PULSE Research Run (${runId}). Human Verification Note: ${reviewNotes}`,
      });

      // Award additional Signal Credits for formal human approval
      setSignalCredits(prev => prev + 20);
    }
  };

  const rejectCandidateEvidence = (runId: string, candidateId: string, reason: string) => {
    setPulseRuns(prev => prev.map(run => {
      if (run.runId !== runId || !run.output) return run;

      return {
        ...run,
        output: {
          ...run.output,
          candidate_evidence: run.output.candidate_evidence.map(item => 
            item.id === candidateId ? {
              ...item,
              reviewStatus: 'rejected',
              rejectionReason: reason,
            } : item
          ),
        },
        rejectedClaimsCount: run.rejectedClaimsCount + 1,
      };
    }));

    setActivePulseRun(prev => {
      if (!prev || prev.runId !== runId || !prev.output) return prev;
      return {
        ...prev,
        output: {
          ...prev.output,
          candidate_evidence: prev.output.candidate_evidence.map(c => 
            c.id === candidateId ? {
              ...c,
              reviewStatus: 'rejected',
              rejectionReason: reason,
            } : c
          ),
        },
        rejectedClaimsCount: prev.rejectedClaimsCount + 1,
      };
    });
  };

  const requestDeeperVerification = (runId: string, candidateId: string) => {
    setPulseRuns(prev => prev.map(run => {
      if (run.runId !== runId || !run.output) return run;

      return {
        ...run,
        output: {
          ...run.output,
          candidate_evidence: run.output.candidate_evidence.map(item => 
            item.id === candidateId ? {
              ...item,
              reviewStatus: 'deeper_verification_requested',
            } : item
          ),
        },
      };
    }));

    setActivePulseRun(prev => {
      if (!prev || prev.runId !== runId || !prev.output) return prev;
      return {
        ...prev,
        output: {
          ...prev.output,
          candidate_evidence: prev.output.candidate_evidence.map(c => 
            c.id === candidateId ? {
              ...c,
              reviewStatus: 'deeper_verification_requested',
            } : c
          ),
        },
      };
    });
  };

  const resetToDemonstrationData = () => {
    setSignals(SEED_SIGNALS);
    setEvidence(SEED_EVIDENCE);
    setOpportunity(SEED_OPPORTUNITY);
    setProducts(SEED_PRODUCTS);
    setDistribution(SEED_DISTRIBUTION);
    setTransactions(SEED_TRANSACTIONS);
    setCustomers(SEED_CUSTOMERS);
    setAssets(SEED_ASSETS);
    setAutomations(SEED_AUTOMATIONS);
    setIntelligence(SEED_INTELLIGENCE);
    setMissions(SEED_MISSIONS);
    setBossBattles(SEED_BOSS_BATTLES);
    setMissionChains(SEED_MISSION_CHAINS);
    setConflictChecks(SEED_CONFLICT_CHECKS);
    setPulseRuns(SEED_PULSE_RUNS as any);
    setActivePulseRun(SEED_PULSE_RUNS[0] as any);
    setPulseSettings(SEED_PULSE_SETTINGS);
    setSignalCredits(345);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        activeSection,
        setActiveSection,
        currentUserRole,
        setCurrentUserRole,
        signals,
        evidence,
        opportunity,
        products,
        distribution,
        transactions,
        customers,
        assets,
        automations,
        intelligence,
        missions,
        bossBattles,
        missionChains,
        conflictChecks,
        signalCredits,
        currentLevel,
        compoundingIndex,
        founderOperatingScore,
        oneTimeRevenue,
        monthlyRecurringRevenue,
        annualRecurringRevenue,
        grossMarginPercent,
        monthlyOperatingCost,
        netContribution,
        revenuePerHour,
        totalFounderHours,
        daysSinceLastConversation,
        daysSinceLastPaidAttempt,
        addSignal,
        updateSignal,
        addEvidence,
        updateEvidence,
        updateOpportunity,
        addProduct,
        updateProduct,
        addDistribution,
        updateDistribution,
        addTransaction,
        addCustomer,
        addAsset,
        recordAssetReuse,
        addAutomation,
        toggleAutomationStatus,
        triggerAutomationRun,
        addIntelligence,
        completeMission,
        deferMission,
        addConflictCheck,
        onboarding,
        updateOnboarding,
        showOnboardingModal,
        setShowOnboardingModal,
        oracleOpen,
        setOracleOpen,
        oracleLoading,
        oracleResponse,
        askOracle,
        validateDataClassification,
        resetToDemonstrationData,
        pulseRuns,
        activePulseRun,
        setActivePulseRun,
        pulseSettings,
        isPulseRunning,
        runPulseResearch,
        approveCandidateEvidence,
        rejectCandidateEvidence,
        requestDeeperVerification,
        updatePulseSettings,
        fetchPulseConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
