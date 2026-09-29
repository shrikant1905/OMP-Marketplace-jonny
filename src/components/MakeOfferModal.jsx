import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShieldCheck,
  MapPin,
  Send,
  DollarSign,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Shield
} from 'lucide-react';

export const MakeOfferModal = ({ isOpen, onClose, item }) => {
  const navigate = useNavigate();

  // Parsing clean numeric price
  const askingNumeric = item?.price
    ? parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 100
    : 100;

  const [offerAmount, setOfferAmount] = useState(askingNumeric);
  const [pickupTime, setPickupTime] = useState('today');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'sending' | 'success'
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset form when item changes or modal opens
  useEffect(() => {
    if (item && isOpen) {
      const initialOffer = Math.round(askingNumeric * 0.9); // default 10% below
      setOfferAmount(initialOffer);
      setPickupTime('today');
      setMessage(
        `Hi ${item.seller || 'there'}, is $${initialOffer} acceptable? I can pick it up today at the police safe spot with cash/Zelle.`
      );
      setStep('form');
    }
  }, [item, isOpen, askingNumeric]);

  if (!isOpen || !item) return null;

  const difference = askingNumeric - offerAmount;

  const handlePresetSelect = (percent) => {
    const calculated = Math.round(askingNumeric * (1 - percent));
    setOfferAmount(calculated);
    setMessage(
      `Hi ${item.seller || 'there'}, is $${calculated} acceptable? I can pick it up ${pickupTime === 'today' ? 'today' : pickupTime === 'tomorrow' ? 'tomorrow' : 'this weekend'} at the police safe spot.`
    );
  };

  const handleSendOffer = (e) => {
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
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {step === 'success' ? 'Offer Submitted' : 'Make an Offer'}
              </h3>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                OfferUp Direct Negotiation • Safe Exchange
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
          {/* STEP 1: FORM VIEW */}
          {step === 'form' && (
            <>
              {/* Product Preview Card */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> TruYou Verified Seller: {item.seller}
                  </div>
                  <h4 style={{ margin: '2px 0 4px', fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: '#0284c7' }}>
                      Asking: {item.price}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--surface)' }}>
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Offer Amount Input & Presets */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  YOUR OFFER AMOUNT ($ USD)
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: '14px', fontSize: '20px', fontWeight: 900, color: '#10b981' }}>
                    $
                  </span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setOfferAmount(val);
                      setMessage(
                        `Hi ${item.seller || 'there'}, is $${val} acceptable? I can pick it up ${pickupTime === 'today' ? 'today' : pickupTime === 'tomorrow' ? 'tomorrow' : 'this weekend'} at the police safe spot.`
                      );
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 34px',
                      fontSize: '22px',
                      fontWeight: 900,
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '2px solid #0284c7',
                      borderRadius: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Offer Comparison Text */}
                <div style={{ marginTop: '6px', fontSize: '11.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {difference > 0 ? (
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>
                      ⚡ ${difference} below asking price ({Math.round((difference / askingNumeric) * 100)}% discount)
                    </span>
                  ) : difference === 0 ? (
                    <span style={{ color: '#10b981', fontWeight: 600 }}>
                      ✓ Full asking price offer (Highest chance of instant accept)
                    </span>
                  ) : (
                    <span style={{ color: '#3b82f6', fontWeight: 600 }}>
                      ★ ${Math.abs(difference)} above asking price
                    </span>
                  )}
                </div>

                {/* Quick Offer Presets */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect(0.15)}
                    style={{
                      flex: 1,
                      padding: '7px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    15% Off (${Math.round(askingNumeric * 0.85)})
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect(0.1)}
                    style={{
                      flex: 1,
                      padding: '7px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    10% Off (${Math.round(askingNumeric * 0.9)})
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect(0)}
                    style={{
                      flex: 1,
                      padding: '7px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Full Price (${askingNumeric})
                  </button>
                </div>
              </div>

              {/* Police Safe Meetup Spot */}
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
                <Shield size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#10b981' }}>
                    Safe Transaction Spot Auto-Attached
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {item.safeSpot || 'Fremont Police Dept - 24/7 Monitored Exchange Bay'}
                  </div>
                </div>
              </div>

              {/* Pickup Timeframe Chips */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  WHEN CAN YOU PICK UP?
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'today', label: '⚡ Today' },
                    { id: 'tomorrow', label: '📅 Tomorrow' },
                    { id: 'weekend', label: '🏖 This Weekend' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPickupTime(t.id)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: pickupTime === t.id ? '2px solid #0284c7' : '1px solid var(--border)',
                        backgroundColor: pickupTime === t.id ? 'rgba(2, 132, 199, 0.12)' : 'var(--surface-secondary)',
                        color: pickupTime === t.id ? '#0284c7' : 'var(--text-secondary)',
                        cursor: 'pointer',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message to Seller */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  MESSAGE TO {item.seller?.toUpperCase()}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '12.5px',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
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
                onClick={handleSendOffer}
                style={{
                  marginTop: '4px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(2, 132, 199, 0.35)',
                }}
              >
                <Send size={16} />
                <span>Send Offer of ${offerAmount}</span>
              </button>
            </>
          )}

          {/* STEP 2: SENDING LOADER */}
          {step === 'sending' && (
            <div style={{ padding: '50px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '4px solid rgba(2, 132, 199, 0.2)',
                  borderTopColor: '#0284c7',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Transmitting Offer to {item.seller}...
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Attaching OfferUp TruYou protection & Police Safe Spot coordinates
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === 'success' && (
            <div style={{ padding: '24px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '18px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Offer of ${offerAmount} Sent!
                </h3>
                <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  Your offer for <strong>{item.title}</strong> has been delivered to <strong>{item.seller}</strong>. They usually reply within 15 minutes.
                </p>
              </div>

              {/* Summary Pill */}
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
                  <span style={{ color: 'var(--text-secondary)' }}>Offered Price:</span>
                  <span style={{ fontWeight: 800, color: '#10b981' }}>${offerAmount} USD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Target Pickup:</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {pickupTime === 'today' ? 'Today' : pickupTime === 'tomorrow' ? 'Tomorrow' : 'This Weekend'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Safe Meetup Bay:</span>
                  <span style={{ fontWeight: 600, color: '#0284c7' }}>
                    {item.safeSpot || 'Fremont Police Dept'}
                  </span>
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
                    fontSize: '13.5px',
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
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Keep Browsing For Sale Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
