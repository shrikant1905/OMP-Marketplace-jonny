import React from 'react';
import { Building2, TrendingUp, DollarSign, Store, ShieldAlert, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdpVerifiedBadge } from '../../components/AdpVerifiedBadge';

export const CentralOfficePage = () => {
  const branches = [
    { name: 'Dallas Central Motors', gm: 'Marcus Vance', cars: 58, soldMtd: 24, grossProfit: '$74,200', turnDays: '22 Days', license: 'Active (Expires Oct 2027)' },
    { name: 'Houston North Auto Mall', gm: 'Sarah Jenkins', cars: 49, soldMtd: 19, grossProfit: '$58,100', turnDays: '26 Days', license: 'Active (Expires Jan 2028)' },
    { name: 'Austin West Dealership', gm: 'Elena Rostova', cars: 35, soldMtd: 14, grossProfit: '$40,350', turnDays: '19 Days', license: 'Active (Expires Mar 2027)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11.5px', color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase' }}>
            OMP EXECUTIVE CENTRAL OFFICE UMBRELLA (TASK E-01)
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            Multi-Dealership Franchise Headquarters
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Master corporate control across 3 franchise locations, group gross profit, and ADP license allocation.
          </p>
        </div>

        <button
          onClick={() => alert('Provisioning New Store Location Wizard...')}
          style={{
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          + Provision New Store Location
        </button>
      </div>

      {/* Group KPI Rollup Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Group Inventory</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>142 <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Cars</span></div>
          <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600, marginTop: '4px' }}>Across 3 Locations</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Consolidated Gross Profit MTD</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>$172,650</div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>Avg $3,028 Gross / Unit</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Delivered MTD</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>57 <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Units</span></div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>74% OAL Finance / 26% Cash</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Franchise ADP Licenses</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#8b5cf6', marginTop: '4px' }}>3 / 5 <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Allocated</span></div>
          <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600, marginTop: '4px' }}>2 Available Slots</div>
        </div>
      </div>

      {/* Branches Table */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '18px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Dealership Locations under Master Umbrella
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '11.5px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 20px' }}>Location Name</th>
                <th style={{ padding: '12px 20px' }}>General Manager</th>
                <th style={{ padding: '12px 20px' }}>Lot Inventory</th>
                <th style={{ padding: '12px 20px' }}>Sold MTD</th>
                <th style={{ padding: '12px 20px' }}>Gross Profit</th>
                <th style={{ padding: '12px 20px' }}>Turn Speed</th>
                <th style={{ padding: '12px 20px' }}>License Status</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>{b.name}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{b.gm}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: '#0284c7' }}>{b.cars} Units</td>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.soldMtd} Cars</td>
                  <td style={{ padding: '16px 20px', fontWeight: 900, color: '#10b981' }}>{b.grossProfit}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{b.turnDays}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: '11.5px', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {b.license}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
