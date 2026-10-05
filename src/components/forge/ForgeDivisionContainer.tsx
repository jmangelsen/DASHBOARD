import React from 'react';
import { useNexus, ForgeDepartment } from '../../context/NexusContext';
import { ForgeVentureCommandView } from './ForgeVentureCommandView';
import { ForgeSignalRadarView } from './ForgeSignalRadarView';
import { ForgeBuyerResearchView } from './ForgeBuyerResearchView';
import { ForgeOpportunityLabView } from './ForgeOpportunityLabView';
import { ForgeOfferPricingView } from './ForgeOfferPricingView';
import { ForgeProductForgeView } from './ForgeProductForgeView';
import { ForgeLaunchDeployView } from './ForgeLaunchDeployView';
import { ForgeDistributionView } from './ForgeDistributionView';
import { ForgeRevenueOpsView } from './ForgeRevenueOpsView';
import { ForgeAssetVaultView } from './ForgeAssetVaultView';
import { ForgeAutomationFactoryView } from './ForgeAutomationFactoryView';
import { ForgePortfolioReviewView } from './ForgePortfolioReviewView';
import { ForgeArchiveView } from './ForgeArchiveView';

import { 
  Briefcase, 
  Inbox, 
  Users, 
  FlaskConical, 
  DollarSign, 
  Hammer, 
  Rocket, 
  Share2, 
  TrendingUp, 
  Database, 
  Cpu, 
  Target, 
  Archive 
} from 'lucide-react';

export const ForgeDivisionContainer: React.FC = () => {
  const { activeForgeDepartment, setActiveForgeDepartment, currentForgeMRR, forgeRevenueThreshold } = useNexus();

  const departments: { id: ForgeDepartment; label: string; icon: any }[] = [
    { id: 'command', label: 'Venture Command', icon: Briefcase },
    { id: 'signals', label: 'Signal Radar', icon: Inbox },
    { id: 'buyer-research', label: 'Buyer Research', icon: Users },
    { id: 'opportunity-lab', label: 'Opportunity Lab', icon: FlaskConical },
    { id: 'offer-pricing', label: 'Offer & Pricing', icon: DollarSign },
    { id: 'product-forge', label: 'Product Forge', icon: Hammer },
    { id: 'launch-deploy', label: 'Launch & Deploy', icon: Rocket },
    { id: 'distribution', label: 'Distribution', icon: Share2 },
    { id: 'revenue-ops', label: 'Revenue Ops', icon: TrendingUp },
    { id: 'asset-vault', label: 'Asset Vault', icon: Database },
    { id: 'automations', label: 'Automations', icon: Cpu },
    { id: 'portfolio-review', label: 'Portfolio Review', icon: Target },
    { id: 'archive', label: 'Archive', icon: Archive },
  ];

  const renderDepartment = () => {
    switch (activeForgeDepartment) {
      case 'command':
        return <ForgeVentureCommandView />;
      case 'signals':
        return <ForgeSignalRadarView />;
      case 'buyer-research':
        return <ForgeBuyerResearchView />;
      case 'opportunity-lab':
        return <ForgeOpportunityLabView />;
      case 'offer-pricing':
        return <ForgeOfferPricingView />;
      case 'product-forge':
        return <ForgeProductForgeView />;
      case 'launch-deploy':
        return <ForgeLaunchDeployView />;
      case 'distribution':
        return <ForgeDistributionView />;
      case 'revenue-ops':
        return <ForgeRevenueOpsView />;
      case 'asset-vault':
        return <ForgeAssetVaultView />;
      case 'automations':
        return <ForgeAutomationFactoryView />;
      case 'portfolio-review':
        return <ForgePortfolioReviewView />;
      case 'archive':
        return <ForgeArchiveView />;
      default:
        return <ForgeVentureCommandView />;
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Division Header Banner */}
      <div className="p-4 bg-[#110d22] border border-violet-500/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-400">
            <Briefcase className="w-4 h-4" />
            <span className="font-bold uppercase tracking-widest text-[11px]">
              DIVISION 02 // FORGE LABS VENTURE DEPLOYMENT
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Validate buyer willingness to pay, launch paid pilots, enforce $750/mo revenue gates, and compound reusable IP.
          </p>
        </div>

        {/* Threshold Status */}
        <div className="p-2.5 rounded bg-[#070512] border border-violet-500/20 text-[10px] text-slate-400 max-w-md">
          <div className="flex items-center justify-between font-bold mb-0.5">
            <span className="text-violet-300">APPROVAL GATE STATUS:</span>
            <span className={currentForgeMRR >= forgeRevenueThreshold ? 'text-emerald-400' : 'text-amber-400'}>
              ${currentForgeMRR} / ${forgeRevenueThreshold} MRR
            </span>
          </div>
          Build freeze in effect until 3 additional paid subscriptions are verified.
        </div>
      </div>

      {/* Department Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-slate-800 text-xs font-mono overflow-x-auto pb-1">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isSelected = activeForgeDepartment === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => setActiveForgeDepartment(dept.id)}
              className={`px-3 py-1.5 rounded-t font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#18112c] text-violet-300 border-t-2 border-violet-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-violet-400' : 'text-slate-500'}`} />
              <span>{dept.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Selected Department */}
      <div>{renderDepartment()}</div>
    </div>
  );
};
