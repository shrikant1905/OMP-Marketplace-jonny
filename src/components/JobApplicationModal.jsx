import React, { useState, useEffect } from 'react';
import { X, Send, Building, DollarSign, MapPin, CheckCircle2, FileText, Upload, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const JobApplicationModal = ({ isOpen, onClose, job, onApplySuccess }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('(415) 890-2341');
  const [selectedChips, setSelectedChips] = useState(['5+ Years Automotive Experience']);
  const [coverNote, setCoverNote] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setApplicantName(user.name || 'Marcus Sterling');
      setApplicantEmail(user.email || 'marcus@dealerpro.com');
    }
    if (isOpen) {
      setIsTransmitting(false);
      setIsSuccess(false);
      setCoverNote('');
    }
  }, [user, isOpen, job]);

  if (!isOpen || !job) return null;

  const quickChips = [
    '5+ Years Automotive Experience',
    'CDK / Reynolds DMS Certified',
    'Prime & Subprime Desking Expert',
    'Immediate Availability',
    'B2B Fleet Sales Background',
  ];

  const toggleChip = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setIsSuccess(true);
      if (onApplySuccess) {
        onApplySuccess(job.id);
      }
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
                backgroundColor: 'rgba(139, 92, 246, 0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b5cf6',
              }}
            >
              <Send size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                1-Click Fast Job Application
              </h2>
              <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600 }}>
                Verified OMP Deals Direct Career Lead
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
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {isSuccess ? (
            /* Success View */
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
                  Application Delivered!
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Your profile and Fast Resume have been submitted directly to the hiring desk at <strong>{job.company}</strong>.
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
                <div><strong>Role:</strong> {job.title}</div>
                <div><strong>Compensation:</strong> {job.salary}</div>
                <div><strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: 700 }}>🟢 Under Review (Avg. response within 24-48 hrs)</span></div>
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '6px' }}>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/omp/crm/inbox');
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#8b5cf6',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  💬 Track in CRM Inbox
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
            /* Application Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Job Summary Banner */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8b5cf6', fontWeight: 700 }}>
                  <Building size={14} />
                  <span>{job.company}</span>
                  <span style={{ color: 'var(--text-tertiary)' }}>• {job.type}</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {job.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#10b981' }}>{job.salary}</span>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={11} color="#0284c7" />
                    {job.location}
                  </span>
                </div>
              </div>

              {/* Applicant Profile Pre-fill */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Candidate Contact Details
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Full Name"
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
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="Phone Number"
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
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="Email Address"
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

              {/* Fast Resume Attachment */}
              <div
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.06)',
                  border: '1px dashed #8b5cf6',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={20} color="#8b5cf6" />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {applicantName ? `${applicantName.replace(' ', '_')}_Resume.pdf` : 'Candidate_Resume.pdf'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                      ✓ Verified OMP Fast Profile Attached (340 KB)
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Resume uploaded: New version attached successfully.')}
                  style={{
                    background: 'none',
                    border: '1px solid #8b5cf6',
                    borderRadius: '6px',
                    color: '#8b5cf6',
                    padding: '5px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Upload size={11} />
                  Replace
                </button>
              </div>

              {/* Quick Experience / Highlight Chips */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Highlight Qualifications to Hiring Manager (Tap to select)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {quickChips.map((chip, idx) => {
                    const isSelected = selectedChips.includes(chip);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleChip(chip)}
                        style={{
                          backgroundColor: isSelected ? '#8b5cf6' : 'var(--surface-secondary)',
                          color: isSelected ? '#ffffff' : 'var(--text-primary)',
                          border: isSelected ? '1px solid #8b5cf6' : '1px solid var(--border)',
                          borderRadius: '8px',
                          padding: '6px 11px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Cover Note */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Quick Note / Introduction (Optional)
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder={`Hi ${job.company} hiring team, I am interested in the ${job.title} role. I am local to ${job.location} and ready for an interview.`}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: '12.5px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isTransmitting}
                style={{
                  backgroundColor: '#8b5cf6',
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
                  opacity: isTransmitting ? 0.75 : 1,
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
                }}
              >
                {isTransmitting ? (
                  <span>Transmitting to Hiring Desk...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Transmit 1-Click Application</span>
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
