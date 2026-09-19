import React, { useState, useEffect } from 'react';
import { ArisanProvider, useArisan } from './context/ArisanContext';
import { MobileShell } from './components/layout/MobileShell';
import { TopNavbar } from './components/layout/TopNavbar';
import { BottomNavigation, TabType } from './components/layout/BottomNavigation';
import { HomeTab } from './views/HomeTab';
import { TableTab } from './views/TableTab';
import { LotteryTab } from './views/LotteryTab';
import { HistoryTab } from './views/HistoryTab';
import { CreateArisanModal } from './components/modals/CreateArisanModal';
import { GroupSwitcherModal } from './components/modals/GroupSwitcherModal';
import { WhatsAppReminderModal } from './components/modals/WhatsAppReminderModal';
import { ImportModal } from './components/modals/ImportModal';
import { TourGuide } from './components/ui/TourGuide';
import { SpotlightTour } from './components/ui/SpotlightTour';
import { OfflineBotModal } from './components/modals/OfflineBotModal';

const TOUR_SEEN_KEY = 'arisanbae_tour_seen';

const AppContent: React.FC = () => {
  const { activeGroup } = useArisan();

  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Modals & Tour state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGroupSwitcher, setShowGroupSwitcher] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [showSpotlightTour, setShowSpotlightTour] = useState(false);
  const [showBotModal, setShowBotModal] = useState(false);

  // Auto-launch Tour Guide on first visit
  useEffect(() => {
    try {
      const seen = localStorage.getItem(TOUR_SEEN_KEY);
      if (!seen) {
        setShowTourGuide(true);
        localStorage.setItem(TOUR_SEEN_KEY, 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenTour = () => {
    if (activeGroup) {
      setShowSpotlightTour(true);
    } else {
      setShowTourGuide(true);
    }
  };

  return (
    <MobileShell>
      {/* Sticky Header */}
      <TopNavbar
        onOpenGroupSwitcher={() => setShowGroupSwitcher(true)}
        onOpenTour={handleOpenTour}
        onOpenBot={() => setShowBotModal(true)}
      />

      {/* Main Content by Tab */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {currentTab === 'home' && (
          <HomeTab
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenReminderModal={() => setShowReminderModal(true)}
            onOpenCreateGroup={() => setShowCreateModal(true)}
            onOpenImport={() => setShowImportModal(true)}
            onOpenTour={() => setShowTourGuide(true)}
            onOpenBot={() => setShowBotModal(true)}
          />
        )}

        {currentTab === 'table' && (
          activeGroup ? (
            <TableTab onOpenReminderModal={() => setShowReminderModal(true)} />
          ) : (
            <HomeTab
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenReminderModal={() => setShowReminderModal(true)}
              onOpenCreateGroup={() => setShowCreateModal(true)}
              onOpenImport={() => setShowImportModal(true)}
              onOpenTour={() => setShowTourGuide(true)}
              onOpenBot={() => setShowBotModal(true)}
            />
          )
        )}

        {currentTab === 'lottery' && (
          activeGroup ? (
            <LotteryTab onOpenReminderModal={() => setShowReminderModal(true)} />
          ) : (
            <HomeTab
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenReminderModal={() => setShowReminderModal(true)}
              onOpenCreateGroup={() => setShowCreateModal(true)}
              onOpenImport={() => setShowImportModal(true)}
              onOpenTour={() => setShowTourGuide(true)}
              onOpenBot={() => setShowBotModal(true)}
            />
          )
        )}

        {currentTab === 'history' && (
          activeGroup ? (
            <HistoryTab
              onOpenImport={() => setShowImportModal(true)}
              onOpenCreateGroup={() => setShowCreateModal(true)}
            />
          ) : (
            <HomeTab
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenReminderModal={() => setShowReminderModal(true)}
              onOpenCreateGroup={() => setShowCreateModal(true)}
              onOpenImport={() => setShowImportModal(true)}
              onOpenTour={() => setShowTourGuide(true)}
              onOpenBot={() => setShowBotModal(true)}
            />
          )
        )}
      </main>

      {/* Sticky Bottom Navigation */}
      <BottomNavigation
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
      />

      {/* Global Modals */}
      <CreateArisanModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <GroupSwitcherModal
        isOpen={showGroupSwitcher}
        onClose={() => setShowGroupSwitcher(false)}
        onOpenCreate={() => setShowCreateModal(true)}
        onOpenImport={() => setShowImportModal(true)}
      />

      <WhatsAppReminderModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />

      {/* Tour Guide Onboarding Modal */}
      <TourGuide
        isOpen={showTourGuide}
        onClose={() => {
          setShowTourGuide(false);
          if (activeGroup) {
            setShowSpotlightTour(true);
          }
        }}
      />

      {/* Interactive In-App Feature Spotlight Tour */}
      <SpotlightTour
        isOpen={showSpotlightTour}
        onClose={() => setShowSpotlightTour(false)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Offline Bot & Knowledge Base Modal (BubuBot) */}
      <OfflineBotModal
        isOpen={showBotModal}
        onClose={() => setShowBotModal(false)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />
    </MobileShell>
  );
};

export const App: React.FC = () => {
  return (
    <ArisanProvider>
      <AppContent />
    </ArisanProvider>
  );
};

export default App;
