import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Sliders, 
  User, 
  ShieldCheck, 
  Database, 
  RotateCcw, 
  Download, 
  Check, 
  Key, 
  Share2,
  HardDrive,
  CreditCard,
  Mail,
  GitBranch,
  Activity
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    currentUserRole, 
    setCurrentUserRole, 
    onboarding, 
    updateOnboarding, 
    resetToDemonstrationData 
  } = useApp();

  const [threshold, setThreshold] = useState(onboarding.defaultApprovalThreshold || 750);
  const [saved, setSaved] = useState(false);

  const handleSaveThreshold = (e: React.FormEvent) => {
    e.preventDefault();
    updateOnboarding({ defaultApprovalThreshold: Number(threshold) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportFullJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      onboarding,
      storage: { ...localStorage }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge_venture_studio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const integrations = [
    { name: 'Stripe Billing & Checkout', icon: CreditCard, status: 'Active (Simulated)', desc: 'Processes one-off report payments and monthly subscriptions via webhooks' },
    { name: 'Google Drive Storage', icon: HardDrive, status: 'Configured', desc: 'Secure repository for full-resolution GIS GeoJSON and docket PDF archives' },
    { name: 'Email Dispatch Engine', icon: Mail, status: 'Active', desc: 'Monday 07:00 MST automated executive dispatch to paid subscriber roster' },
    { name: 'GitHub Code Vault', icon: GitBranch, status: 'Airgapped', desc: 'Private personal repositories for docket parser scripts and data scrapers' },
    { name: 'Conversion Telemetry', icon: Activity, status: 'Operational', desc: 'Client-side funnel tracking connecting content views to verified Stripe charges' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sliders className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 11 // STUDIO CONFIGURATION</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Studio Settings &amp; Integrations
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Manage RBAC role emulation, project threshold parameters, third-party webhook placeholders, 
            and data portability.
          </p>
        </div>
      </div>

      {/* RBAC Role Switcher */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
        <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Role-Based Access Control (RBAC) View Emulation</span>
        </div>
        <p className="text-slate-400 font-sans text-xs">
          FORGE supports multi-role access architectures. Initially, the sole user is the Founder (Admin). 
          Switch roles below to simulate future access policies:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            { id: 'admin', label: 'Founder (Admin)', desc: 'Unrestricted studio command, governance controls, and raw docket management.' },
            { id: 'future_member', label: 'Future Studio Member', desc: 'Read-only intelligence library and task queue without financial admin rights.' },
            { id: 'future_paid_customer', label: 'Future Paid Subscriber', desc: 'Customer portal view with verified report downloads and billing management.' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setCurrentUserRole(r.id as UserRole)}
              className={`p-3 text-left rounded border transition-all ${
                currentUserRole === r.id
                  ? 'bg-[#0d121f] border-cyan-400 text-cyan-300 font-semibold shadow-inner'
                  : 'bg-[#070a10] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold">{r.label}</div>
              <div className="text-[11px] font-sans text-slate-400 mt-1">{r.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Threshold Parameter Form */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>Project Approval Threshold ($/mo)</span>
          {saved && <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span>}
        </div>

        <form onSubmit={handleSaveThreshold} className="space-y-3">
          <div>
            <label className="block text-slate-400 mb-1">
              Minimum Recurring Revenue Required to Validate Project ($)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-48 px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-bold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded transition-colors"
              >
                Update Threshold Gate
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-2">
              Default is $750/month. Projects unable to achieve this commercial run rate within 45 days are 
              flagged for mandatory kill or pivot review.
            </p>
          </div>
        </form>
      </div>

      {/* Integration Placeholders */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
          External Infrastructure &amp; API Placeholders
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3.5 bg-[#0d121c] border border-slate-850 rounded space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">{item.status}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Portability & Reset */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>Data Portability &amp; Demonstration Controls</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportFullJSON}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Complete Studio Database (JSON)</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset all records to initial Front Range demonstration seed data?')) {
                resetToDemonstrationData();
              }
            }}
            className="px-4 py-2 bg-rose-950/40 border border-rose-800/80 hover:bg-rose-900/40 text-rose-300 rounded flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Fictional Demonstration Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
