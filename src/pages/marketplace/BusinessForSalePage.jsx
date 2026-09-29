import React, { useState } from 'react';
import { Building, DollarSign, TrendingUp, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BusinessNdaModal } from '../../components/BusinessNdaModal';

export const BusinessForSalePage = () => {
  const { selectedLocation } = useAuth();
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);

  const businesses = [
    {
      id: 'biz-1',
      title: 'Established Independent Used Auto Dealership & 3-Bay Recon Center',
      askingPrice: '$485,000',
      grossRevenue: '$2,100,000 / yr',
      cashFlow: '$185,000 Net',
      industry: 'Automotive & DMS',
      location: 'Dallas, TX',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80',
      highlights: ['Active Dealer License Included', '35-Car Lot Lease', 'DMS Feed & CDK Active', '12 Years Established'],
    },
    {
      id: 'biz-2',
      title: 'High-Volume Mobile Auto Detailing Fleet & B2B Dealership Contracts',
      askingPrice: '$165,000',
      grossRevenue: '$380,000 / yr',
      cashFlow: '$110,000 Net',
      industry: 'Automotive Services',
      location: 'Fremont, CA',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80',
      highlights: ['2 Custom Mobile Vans with Power/Water', '4 Active Dealership Contracts', 'Online Booking System'],
    },
    {
      id: 'biz-3',
      title: 'Commercial Transport & Freight Dispatching Brokerage',
      askingPrice: '$320,000',
      grossRevenue: '$1,450,000 / yr',
      cashFlow: '$195,000 Net',
      industry: 'Logistics & Transport',
      location: 'Houston, TX',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80',
      highlights: ['Active DOT & FMCSA Authority', '15 Contracted Carrier Fleet', '100% Remote Operations'],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase' }}>
          BUSINESS BROKERAGE & FRANCHISE MARKETPLACE
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Turnkey Businesses For Sale
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Explore profitable auto dealerships, service franchises, and commercial logistics businesses.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {businesses.map((biz) => (
          <div
            key={biz.id}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '18px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ height: '180px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--surface-secondary)' }}>
              <img src={biz.image} alt={biz.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                {biz.industry}
              </span>
            </div>

            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981' }}>{biz.askingPrice}</div>
                <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px' }}>
                  {biz.title}
                </h3>
              </div>

              <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '10px 12px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Gross Revenue</div>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{biz.grossRevenue}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Cash Flow (Net)</div>
                  <div style={{ fontWeight: 800, color: '#10b981' }}>{biz.cashFlow}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {biz.highlights.map((hl, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      color: '#3b82f6',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle2 size={11} />
                    {hl}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <MapPin size={14} color="#0284c7" />
                <span>{biz.location}</span>
              </div>

              <button
                id={`request-nda-btn-${biz.id}`}
                onClick={() => {
                  setSelectedBiz(biz);
                  setIsNdaModalOpen(true);
                }}
                style={{
                  marginTop: 'auto',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} />
                <span>Request NDA & Financials</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Business NDA & Financials Modal */}
      <BusinessNdaModal
        isOpen={isNdaModalOpen}
        onClose={() => setIsNdaModalOpen(false)}
        business={selectedBiz}
      />
    </div>
  );
};
