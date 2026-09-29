import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Car,
  Plus,
  MessageCircle,
  Menu,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MobileBottomBar = ({ onOpenDrawer, onOpenAi }) => {
  const location = useLocation();
  const { myFavList } = useAuth();

  const tabs = [
    { path: '/marketplace', label: 'Home', icon: Home },
    { path: '/cars-trucks', label: 'Cars', icon: Car },
    { path: '/post-ad', label: 'Post (30s)', icon: Plus, isAction: true },
    { path: '/omp/crm/inbox', label: 'Inbox', icon: MessageCircle, badge: '3' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 60,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || (tab.path === '/marketplace' && location.pathname === '/');

        if (tab.isAction) {
          return (
            <NavLink
              key={idx}
              to={tab.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                position: 'relative',
                top: '-14px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.45)',
                  border: '3px solid var(--surface)',
                }}
              >
                <Plus size={26} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                Post (30s)
              </span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={idx}
            to={tab.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              textDecoration: 'none',
              color: isActive ? '#0284c7' : 'var(--text-secondary)',
              position: 'relative',
              padding: '6px 12px',
            }}
          >
            <Icon size={20} color={isActive ? '#0284c7' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '10px', fontWeight: isActive ? 800 : 600 }}>
              {tab.label}
            </span>

            {tab.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '10px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 900,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tab.badge}
              </span>
            )}
          </NavLink>
        );
      })}

      {/* 5th Tab: Menu & All Tools Drawer Trigger */}
      <button
        onClick={onOpenDrawer}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px 12px',
        }}
      >
        <Menu size={20} />
        <span style={{ fontSize: '10px', fontWeight: 600 }}>
          All Tools
        </span>
      </button>
    </nav>
  );
};
