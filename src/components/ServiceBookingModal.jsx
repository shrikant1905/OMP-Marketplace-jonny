import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MessageSquare,
  Wrench,
  ShieldCheck,
  MapPin,
  Clock,
  Calendar,
  Car,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ServiceBookingModal = ({ isOpen, onClose, service }) => {
  const navigate = useNavigate();

  const [selectedIssue, setSelectedIssue] = useState('Brakes & Mechanical');
  const [timeframe, setTimeframe] = useState('asap');
  const [vehicleInfo, setVehicleInfo] = useState('2021 Ford F-150 Lariat');
  const [locationZip, setLocationZip] = useState('Fremont, CA 94538');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'sending' | 'success'
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && service) {
      setStep('form');
      setSelectedIssue('Brakes & Mechanical');
      setTimeframe('asap');
      setNotes(
        `Hi ${service.name}, I need on-site inspection for Brakes & Mechanical in Fremont. Please reply with availability and quote.`
      );
    }
  }, [isOpen, service]);

  if (!isOpen || !service) return null;

  const issueOptions = [
    'Brakes & Mechanical',
    'Won\'t Start / Battery',
    'A/C & Freon Leak',
    'Electrical & EV Charger',
    'Detailing / Ceramic',
    'Custom Diagnostics'
  ];

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setNotes(
      `Hi ${service.name}, I need on-site service for ${issue} in ${locationZip}. Please let me know your earliest arrival time.`
    );
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    setStep('sending');
    setTimeout(() => {
      setStep('success');
    }, 900);
  };

  const handleOpenInbox = () => {
    onClose();
    navigate('/omp/crm/inbox');
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
          maxWidth: '520px',
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
                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageSquare size={17} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {step === 'success' ? 'Request Sent' : 'Message & Request Quote'}
              </h3>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Direct Pro Dispatch • Instant Scheduling
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
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <>
              {/* Provider Mini Card */}
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> TruYou Verified Pro • {service.rating}
                  </div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {service.name}
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981' }}>
                  {service.rate}
                </div>
              </div>

              {/* Service Issue Selection Chips */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  SELECT SERVICE NEEDED
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {issueOptions.map((issue) => (
                    <button
                      key={issue}
                      type="button"
                      onClick={() => handleIssueSelect(issue)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        border: selectedIssue === issue ? '1.5px solid #0284c7' : '1px solid var(--border)',
                        backgroundColor: selectedIssue === issue ? 'rgba(2, 132, 199, 0.12)' : 'var(--surface-secondary)',
                        color: selectedIssue === issue ? '#0284c7' : 'var(--text-secondary)',
                        cursor: 'pointer',
                      }}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeframe Chips */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  PREFERRED TIMEFRAME
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'asap', label: '⚡ Emergency ASAP (2h)' },
                    { id: 'today', label: '📅 Today' },
                    { id: 'tomorrow', label: '🌅 Tomorrow' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTimeframe(t.id)}
                      style={{
                        flex: 1,
                        padding: '8px 6px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        border: timeframe === t.id ? '1.5px solid #10b981' : '1px solid var(--border)',
                        backgroundColor: timeframe === t.id ? 'rgba(16, 185, 129, 0.12)' : 'var(--surface-secondary)',
                        color: timeframe === t.id ? '#10b981' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle & Location Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    VEHICLE / MAKE MODEL
                  </label>
                  <input
                    type="text"
                    value={vehicleInfo}
                    onChange={(e) => setVehicleInfo(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      fontSize: '12px',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    SERVICE LOCATION / ZIP
                  </label>
                  <input
                    type="text"
                    value={locationZip}
                    onChange={(e) => setLocationZip(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      fontSize: '12px',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  MESSAGE TO SERVICE DISPATCHER
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '12px',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSendRequest}
                style={{
                  marginTop: '4px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                }}
              >
                <Send size={15} />
                <span>Send Service Inquiry ({service.rate})</span>
              </button>
            </>
          )}

          {/* STEP 2: SENDING ANIMATION */}
          {step === 'sending' && (
            <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', textAlign: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '4px solid rgba(2, 132, 199, 0.2)',
                  borderTopColor: '#0284c7',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Dispatching Quote Request to {service.name}...
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Connecting with mobile technician in {locationZip}
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS VIEW */}
          {step === 'success' && (
            <div style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 size={34} />
              </div>

              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Service Inquiry Sent!
                </h3>
                <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  Your request for <strong>{selectedIssue}</strong> has been delivered to <strong>{service.name}</strong>. Their mobile dispatcher typically replies in ~10 minutes.
                </p>
              </div>

              {/* Summary Card */}
              <div
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '12px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Service Type:</span>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{selectedIssue}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Standard Rate:</span>
                  <span style={{ fontWeight: 800, color: '#10b981' }}>{service.rate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Target Timeframe:</span>
                  <span style={{ fontWeight: 700, color: '#0284c7' }}>
                    {timeframe === 'asap' ? '⚡ Emergency ASAP (within 2h)' : timeframe === 'today' ? '📅 Today' : '🌅 Tomorrow'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Destination:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{locationZip}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleOpenInbox}
                  style={{
                    width: '100%',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Open Conversation in Inbox</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Keep Browsing Local Services
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
