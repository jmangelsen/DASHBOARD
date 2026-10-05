export type EvidenceLabel = 
  | 'Verified Fact'
  | 'Derived Metric'
  | 'Model Output'
  | 'AI Inference'
  | 'Founder Hypothesis'
  | 'Unknown / Missing Data'
  | 'Conflicting Evidence'
  | 'Risk / Watch Item'
  | 'Required Founder Decision';

export type AdvisorStationState = 
  | 'idle'
  | 'report_due'
  | 'preparing'
  | 'awaiting_founder_review'
  | 'complete'
  | 'blocked_by_missing_data'
  | 'stale';

export type ReportStatus =
  | 'not_started'
  | 'data_collection'
  | 'draft_generated'
  | 'awaiting_founder_review'
  | 'founder_reviewed'
  | 'decision_log_complete'
  | 'archived'
  | 'partial_missing_data'
  | 'failed';

export interface LabeledStatement {
  id: string;
  label: EvidenceLabel;
  statement: string;
  sourceReference?: string;
  confidence?: 'High' | 'Moderate' | 'Low' | 'Insufficient Evidence';
}

export interface OracleWeeklyReviewReport {
  reportId: string;
  week: number;
  reportingPeriod: { start: string; end: string };
  generatedAt: string;
  status: ReportStatus;
  
  // Section 1: Executive Truth Summary (max 5 bullets)
  executiveTruthSummary: LabeledStatement[];

  // Section 2: Forecast Readiness Scorecard
  readinessScorecard: {
    dataFreshness: string;
    sourceVerificationCoverage: string;
    missingDataCount: number;
    injuryReviewStatus: string;
    activeModelVersion: string;
    forecastCompletionStatus: string;
    forecastReviewCompletionStatus: string;
    marketBenchmarkStatus: string;
    unresolvedConflictsCount: number;
    automationHealth: string;
    overallStatus: 'Ready' | 'Conditionally Ready' | 'Not Ready';
    readinessReason: string;
  };

  // Section 3: Data & Source Integrity
  dataIntegrity: {
    verifiedSourcesCount: number;
    pendingSourcesCount: number;
    staleSourcesCount: number;
    missingSourcesCount: number;
    conflictingSourcesCount: number;
    failedJobsCount: number;
    dataLineageGaps: string[];
    sourceQualityMix: {
      primary: number;
      official: number;
      secondary: number;
      commentary: number;
      unverified: number;
    };
    criticalIssues: {
      issue: string;
      impactOnForecast: string;
      requiredVerificationAction: string;
    }[];
  };

  // Section 4: Model Integrity & Change Control
  modelIntegrity: {
    activeModelVersion: string;
    activeAssumptions: string[];
    candidateChanges: {
      id: string;
      name: string;
      preregistered: boolean;
      baselineVsCandidate: string;
      sampleSize: string;
      status: string;
      recommendation: string;
    }[];
    overfittingFlags: string[];
    dataLeakageFlags: string[];
    modelDriftIndicators: string;
  };

  // Section 5: Forecast Quality & Calibration
  forecastQuality: {
    brierScore: number;
    logLoss: number;
    calibrationStatus: string;
    reliabilityBuckets: { bucket: string; predictedProb: number; actualOutcomeFreq: number }[];
    sampleSize: string;
    rollingTrend: string;
    baselineComparison: string;
    marketBenchmarkComparison: string;
    uncertaintyNotes: string;
  };

  // Section 6: Game and Player Intelligence
  gamePlayerIntelligence: {
    gamesRequiringReview: {
      gameId: string;
      matchup: string;
      issue: string;
      directEvidence: string;
      modelInference: string;
      urgency: 'Immediate' | 'Friday Practice' | 'Pre-Kickoff';
    }[];
    playerAvailabilityUncertainty: {
      player: string;
      team: string;
      position: string;
      status: string;
      approvedSourceRecord: string;
      uncertaintyNotes: string;
    }[];
  };

  // Section 7: Parlay Scenario Integrity
  parlayScenarioIntegrity: {
    activeCards: {
      cardId: string;
      name: string;
      modelJointProb: string;
      marketImpliedProb: string;
      correlationAssumptions: string;
      unknownCorrelations: string;
      dataFreshness: string;
    }[];
    permanentDisclaimer: string;
  };

  // Section 8: Post-Week Accountability
  postWeekAccountability: {
    reportingWeek: number;
    forecastedVsActual: string;
    majorMisses: {
      game: string;
      missType: 'Model Error' | 'Data/Input Failure' | 'Ordinary Uncertainty';
      rootCause: string;
      actionRecommended: string;
    }[];
    calibrationImplications: string;
    noiseWarning: string;
  };

