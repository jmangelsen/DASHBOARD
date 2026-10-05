import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RevenueTransaction, CustomerRecord } from '../../types';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Users, 
  Plus, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const RevenueEngine: React.FC = () => {
  const { 
    transactions, 
    customers, 
    products, 
    addTransaction,
    monthlyRecurringRevenue,
    annualRecurringRevenue,
    oneTimeRevenue,
    grossMarginPercent,
    monthlyOperatingCost,
    netContribution,
    revenuePerHour,
    totalFounderHours,
    onboarding
  } = useApp();

  const [activeTab, setActiveTab] = useState<'transactions' | 'customers' | 'threshold_model'>('threshold_model');
  const [showAddTxModal, setShowAddTxModal] = useState(false);

  const threshold = onboarding.defaultApprovalThreshold || 750;
  const currentActualRevenue = oneTimeRevenue + monthlyRecurringRevenue;

  // Threshold math
  const recurringProduct = products.find(p => p.billingModel === 'subscription') || products[0];
  const requiredSubscribersForThreshold = Math.ceil(threshold / (recurringProduct?.price || 150));
  const currentSubscribers = customers.filter(c => c.status === 'active_subscriber').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <DollarSign className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 06 // FINANCIAL TRUTH</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Revenue Engine
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            A blunt, unembellished accounting of cash deposits, recurring contracts, gross margin, 
            and required customer counts to clear the ${threshold}/mo survival threshold.
          </p>
        </div>

        <button
          onClick={() => setShowAddTxModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Verified Payment</span>
        </button>
      </div>

      {/* Top Telemetry Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Actual Cash (MTD)</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">${currentActualRevenue}</div>
          <span className="text-slate-400 text-[10px]">Real deposits</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Monthly Recurring</span>
          <div className="text-xl font-bold text-white tabular-nums">${monthlyRecurringRevenue}</div>
          <span className="text-cyan-400 text-[10px]">ARR: ${annualRecurringRevenue}</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Gross Margin</span>
          <div className="text-xl font-bold text-white tabular-nums">{grossMarginPercent}%</div>
          <span className="text-slate-400 text-[10px]">Op Cost: ${monthlyOperatingCost}</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Net Contribution</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">${netContribution}</div>
          <span className="text-slate-400 text-[10px]">Profitable</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Rev / Founder Hr</span>
          <div className="text-xl font-bold text-cyan-400 tabular-nums">${revenuePerHour}</div>
          <span className="text-slate-400 text-[10px]">{totalFounderHours} hours</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Active Accounts</span>
          <div className="text-xl font-bold text-white tabular-nums">{customers.length}</div>
          <span className="text-slate-400 text-[10px]">{currentSubscribers} recurring</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono">
        <button
          onClick={() => setActiveTab('threshold_model')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
            activeTab === 'threshold_model' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          $750/mo Threshold &amp; Break-Even Model
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
            activeTab === 'transactions' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Verified Transactions ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
            activeTab === 'customers' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Customer Roster &amp; Renewals ({customers.length})
        </button>
      </div>

      {/* TAB 1: THRESHOLD & BREAK-EVEN MODEL */}
      {activeTab === 'threshold_model' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">Threshold Status</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400 tabular-nums">${monthlyRecurringRevenue}</span>
                <span className="text-slate-400 text-sm">/ ${threshold} per mo</span>
              </div>
              <div className="text-[11px] text-amber-300">
                Approaching Threshold ({Math.round((monthlyRecurringRevenue / threshold) * 100)}% complete)
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full bg-amber-400 rounded-full" 
                  style={{ width: `${Math.min(100, (monthlyRecurringRevenue / threshold) * 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">Subscribers Needed to Validate</span>
              <div className="text-2xl font-bold text-cyan-400 tabular-nums">
                {currentSubscribers} / {requiredSubscribersForThreshold}
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                At <strong>${recurringProduct?.price}/month</strong>, {requiredSubscribersForThreshold - currentSubscribers} additional recurring subscribers are required to clear the project gate.
              </p>
            </div>

            <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">Break-Even Contribution Formula</span>
              <div className="text-xs text-slate-200 font-mono space-y-1">
                <div>Monthly Rev: <span className="text-emerald-400">${currentActualRevenue}</span></div>
                <div>Monthly Op Cost: <span className="text-rose-400">-${monthlyOperatingCost}</span></div>
                <div className="pt-1 border-t border-slate-800 font-bold">
                  Net Contribution: <span className="text-cyan-300">${netContribution}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Placeholders */}
          <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
            <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Checkout &amp; Billing Integration Hooks</span>
              <span className="text-[10px] text-emerald-400">Stripe Webhook Ready</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-1.5">
                <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Stripe Payment Link</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  https://buy.stripe.com/test_front_range_substation_350
                </div>
                <button 
                  onClick={() => alert('Stripe checkout simulation: opens customer payment modal')}
                  className="text-[10px] text-cyan-300 hover:underline flex items-center gap-1"
                >
                  <span>Test Checkout Flow</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-1.5">
                <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Customer Billing Portal</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Self-serve card updates and invoices
                </div>
                <button 
                  onClick={() => alert('Billing portal placeholder: redirects to Stripe customer self-serve')}
                  className="text-[10px] text-cyan-300 hover:underline flex items-center gap-1"
                >
                  <span>Simulate Portal Access</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-1.5">
                <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Automated Renewal Dispatch</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Next renewal run scheduled: 2026-11-02
                </div>
                <span className="text-[10px] text-emerald-400">Active Webhook Listener</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTIONS LIST */}
      {activeTab === 'transactions' && (
        <div className="space-y-3 font-mono text-xs">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">${tx.amount}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-emerald-400 uppercase text-[10px] font-semibold">{tx.status}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 text-[11px]">{tx.type.replace('_', ' ')}</span>
                </div>
                <div className="text-slate-300 font-sans font-medium">{tx.customerName} — {tx.customerCompany}</div>
                <div className="text-[11px] text-slate-400">{tx.productName} via {tx.channel}</div>
              </div>

              <div className="text-right shrink-0 text-[11px] text-slate-400">
                <div>{new Date(tx.date).toLocaleDateString()}</div>
                <div className="text-slate-300">Founder Time: {tx.founderHoursSpent}h</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CUSTOMERS LIST */}
      {activeTab === 'customers' && (
        <div className="space-y-3 font-mono text-xs">
          {customers.map((cust) => (
            <div
              key={cust.id}
              className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span>{cust.name}</span>
                  <span className="text-slate-500 font-mono text-xs font-normal">({cust.company})</span>
                </div>
                <div className="text-[11px] text-slate-400">{cust.email}</div>
                <div className="text-xs text-cyan-300 font-sans mt-1">
                  Active: {cust.activeProductName}
                </div>
              </div>

              <div className="text-right shrink-0 space-y-0.5">
                <div className="text-sm font-bold text-emerald-400 tabular-nums">
                  Total Paid: ${cust.totalPaid}
                </div>
                {cust.mrrContribution > 0 && (
                  <div className="text-cyan-300 text-[11px] font-semibold">
                    MRR: ${cust.mrrContribution}/mo
                  </div>
                )}
                {cust.nextRenewalDate && (
                  <div className="text-[10px] text-amber-400">
                    Next Renewal: {cust.nextRenewalDate}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddTxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>RECORD VERIFIED REVENUE DEPOSIT</span>
              </h2>
              <button onClick={() => setShowAddTxModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                const selectedProd = products.find(p => p.id === fd.get('productId'));
                addTransaction({
                  customerName: fd.get('customerName') as string,
                  customerEmail: fd.get('customerEmail') as string,
                  customerCompany: fd.get('customerCompany') as string,
                  productId: fd.get('productId') as string,
                  productName: selectedProd?.name || 'Venture Product',
                  amount: Number(fd.get('amount')),
                  type: fd.get('type') as any,
                  date: new Date().toISOString(),
                  channel: fd.get('channel') as string,
                  status: 'paid',
                  founderHoursSpent: Number(fd.get('founderHoursSpent') || 1),
                  notes: fd.get('notes') as string,
                });
                setShowAddTxModal(false);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Customer Full Name *</label>
                  <input required name="customerName" placeholder="e.g. Jordan Price" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Customer Company *</label>
                  <input required name="customerCompany" placeholder="e.g. TerraPower Infrastructure" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Customer Email *</label>
                <input required type="email" name="customerEmail" placeholder="jordan@terrapower.example.com" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Purchased Product *</label>
                  <select required name="productId" className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200">
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Deposit Amount ($) *</label>
                  <input required type="number" name="amount" defaultValue={350} className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Transaction Type *</label>
                  <select name="type" className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200">
                    <option value="one-time">One-Time Report Purchase</option>
                    <option value="subscription_initial">New Monthly Subscription</option>
                    <option value="subscription_renewal">Subscription Renewal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Channel *</label>
                  <input required name="channel" defaultValue="Stripe Checkout (Direct)" className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Founder Hours Spent Fulfilling</label>
                <input type="number" step="0.5" name="founderHoursSpent" defaultValue={1} className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddTxModal(false)} className="px-4 py-1.5 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-1.5 bg-emerald-400 text-black font-semibold rounded">Record &amp; Earn +75 SC</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
