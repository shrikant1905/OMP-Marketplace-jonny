import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  User,
  ShoppingBag,
  Car,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  Store,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MobileAppDrawer = ({ isOpen, onClose, navGroups, onOpenSubscriptions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, activeSubscriptions } = useAuth();

  if (!isOpen) return null;

  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login?logged_out=true');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '85%',
          maxWidth: '320px',
          height: '100%',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          animation: 'slideInLeft 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Profile Card */}
        <div
          style={{
            padding: '20px 16px',
            backgroundColor: 'var(--surface-secondary)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '16px',
                }}
              >
                {currentUser.roleName.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {currentUser.roleName}
                </div>
                <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700 }}>
                  {currentUser.badge}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Subscription Manager Quick Pill */}
          <button
            onClick={() => {
              onClose();
              onOpenSubscriptions();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#0284c7',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={14} />
              <span>Subscription Plans ({activeSubscriptions.length} Active)</span>
            </div>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Navigation Groups Touch Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--text-secondary)', padding: '4px 10px', textTransform: 'uppercase' }}>
                {group.group}
              </div>

              {group.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path === '/marketplace' && location.pathname === '/');

                return (
                  <button
                    key={iIdx}
                    onClick={() => handleLinkClick(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: isActive ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                      color: isActive ? '#0284c7' : 'var(--text-primary)',
                      fontWeight: isActive ? 800 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={17} color={isActive ? '#0284c7' : 'var(--text-secondary)'} />
                      <span>{item.label}</span>
                    </div>

                    {item.tag && (
                      <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--surface-secondary)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {item.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Drawer Footer (Logout & Switch Role) */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <User size={14} color="#0284c7" />
            <span>Switch Role</span>
          </button>

          {currentUser.id !== 'GUEST' && (
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#ef4444',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
