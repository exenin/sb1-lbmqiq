import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useIndustryProfile } from './hooks/useIndustryProfile';
import { useDarkMode } from './hooks/useDarkMode';
import DesignerBar from './components/designer/DesignerBar';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ProfileBar from './components/layout/ProfileBar';
import BusinessInnovationAssistant from './components/innovation/BusinessInnovationAssistant';
import Dashboard from './pages/Dashboard';
import CRMPage from './pages/CRMPage';
import SalesPage from './pages/SalesPage';
import MarketingPage from './pages/MarketingPage';
import TalentPage from './pages/TalentPage';
import StreamPage from './pages/StreamPage';
import InnovationPage from './pages/InnovationPage';
import SettingsPage from './pages/SettingsPage';
import ExternalPage from './pages/ExternalPage';

const App: React.FC = () => {
  const { currentProfile } = useIndustryProfile();
  const { isDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <ProfileBar />
          <DesignerBar />
          <Header />
          <div className="pt-[7.5rem]">
            <Sidebar />
            <div className="lg:ml-64">
              <main className="px-4 lg:px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {currentProfile?.features?.crm && (
                      <Route path="/crm/*" element={<CRMPage />} />
                    )}
                    {currentProfile?.features?.sales && (
                      <Route path="/sales/*" element={<SalesPage />} />
                    )}
                    {currentProfile?.features?.marketing && (
                      <Route path="/marketing/*" element={<MarketingPage />} />
                    )}
                    {currentProfile?.features?.talent && (
                      <Route path="/talent/*" element={<TalentPage />} />
                    )}
                    {currentProfile?.features?.stream && (
                      <Route path="/stream/*" element={<StreamPage />} />
                    )}
                    {currentProfile?.features?.innovation && (
                      <Route path="/innovation/*" element={<InnovationPage />} />
                    )}
                    <Route path="/settings/*" element={<SettingsPage />} />
                    <Route path="/external/:pageId" element={<ExternalPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
          <BusinessInnovationAssistant />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;