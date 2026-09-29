import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  PhoneCall,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  MapPin,
  Sparkles,
  Zap
} from 'lucide-react';

export const ServiceDispatcherModal = ({ isOpen, onClose, service }) => {
  const [copied, setCopied] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [callbackStep, setCallbackStep] = useState('input'); // 'input' | 'calling' | 'success'
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCallbackStep('input');
      setCustomerPhone('');
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText(service.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestCallback = (e) => {
    e.preventDefault();
    if (!customerPhone.trim()) return;

    setCallbackStep('calling');
    setTimeout(() => {
      setCallbackStep('success');
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? '0' : '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--surface)',
          borderRadius: isMobile ? '24px 24px 0 0' : '22px',
          border: '1px solid var(--border)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          maxHeight: isMobile ? '92vh' : '90vh',
          display: 'flex',
          flexDirection: 'column',
          animation: isMobile ? 'slideUp 0.25s ease-out' : 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneCall size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Direct Dispatcher Connect
              </h3>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                24/7 Mobile Roadside & On-Site Service
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
              padding: '6px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Service Provider Card */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> TruYou Verified Pro
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', backgroundColor: 'var(--surface)', padding: '2px 6px', borderRadius: '4px' }}>
                {service.rating}
              </span>
            </div>

            <h4 style={{ margin: 0, fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {service.name}
            </h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                <MapPin size={12} color="#0284c7" />
                <span>{service.location}</span>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 900, color: '#10b981' }}>
                {service.rate}
              </span>
            </div>
          </div>

          {/* Live Dispatcher Status */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)' }}>
              <strong>Dispatcher Online Now</strong> • Avg pickup time: <span style={{ color: '#10b981', fontWeight: 700 }}>24 seconds</span>
            </div>
          </div>

          {/* Call Direct Action */}
          <div>
            <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              DIRECT DISPATCH HOTLINE
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={`tel:${service.phone}`}
                style={{
                  flex: 1,
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  padding: '13px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                }}
              >
                <Phone size={18} />
                <span>Call {service.phone}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyNumber}
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: copied ? '#10b981' : 'var(--text-primary)',
                  padding: '0 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                }}
                title="Copy phone number"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 700 }}>OR GET AN INSTANT CALLBACK</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          </div>

          {/* Instant Callback Section */}
          <div style={{ backgroundColor: 'var(--surface-secondary)', borderRadius: '14px', padding: '14px', border: '1px solid var(--border)' }}>
            {callbackStep === 'input' && (
              <form onSubmit={handleRequestCallback} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={14} color="#f59e0b" />
                    <span>Have the Dispatcher Call You in 60 Seconds</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Enter your phone number and our automated queue priority dials your line.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(510) 555-0199"
                    required
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      fontSize: '13.5px',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Call Me Now
                  </button>
                </div>
              </form>
            )}

            {callbackStep === 'calling' && (
              <div style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '3px solid rgba(2, 132, 199, 0.2)',
                    borderTopColor: '#0284c7',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Connecting your line with {service.name} dispatcher...
                </div>
              </div>
            )}

            {callbackStep === 'success' && (
              <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>
                    Call Dispatched!
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    Your phone <strong>{customerPhone}</strong> will ring in ~45 seconds from {service.phone}.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
