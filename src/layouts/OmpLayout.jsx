import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  Inbox,
  PhoneCall,
  Calculator,
  Landmark,
  FileSignature,
  TrendingUp,
  Receipt,
  Wallet,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  Sparkles,
  Store,
  Layers,
  CheckCircle2,
  Activity,
  Car,
  ShieldAlert,
  ShoppingBag,
  RefreshCw,
  Target,
  Camera,
  Wrench,
  Share2,
  Globe,
  Sun,
  Moon,
  Briefcase,
  Home,
  Building,
  Search,
  Heart,
  User,
  LogOut,
  MapPin,
  Truck,
  PlusCircle,
  Key,
  Menu,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OmpAiAgentModal } from '../components/OmpAiAgentModal';
import { PoliceSafeSpotsModal } from '../components/PoliceSafeSpotsModal';
import { ShippingCalculatorModal } from '../components/ShippingCalculatorModal';
import { SubscriptionPlansModal } from '../components/SubscriptionPlansModal';
import { MobileBottomBar } from '../components/MobileBottomBar';
import { MobileAppDrawer } from '../components/MobileAppDrawer';

export const OmpLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, theme, toggleTheme, selectedLocation, selectedRadius, myFavList, activeSubscriptions } = useAuth();
  const [selectedStore, setSelectedStore] = useState('all');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSafeSpotsOpen, setIsSafeSpotsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Responsive Viewport Detection (Mobile vs Desktop)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stores = [
    { id: 'all', name: '🏢 All Locations (Consolidated)', city: 'National Umbrella', activeUnits: 142 },
    { id: 'dallas', name: '📍 Dallas Central Motors', city: 'Dallas, TX', activeUnits: 58 },
    { id: 'houston', name: '📍 Houston North Auto Mall', city: 'Houston, TX', activeUnits: 49 },
    { id: 'austin', name: '📍 Austin West Dealership', city: 'Austin, TX', activeUnits: 35 },
  ];

  // Role-Based Navigation Groups (Strict RBAC for the 3 Core Roles + Guest)
  const allNavGroups = [
    {
      id: 'core_marketplace',
      group: 'Marketplace Categories',
      roles: ['GUEST', 'MEMBER', 'DEALER_PRO', 'EXECUTIVE_ADMIN'],
      items: [
        { path: '/marketplace', label: 'Marketplace Home', icon: Home, tag: 'Main' },
        { path: '/for-sale', label: 'For Sale', icon: ShoppingBag, tag: 'General' },
        { path: '/cars-trucks', label: 'AI Cars & Trucks', icon: Car, tag: 'Taxonomy' },
        { path: '/services', label: 'Local Services', icon: Wrench, tag: '30+ Pros' },
        { path: '/jobs', label: 'Job Finder', icon: Briefcase, tag: '35 Domains' },
        { path: '/real-estate', label: 'Real Estate', icon: Home, tag: 'Rent/Buy' },
        { path: '/businesses', label: 'Business For Sale', icon: Building, tag: 'Turnkey' },
        { path: '/looking-for', label: 'Looking For', icon: Search, tag: 'Wanted' },
        { path: '/my-fav', label: 'MyFav & OMP AI', icon: Heart, badge: myFavList.length },
      ],
    },
    {
      id: 'member_suite',
      group: 'My Member & Seller Tools',
      roles: ['MEMBER'],
      items: [
        { path: '/member/dashboard', label: 'Member Dashboard', icon: ShoppingBag, tag: 'Dashboard' },
        { path: '/post-ad', label: 'Post a Fast Listing (30s)', icon: PlusCircle, tag: 'Fast Ad' },
        { path: '/my-fav', label: 'My Saved Ads & Pinned', icon: Heart, badge: myFavList.length },
      ],
    },
    {
      id: 'dealers_hub',
      group: 'Verified Dealer Hub',
      roles: ['DEALER_PRO', 'EXECUTIVE_ADMIN'],
      items: [
        { path: '/omp/verified-dealer', label: 'Verified Dealer Dashboard', icon: ShieldCheck, tag: 'Dashboard' },
        { path: '/omp/top-leads', label: 'AI Top Lead Radar', icon: Target, badge: 'AI Hot' },
        { path: '/omp/feed-sync', label: 'DMS Feed Sync', icon: RefreshCw, tag: 'Auto' },
        { path: '/omp/verify', label: 'Dealer Onboarding', icon: CheckCircle2, tag: '4-Step' },
        { path: '/omp/marketplace', label: 'Dealer Lot Inventory', icon: ShoppingBag, tag: 'B2C/B2B' },
      ],
    },
    {
      id: 'stock_recon',
      group: 'Stock The Lot & Recon',
      roles: ['DEALER_PRO', 'EXECUTIVE_ADMIN'],
      items: [
        { path: '/omp/vin-scanner', label: 'VIN Scanner & Bookout', icon: Camera, tag: 'Optical' },
        { path: '/omp/market-pricing', label: 'AI RealPrice™ Matrix', icon: TrendingUp, tag: 'Matrix' },
        { path: '/omp/title-search', label: 'NMVTIS Title & Lien', icon: FileSignature, tag: '50-State' },
        { path: '/omp/recon-center', label: 'Recon & Repair ROM', icon: Wrench, tag: 'Cost' },
        { path: '/omp/photo-genius', label: 'PhotoGenius AI Media', icon: Sparkles, tag: '3D Walk' },
        { path: '/omp/postmaster', label: 'AI Postmaster Social', icon: Share2, tag: 'Syndicate' },
        { path: '/omp/web-builder', label: 'Dealer WebBuilder', icon: Globe, tag: 'Instant' },
      ],
    },
    {
      id: 'sales_crm',
      group: 'Desking & Sales CRM',
      roles: ['DEALER_PRO', 'EXECUTIVE_ADMIN'],
      items: [
        { path: '/omp/desking/calculator', label: '60s Deal Calculator', icon: Calculator, tag: '4-Square' },
        { path: '/omp/crm/inbox', label: 'Unified Omnichannel Inbox', icon: Inbox, badge: '5' },
        { path: '/omp/crm/ai-receptionist', label: '24/7 AI Receptionist', icon: PhoneCall, tag: 'Voice AI' },
        { path: '/omp/financing/lenders', label: 'Auto Loans Marketplace', icon: Landmark, tag: 'OAL' },
        { path: '/omp/deals/e-sign', label: 'Digital E-Sign Jackets', icon: FileSignature, tag: 'Legal' },
      ],
    },
    {
      id: 'bhph_profit',
      group: 'In-House BHPH & Profit',
      roles: ['DEALER_PRO', 'EXECUTIVE_ADMIN'],
      items: [
        { path: '/omp/bhph/suite', label: 'BHPH Collections Suite', icon: Wallet, badge: '$14k' },
        { path: '/omp/finance/roi', label: 'ROI Profit Dashboard', icon: TrendingUp, tag: 'Gross' },
        { path: '/omp/finance/costs', label: 'Receipt & Cost Ledger', icon: Receipt, tag: 'VIN Cost' },
      ],
    },
    {
      id: 'executive_master',
      group: 'Executive Umbrella Suite',
      roles: ['EXECUTIVE_ADMIN'],
      items: [
        { path: '/omp/executive/central-office', label: 'Central Office Dashboard', icon: Building2, tag: 'Dashboard' },
        { path: '/omp/executive/permissions', label: 'Team Roles & RBAC', icon: ShieldAlert, tag: 'Security' },
        { path: '/omp/mobile', label: 'Smartphone Lot App', icon: Smartphone, tag: 'Field App' },
      ],
    },
  ];

  // Filter groups dynamically according to currently logged in role
  const currentRoleId = currentUser?.id || 'GUEST';
  const navGroups = allNavGroups.filter((g) => g.roles.includes(currentRoleId));

  const handleLogout = () => {
    logout();
    navigate('/login?logged_out=true');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* 1. TOPBAR */}
      <header
        style={{
          height: isMobile ? '56px' : '60px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 12px' : '0 20px',
          flexShrink: 0,
          zIndex: 50,
        }}
      >
        {/* Left Brand + Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isMobile && (
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
          )}

          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div
              style={{
                width: isMobile ? '32px' : '38px',
                height: isMobile ? '32px' : '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 10px rgba(2, 132, 199, 0.35)',
              }}
            >
              <ShoppingBag size={isMobile ? 18 : 20} />
            </div>
            <div>
              <div style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                OMP DEALS
              </div>
              <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', marginTop: '2px' }}>
                AI Marketplace & DMS
              </div>
            </div>
          </NavLink>
        </div>

        {/* Action Tools & Role Management */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '10px' }}>
          {/* Subscriptions Button (Johnny's Core Request) */}
          <button
            onClick={() => setIsSubscriptionOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              color: '#0284c7',
              padding: isMobile ? '5px 8px' : '6px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
            title="Manage CRM & Central Office Subscriptions"
          >
            <CreditCard size={13} />
            <span style={{ display: isMobile ? 'none' : 'inline' }}>Plans & Subscriptions</span>
            <span style={{ display: isMobile ? 'inline' : 'none' }}>Plans</span>
          </button>

          {/* Ask AI Button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              color: '#ffffff',
              border: 'none',
              padding: isMobile ? '6px 10px' : '7px 14px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
            }}
          >
            <Sparkles size={13} />
            <span style={{ display: isMobile ? 'none' : 'inline' }}>Ask OMP AI</span>
            <span style={{ display: isMobile ? 'inline' : 'none' }}>AI</span>
          </button>

          {!isMobile && (
            <>
              <button
                onClick={() => setIsSafeSpotsOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <ShieldCheck size={14} />
                <span>1,600+ Safe Spots</span>
              </button>

              <button
                onClick={() => setIsShippingOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Truck size={14} color="#0284c7" />
                <span>Shipping</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '6px',
                }}
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} color="#fbbf24" />}
              </button>
            </>
          )}

          {/* Role Status & Auth Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: isMobile ? 'none' : '1px solid var(--border)', paddingLeft: isMobile ? '0' : '10px' }}>
            {currentRoleId === 'GUEST' ? (
              <NavLink
                to="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#ffffff',
                  backgroundColor: '#0284c7',
                  padding: isMobile ? '6px 10px' : '6px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
                }}
              >
                <Key size={12} />
                <span>Sign In</span>
              </NavLink>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '8px' }}>
                <NavLink
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    padding: isMobile ? '5px 7px' : '5px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                  title="Switch Role or Login"
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                  <span>{currentUser.roleName.split(' ')[0]}</span>
                </NavLink>

                {/* Prominent Logout Button in Header (Desktop & Mobile) */}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: isMobile ? '6px 8px' : '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title="Logout from OMP Session"
                  id="omp-header-logout-btn"
                >
                  <LogOut size={13} />
                  {!isMobile && <span>Logout</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. SUBHEADER WITH ACTIVE ROLE & STORE STATUS */}
      <div
        style={{
          height: isMobile ? '38px' : '44px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 12px' : '0 20px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: isMobile ? '11px' : '12px', fontWeight: 700, color: '#0284c7' }}>
            <Car size={13} />
            <span>
              {currentRoleId === 'GUEST' && 'OFFERUP MARKETPLACE'}
              {currentRoleId === 'MEMBER' && 'VERIFIED SELLER PORTAL'}
              {currentRoleId === 'DEALER_PRO' && 'ADP DEALER ESSENTIALS'}
              {currentRoleId === 'EXECUTIVE_ADMIN' && 'EXECUTIVE CENTRAL OFFICE'}
            </span>
          </div>

          <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontWeight: 700 }}>
            {currentUser.roleName.split(' ')[0]}
          </span>
        </div>

        {/* Store Switcher for Dealers & Executives */}
        {(currentRoleId === 'DEALER_PRO' || currentRoleId === 'EXECUTIVE_ADMIN') ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Store size={13} color="#0284c7" />
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '3px 8px',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '11px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name.split(' (')[0]}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ fontSize: isMobile ? '10px' : '11.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} color="#0284c7" />
            <span>{selectedLocation}</span>
          </div>
        )}
      </div>

      {/* 3. MAIN BODY WITH ROLE-FILTERED SIDEBAR */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Desktop Left Sidebar (Hidden on Mobile) */}
        {!isMobile && (
          <aside
            style={{
              width: '265px',
              backgroundColor: 'var(--surface)',
              borderRight: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Scrollable Navigation Groups */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {navGroups.map((group, gIdx) => (
                <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--text-secondary)', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {group.group}
                  </div>

                  {group.items.map((item, iIdx) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (item.path === '/marketplace' && location.pathname === '/');

                    return (
                      <NavLink
                        key={iIdx}
                        to={item.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          backgroundColor: isActive ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                          color: isActive ? '#0284c7' : 'var(--text-primary)',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '12.5px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon size={16} color={isActive ? '#0284c7' : 'var(--text-secondary)'} />
                          <span>{item.label}</span>
                        </div>

                        {item.tag && (
                          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--surface-secondary)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            {item.tag}
                          </span>
                        )}

                        {item.badge !== undefined && (
                          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '9999px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 800 }}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Pinned Bottom User Session & Logout Card */}
            <div
              style={{
                padding: '12px',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  {currentUser.roleName ? currentUser.roleName.charAt(0) : 'U'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentUser.roleName || 'Guest User'}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#0284c7', fontWeight: 700 }}>
                    {currentUser.badge || 'Visitor'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <NavLink
                  to="/login"
                  style={{
                    flex: 1,
                    padding: '7px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    textAlign: 'center',
                  }}
                  title="Switch Role or Login"
                >
                  <User size={12} color="#0284c7" />
                  <span>{currentRoleId === 'GUEST' ? 'Sign In' : 'Switch'}</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  style={{
                    flex: 1,
                    padding: '7px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                  }}
                  title="Logout from OMP Session"
                  id="omp-sidebar-logout-btn"
                >
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '16px 14px 80px 14px' : '24px 30px',
            backgroundColor: 'var(--background)',
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Native Bottom Navigation Bar */}
      {isMobile && (
        <MobileBottomBar
          onOpenDrawer={() => setIsMobileDrawerOpen(true)}
          onOpenAi={() => setIsAiModalOpen(true)}
        />
      )}

      {/* Mobile Slide-Out App Drawer */}
      <MobileAppDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        navGroups={navGroups}
        onOpenSubscriptions={() => setIsSubscriptionOpen(true)}
      />

      {/* Modals */}
      <SubscriptionPlansModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />
      <OmpAiAgentModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <PoliceSafeSpotsModal isOpen={isSafeSpotsOpen} onClose={() => setIsSafeSpotsOpen(false)} />
      <ShippingCalculatorModal isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} />
    </div>
  );
};
