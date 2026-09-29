import React from 'react';
import {
  CreditCard,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
  Building2,
  Inbox,
  ShoppingBag,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SubscriptionPlansModal = ({ isOpen, onClose }) => {
  const { activeSubscriptions, toggleSubscription } = useAuth();

  if (!isOpen) return null;

  const plans = [
    {
      id: 'MARKETPLACE',
      name: 'Public Marketplace',
      price: '$0',
      period: 'Forever Free',
      badge: 'Core Platform',
      badgeColor: '#10b981',
      desc: 'Standard local & nationwide OfferUp classifieds for buyers & private sellers.',
      icon: ShoppingBag,
      features: [
        'Browse all 8 Marketplace Categories',
        'OMP AI Natural Language Search',
        'Post listings in 30 seconds',
        '1,600+ Police Safe Meetup Spots',
        'TruYou Seller Verification',
      ],
      isFree: true,
    },
    {
      id: 'CRM',
      name: 'OMP CRM & Sales Desking',
      price: '$149',
      period: 'per month / dealer',
      badge: 'Dealer Pro Add-on',
      badgeColor: '#0284c7',
      desc: 'Complete auto sales desking, omnichannel messaging, and AI voice call attendant.',
      icon: Inbox,
      features: [
        'Omnichannel Unified Inbox (SMS/Email/Chat)',
        '24/7 AI Phone Receptionist & Call Simulator',
        '60s Deal Structuring Calculator (BHPH/Finance)',
        'AI Top Lead Radar (Purchase-Intent Scoring)',
        'Stock The Lot (VIN Scanner & Carfax)',
      ],
    },
    {
      id: 'CENTRAL_OFFICE',
      name: 'Executive Central Office',
      price: '$299',
      period: 'per month / franchise',
      badge: 'Multi-Store HQ',
      badgeColor: '#8b5cf6',
      desc: 'Master umbrella oversight for franchise dealerships managing multiple store branches.',
      icon: Building2,
      features: [
        'Multi-Store Dealership Umbrella (Dallas, Houston, Austin)',
        'Consolidated Group P&L & Turn Days Telemetry',
        'Franchise Store License Allocations (3/5 Stores)',
        'DMV Audit Risk & Regulatory Safeguards',
        'Team Management & Granular RBAC Permissions',
      ],
    },
    {
      id: 'BUNDLE',
      name: 'Complete Enterprise Suite',
      price: '$399',
      period: 'per month (Save $49)',
      badge: 'Best Value Bundle',
      badgeColor: '#f59e0b',
      desc: 'Full-featured enterprise power including CRM, Desking, and Executive Central Office.',
      icon: Sparkles,
      features: [
        'All OMP CRM Pro & 24/7 AI Voice Receptionist',
        'All Executive Central Office Multi-Store Controls',
        'Unlimited Dealership Lot DMS Feed Syncs',
        'Priority Lender Marketplace Approvals',
        'Dedicated Enterprise Account Executive',
      ],
      isBundle: true,
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          backgroundColor: 'var(--surface)',
          borderRadius: '24px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 30px',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                OMP Deals Modular Subscriptions
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Independent add-on subscriptions for CRM and Executive Central Office. Core Marketplace is always free.
              </p>
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
            <X size={20} />
          </button>
        </div>

        {/* Plans Grid */}
        <div
          style={{
            padding: '30px',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '20px',
          }}
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSubscribed = plan.isFree || (plan.isBundle ? (activeSubscriptions.includes('CRM') && activeSubscriptions.includes('CENTRAL_OFFICE')) : activeSubscriptions.includes(plan.id));

            return (
              <div
                key={plan.id}
                style={{
                  backgroundColor: isSubscribed ? 'var(--surface)' : 'var(--surface-secondary)',
                  borderRadius: '18px',
                  border: isSubscribed ? `2px solid ${plan.badgeColor}` : '1px solid var(--border)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  position: 'relative',
                  boxShadow: isSubscribed ? `0 8px 24px -6px ${plan.badgeColor}33` : 'none',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 800, color: plan.badgeColor, backgroundColor: `${plan.badgeColor}18`, padding: '2px 8px', borderRadius: '9999px', textTransform: 'uppercase' }}>
                      {plan.badge}
                    </span>
                    <Icon size={18} color={plan.badgeColor} />
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 16px', minHeight: '32px' }}>
                    {plan.desc}
                  </p>

                  <div style={{ marginBottom: '18px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>{plan.price}</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginLeft: '4px' }}>/ {plan.period}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11.5px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={13} color={plan.badgeColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ lineHeight: 1.35 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (plan.isFree) return;
                    if (plan.isBundle) {
                      toggleSubscription('CRM');
                      toggleSubscription('CENTRAL_OFFICE');
                    } else {
                      toggleSubscription(plan.id);
                    }
                  }}
                  disabled={plan.isFree}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '12.5px',
                    cursor: plan.isFree ? 'default' : 'pointer',
                    backgroundColor: plan.isFree ? 'var(--surface-secondary)' : isSubscribed ? 'rgba(239, 68, 68, 0.12)' : plan.badgeColor,
                    color: plan.isFree ? 'var(--text-secondary)' : isSubscribed ? '#ef4444' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {plan.isFree ? (
                    'Always Active & Free'
                  ) : isSubscribed ? (
                    'Cancel Subscription'
                  ) : (
                    <>
                      <span>Subscribe Plan</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
