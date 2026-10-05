import React from 'react';
import { NexusProvider, useNexus } from './context/NexusContext';
import { NexusTopBar } from './components/layout/NexusTopBar';
import { NexusGovernanceBanner } from './components/layout/NexusGovernanceBanner';
import { NexusSidebar } from './components/layout/NexusSidebar';

import { NexusCommandCenter } from './components/nexus-command/NexusCommandCenter';
import { OracleDivisionContainer } from './components/oracle/OracleDivisionContainer';
import { ForgeDivisionContainer } from './components/forge/ForgeDivisionContainer';
import { SharedMissionsView } from './components/missions/SharedMissionsView';
import { SharedAssetVaultView } from './components/assets/SharedAssetVaultView';
import { NexusAutomationControlView } from './components/automations/NexusAutomationControlView';
import { NexusGovernanceView } from './components/governance/NexusGovernanceView';
import { NexusSettingsView } from './components/settings/NexusSettingsView';
import { GoogleWorkspaceHub } from './components/workspace/GoogleWorkspaceHub';
import { NexusFloorView } from './components/floor/NexusFloorView';
import { NexusSystemMapView } from './components/system-map/NexusSystemMapView';
import { NexusAdvisorWorkspace } from './components/advisor/NexusAdvisorWorkspace';
import { NexusOperationsDeckView } from './components/operations-deck/NexusOperationsDeckView';
import { NexusOrchestratorModal } from './components/orchestrator/NexusOrchestratorModal';
import { AdminAuthGate } from './components/auth/AdminAuthGate';

const MainContent: React.FC = () => {
  const { activeDivision, activeNexusSection } = useNexus();

  const renderContent = () => {
    // If user navigated into ORACLE Division
    if (activeDivision === 'oracle') {
      return <OracleDivisionContainer />;
    }

    // If user navigated into FORGE LABS Division
    if (activeDivision === 'forge') {
      return <ForgeDivisionContainer />;
    }

    // Otherwise, NEXUS Root Sections
    switch (activeNexusSection) {
      case 'command-center':
        return <NexusCommandCenter />;
      case 'system-map':
        return <NexusSystemMapView />;
      case 'nexus-floor':
        return <NexusSystemMapView />;
      case 'advisor':
        return <NexusAdvisorWorkspace />;
      case 'operations-deck':
        return <NexusSystemMapView />;
      case 'workspace':
        return <GoogleWorkspaceHub />;
      case 'shared-missions':
        return <SharedMissionsView />;
      case 'asset-vault':
        return <SharedAssetVaultView />;
      case 'automation-control':
        return <NexusAutomationControlView />;
      case 'governance':
        return <NexusGovernanceView />;
      case 'settings':
        return <NexusSettingsView />;
      default:
        return <NexusCommandCenter />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#07090e] p-5 lg:p-7 min-h-[calc(100vh-84px)]">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <NexusProvider>
      <AdminAuthGate>
        <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
          <NexusTopBar />
          <NexusGovernanceBanner />
          <div className="flex flex-1 overflow-hidden">
            <NexusSidebar />
            <MainContent />
          </div>
          <NexusOrchestratorModal />
        </div>
      </AdminAuthGate>
    </NexusProvider>
  );
}
