import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Building, MapPin, MessageSquare, Trash2, FileText, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const JobStatusModal = ({ isOpen, onClose, job, onWithdraw }) => {
  const navigate = useNavigate();
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  if (!isOpen || !job) return null;

  const handleWithdraw = () => {
    if (onWithdraw) {
      onWithdraw(job.id);
    }
    setConfirmWithdraw(false);
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
          maxWidth: '490px',
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
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Application Status
              </h2>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
                Active Submission Record
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
          {/* Status Pipeline Banner */}
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '14px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                }}
              />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#10b981' }}>
                  Under Review by Hiring Team
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  Submitted today • Average review time: 24 to 48 hours
                </div>
              </div>
            </div>
            <Clock size={16} color="#10b981" />
          </div>

          {/* Job Summary Card */}
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

          {/* Submitted Fast Resume Details */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} color="#8b5cf6" />
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Attached Fast Resume
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Marcus_Sterling_Automotive_Resume.pdf
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: '11px',
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '3px 8px',
                borderRadius: '6px',
                fontWeight: 700,
              }}
            >
              Transmitted
            </span>
          </div>

          {/* Confirm Withdraw Alert or Primary Actions */}
          {confirmWithdraw ? (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '13px', fontWeight: 700 }}>
                <AlertCircle size={16} />
                <span>Withdraw Application?</span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                This will remove your candidate file from {job.company}'s active applicant pipeline. You can re-apply anytime.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={handleWithdraw}
                  style={{
                    flex: 1,
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Yes, Withdraw
                </button>
                <button
                  onClick={() => setConfirmWithdraw(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => {
                  onClose();
                  navigate('/omp/crm/inbox');
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#8b5cf6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
                }}
              >
                <MessageSquare size={16} />
                <span>Message Hiring Manager in CRM Inbox</span>
              </button>

              <button
                onClick={() => setConfirmWithdraw(true)}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Trash2 size={14} />
                <span>Withdraw Application</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
