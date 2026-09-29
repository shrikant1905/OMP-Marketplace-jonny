import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Car,
  ShoppingBag,
  ShieldCheck,
  RefreshCw,
  Target,
  Camera,
  TrendingUp,
  FileSignature,
  Wrench,
  Sparkles,
  Share2,
  Calculator,
  Landmark,
  Building2,
  Store,
  ArrowLeft,
  Sun,
  Moon,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OmpDealerLayout = () => {
  const { currentUser, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState('dallas');

  const stores = [
    { id: 'all', name: '🏢 All Locations (Consolidated)', city: 'National Umbrella', cars: 142 },
    { id: 'dallas', name: '📍 Dallas Central Motors', city: 'Dallas, TX', cars: 58 },
    { id: 'houston', name: '📍 Houston North Auto Mall', city: 'Houston, TX', cars: 49 },
    { id: 'austin', name: '📍 Austin West Dealership', city: 'Austin, TX', cars: 35 },
  ];

  const navGroups = [
    {
      group: 'Marketplace & Verified Dealers',
      items: [
        { path: '/dealer/hub', label: 'Verified Dealer Hub', icon: ShieldCheck, tag: 'ADP' },
        { path: '/dealer/top-leads', label: 'AI Top Lead Radar', icon: Target, badge: '90+ Hot' },
        { path: '/dealer/dms-sync', label: 'DMS Feed Auto-Sync', icon: RefreshCw, tag: 'CDK' },
        { path: '/for-sale', label: 'Public Marketplace', icon: ShoppingBag, tag: 'Live' },
      ],
    },
    {
      group: 'Stock The Lot & Recon Suite',
      items: [
        { path: '/dealer/vin-scanner', label: 'VIN Scanner & Bookout', icon: Camera, tag: 'KBB' },
        { path: '/dealer/recon-center', label: 'Recon Center (ROM)', icon: Wrench, tag: 'Cost' },
        { path: '/cars-trucks', label: 'AI Body-Type Locator', icon: Car, tag: 'Taxonomy' },
      ],
    },
    {
      group: 'Desking & Loans (OAL Bridge)',
      items: [
        { path: '/dealer/deal-calculator', label: '60s Deal Calculator', icon: Calculator, tag: '4-Square' },
      ],
    },
    {
      group: 'Executive Franchise Suite',
      items: [
        { path: '/executive/central-office', label: 'Central Office Umbrella', icon: Building2, tag: 'Master' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Car size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '15px', color: 'var(--text-primary)' }}>OMP AUTO SUITE</div>
            <div style={{ fontSize: '10.5px', color: '#0284c7', fontWeight: 700 }}>Dealer DMS & Desking</div>
          </div>
        </div>

        {/* Store Switcher */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <Store size={13} color="#0284c7" />
            <span>ACTIVE STORE BRANCH</span>
          </div>
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.cars} cars)
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Menus */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 8px 6px' }}>
                {grp.group}
              </div>
              {grp.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                      color: isActive ? '#0284c7' : 'var(--text-primary)',
                      textDecoration: 'none',
                      marginBottom: '2px',
                    })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={15} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '10px', backgroundColor: '#ef4444', color: '#fff', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                        {item.badge}
                      </span>
                    )}
                    {item.tag && (
                      <span style={{ fontSize: '10px', backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '1px 5px', borderRadius: '4px' }}>
                        {item.tag}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Back to Marketplace */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Public Marketplace</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '56px',
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '6px' }}>
              ✓ LIVE DMS AUTO-SYNCED (58 CARS)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} color="#fbbf24" />}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              <User size={15} color="#0284c7" />
              <span>{currentUser.roleName}</span>
            </div>
            <button onClick={logout} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Scrollable Body */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
