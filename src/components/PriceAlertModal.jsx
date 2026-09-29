import React, { useState } from 'react';
import { X, Bell, BellOff, CheckCircle2, ShieldCheck, DollarSign, Smartphone, Mail, Sparkles } from 'lucide-react';

export const PriceAlertModal = ({ isOpen, onClose, item, isAlertActive, onToggleAlert }) => {
  const [selectedThreshold, setSelectedThreshold] = useState('any');
  const [channels, setChannels] = useState({
    inbox: true,
    sms: true,
    email: false,
  });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !item) return null;

  const thresholdOptions = [
    { id: 'any', label: '⚡ Any Price Drop (Instant)' },
    { id: '5pct', label: '📉 5% Drop or More' },
    { id: '10pct', label: '🔥 10% Drop or More' },
    { id: 'below', label: '🎯 Below Market Value' },
  ];

  const handleSave = () => {
    setIsSaved(true);
    if (!isAlertActive && onToggleAlert) {
      onToggleAlert(item.id);
    }
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  const handleMute = () => {
    if (isAlertActive && onToggleAlert) {
      onToggleAlert(item.id);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--surface)',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <Bell size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Price Drop Alert Settings
              </h2>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
                Real-Time AI Market Tracker
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Target Item Card */}
          <div
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
              {item.category || 'Marketplace Deal'}
            </span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981', marginTop: '2px' }}>
              {item.price}
            </div>
          </div>

          {/* Trigger Threshold */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Notify Me When Price Drops By:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {thresholdOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedThreshold(opt.id)}
                  style={{
                    padding: '9px 10px',
                    borderRadius: '8px',
                    border: selectedThreshold === opt.id ? '1px solid #10b981' : '1px solid var(--border)',
                    backgroundColor: selectedThreshold === opt.id ? 'rgba(16, 185, 129, 0.12)' : 'var(--surface)',
                    color: selectedThreshold === opt.id ? '#10b981' : 'var(--text-primary)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Channels */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Notification Channels
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={14} color="#0284c7" />
                  <span>OMP Deals In-App / CRM Inbox</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.inbox}
                  onChange={(e) => setChannels({ ...channels, inbox: e.target.checked })}
                  style={{ accentColor: '#10b981', cursor: 'pointer' }}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smartphone size={14} color="#10b981" />
                  <span>Instant SMS to Registered Phone</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.sms}
                  onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                  style={{ accentColor: '#10b981', cursor: 'pointer' }}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#8b5cf6" />
                  <span>Daily Price-Drop Email Digest</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.email}
                  onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                  style={{ accentColor: '#10b981', cursor: 'pointer' }}
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
              }}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Alert Preferences Saved!</span>
                </>
              ) : (
                <>
                  <Bell size={16} />
                  <span>Save Alert Preferences</span>
                </>
              )}
            </button>

            {isAlertActive ? (
              <button
                onClick={handleMute}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <BellOff size={14} />
                <span>Mute All Alerts for this Item</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Bell size={14} />
                <span>Turn Alerts Back On</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
