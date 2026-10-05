import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductRecord, ProductBillingModel, ProductStage, DataClassification } from '../../types';
import { 
  Hammer, 
  Plus, 
  CheckSquare, 
  Square, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export const ProductForge: React.FC = () => {
  const { products, updateProduct, addProduct, opportunity } = useApp();
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const handleToggleChecklist = (productId: string, key: keyof ProductRecord['checklist']) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const updatedChecklist = { ...prod.checklist, [key]: !prod.checklist[key] };
    updateProduct(productId, { checklist: updatedChecklist });
  };

  const checklistItems = [
    { key: 'buyerEvidenceConfirmed', label: '1. Buyer evidence confirmed via discovery interviews' },
    { key: 'offerWritten', label: '2. High-specificity offer written with clear outcome' },
    { key: 'priceTested', label: '3. Price tested against willingness-to-pay signals' },
    { key: 'landingPageCreated', label: '4. Dedicated landing page / executive briefing deployed' },
    { key: 'paymentMechanismCreated', label: '5. Stripe checkout or payment link operational' },
    { key: 'deliveryWorkflowDocumented', label: '6. Delivery workflow documented and verified' },
    { key: 'onboardingDrafted', label: '7. Customer onboarding and welcome memo drafted' },
    { key: 'supportPathDefined', label: '8. Support path & response SLA defined' },
    { key: 'analyticsDefined', label: '9. Conversion and retention telemetry defined' },
    { key: 'firstAcquisitionChannelActive', label: '10. First direct acquisition channel active' },
    { key: 'firstPaidCustomerGoalEstablished', label: '11. First paid customer goal established' },
    { key: 'dataAndLegalReviewComplete', label: '12. Data governance and airgap review complete' },
  ] as const;

  const completedCount = selectedProduct ? Object.values(selectedProduct.checklist).filter(Boolean).length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Hammer className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 04 // PRODUCT FORGE</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Product Forge
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Convert validated research opportunities into packaged, recurring revenue products with 
            strict 12-point commercial verification before engineering.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Product Offering</span>
        </button>
      </div>

      {/* Product Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProductId(p.id)}
            className={`px-3 py-2 rounded-md transition-all flex items-center gap-2 shrink-0 border ${
              selectedProductId === p.id
                ? 'bg-slate-800 text-cyan-300 border-cyan-500/50 font-semibold'
                : 'bg-[#0a0e17] text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{p.name}</span>
            <span className="text-[10px] text-cyan-400 font-bold tabular-nums">
              ${p.price} {p.billingModel === 'subscription' ? '/mo' : ''}
            </span>
          </button>
        ))}
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Product Spec & Financials (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Core Card */}
            <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    {selectedProduct.productType} · Stage: {selectedProduct.productStage}
                  </span>
                  <h2 className="text-lg font-bold font-sans text-white mt-0.5">
                    {selectedProduct.name}
                  </h2>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-bold text-white tabular-nums">
                    ${selectedProduct.price} <span className="text-xs text-slate-400 font-normal">/{selectedProduct.billingModel}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Current MRR: ${selectedProduct.currentMonthlyRevenue}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Target Buyer</span>
                <p className="text-xs text-slate-200 font-sans">{selectedProduct.buyer}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Promised Customer Outcome</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">{selectedProduct.promisedOutcome}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-850 font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Fulfillment Load</span>
                  <span className="text-white font-medium">{selectedProduct.fulfillmentTimeHours}h / unit</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Monthly Cost</span>
                  <span className="text-white font-medium">${selectedProduct.operatingCostMonthly}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Target Rev</span>
                  <span className="text-emerald-400 font-medium">${selectedProduct.targetMonthlyRevenue}/mo</span>
                </div>
              </div>
            </div>

            {/* Delivery Workflow & Onboarding */}
            <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                Delivery Workflow &amp; Onboarding SOP
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Fulfillment Procedure</span>
                <p className="text-slate-300 font-sans leading-relaxed text-xs">
                  {selectedProduct.deliveryWorkflow}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Customer Welcome &amp; Access</span>
                <p className="text-slate-300 font-sans leading-relaxed text-xs">
                  {selectedProduct.customerOnboarding}
                </p>
              </div>
            </div>

            {/* Feature Backlog */}
            <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                Customer-Requested Roadmap Backlog
              </div>
              <ul className="space-y-1.5 font-sans text-xs text-slate-300 list-disc list-inside">
                {selectedProduct.featureBacklog.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: 12-Item Productization Checklist (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-mono">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                  <span>12-Point Launch Checklist</span>
                </div>
                <span className="text-xs font-bold text-cyan-400 tabular-nums">
                  {completedCount} / 12
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {checklistItems.map(({ key, label }) => {
                  const isChecked = selectedProduct.checklist[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handleToggleChecklist(selectedProduct.id, key)}
                      className="w-full flex items-start gap-2.5 p-2 rounded hover:bg-slate-800/40 text-left transition-colors font-sans"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <span className={isChecked ? 'text-slate-200' : 'text-slate-400'}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                Rule: All 12 items must be verified before declaring MVP active.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Hammer className="w-4 h-4 text-cyan-400" />
                <span>CONFIGURE NEW PRODUCT OFFERING</span>
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                addProduct({
                  name: fd.get('name') as string,
                  linkedOpportunityId: opportunity.id,
                  productType: fd.get('productType') as string,
                  buyer: fd.get('buyer') as string,
                  promisedOutcome: fd.get('promisedOutcome') as string,
                  price: Number(fd.get('price')),
                  billingModel: fd.get('billingModel') as ProductBillingModel,
                  valueMetric: fd.get('valueMetric') as string,
                  productStage: 'concept' as ProductStage,
                  mvpDefinition: fd.get('mvpDefinition') as string,
                  featureBacklog: ['Initial release feedback collection'],
                  deliveryWorkflow: 'Automated digital dispatch via secure link',
                  fulfillmentTimeHours: 1,
                  estimatedSupportLoad: 'Low',
                  customerOnboarding: 'Welcome briefing memo and support link',
                  operatingCostMonthly: 25,
                  currentMonthlyRevenue: 0,
                  targetMonthlyRevenue: 750,
                  customerFeedbackCount: 0,
                  retentionSignal: 'unknown',
                  sourceOfTruthAssets: ['asset-001'],
                  roadmap: 'Deploy MVP and test 5 paid orders',
                  knownRisks: 'Initial acquisition friction',
                  checklist: {
                    buyerEvidenceConfirmed: false,
                    offerWritten: true,
                    priceTested: false,
                    landingPageCreated: false,
                    paymentMechanismCreated: false,
                    deliveryWorkflowDocumented: false,
                    onboardingDrafted: false,
                    supportPathDefined: false,
                    analyticsDefined: false,
                    firstAcquisitionChannelActive: false,
                    firstPaidCustomerGoalEstablished: true,
                    dataAndLegalReviewComplete: true,
                  },
                  dataClassification: 'public',
                });
                setShowAddModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-slate-400 mb-1">Product Name *</label>
                <input required name="name" placeholder="e.g. Northern Colorado Substation Interconnect Radar" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Product Type *</label>
                  <select name="productType" className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200">
                    <option value="Paid Research Brief">Paid Research Brief</option>
                    <option value="Recurring Intelligence Monitor">Recurring Intelligence Monitor</option>
                    <option value="Premium Report & Data Export">Premium Report &amp; Data Export</option>
                    <option value="Utility Micro-SaaS">Utility Micro-SaaS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Billing Model *</label>
                  <select name="billingModel" className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200">
                    <option value="subscription">Monthly Subscription</option>
                    <option value="one-time">One-Time Purchase</option>
                    <option value="annual">Annual Commitment</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Price ($) *</label>
                  <input required type="number" name="price" defaultValue={350} className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Value Metric *</label>
                  <input required name="valueMetric" defaultValue="Per regional executive briefing" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Target Buyer / ICP *</label>
                <input required name="buyer" defaultValue={opportunity.targetBuyer} className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Promised Customer Outcome *</label>
                <textarea required rows={2} name="promisedOutcome" placeholder="What costly mistake does this prevent?" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 resize-none font-sans" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">MVP Scope Definition *</label>
                <textarea required rows={2} name="mvpDefinition" placeholder="What is the leanest functional version?" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 resize-none font-sans" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-1.5 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-1.5 bg-cyan-400 text-black font-semibold rounded">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
