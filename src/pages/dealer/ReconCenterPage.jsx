import React from 'react';
import { Wrench, CheckCircle2, Clock, DollarSign, AlertCircle } from 'lucide-react';

export const ReconCenterPage = () => {
  const reconOrders = [
    {
      id: 'ROM-1049',
      vin: '1G1YB2D47H5108491 (2024 Corvette 2LT)',
      stage: 'Detail & Ceramic Finish (Stage 4/4)',
      tech: 'Marcus Vance',
      estCost: '$450.00',
      status: 'Ready for Lot Today',
      color: '#10b981',
    },
    {
      id: 'ROM-1052',
      vin: '1FTFW1E84PKD81920 (2023 Ford F-150)',
      stage: 'Brake Pad & Rotor Replacement (Stage 2/4)',
      tech: 'Dave Wilson',
      estCost: '$680.00',
      status: 'In Progress',
      color: '#0284c7',
    },
    {
      id: 'ROM-1055',
      vin: 'WP1AA2AY9PLA19024 (2023 Porsche Macan)',
      stage: '150-Point Safety Inspection (Stage 1/4)',
      tech: 'Alex Thorne',
      estCost: '$220.00',
      status: 'Awaiting Diagnostic',
      color: '#f59e0b',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
          RECON & REPAIR ORDER MANAGEMENT (TASK E-05)
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Vehicle Reconditioning Center (ROM)
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Track vehicle recon speed (days on lot), repair order labor costs, and showroom-ready stages per VIN.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {reconOrders.map((ro) => (
          <div
            key={ro.id}
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', fontFamily: 'monospace' }}>{ro.id}</span>
                <span style={{ fontSize: '11px', color: ro.color, fontWeight: 700, backgroundColor: `${ro.color}15`, padding: '2px 6px', borderRadius: '4px' }}>
                  {ro.status}
                </span>
              </div>
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px' }}>
                {ro.vin}
              </h3>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Stage: {ro.stage} • Assigned: {ro.tech}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Recon Cost Rollup</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>{ro.estCost}</div>
              </div>
              <button
                onClick={() => alert(`Marking ${ro.id} as 100% Showroom Lot Ready!`)}
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Mark Lot Ready
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
