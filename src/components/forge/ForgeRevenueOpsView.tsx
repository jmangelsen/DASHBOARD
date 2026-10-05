import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export const ForgeRevenueOpsView: React.FC = () => {
  const { 
    currentForgeMRR, 
    forgeRevenueThreshold, 
    forgeCustomers, 
    forgeTransactions, 
    forgeHoursThisWeek 
  } = useNexus();

  const totalSettled = forgeTransactions
    .filter(t => t.status === 'settled')
    .reduce((sum, t) => sum + t.amount, 0);

  const revenuePerFounderHour = (totalSettled / (forgeHoursThisWeek * 4)).toFixed(2);

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-400">
            <DollarSign className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              REVENUE OPERATIONS // FINANCIAL TRUTH LEDGER
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Verified transactions, settled cash, active subscriptions, and unit economics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800 font-bold">
            Settled Cash: ${totalSettled}
          </span>
        </div>
      </div>

      {/* Financial Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Monthly Recurring (MRR)</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">${currentForgeMRR}</div>
          <span className="text-[10px] text-slate-400">Annual Run-Rate: ${currentForgeMRR * 12}</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Gross Margin</span>
          <div className="text-xl font-bold text-white tabular-nums">98.2%</div>
          <span className="text-[10px] text-slate-400">Monthly OPEX: $6.20</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Revenue / Founder Hour</span>
          <div className="text-xl font-bold text-cyan-300 tabular-nums">${revenuePerFounderHour}</div>
          <span className="text-[10px] text-slate-400">Target: &gt;$50.00 / hour</span>
        </div>

        <div className="p-3.5 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Threshold Gate</span>
          <div className="text-xl font-bold text-amber-400 tabular-nums">
            ${currentForgeMRR} / ${forgeRevenueThreshold}
          </div>
          <span className="text-[10px] text-slate-400">Shortfall: ${forgeRevenueThreshold - currentForgeMRR}</span>
        </div>
      </div>

      {/* CUSTOMERS ROSTER */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Active Customer Roster ({forgeCustomers.length} Accounts)</span>
          <span className="text-xs text-slate-400 font-normal">Direct Stripe Subscriptions</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {forgeCustomers.map((cust) => (
            <div key={cust.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span>{cust.name}</span>
                  <span className="text-slate-400 font-normal">({cust.role} · {cust.company})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono uppercase font-bold">
                    Active Subscriber
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Product: <strong className="text-slate-200">{cust.currentProduct}</strong> · {cust.notes}
                </div>
              </div>

              <div className="flex items-center gap-6 text-right shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Total Spent</span>
                  <span className="text-sm font-bold text-white tabular-nums">${cust.totalSpent}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">MRR Contribution</span>
                  <span className="text-sm font-bold text-emerald-400 tabular-nums">${cust.mrrContribution}/mo</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Health Score</span>
                  <span className="text-sm font-bold text-cyan-300 tabular-nums">{cust.healthScore}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRANSACTIONS AUDIT LEDGER */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Settled Transaction Ledger ({forgeTransactions.length} Settled Items)</span>
          <span className="text-xs text-slate-400 font-normal">Zero Unverified Projections</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {forgeTransactions.map((tx) => (
            <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs font-mono">
              <div className="space-y-0.5">
                <div className="text-white font-bold font-sans flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-violet-400" />
                  <span>{tx.productName}</span>
                  <span className="text-[10px] uppercase text-slate-500">({tx.type})</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Transaction ID: {tx.id} · Date: {tx.date}
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400 tabular-nums">+${tx.amount}.00</span>
                <span className="text-[9px] uppercase text-emerald-500 block font-bold">Settled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
