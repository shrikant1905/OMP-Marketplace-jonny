import React, { useState, useEffect } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, DollarSign, Building, Lock, Send, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const BusinessNdaModal = ({ isOpen, onClose, business }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [signerPhone, setSignerPhone] = useState('(214) 555-0812');
  const [buyerType, setBuyerType] = useState('cash');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [signatureText, setSignatureText] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const name = user.name || 'Marcus Sterling';
      setSignerName(name);
      setSignerEmail(user.email || 'marcus@dealerpro.com');
      setSignatureText(name);
    }
    if (isOpen) {
      setIsTransmitting(false);
      setIsSuccess(false);
    }
  }, [user, isOpen, business]);

  if (!isOpen || !business) return null;

  const buyerCapacityOptions = [
    { id: 'cash', label: '💰 Cash Buyer ($250k - $500k)' },
    { id: 'sba', label: '🏦 SBA Loan Pre-Approved' },
    { id: 'pe', label: '🏢 Corporate / Private Equity' },
    { id: 'seller', label: '🤝 Owner Financing Requested' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signatureText.trim()) return;

    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setIsSuccess(true);
    }, 1000);
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
          maxWidth: '520px',
          maxHeight: '92vh',
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
                backgroundColor: 'rgba(59, 130, 246, 0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b82f6',
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Confidential NDA & Financials
              </h2>
              <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600 }}>
                Broker-Protected Acquisition Deal Room
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
          {isSuccess ? (
            /* Success Screen */
            <div style={{ textAlign: 'center', padding: '24px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  NDA Executed & Deal Room Open!
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Your signed Non-Disclosure Agreement and buyer profile have been transmitted to the listing broker for <strong>{business.title}</strong>.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '14px',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div><strong>Business:</strong> {business.title}</div>
                <div><strong>Asking Price:</strong> {business.askingPrice} ({business.cashFlow})</div>
                <div><strong>Signed By:</strong> {signatureText} (Legal Electronic Signature)</div>
                <div><strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: 700 }}>🟢 Deal Room Access Granted • Broker Notified</span></div>
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '6px' }}>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/omp/crm/inbox');
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  💬 Enter Deal Room in CRM Inbox
                </button>
                <button
                  onClick={onClose}
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* NDA Request Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Financial Teaser Card */}
              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11.5px', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase' }}>
                  {business.industry} • {business.location}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {business.title}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '4px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Asking Price</div>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)' }}>{business.askingPrice}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Gross Rev</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{business.grossRevenue}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Net Cash Flow</div>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: '#10b981' }}>{business.cashFlow}</div>
                  </div>
                </div>
              </div>

              {/* Buyer Qualification */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Buyer Purchasing Capacity / Proof of Funds
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {buyerCapacityOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBuyerType(opt.id)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: buyerType === opt.id ? '1px solid #3b82f6' : '1px solid var(--border)',
                        backgroundColor: buyerType === opt.id ? 'rgba(59, 130, 246, 0.12)' : 'var(--surface)',
                        color: buyerType === opt.id ? '#3b82f6' : 'var(--text-primary)',
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

              {/* Contact Information */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Prospective Buyer Legal Entity / Principal
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => {
                      setSignerName(e.target.value);
                      setSignatureText(e.target.value);
                    }}
                    placeholder="Legal Full Name / LLC"
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                    }}
                  />
                  <input
                    type="tel"
                    required
                    value={signerPhone}
                    onChange={(e) => setSignerPhone(e.target.value)}
                    placeholder="Phone"
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                    }}
                  />
                </div>
                <input
                  type="email"
                  required
                  value={signerEmail}
                  onChange={(e) => setSignerEmail(e.target.value)}
                  placeholder="Corporate Email"
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: '12.5px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* NDA Legal Agreement Clause */}
              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  maxHeight: '80px',
                  overflowY: 'auto',
                }}
              >
                <strong>NON-DISCLOSURE & CONFIDENTIALITY AGREEMENT:</strong> The undersigned agrees that all financial books, dealer licenses, lease contracts, customer rosters, and tax schedules provided for {business.title} are strictly proprietary. The Recipient agrees not to contact employees, landlords, or competitors without written broker authorization.
              </div>

              {/* Digital E-Signature */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Electronic Signature (Type full legal name)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    placeholder="/s/ Full Legal Name"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #3b82f6',
                      backgroundColor: 'rgba(59, 130, 246, 0.05)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                    }}
                  />
                  <span style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    ✓ Legally Binding E-Sign
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isTransmitting || !signatureText.trim()}
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: isTransmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px',
                  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
                  opacity: isTransmitting ? 0.75 : 1,
                }}
              >
                {isTransmitting ? (
                  <span>Executing NDA & Opening Deal Room...</span>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Sign NDA & Unlock Financial Package</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