  // Section 9: ORACLE Red-Team Review
  redTeamReview: {
    category: string;
    finding: string;
    riskLevel: 'high' | 'medium' | 'low';
    counterfactualNote: string;
    mitigation: string;
  }[];

  // Section 10: ORACLE Required Founder Decisions (max 3)
  requiredDecisions: {
    id: string;
    decisionRequired: string;
    whyItMatters: string;
    supportingInternalEvidence: string;
    options: string[];
    advisorRecommendation: string;
    downsideIfDelayed: string;
    missingInfoStillNeeded: string;
    owner: string;
    deadline: string;
  }[];

  // Section 11: ORACLE Next-Week Mission Plan (max 5)
  nextWeekMissions: {
    mission: string;
    expectedAnalyticalValue: string;
    requiredEvidence: string;
    departmentOwner: string;
    priority: 'P1' | 'P2' | 'P3';
    completionDefinition: string;
    riskIfNotCompleted: string;
  }[];
}

export interface ForgeWeeklyReviewReport {
  reportId: string;
  reportingPeriod: { start: string; end: string };
  generatedAt: string;
  status: ReportStatus;

  // Section 1: Executive Commercial Truth (max 5 bullets)
  executiveCommercialTruth: LabeledStatement[];

  // Section 2: Revenue Truth Table
  revenueTruthTable: {
    actualCollectedRevenue: number;
    invoicedUnpaidRevenue: number;
    oneTimeRevenue: number;
    activeMRR: number;
    arr: number;
    refunds: number;
    churn: number;
    operatingCosts: number;
    dataApiCosts: number;
    softwareCosts: number;
    grossContribution: number;
    revenuePerFounderHour: number;
    pipelineRevenue: number;
    probabilityWeightedPipeline: number;
    forecastedRevenue: number;
    weekOverWeekGrowth: string;
    sourceTransactions: {
      id: string;
      customer: string;
      amount: number;
      date: string;
      status: string;
    }[];
  };

  // Section 3: Venture Portfolio Status
  venturePortfolioStatus: {
    name: string;
    stage: string;
    targetBuyer: string;
    offer: string;
    priceHypothesis: string;
    actualRevenue: number;
    currentMRR: number;
    demandEvidence: string;
    buyerConversations: number;
    validationStatus: string;
    distributionStatus: string;
    currentBottleneck: string;
    nextDecisionDate: string;
    mrrThresholdStatus: string;
    recommendation: 'Scale' | 'Maintain' | 'Validate' | 'Narrow' | 'Pause' | 'Kill';
    rationale: string;
  }[];

  // Section 4: Buyer & Market Evidence
  buyerMarketEvidence: {
    interviewsCompleted: number;
    directBuyerQuotes: {
      quote: string;
      buyerRole: string;
      sourceRecordId: string;
      verifiedDate: string;
    }[];
    recurringPainPatterns: string[];
    willingnessToPaySignals: string[];
    objectionsDocumented: string[];
    unvalidatedAssumptions: string[];
  };

  // Section 5: Offer, Product, and Deployment Status (Build vs Sell Test)
  offerProductDeployment: {
    activeOffers: {
      id: string;
      name: string;
      price: string;
      targetSegment: string;
      paymentLinkReady: boolean;
      status: string;
    }[];
    buildVsSellTests: {
      activeBuildItem: string;
      buyerProofExists: boolean;
      buyerProofDetail: string;
      improvesCoreMetric: string;
      canDeliverManuallyFirst: boolean;
      smallestReversibleTest: string;
      criterionToProveUnnecessary: string;
    }[];
    fulfillmentBurdenNotes: string;
  };

  // Section 6: Distribution and Pipeline
  distributionPipeline: {
    campaigns: {
      id: string;
      name: string;
      channel: string;
      sentOutbound: number;
      replies: number;
      meetingsScheduled: number;
      closedSales: number;
      responseRate: string;
    }[];
    pipelineStageBreakdown: { stage: string; count: number; value: number }[];
    redFlags: string[];
  };

  // Section 7: Asset Compounding
  assetCompounding: {
    newAssetsCreated: string[];
    assetsReusedCount: number;
    mostValuableAsset: string;
    estimatedHoursSaved: number;
    readyForAutomationCandidates: string[];
  };

  // Section 8: Automation and Operating Risk
  automationOperatingRisk: {
    successfulRunsCount: number;
    failedRunsCount: number;
    estimatedMonthlyApiSpend: number;
    dailySpendRate: string;
    workflowsRequiringHumanApproval: number;
    complianceWith3xManualRule: string;
    manualBottlenecks: string[];
  };

  // Section 9: FORGE Red-Team Review
  redTeamReview: {
    category: string;
    finding: string;
    riskLevel: 'high' | 'medium' | 'low';
    flawInLogic: string;
    requiredRemedy: string;
  }[];

