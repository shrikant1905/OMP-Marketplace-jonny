import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Car,
  Wrench,
  Briefcase,
  Home,
  Building,
  Search,
  Sparkles,
  Heart,
  PlusCircle,
  MapPin,
  ShieldCheck,
  Truck,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Store,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OmpAiAgentModal } from '../components/OmpAiAgentModal';
import { PoliceSafeSpotsModal } from '../components/PoliceSafeSpotsModal';
import { ShippingCalculatorModal } from '../components/ShippingCalculatorModal';

export const MarketplaceLayout = () => {
  const {
    currentUser,
    logout,
    theme,
    toggleTheme,
    selectedRadius,
    setSelectedRadius,
    selectedLocation,
    setSelectedLocation,
    myFavList,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSafeSpotsOpen, setIsSafeSpotsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { path: '/for-sale', label: 'For Sale', icon: ShoppingBag, tag: 'All Items' },
    { path: '/cars-trucks', label: 'AI Cars & Trucks', icon: Car, tag: 'AI Locator' },
    { path: '/services', label: 'Services', icon: Wrench, tag: '30+ Pros' },
    { path: '/jobs', label: 'Job Finder', icon: Briefcase, tag: 'Local Gigs' },
    { path: '/real-estate', label: 'Real Estate', icon: Home, tag: 'Rent / Buy' },
    { path: '/businesses', label: 'Business For Sale', icon: Building, tag: 'Turnkey' },
    { path: '/looking-for', label: 'Looking For', icon: Search, tag: 'Wanted' },
    { path: '/my-fav', label: 'MyFav', icon: Heart, badge: myFavList.length },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
      {/* 1. TOP UTILITY TICKER (Trust & Tools Bar) */}
      <div
        style={{
          backgroundColor: 'var(--surface-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '6px 20px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            <strong>OMP DEALS MARKETPLACE</strong> • OfferUp-Style AI Marketplace
          </span>

          <button
            onClick={() => setIsSafeSpotsOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#10b981',
              fontWeight: 700,
              fontSize: '11.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <ShieldCheck size={14} />
            <span>1,600+ Police Safe Spots</span>
          </button>

          <button
            onClick={() => setIsShippingOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0284c7',
              fontWeight: 700,
              fontSize: '11.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <Truck size={14} />
            <span>Nationwide Insured Shipping</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Quick SSO switch to CRM nErgy AI */}
          <a
            href="http://localhost:3000/crm/dashboard"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
            }}
          >
            <Layers size={12} color="#0284c7" />
            <span>Switch to CRM nErgy AI (Port 3000)</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#fbbf24" />}
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER & SEARCH BAR */}
      <header
        style={{
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '14px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* Brand Logo */}
          <NavLink
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              }}
            >
              <ShoppingBag size={22} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
                OMP DEALS
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>
                AI Marketplace & DMS
              </div>
            </div>
          </NavLink>

          {/* Location & Radius Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              padding: '6px 12px',
              borderRadius: '10px',
              fontSize: '12.5px',
            }}
          >
            <MapPin size={15} color="#0284c7" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="Fremont, CA">Fremont, CA</option>
              <option value="Dallas, TX">Dallas, TX</option>
              <option value="Fort Lauderdale, FL">Fort Lauderdale, FL</option>
              <option value="Houston, TX">Houston, TX</option>
              <option value="Nationwide">Nationwide (All US)</option>
            </select>
            <span style={{ color: 'var(--border)' }}>|</span>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="15">15 mi</option>
              <option value="30">30 mi</option>
              <option value="50">50 mi</option>
              <option value="100">100 mi</option>
              <option value="all">Any Dist</option>
            </select>
          </div>

          {/* Search Input with OMP AI Trigger */}
          <div
            style={{
              flex: 1,
              minWidth: '280px',
              maxWidth: '520px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '4px 6px',
            }}
          >
            <Search size={18} color="var(--text-tertiary)" style={{ marginLeft: '8px' }} />
            <input
              type="text"
              placeholder="Search cars, jobs, services, electronics, real estate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '8px 10px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              onClick={() => setIsAiModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
              }}
            >
              <Sparkles size={13} />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Post Ad Wizard */}
            <button
              onClick={() => navigate('/post-ad')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.25)',
              }}
            >
              <PlusCircle size={16} />
              <span>Post Free Ad</span>
            </button>

            {/* Role / User Button */}
            {currentUser.id === 'GUEST' ? (
              <button
                onClick={() => navigate('/login')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <User size={15} color="#0284c7" />
                <span>Sign In / Roles</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => navigate(currentUser.defaultRoute)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <User size={14} color="#10b981" />
                  <span>{currentUser.roleName.split(' ')[0]} ({currentUser.badge.split(' ')[0]})</span>
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    padding: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. 8 CORE CATEGORY NAVBAR */}
      <nav
        style={{
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0 20px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = location.pathname === cat.path;

            return (
              <NavLink
                key={cat.path}
                to={cat.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '12px 14px',
                  color: isActive ? '#0284c7' : 'var(--text-secondary)',
                  borderBottom: isActive ? '3px solid #0284c7' : '3px solid transparent',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={16} color={isActive ? '#0284c7' : 'inherit'} />
                <span>{cat.label}</span>
                {cat.badge !== undefined && (
                  <span
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      padding: '1px 6px',
                      fontWeight: 800,
                    }}
                  >
                    {cat.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <NavLink
              to="/dealer/hub"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#0284c7',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(2, 132, 199, 0.08)',
                textDecoration: 'none',
              }}
            >
              <ShieldCheck size={13} />
              <span>Dealer DMS Portal</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* 4. MAIN BODY OUTLET */}
      <main style={{ flex: 1, padding: '24px 20px 80px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
        <Outlet />
      </main>

      {/* 5. FOOTER */}
      <footer
        style={{
          backgroundColor: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '40px 20px 30px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginBottom: '30px',
          }}
        >
          <div>
            <div style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '16px', marginBottom: '8px' }}>
              OMP DEALS MARKETPLACE
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.6 }}>
              The next-generation AI-powered classifieds and automotive marketplace. Buy & sell cars, local services, jobs, and real estate with 1,600+ Police Safe MeetUp spots.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>8 Marketplace Categories</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12.5px' }}>
              <NavLink to="/cars-trucks">AI Cars & Trucks</NavLink>
              <NavLink to="/services">Local Services Directory</NavLink>
              <NavLink to="/jobs">Job Finder (30+ Domains)</NavLink>
              <NavLink to="/real-estate">Real Estate Properties</NavLink>
              <NavLink to="/businesses">Business For Sale</NavLink>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Dealer & Business Hub</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12.5px' }}>
              <NavLink to="/dealer/hub">ADP Verified Auto Dealer Hub</NavLink>
              <NavLink to="/executive/central-office">OMP Executive Central Office</NavLink>
              <NavLink to="/dealer/vin-scanner">VIN Scanner & Bookout</NavLink>
              <NavLink to="/dealer/deal-calculator">60s Deal Calculator</NavLink>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', textAlign: 'center', fontSize: '12px' }}>
          © 2026 OMP Deals • OAL Network & CRM nErgy Ecosystem • All Rights Reserved.
        </div>
      </footer>

      {/* Global Modals */}
      <OmpAiAgentModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <PoliceSafeSpotsModal isOpen={isSafeSpotsOpen} onClose={() => setIsSafeSpotsOpen(false)} />
      <ShippingCalculatorModal isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} />
    </div>
  );
};
