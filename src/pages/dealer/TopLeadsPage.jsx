import React from 'react';
import { Target, Phone, MessageSquare, Flame, CheckCircle2, User } from 'lucide-react';

export const TopLeadsPage = () => {
  const hotLeads = [
    {
      id: 'lead-1',
      buyer: 'Derrick Miller',
      phone: '(510) 555-0182',
      vehicle: '2024 Corvette Stingray 2LT ($79,900)',
      intentScore: 98,
      urgency: 'HIGH (Ready to buy within 24h)',
      status: 'Pre-Qualified with OAL Prime ($1,140/mo)',
      time: '4 mins ago',
    },
    {
      id: 'lead-2',
      buyer: 'Sarah Jenkins',
      phone: '(408) 555-0144',
      vehicle: '2023 Ford F-150 Lariat ($54,900)',
      intentScore: 94,
      urgency: 'HOT (Trade-In Valuation Completed)',
      status: 'Submitted $10k Cash Down Deposit',
      time: '18 mins ago',
    },
    {
      id: 'lead-3',
      buyer: 'Elena Rostova',
      phone: '(510) 555-0111',
      vehicle: '1969 Chevrolet Camaro SS ($46,500)',
      intentScore: 91,
      urgency: 'HOT (Requested Police Safe Meetup)',
      status: 'Cashier Check Ready for Inspection',
      time: '42 mins ago',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase' }}>
          <Flame size={14} />
          <span>AI BUYER RADAR • HIGH INTENT SCORING (TASK N-01)</span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          AI Top Lead Radar (Hot 90+ Score)
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Identifies buyers with highest likelihood to close based on credit pre-qual, payment calculations, and chat engagement.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {hotLeads.map((lead) => (
          <div
            key={lead.id}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '16px',
                }}
              >
                {lead.intentScore}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {lead.buyer}
                  </h3>
                  <span style={{ fontSize: '10.5px', color: '#ef4444', fontWeight: 800, backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    {lead.urgency}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{lead.time}</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0284c7', marginTop: '2px' }}>
                  {lead.vehicle}
                </div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>
                  ✓ {lead.status}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => alert(`Click-to-Call connecting to ${lead.buyer} at ${lead.phone}...`)}
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Phone size={14} />
                <span>Click-to-Call</span>
              </button>

              <button
                onClick={() => alert(`Opening direct chat with ${lead.buyer}...`)}
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <MessageSquare size={14} color="#0284c7" />
                <span>Text SMS</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
