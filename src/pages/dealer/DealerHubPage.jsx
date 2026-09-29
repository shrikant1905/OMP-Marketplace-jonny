import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, TrendingUp, RefreshCw, Camera, Calculator, DollarSign, ArrowRight } from 'lucide-react';
import { AdpVerifiedBadge } from '../../components/AdpVerifiedBadge';

export const DealerHubPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          padding: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <AdpVerifiedBadge tier="franchise" size="lg" />
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>VERIFIED ACCOUNT • GOOD STANDING</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            Dallas Central Motors — Verified Dealer Hub
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            DMV Dealer License #DL-9402941 • 58 Live DMS Vehicles • OfferUp Verified Trust Score 99.4%
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/dealer/vin-scanner')}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Camera size={16} />
            <span>VIN Optical Scanner</span>
          </button>
          <button
            onClick={() => navigate('/dealer/deal-calculator')}
            style={{
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Calculator size={16} color="#10b981" />
            <span>60s Desking</span>
          </button>
        </div>
      </div>

      {/* 3 Tier Cards (From Client DOCX: Verified Auto Dealers Program) */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 14px' }}>
          Auto Dealer Program (ADP) Tier Credentials
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {/* Tier 1 */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AdpVerifiedBadge tier="small" size="md" />
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>Independent Lot Tier</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>$299 <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/ month</span></div>
            <ul style={{ fontSize: '12.5px', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
              <li>Up to 25 Live Lot Inventory slots</li>
              <li>Official Emerald ADP Verified Badge</li>
              <li>DMS Feed Auto-Sync (1x Daily)</li>
              <li>TruYou Buyer Identity Access</li>
            </ul>
          </div>

          {/* Tier 2 (Current) */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '18px', border: '2px solid #0284c7', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-10px', right: '18px', backgroundColor: '#0284c7', color: '#fff', fontSize: '10.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>
              CURRENT ACTIVE PLAN
            </span>
            <AdpVerifiedBadge tier="franchise" size="md" />
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>Franchise Partner Tier</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0284c7' }}>$799 <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/ month</span></div>
            <ul style={{ fontSize: '12.5px', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
              <li>Unlimited Live Lot Inventory (184+ Cars)</li>
              <li>High-Priority Sky Blue Verified Badge</li>
              <li>Instant CDK / DealerSocket Real-Time Sync</li>
              <li>60s Deal Calculator & OAL Lender Bridge</li>
              <li>AI Top Lead Radar (Urgent 90+ Score)</li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AdpVerifiedBadge tier="large" size="md" />
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>Enterprise Auto Group</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#8b5cf6' }}>$1,499 <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/ month</span></div>
            <ul style={{ fontSize: '12.5px', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
              <li>Multi-Location Central Office Umbrella</li>
              <li>Consolidated Group P&L Telemetry</li>
              <li>Custom Dealer WebBuilder Domain</li>
              <li>Dedicated Account Manager & API Feed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
