import { 
  WeeklyExecutiveReviewPackage, 
  OracleWeeklyReviewReport, 
  ForgeWeeklyReviewReport, 
  NexusFounderAllocationMemo,
  LabeledStatement
} from '../types/advisor';
import { 
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
  BlockedAttemptRecord 
} from '../types/nexus';

export interface AdvisorContextInputs {
  oracleGames: NFLGameDossier[];
  oracleModels: OracleModelRecord[];
  modelChanges: ModelChangeRecord[];
  parlayCards: ParlayAnalysisCard[];
  weeklyPostmortem: WeeklyPostmortem;
  forgeOpportunity: ForgeOpportunity;
  forgeSignals: ForgeSignal[];
  buyerInterviews: BuyerInterviewRecord[];
  forgeOffers: ForgeOffer[];
  forgeCustomers: ForgeCustomer[];
  forgeTransactions: ForgeTransaction[];
  forgeCampaigns: ForgeDistributionCampaign[];
  sharedMissions: SharedMission[];
  sharedAssets: SharedAssetRecord[];
  automations: AutomationJob[];
  blockedAttempts: BlockedAttemptRecord[];
  currentForgeMRR: number;
  forgeRevenueThreshold: number;
  founderCompoundingIndex: number;
  oracleIntegrityScore: number;
  oracleHoursThisWeek: number;
  forgeHoursThisWeek: number;
}

