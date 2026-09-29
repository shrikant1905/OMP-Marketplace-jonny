import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OmpLayout } from './layouts/OmpLayout';

// 8 Core OfferUp Marketplace Pages
import { HomePage } from './pages/marketplace/HomePage';
import { ForSalePage } from './pages/marketplace/ForSalePage';
import { AiCarsTrucksPage } from './pages/marketplace/AiCarsTrucksPage';
import { ServicesPage } from './pages/marketplace/ServicesPage';
import { JobFinderPage } from './pages/marketplace/JobFinderPage';
import { RealEstatePage } from './pages/marketplace/RealEstatePage';
import { BusinessForSalePage } from './pages/marketplace/BusinessForSalePage';
import { LookingForPage } from './pages/marketplace/LookingForPage';
import { MyFavPage } from './pages/marketplace/MyFavPage';
import { PostAdWizardPage } from './pages/marketplace/PostAdWizardPage';
import { ListingDetailPage } from './pages/marketplace/ListingDetailPage';
import { LoginPage } from './pages/auth/LoginPage';
import { MemberDashboardPage } from './pages/member/MemberDashboardPage';

// 21 OMP Auto Suite Modules (From Client DOCX Scope)
import { OmpMarketplace } from './pages/omp/marketplace/OmpMarketplace';
import { VehicleListingDetail } from './pages/omp/marketplace/VehicleListingDetail';
import { VerifiedDealerDashboard } from './pages/omp/verification/VerifiedDealerDashboard';
import { DealerVerificationFlow } from './pages/omp/verification/DealerVerificationFlow';
import { FeedSync } from './pages/omp/inventory/FeedSync';
import { TopLeadIndicator } from './pages/omp/leads/TopLeadIndicator';
import { VinScanner } from './pages/omp/inventory/VinScanner';
import { MarketPricing } from './pages/omp/inventory/MarketPricing';
import { TitleSearch } from './pages/omp/inventory/TitleSearch';
import { ReconCenter } from './pages/omp/inventory/ReconCenter';
import { PhotoGenius } from './pages/omp/media/PhotoGenius';
import { AiPostmaster } from './pages/omp/marketing/AiPostmaster';
import { WebBuilder } from './pages/omp/marketing/WebBuilder';
import { DealCalculator } from './pages/omp/desking/DealCalculator';
import { UnifiedInbox } from './pages/omp/crm/UnifiedInbox';
import { AiReceptionist } from './pages/omp/crm/AiReceptionist';
import { LenderMarketplace } from './pages/omp/financing/LenderMarketplace';
import { AutoESign } from './pages/omp/deals/AutoESign';
import { BhphSuite } from './pages/omp/bhph/BhphSuite';
import { RoiDashboard } from './pages/omp/finance/RoiDashboard';
import { CostManagement } from './pages/omp/finance/CostManagement';
import { CentralOffice } from './pages/omp/executive/CentralOffice';
import { TeamPermissions } from './pages/omp/executive/TeamPermissions';
import { OmpMobileView } from './pages/omp/mobile/OmpMobileView';

import { RoleProtectedRoute } from './components/RoleProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<OmpLayout />}>
            {/* 1. 8 Core Marketplace Category Routes (Publicly Accessible) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<HomePage />} />
            <Route path="/for-sale" element={<ForSalePage />} />
            <Route path="/cars-trucks" element={<AiCarsTrucksPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/jobs" element={<JobFinderPage />} />
            <Route path="/real-estate" element={<RealEstatePage />} />
            <Route path="/businesses" element={<BusinessForSalePage />} />
            <Route path="/looking-for" element={<LookingForPage />} />
            <Route path="/my-fav" element={<MyFavPage />} />
            <Route path="/post-ad" element={<PostAdWizardPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />

            {/* 2. Member Workspace Dashboard (Protected for Registered Member / Sellers) */}
            <Route
              path="/member/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['MEMBER', 'DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <MemberDashboardPage />
                </RoleProtectedRoute>
              }
            />

            {/* 3. Verified Auto Dealer Dashboard & Tools (Protected for Dealer Pro & Executive Admin) */}
            <Route path="/omp/marketplace" element={<OmpMarketplace />} />
            <Route path="/omp/marketplace/:id" element={<VehicleListingDetail />} />
            <Route
              path="/omp/verified-dealer"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <VerifiedDealerDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/verify"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <DealerVerificationFlow />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/feed-sync"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <FeedSync />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/top-leads"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <TopLeadIndicator />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/vin-scanner"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <VinScanner />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/market-pricing"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <MarketPricing />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/title-search"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <TitleSearch />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/recon-center"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <ReconCenter />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/photo-genius"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <PhotoGenius />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/postmaster"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <AiPostmaster />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/web-builder"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <WebBuilder />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/desking/calculator"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <DealCalculator />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/crm/inbox"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <UnifiedInbox />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/crm/ai-receptionist"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <AiReceptionist />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/financing/lenders"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <LenderMarketplace />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/deals/e-sign"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <AutoESign />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/bhph/suite"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <BhphSuite />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/finance/roi"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <RoiDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/finance/costs"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <CostManagement />
                </RoleProtectedRoute>
              }
            />

            {/* 4. Executive Central Office Dashboard (Protected Strictly for Executive Admin) */}
            <Route
              path="/omp/executive/central-office"
              element={
                <RoleProtectedRoute allowedRoles={['EXECUTIVE_ADMIN']}>
                  <CentralOffice />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/executive/permissions"
              element={
                <RoleProtectedRoute allowedRoles={['EXECUTIVE_ADMIN']}>
                  <TeamPermissions />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/omp/mobile"
              element={
                <RoleProtectedRoute allowedRoles={['DEALER_PRO', 'EXECUTIVE_ADMIN']}>
                  <OmpMobileView />
                </RoleProtectedRoute>
              }
            />
          </Route>

          {/* Standalone Fullscreen Login Gateway (Entry point & Role switcher) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
