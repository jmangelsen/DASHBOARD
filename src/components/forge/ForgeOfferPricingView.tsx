import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { ForgeOffer } from '../../types/nexus';
import { 
  DollarSign, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  FileText 
} from 'lucide-react';

export const ForgeOfferPricingView: React.FC = () => {
  const { forgeOffers } = useNexus();

  const objections = [
    {
      objection: '"Why shouldn\'t I just wait for the Colorado PUC to post the official public docket transcript?"',
      counter: 'Public docket transcripts are published with a 60-90 day lag. In that window, competitors option parcels and lock substation queue positions. Our monitor delivers raw exhibits within 48 hours of filing.'
    },
    {
      objection: '"Can\'t our in-house engineering team pull this?"',
      counter: 'Yes, at an internal cost of ~15 hours per month ($2,250+ in engineering salary). The monitor costs $175/mo, freeing your senior team to focus on site acquisition.'
    },
    {
      objection: '"What if the utility changes the queue cost allocation tariffs?"',
      counter: 'The weekly monitor tracks ongoing docket filings specifically to alert you to tariff changes before they impact your investment committee approval.'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-violet-400" />
            <span>OFFER &amp; PRICING STUDIO // COMMERCIAL PACKAGING</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Transform validated regulatory pain into structured sellable offers with explicit scopes and objection playbooks.
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forgeOffers.map((offer) => (
          <div key={offer.id} className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800">
                  {offer.offerType.replace('_', ' ')}
                </span>
                <span className="text-base font-bold text-emerald-400 tabular-nums">
                  ${offer.priceAmount} {offer.priceModel === 'monthly' ? '/ month' : 'one-time'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-sans">{offer.name}</h3>
                <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                  {offer.promisedOutcome}
                </p>
              </div>

              {/* Value Metric Callout */}
              <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 text-[11px] text-slate-300 font-sans">
                <strong className="text-violet-400 block font-mono text-[10px] uppercase">Value Metric:</strong>
                {offer.valueMetric}
              </div>

              {/* Deliverable Scope */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Included Scope:</span>
                <div className="space-y-1 text-slate-300 font-sans text-xs">
                  {offer.deliverableScope.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Delivery Time: <strong>{offer.deliveryTimeHours}h</strong></span>
              <a
                href={offer.paymentLinkPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 flex items-center gap-1 font-bold"
              >
                <span>Stripe Checkout Placeholder</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* OBJECTION HANDLING PLAYBOOK */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-slate-800">
          Objection Handling Library // Enterprise Diligence Scenarios
        </span>

        <div className="space-y-3">
          {objections.map((item, idx) => (
            <div key={idx} className="p-3 bg-[#06080e] rounded border border-slate-850 space-y-1">
              <div className="text-xs font-bold text-amber-300 font-sans">
                {item.objection}
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed pl-2 border-l-2 border-emerald-500">
                {item.counter}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