  // Section 10: FORGE Required Founder Decisions (max 3)
  requiredDecisions: {
    id: string;
    decisionRequired: string;
    whyItMatters: string;
    supportingInternalEvidence: string;
    options: string[];
    advisorRecommendation: string;
    downsideIfDelayed: string;
    missingInfoStillNeeded: string;
    owner: string;
    deadline: string;
  }[];

  // Section 11: FORGE Next-Week Mission Plan (max 5)
  nextWeekMissions: {
    mission: string;
    linkedVenture: string;
    expectedCommercialImpact: string;
    requiredEvidence: string;
    departmentOwner: string;
    priority: 'P1' | 'P2' | 'P3';
    completionDefinition: string;
    targetMetric: string;
    riskIfNotCompleted: string;
  }[];
}

export interface NexusFounderAllocationMemo {
  memoId: string;
  reportingPeriod: { start: string; end: string };
  generatedAt: string;

  // Section 1: Portfolio Truth
  portfolioTruth: {
    oracleHealthSummary: string;
    forgeHealthSummary: string;
    totalSystemHealth: number;
    criticalCrossSystemRisks: string[];
    unresolvedGovernanceAlerts: number;
    apiCostMonthToDate: string;
    budgetStatus: string;
  };

  // Section 2: Attention Allocation Recommendation
  attentionAllocation: {
    oracle: {
      percentage: number;
      hours: number;
      evidence: string;
      expectedReturnOnAttention: string;
      whatGetsDeprioritized: string;
      riskOfMisallocation: string;
    };
    forge: {
      percentage: number;
      hours: number;
      evidence: string;
      expectedReturnOnAttention: string;
      whatGetsDeprioritized: string;
      riskOfMisallocation: string;
    };
    sharedAdminGovernance: {
      percentage: number;
      hours: number;
      evidence: string;
      expectedReturnOnAttention: string;
      whatGetsDeprioritized: string;
      riskOfMisallocation: string;
    };
  };

  // Section 3: Highest-Leverage Action (Exactly One Action)
  highestLeverageAction: {
    actionTitle: string;
    division: 'ORACLE' | 'FORGE' | 'SHARED';
    department: string;
    whyHighestLeverage: string;
    expectedOutcome: string;
    supportingEvidence: string;
    completionDefinition: string;
    deadline: string;
    whatNotToDoUntilComplete: string;
  };

  // Section 4: Stop / Pause / Kill Recommendation
  stopPauseKill: {
    oneThingToStop: { item: string; reason: string; hoursReclaimed: string };
    oneThingToPause: { item: string; conditionToResume: string; rationale: string };
    oneThingToKill: {
      item: string;
      evidenceThreshold: string;
      evaluationDeadline: string;
      currentGap: string;
      killRuleReference: string;
    };
  };

  // Section 5: Founder Decision Log Table
  decisionLog: {
    id: string;
    decision: string;
    division: 'ORACLE' | 'FORGE' | 'SHARED';
    options: string[];
    advisorRecommendation: string;
    founderDecision?: 'accept' | 'reject' | 'modify' | 'defer';
    founderRationale?: string;
    deadline: string;
    status: 'pending' | 'decided' | 'deferred';
    evidenceLinks: string[];
    followUpDate?: string;
  }[];

  // Section 6: Weekly Scorecard
  weeklyScorecard: {
    oracleForecastIntegrityIndex: number;
    forgeCompoundingIndex: number;
    governanceHealth: string;
    automationHealth: string;
    evidenceQualityScore: string;
    actualRevenueHealth: string;
    operatingCostHealth: string;
    personalWorkloadHealth: string;
  };
}

export interface WeeklyExecutiveReviewPackage {
  id: string;
  weekNumber: number;
  reportingPeriod: { start: string; end: string };
  generatedAt: string;
  status: ReportStatus;
  isPartialMissingData: boolean;
  missingDataWarnings: string[];
  dataCompletenessScore: number; // 0 - 100
  oracleReport: OracleWeeklyReviewReport;
  forgeReport: ForgeWeeklyReviewReport;
  founderMemo: NexusFounderAllocationMemo;
  founderNotes?: string;
  founderReviewedAt?: string;
  founderReviewConfirmed: boolean;
  understoodMissingDataAcknowledged: boolean;
}

export interface AdvisorScheduleConfig {
  cutoffDay: string; // e.g. "Sunday"
  cutoffTime: string; // e.g. "18:00"
  generationWindow: string; // e.g. "Sunday 18:00 – Monday 07:00"
  dueDay: string; // e.g. "Monday"
  dueTime: string; // e.g. "08:00"
  reviewTargetDay: string; // e.g. "Monday"
  reviewTargetTime: string; // e.g. "12:00"
  autoGenerateDraft: boolean;
}