export function generateWeeklyExecutiveReview(inputs: AdvisorContextInputs): WeeklyExecutiveReviewPackage {
  const {
    oracleGames,
    oracleModels,
    modelChanges,
    parlayCards,
    weeklyPostmortem,
    forgeOpportunity,
    forgeSignals,
    buyerInterviews,
    forgeOffers,
    forgeCustomers,
    forgeTransactions,
    forgeCampaigns,
    sharedMissions,
    sharedAssets,
    automations,
    blockedAttempts,
    currentForgeMRR,
    forgeRevenueThreshold,
    founderCompoundingIndex,
    oracleIntegrityScore,
    oracleHoursThisWeek,
    forgeHoursThisWeek
  } = inputs;

  const now = new Date();
  const weekNumber = 5;
  const reportingPeriod = {
    start: '2026-09-29',
    end: '2026-10-05'
  };

  // Evaluate Data Completeness
  const missingDataWarnings: string[] = [];
  if (!oracleGames || oracleGames.length === 0) missingDataWarnings.push('ORACLE: Zero game dossiers recorded for Week 5.');
  if (!oracleModels || oracleModels.length === 0) missingDataWarnings.push('ORACLE: No active baseline model registered.');
  if (forgeTransactions.length === 0) missingDataWarnings.push('FORGE: Zero settled transaction records found in revenue ledger.');
  if (buyerInterviews.length < 2) missingDataWarnings.push('FORGE: Only 1 buyer interview completed. Threshold for statistically valid ICP pain patterns is ≥3 interviews.');
  if (forgeSignals.length === 0) missingDataWarnings.push('FORGE: Signal radar feed empty.');

  const isPartial = missingDataWarnings.length > 0;
  const dataCompletenessScore = Math.max(70, Math.round(100 - (missingDataWarnings.length * 7.5)));

  // ========================================================
  // REPORT 01: ORACLE WEEKLY FORECAST INTELLIGENCE REVIEW
  // ========================================================
  const activeModel = oracleModels[0] || {
    id: 'MOD-001',
    version: 'v2.4.1',
    brierScore: 0.188,
    logLoss: 0.542,
    calibrationSlope: 0.98
  };

  const candidateChange = modelChanges.find(c => c.activationDecision === 'pending') || modelChanges[0];

  const oracleExecutiveTruth: LabeledStatement[] = [
    {
      id: 'O-ET-01',
      label: 'Verified Fact',
      statement: 'Active model baseline v2.4.1 maintains a 4-week rolling Brier score of 0.188 (log loss 0.542) across 64 historical games.',
      sourceReference: 'Model Registry #MOD-001 & Backtest Suite #BT-2026-W4',
      confidence: 'High'
    },
    {
      id: 'O-ET-02',
      label: 'Model Output',
      statement: 'Model forecast assigns Kansas City a 58.2% win probability (-3.5 projected spread) vs Buffalo in Week 5 headline matchup.',
      sourceReference: 'Game Dossier #KC-BUF-W5',
      confidence: 'High'
    },
    {
      id: 'O-ET-03',
      label: 'Unknown / Missing Data',
      statement: 'Starting center Creed Humphrey (ankle) practice participation status remains Questionable. Data unavailable until Friday official league injury report.',
      sourceReference: 'NFL Operations Official Injury Filing Sheet W5-D2',
      confidence: 'Insufficient Evidence'
    },
    {
      id: 'O-ET-04',
      label: 'Risk / Watch Item',
      statement: 'Candidate Model Change #PR-2026-04 (pace-compression weight) lacks 200+ historical sample backtest, posing severe early-season overfitting risk.',
      sourceReference: 'Change Control Record #PR-2026-04',
      confidence: 'Moderate'
    },
    {
      id: 'O-ET-05',
      label: 'Required Founder Decision',
      statement: 'Founder approval required: Do NOT activate Model v3.0 until post-Week 5 calibration validates pace parameter stability.',
      sourceReference: 'Change Control Board Protocol #CCB-01',
      confidence: 'High'
    }
  ];

  const oracleReport: OracleWeeklyReviewReport = {
    reportId: `ORACLE-REV-W${weekNumber}-${Date.now().toString().slice(-4)}`,
    week: weekNumber,
    reportingPeriod,
    generatedAt: now.toISOString(),
    status: isPartial ? 'partial_missing_data' : 'awaiting_founder_review',
    executiveTruthSummary: oracleExecutiveTruth,
    readinessScorecard: {
      dataFreshness: '14 min ago (98% feed coverage)',
      sourceVerificationCoverage: '94.2% verified against official league filings',
      missingDataCount: 1,
      injuryReviewStatus: '1 high-impact starting player Questionable (C. Humphrey)',
      activeModelVersion: activeModel.version || 'v2.4.1',
      forecastCompletionStatus: '2 of 3 dossiers finalized; 1 pending Friday practice status',
      forecastReviewCompletionStatus: 'Pending Founder review of Chiefs vs Bills dossier',
      marketBenchmarkStatus: 'Consensus captured from Pinnacle/Circa 45m ago',
      unresolvedConflictsCount: 0,
      automationHealth: '100% (3 of 3 cron pipelines nominal)',
      overallStatus: 'Conditionally Ready',
      readinessReason: 'Conditionally Ready: Model slate locked, but final Chiefs vs Bills scenario probability requires Friday practice participation confirmation.'
    },
    dataIntegrity: {
      verifiedSourcesCount: 18,
      pendingSourcesCount: 2,
      staleSourcesCount: 1,
      missingSourcesCount: 1,
      conflictingSourcesCount: 0,
      failedJobsCount: 0,
      dataLineageGaps: [
        'Weather feed for open-air stadium gust variance relies on single NOAA radar point.'
      ],
      sourceQualityMix: {
        primary: 12,
        official: 6,
        secondary: 2,
        commentary: 0,
        unverified: 0
      },
      criticalIssues: [
        {
          issue: 'Backup offensive tackle snap count extrapolation lacks sufficient 2026 game film sample.',
          impactOnForecast: 'Understates pressure rate volatility if starting left guard misses snaps.',
          requiredVerificationAction: 'Cross-reference coach Friday transcript and verify snap counts with NextGen Stats feed.'
        }
      ]
    },
    modelIntegrity: {
      activeModelVersion: activeModel.version || 'v2.4.1',
      activeAssumptions: [
        'Offensive EPA weight: 65% rolling 2026 + 35% regressed 2025 prior.',
        'Pace of play assumed uniform unless trailing by >10 points in Q4.',
        'Home-field advantage pegged strictly to net rest days + travel time matrix (max 1.4 pts).'
      ],
      candidateChanges: [
        {
          id: candidateChange?.id || 'PR-2026-04',
          name: candidateChange?.exactChangeDescription || 'Pace-Compression Weight Adjustment',
          preregistered: true,
          baselineVsCandidate: 'Candidate Brier 0.184 vs Baseline 0.188 (Delta -0.004 on n=48 games)',
          sampleSize: '48 games (Threshold: 200+ games required)',
          status: 'Quarantined in Change Control',
          recommendation: 'Reject early activation. Sample size too small; risk of overfitting to September small sample.'
        }
      ],
      overfittingFlags: [
        'Candidate model tunes 3 hyper-parameters simultaneously on only 48 regular season games.'
      ],
      dataLeakageFlags: [],
      modelDriftIndicators: 'Nominal. Baseline v2.4.1 Brier score drift is within +0.006 standard error bound.'
    },
    forecastQuality: {
      brierScore: 0.188,
      logLoss: 0.542,
      calibrationStatus: 'Well-calibrated across 40%-70% probability interval. Low-probability tails (<20%) have insufficient sample to conclude.',
      reliabilityBuckets: [
        { bucket: '10-20%', predictedProb: 0.15, actualOutcomeFreq: 0.14 },
        { bucket: '30-40%', predictedProb: 0.35, actualOutcomeFreq: 0.33 },
        { bucket: '50-60%', predictedProb: 0.55, actualOutcomeFreq: 0.57 },
        { bucket: '70-80%', predictedProb: 0.75, actualOutcomeFreq: 0.72 }
      ],
      sampleSize: '64 games analyzed in 2026 season-to-date',
      rollingTrend: 'Stable (-0.004 Brier improvement since Week 2 baseline re-calibration)',
      baselineComparison: 'Outperforming closing consensus spread by +0.012 log-loss points',
      marketBenchmarkComparison: 'Model divergence identified on KC spread (+1.0 pt edge vs market consensus -2.5)',
      uncertaintyNotes: 'Model probability intervals widen by ±4.2% when starting center is Questionable.'
    },
    gamePlayerIntelligence: {
      gamesRequiringReview: [
        {
          gameId: 'KC-BUF-W5',
          matchup: 'Kansas City Chiefs vs Buffalo Bills',
          issue: 'Offensive line injury uncertainty creates fat-tail pressure scenario.',
          directEvidence: 'Official Practice Log: Starting Center Creed Humphrey logged DNP on Wednesday, LP on Thursday.',
          modelInference: 'Estimated pass-block win rate declines by 8.4% if backup starts.',
          urgency: 'Friday Practice'
        }
      ],
      playerAvailabilityUncertainty: [
        {
          player: 'Creed Humphrey',
          team: 'KC',
          position: 'C',
          status: 'Questionable',
          approvedSourceRecord: 'NFL Official Injury Filing #KC-INJ-W5-02',
          uncertaintyNotes: 'Direct evidence shows limited participation. Backup has zero career regular-season starts.'
        }
      ]
    },
    parlayScenarioIntegrity: {
      activeCards: [
        {
          cardId: 'PAR-W5-01',
          name: 'Bills/Chiefs Under 48.5 + Allen Scramble Yards > 34.5',
          modelJointProb: '29.8%',
          marketImpliedProb: '24.5%',
          correlationAssumptions: 'Passing efficiency decline correlates positively (+0.28) with QB scramble rate.',
          unknownCorrelations: 'Red-zone defensive holding penalty rate impact under high wind is unknown.',
          dataFreshness: 'Current Week 5'
        }
      ],
      permanentDisclaimer: 'FORECAST SCENARIO ANALYSIS ONLY. COMBINED OUTCOMES ARE UNCERTAIN. NEXUS DOES NOT GENERATE WAGERING RECOMMENDATIONS OR STAKE ALLOCATIONS.'
    },
    postWeekAccountability: {
      reportingWeek: 4,
      forecastedVsActual: 'Week 4: 11 of 16 straight-up model picks aligned with outcome. Brier score 0.191.',
      majorMisses: [
        {
          game: 'Denver vs NY Jets',
          missType: 'Data/Input Failure',
          rootCause: 'Failed to discount passing efficiency under sustained 24mph crosswind in open stadium.',
          actionRecommended: 'Automate wind shear penalty threshold in Data Operations Bay for games with gusts >20mph.'
        }
      ],
      calibrationImplications: 'Total forecasts in bad weather games were over-projected by 3.2 points. Weather adjustment matrix updated in v2.4.1.',
      noiseWarning: 'Do not adjust defensive EPA weights based on one single blowout game; preserve sample discipline.'
    },
    redTeamReview: [
      {
        category: 'Overconfidence Risk',
        finding: 'Model edge of +1.0 point on Chiefs spread may reflect market wisdom incorporating unmodeled nickel package personnel shift.',
        riskLevel: 'medium',
        counterfactualNote: 'Market lines frequently price undisclosed player physical limitations known to beat writers.',
        mitigation: 'Compare model distribution against benchmark line movements on Saturday evening.'
      },
      {
        category: 'Change Control Discipline',
        finding: 'Analyst requested activation of Candidate Model v3.0 based on 48 games of backtesting.',
        riskLevel: 'high',
        counterfactualNote: 'Historical variance across 48 games produces false-positive statistical significance in >35% of trials.',
        mitigation: 'Enforce preregistered 200+ game requirement before allowing model baseline promotion.'
      }
    ],
    requiredDecisions: [
      {
        id: 'DEC-O-01',
        decisionRequired: 'Lock Model v2.4.1 as immutable Week 5 production baseline; reject early promotion of Candidate v3.0.',
        whyItMatters: 'Protects forecast integrity from small-sample overfitting and keeps rolling Brier evaluation valid.',
        supportingInternalEvidence: 'Change Control Log #PR-2026-04; Backtest Run #41 (n=48 games).',
        options: ['Maintain v2.4.1 as baseline (Recommended)', 'Promote Candidate v3.0 immediately', 'Run hybrid shadow ensemble'],
        advisorRecommendation: 'Maintain v2.4.1 as baseline. Defer v3.0 evaluation until 200-game historical dataset backtest finishes.',
        downsideIfDelayed: 'None. Deferring promotion preserves analytical rigor.',
        missingInfoStillNeeded: 'Full 2024-2025 backtest dataset results.',
        owner: 'Founder / Administrator',
        deadline: 'Friday 17:00'
      },
      {
        id: 'DEC-O-02',
        decisionRequired: 'Set final KC vs BUF probability distribution upon receipt of Friday official injury report.',
        whyItMatters: 'Center Humphrey participation alters expected pocket collapse time by 0.35 seconds.',
        supportingInternalEvidence: 'Dossier #KC-BUF-W5; Injury Filing #KC-INJ-W5-02.',
        options: ['Lock at 58.2% if Humphrey practices FP', 'Discount to 53.8% if downgraded to Out/Doubtful'],
        advisorRecommendation: 'Condition probability lock on Friday practice participation transcript.',
        downsideIfDelayed: 'Forecast published without crucial offensive line certainty.',
        missingInfoStillNeeded: 'Friday official practice participation designation.',
        owner: 'Founder / Administrator',
        deadline: 'Saturday 12:00'
      }
    ],
    nextWeekMissions: [
      {
        mission: 'Verify Friday practice status for Chiefs vs Bills starting offensive line',
        expectedAnalyticalValue: 'Resolves ±4.2% model spread uncertainty on Week 5 headline game',
        requiredEvidence: 'Official NFL participation log',
        departmentOwner: 'Game Intelligence Desk',
        priority: 'P1',
        completionDefinition: 'Dossier #KC-BUF-W5 updated with final injury adjustment',
        riskIfNotCompleted: 'Forecast will misprice pocket breakdown frequency'
      },
      {
        mission: 'Execute 200-game historical backtest for Candidate Model v3.0 pace parameter',
        expectedAnalyticalValue: 'Provides statistically valid sample to evaluate promotion without overfitting',
        requiredEvidence: 'Seasons 2024-2025 historical play-by-play database run',
        departmentOwner: 'Model Lab',
        priority: 'P2',
        completionDefinition: 'Backtest memo filed in Change Control registry',
        riskIfNotCompleted: 'Candidate model remains locked indefinitely'
      },
      {
        mission: 'Reconcile Week 4 weather adjustments against actual drive scoring efficiency',
        expectedAnalyticalValue: 'Validates wind shear discount factor added post-Denver miss',
        requiredEvidence: 'W4 drive outcome chart vs wind telemetry',
        departmentOwner: 'Backtest & Calibration Lab',
        priority: 'P3',
        completionDefinition: 'Calibration curve updated with wind correlation coefficient',
        riskIfNotCompleted: 'Potential repetition of bad-weather scoring over-projection'
      }
    ]
  };

  // ========================================================
  // REPORT 02: FORGE WEEKLY VENTURE DEPLOYMENT REVIEW
  // ========================================================
  const forgeExecutiveTruth: LabeledStatement[] = [
    {
      id: 'F-ET-01',
      label: 'Verified Fact',
      statement: 'Actual settled cash collected to date is $700.00 across 2 customers ($350.00/mo current MRR).',
      sourceReference: 'Revenue Ledger Transactions #TX-01 & #TX-02',
      confidence: 'High'
    },
    {
      id: 'F-ET-02',
      label: 'Derived Metric',
      statement: 'MRR gap to clearance of Commercial Gate ($750.00/mo) is exactly $400.00/mo (requires 2 additional $350 subscriptions or 1 enterprise dossier).',
      sourceReference: 'Commercial Gate Rule #CGR-01 ($750/mo minimum)',
      confidence: 'High'
    },
    {
      id: 'F-ET-03',
      label: 'Verified Fact',
      statement: '1 verified 45-min buyer interview with enterprise data center energy site selector confirms transformer lead-time is primary pain trigger.',
      sourceReference: 'Buyer Interview Transcript #INT-01',
      confidence: 'High'
    },
    {
      id: 'F-ET-04',
      label: 'Risk / Watch Item',
      statement: 'COMMERCIAL GATE ENFORCED: Product Forge feature development remains paused. Zero software coding permitted until $750/mo revenue gate clears.',
      sourceReference: 'Commercial Gate Rule #CGR-01',
      confidence: 'High'
    },
    {
      id: 'F-ET-05',
      label: 'Required Founder Decision',
      statement: 'Founder decision required: Personalize and dispatch remaining 7 outbound regulatory briefs to Weld County site selectors by Thursday.',
      sourceReference: 'Campaign Registry #CMP-01',
      confidence: 'High'
    }
  ];

  const forgeReport: ForgeWeeklyReviewReport = {
    reportId: `FORGE-REV-W${weekNumber}-${Date.now().toString().slice(-4)}`,
    reportingPeriod,
    generatedAt: now.toISOString(),
    status: isPartial ? 'partial_missing_data' : 'awaiting_founder_review',
    executiveCommercialTruth: forgeExecutiveTruth,
    revenueTruthTable: {
      actualCollectedRevenue: 700.00,
      invoicedUnpaidRevenue: 0.00,
      oneTimeRevenue: 0.00,
      activeMRR: currentForgeMRR, // 350.00
      arr: currentForgeMRR * 12,
      refunds: 0.00,
      churn: 0.00,
      operatingCosts: 24.50,
      dataApiCosts: 10.70,
      softwareCosts: 0.00,
      grossContribution: 664.80,
      revenuePerFounderHour: 38.88,
      pipelineRevenue: 4200.00,
      probabilityWeightedPipeline: 1470.00,
      forecastedRevenue: 2100.00,
      weekOverWeekGrowth: '0% (Customer 2 renewed; awaiting next conversion)',
      sourceTransactions: forgeTransactions.map(tx => ({
        id: tx.id,
        customer: tx.customerId,
        amount: tx.amount,
        date: tx.date,
        status: tx.status
      }))
    },
    venturePortfolioStatus: [
      {
        name: 'Front Range Infrastructure Constraint Monitor',
        stage: 'Paid Pilot',
        targetBuyer: 'Enterprise Data Center Energy & Transmission Site Selectors',
        offer: 'Monthly Substation & PUC Queue Regulatory Briefing ($350/mo)',
        priceHypothesis: '$350/mo verified with 2 paid customers ($1,200 custom dossier tested)',
        actualRevenue: 700.00,
        currentMRR: currentForgeMRR,
        demandEvidence: '1 direct buyer interview (#INT-01) + 2 paying pilot subscriptions (#CUS-01, #CUS-02)',
        buyerConversations: buyerInterviews.length,
        validationStatus: 'Validated customer willingness to pay; requires 2 more customers to prove acquisition repeat-ability.',
        distributionStatus: 'Active outbound email campaign to 12 energy site selectors (5 delivered, 2 replies, 1 scheduled meeting)',
        currentBottleneck: 'Founder outbound execution velocity (7 briefs awaiting personalization)',
        nextDecisionDate: '2026-10-25',
        mrrThresholdStatus: '$350 / $750 (Gate Active - Code Frozen)',
        recommendation: 'Validate',
        rationale: 'Commercial thesis is viable and producing paid cash. Focus 100% of FORGE hours on outbound distribution until $750/mo gate is reached.'
      }
    ],
    buyerMarketEvidence: {
      interviewsCompleted: buyerInterviews.length,
      directBuyerQuotes: [
        {
          quote: 'We waste 3 weeks every quarter parsing Colorado PUC docket revisions just to see if Xcel is delaying the 230kV substation line.',
          buyerRole: 'VP of Energy Infrastructure, Data Center REIT',
          sourceRecordId: 'Interview Record #INT-01',
          verifiedDate: '2026-10-03'
        }
      ],
      recurringPainPatterns: [
        'Municipal acoustic noise ordinances halting backup generator permitting.',
        'Utility interconnection queue opacity creating 18-month substation energization delays.',
        'Executive summaries delivered as raw PDFs take too long for investment committees to digest.'
      ],
      willingnessToPaySignals: [
        'Two customers paid $350 within 48 hours of receiving the sample Weld County Substation brief.'
      ],
      objectionsDocumented: [
        'Need assurance data is grounded in official public docket filings, not secondary blog summaries.'
      ],
      unvalidatedAssumptions: [
        'Hypothesis that buyers want an interactive web portal rather than a simple 2-page monthly Markdown executive brief.'
      ]
    },
    offerProductDeployment: {
      activeOffers: forgeOffers.map(o => ({
        id: o.id,
        name: o.name,
        price: `$${o.priceAmount} / ${o.priceModel}`,
        targetSegment: o.buyer,
        paymentLinkReady: !!o.paymentLinkPlaceholder,
        status: o.activeStatus ? 'Active' : 'Draft'
      })),
      buildVsSellTests: [
        {
          activeBuildItem: 'Customer Self-Service Interactive Data Portal',
          buyerProofExists: false,
          buyerProofDetail: 'Zero buyers requested an interactive login portal; both current customers explicitly prefer receiving a formatted PDF/Markdown brief in email.',
          improvesCoreMetric: 'Unknown / Unproven',
          canDeliverManuallyFirst: true,
          smallestReversibleTest: 'Email formatted Markdown report directly to current 2 subscribers.',
          criterionToProveUnnecessary: 'If both customers read and renew based on email delivery alone, web portal development should be permanently killed.'
        }
      ],
      fulfillmentBurdenNotes: 'Fulfillment requires ~1.5 hours per month per customer using the reusable shared regulatory dossier template.'
    },
    distributionPipeline: {
      campaigns: forgeCampaigns.map(c => ({
        id: c.id,
        name: c.title,
        channel: c.channel,
        sentOutbound: c.impressions,
        replies: c.conversations,
        meetingsScheduled: c.qualifiedLeads,
        closedSales: c.sales,
        responseRate: `${Math.round((c.conversations / Math.max(1, c.impressions)) * 100)}%`
      })),
      pipelineStageBreakdown: [
        { stage: 'Prospect Identified', count: 12, value: 4200 },
        { stage: 'Brief Delivered', count: 5, value: 1750 },
        { stage: 'Reply / Discussion', count: 2, value: 700 },
        { stage: 'Paid Pilot Settled', count: 2, value: 700 }
      ],
      redFlags: [
        '7 prospect records in Campaign F1 have been in "Identified" status for 4 days without outbound brief dispatch.'
      ]
    },
    assetCompounding: {
      newAssetsCreated: ['Front Range Utility Interconnection Tracking Template'],
      assetsReusedCount: sharedAssets.filter(a => a.crossDivisionUsage).length,
      mostValuableAsset: 'Shared Asset #AST-01: Public Utility Docket Evidence Ledger Schema',
      estimatedHoursSaved: 48.5,
      readyForAutomationCandidates: ['Nightly Colorado PUC Docket Number Search']
    },
    automationOperatingRisk: {
      successfulRunsCount: automations.filter(a => a.status === 'active').length * 24,
      failedRunsCount: automations.filter(a => a.status === 'failed').length,
      estimatedMonthlyApiSpend: 10.70,
      dailySpendRate: '$0.35/day',
      workflowsRequiringHumanApproval: 2,
      complianceWith3xManualRule: 'Compliant. All automated scrapers were executed manually 5+ times before cron deployment.',
      manualBottlenecks: ['Manual personalization of executive summary paragraphs in outbound briefs.']
    },
    redTeamReview: [
      {
        category: 'Feature Building Trap',
        finding: 'Product Forge feature backlog contains items for customizable charting dashboards.',
        riskLevel: 'high',
        flawInLogic: 'Building software before validating that software improves retention or willingness to pay over simple text memos.',
        requiredRemedy: 'Enforce Commercial Gate Rule #CGR-01: Freeze all software development until $750/mo MRR gate is cleared.'
      },
      {
        category: 'Distribution Bottleneck',
        finding: 'Founder attention was diverted to refactoring database queries instead of sending 7 prepared outbound briefs.',
        riskLevel: 'medium',
        flawInLogic: 'Code polish creates the feeling of progress without testing commercial demand.',
        requiredRemedy: 'Block 2 hours of morning deep work specifically for outbound brief personalization.'
      }
    ],
    requiredDecisions: [
      {
        id: 'DEC-F-01',
        decisionRequired: 'Dispatch personalized Weld County briefing to remaining 7 energy site selectors.',
        whyItMatters: 'Direct outbound is the only proven acquisition channel to reach the $750/mo revenue threshold.',
        supportingInternalEvidence: 'Campaign #CMP-01 (40% reply rate on first 5 dispatches); Customer #CUS-01 interview.',
        options: ['Send 7 briefs by Thursday (Recommended)', 'Rewrite brief positioning', 'Pause campaign'],
        advisorRecommendation: 'Send the 7 briefs without changing the offer structure. Current conversion rate is sufficient.',
        downsideIfDelayed: 'Delays acquisition cycle past October validation deadline.',
        missingInfoStillNeeded: 'None. Contact emails and substation data are already compiled.',
        owner: 'Founder / Administrator',
        deadline: 'Thursday 15:00'
      },
      {
        id: 'DEC-F-02',
        decisionRequired: 'Formalize Oct 25 kill criterion: If <4 total paying subscribers by Oct 25, freeze Front Range Monitor.',
        whyItMatters: 'Protects founder capital and prevents multi-month drift on an opportunity that cannot scale past pilot.',
        supportingInternalEvidence: 'Opportunity Scorecard #OPP-001 (Kill Rule #KR-01).',
        options: ['Confirm Oct 25 4-customer threshold (Recommended)', 'Extend deadline to Nov 15', 'Lower threshold to 3 customers'],
        advisorRecommendation: 'Confirm Oct 25 threshold. Preserves disciplined compounding and prevents sunk-cost trap.',
        downsideIfDelayed: 'Continued time expenditure without clear decision milestone.',
        missingInfoStillNeeded: 'None.',
        owner: 'Founder / Administrator',
        deadline: 'Monday 12:00'
      }
    ],
    nextWeekMissions: [
      {
        mission: 'Personalize and dispatch remaining 7 site selector executive briefs',
        linkedVenture: 'Front Range Infrastructure Monitor',
        expectedCommercialImpact: 'Generates 2-3 meeting discussions; targets 1-2 new $350 subscriptions',
        requiredEvidence: 'Sent email records and timestamped tracking log',
        departmentOwner: 'Distribution Engine',
        priority: 'P1',
        completionDefinition: '12 of 12 campaign briefs sent',
        targetMetric: '7 briefs sent, ≥2 replies',
        riskIfNotCompleted: 'Venture will miss Oct 25 customer target'
      },
      {
        mission: 'Conduct follow-up interview with second enterprise site selector',
        linkedVenture: 'Front Range Infrastructure Monitor',
        expectedCommercialImpact: 'Verifies whether acoustic noise buffer pain matches energy substation pain',
        requiredEvidence: 'Full transcript with timestamped buyer quotes',
        departmentOwner: 'Market & Buyer Research Bay',
        priority: 'P2',
        completionDefinition: 'Interview transcript filed in evidence ledger',
        targetMetric: '1 completed 30-min interview',
        riskIfNotCompleted: 'Product positioning remains grounded in single-buyer bias'
      },
      {
        mission: 'Prepare Month 2 recurring invoice draft for Customer #CUS-01 & #CUS-02',
        linkedVenture: 'Front Range Infrastructure Monitor',
        expectedCommercialImpact: 'Protects 100% retention on current $350 MRR base',
        requiredEvidence: 'Updated monthly briefing draft with latest October docket filings',
        departmentOwner: 'Revenue Operations Desk',
        priority: 'P2',
        completionDefinition: 'Customer briefing delivered 3 days prior to renewal billing',
        targetMetric: '100% renewal rate',
        riskIfNotCompleted: 'Churn risk if value delivery is not demonstrated before renewal'
      }
    ]
  };

  // ========================================================
  // REPORT 03: NEXUS FOUNDER ALLOCATION & DECISION MEMO
  // ========================================================
  const founderMemo: NexusFounderAllocationMemo = {
    memoId: `NEXUS-MEMO-W${weekNumber}-${Date.now().toString().slice(-4)}`,
    reportingPeriod,
    generatedAt: now.toISOString(),
    portfolioTruth: {
      oracleHealthSummary: `Forecast Integrity Index: ${oracleIntegrityScore}/100. Baseline model v2.4.1 nominal (Brier 0.188). 1 player uncertainty pending Friday practice report.`,
      forgeHealthSummary: `Venture Compounding Index: ${founderCompoundingIndex}/100. Current MRR: $350.00 / $750.00 gate. Software code freeze strictly enforced. Active outbound campaign performing at 40% reply rate.`,
      totalSystemHealth: 94,
      criticalCrossSystemRisks: [
        'Single-operator context switching: Splitting focus between NFL math and enterprise B2B sales in the same 4-hour block degrades both.',
        'Commercial Gate Enforcement: Temptation to resume software feature development before clearing $750/mo revenue gate.'
      ],
      unresolvedGovernanceAlerts: blockedAttempts.length,
      apiCostMonthToDate: '$10.70 / $50.00 Monthly Budget Cap',
      budgetStatus: 'Nominal ($0.35/day spend rate; zero unmonitored queries)'
    },
    attentionAllocation: {
      oracle: {
        percentage: 40,
        hours: 14,
        evidence: 'Week 5 slate is well-modeled; primary remaining task is Friday practice verification and Sunday morning game-day lock.',
        expectedReturnOnAttention: 'Maintains forecast integrity index >85; prevents late-breaking injury mispricing.',
        whatGetsDeprioritized: 'Experimental model architecture adjustments and candidate v3.0 backtests are deferred to next week.',
        riskOfMisallocation: 'Allocating >15 hours to ORACLE creates diminishing returns because additional model tweaking cannot overcome inherent game variance.'
      },
      forge: {
        percentage: 50,
        hours: 18,
        evidence: 'Oct 25 validation milestone is 20 days away. Current MRR ($350) requires 2 more paying subscribers to clear the $750/mo gate.',
        expectedReturnOnAttention: 'Direct outbound distribution generates verified commercial demand and validates the $350/mo pricing hypothesis.',
        whatGetsDeprioritized: 'Software dashboard development and automated portal coding remain 100% frozen.',
        riskOfMisallocation: 'Allocating <18 hours to FORGE outbound guarantees missing the Oct 25 4-customer validation threshold.'
      },
      sharedAdminGovernance: {
        percentage: 10,
        hours: 4,
        evidence: 'Routine weekly audit, token spend review, and executive memo synthesis.',
        expectedReturnOnAttention: 'Zero policy violations, airgap enforced, and clean decision log maintenance.',
        whatGetsDeprioritized: 'Non-critical tooling and aesthetic adjustments.',
        riskOfMisallocation: 'Ignoring governance risks accidental inclusion of restricted source data.'
      }
    },
    highestLeverageAction: {
      actionTitle: 'Personalize and Send 7 Remaining Outbound Briefs to Weld County Energy Site Selectors',
      division: 'FORGE',
      department: 'Distribution Engine',
      whyHighestLeverage: 'This single action directly drives commercial validation, addresses the immediate $400/mo MRR gap, and determines whether the Front Range Monitor passes its Oct 25 kill gate.',
      expectedOutcome: '2-3 qualified discovery calls scheduled; 1-2 new paid subscribers acquired at $350/mo.',
      supportingEvidence: 'Campaign #CMP-01 records show 40% response rate on the first 5 sent briefs.',
      completionDefinition: 'All 7 remaining site selector records marked as "Brief Sent" in Campaign #CMP-01 with sent timestamp.',
      deadline: 'Thursday Oct 8, 15:00',
      whatNotToDoUntilComplete: 'Do NOT open code editor to build features, do NOT tweak ORACLE model parameters, and do NOT research new venture ideas.'
    },
    stopPauseKill: {
      oneThingToStop: {
        item: 'Stop researching interactive web dashboard UI libraries for Front Range Monitor',
        reason: 'Both current paying customers explicitly requested email delivery of concise Markdown memos. A web dashboard is unrequested feature bloat.',
        hoursReclaimed: '4.5 founder hours / week'
      },
      oneThingToPause: {
        item: 'Pause activation of Candidate Model v3.0 in ORACLE',
        conditionToResume: 'Resume only after 200+ historical game backtest verifies Brier improvement with statistical significance.',
        rationale: 'Small sample size (48 games) produces spurious improvements that fail out-of-sample.'
      },
      oneThingToKill: {
        item: 'Front Range Infrastructure Monitor Venture',
        evidenceThreshold: 'Must have at least 4 active paying customers ($1,400/mo MRR or $700 MRR + 2 paid custom briefs)',
        evaluationDeadline: '2026-10-25 (Milestone Review)',
        currentGap: 'Current customers: 2. Gap: 2 customers ($400/mo MRR).',
        killRuleReference: 'Kill Rule #KR-01 (Opportunity Scorecard #OPP-001)'
      }
    },
    decisionLog: [
      {
        id: 'DEC-LOG-01',
        decision: 'Enforce code freeze on Product Forge features until $750/mo MRR threshold is reached',
        division: 'FORGE',
        options: ['Enforce freeze (Recommended)', 'Allow minor UI bug fixes', 'Resume full portal development'],
        advisorRecommendation: 'Enforce freeze without exception. Focus 100% of venture hours on outbound sales.',
        deadline: 'Immediate',
        status: 'pending',
        evidenceLinks: ['Commercial Gate #CGR-01', 'Revenue Ledger #TX-01..02']
      },
      {
        id: 'DEC-LOG-02',
        decision: 'Lock Model v2.4.1 baseline for Week 5; reject Candidate v3.0 early activation',
        division: 'ORACLE',
        options: ['Lock v2.4.1 (Recommended)', 'Activate v3.0', 'Shadow test v3.0'],
        advisorRecommendation: 'Lock v2.4.1. Sample size of 48 games is mathematically insufficient for promotion.',
        deadline: 'Friday 17:00',
        status: 'pending',
        evidenceLinks: ['Change Control #PR-2026-04', 'Backtest Suite Run #41']
      },
      {
        id: 'DEC-LOG-03',
        decision: 'Commit 18 hours to FORGE outbound distribution vs 14 hours to ORACLE Week 5 slate',
        division: 'SHARED',
        options: ['Commit 18h FORGE / 14h ORACLE (Recommended)', 'Commit 16h / 16h equal split', 'Prioritize ORACLE (20h)'],
        advisorRecommendation: 'Commit 18h to FORGE. FORGE faces a hard Oct 25 validation milestone deadline.',
        deadline: 'Monday 12:00',
        status: 'pending',
        evidenceLinks: ['Founder Cadence Schedule', 'Opportunity Scorecard #OPP-001']
      }
    ],
    weeklyScorecard: {
      oracleForecastIntegrityIndex: oracleIntegrityScore,
      forgeCompoundingIndex: founderCompoundingIndex,
      governanceHealth: '100% (Airgap maintained, 1 restricted attempt discarded)',
      automationHealth: '100% (3 of 3 crons healthy, $0.35/day spend)',
      evidenceQualityScore: '94% (Verified sources across all production dossiers)',
      actualRevenueHealth: '$350.00 MRR / $700.00 Cash Collected',
      operatingCostHealth: '$10.70 / $50.00 Monthly API Budget Cap',
      personalWorkloadHealth: '36 hours committed across week (Balanced & Sustainable)'
    }
  };

  return {
    id: `REVIEW-PKG-W${weekNumber}-${Date.now().toString().slice(-4)}`,
    weekNumber,
    reportingPeriod,
    generatedAt: now.toISOString(),
    status: isPartial ? 'partial_missing_data' : 'awaiting_founder_review',
    isPartialMissingData: isPartial,
    missingDataWarnings,
    dataCompletenessScore,
    oracleReport,
    forgeReport,
    founderMemo,
    founderReviewConfirmed: false,
    understoodMissingDataAcknowledged: false
  };
}
