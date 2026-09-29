import React, { useState } from 'react';
import { Wrench, Phone, MessageSquare, Star, ShieldCheck, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ServiceDispatcherModal } from '../../components/ServiceDispatcherModal';
import { ServiceBookingModal } from '../../components/ServiceBookingModal';

export const ServicesPage = () => {
  const { selectedLocation } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [isDispatcherModalOpen, setIsDispatcherModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const subCategories = [
    { id: 'all', label: 'All Services' },
    { id: 'auto', label: 'Auto & Mobile Mechanics' },
    { id: 'ac', label: 'A/C & Heating Repair' },
    { id: 'cleaning', label: 'Auto Detailing & Pressure Wash' },
    { id: 'plumbing', label: 'Plumbing & Drain Repairs' },
    { id: 'electric', label: 'Electricians & Wiring' },
    { id: 'handyman', label: 'Handyman & Assembly' },
    { id: 'locksmith', label: 'Lock & Key Replacement' },
    { id: 'roofing', label: 'Roof & Shutter Repair' },
  ];

  const serviceProviders = [
    {
      id: 'srv-1',
      category: 'auto',
      name: 'Bay Area Pro Mobile Mechanics & Diagnostics',
      rate: '$85 / hr',
      subtitle: '24/7 Mobile brake, alternator, starter & engine repair at your driveway',
      rating: '4.9 ★ (184 verified reviews)',
      location: 'Fremont, CA (Within 25 mi radius)',
      phone: '(510) 555-0199',
      verified: true,
      features: ['Same-Day Response', '12-Month Warranty on Parts', 'Mobile Diagnostic Computer'],
    },
    {
      id: 'srv-2',
      category: 'ac',
      name: 'Precision Automotive & HVAC Climate Pros',
      rate: '$95 / Diagnostic',
      subtitle: 'Freon recharge, compressor replacement, and complete leak detection',
      rating: '4.8 ★ (96 verified reviews)',
      location: 'San Jose, CA',
      phone: '(408) 555-0182',
      verified: true,
      features: ['EPA Certified Technicians', 'Free AC Pressure Check', 'Emergency Service'],
    },
    {
      id: 'srv-3',
      category: 'cleaning',
      name: 'Supreme Mobile Auto Detailing & Ceramic Coating',
      rate: '$150 Full Detail',
      subtitle: '5-Stage paint correction, interior steam clean, and 3-Year ceramic protection',
      rating: '5.0 ★ (210 verified reviews)',
      location: 'Fremont, CA',
      phone: '(510) 555-0144',
      verified: true,
      features: ['Mobile Water & Power Unit', 'Bio-Degradable Chemicals', 'Showroom Mirror Finish'],
    },
    {
      id: 'srv-4',
      category: 'electric',
      name: 'Tesla & EV Home Charger Installation Pros',
      rate: '$350 Flat Install',
      subtitle: 'Level 2 EV charger panel upgrades, commercial rewiring, and circuit breakers',
      rating: '4.9 ★ (140 verified reviews)',
      location: 'Oakland, CA',
      phone: '(510) 555-0128',
      verified: true,
      features: ['Licensed C-10 Electrical Contractor', 'City Permit Handled', 'Same-Week Booking'],
    },
  ];

  const filtered = serviceProviders.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
          LOCAL SERVICES DIRECTORY • VERIFIED PROFESSIONALS
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Hire Top-Rated Local Service Providers
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Connect directly with licensed mobile mechanics, AC repair techs, electricians, and detailers in {selectedLocation}.
        </p>
      </div>

      {/* Subcategory Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {subCategories.map((sc) => (
          <button
            key={sc.id}
            onClick={() => setActiveCategory(sc.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: activeCategory === sc.id ? '1px solid #10b981' : '1px solid var(--border)',
              backgroundColor: activeCategory === sc.id ? '#10b981' : 'var(--surface)',
              color: activeCategory === sc.id ? '#ffffff' : 'var(--text-primary)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Service Providers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map((srv) => (
          <div
            key={srv.id}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '18px',
              border: '1px solid var(--border)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                    {srv.rating}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>TruYou Verified</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {srv.name}
                </h3>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981' }}>{srv.rate}</div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {srv.subtitle}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {srv.features.map((feat, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '11px',
                    backgroundColor: 'var(--surface-secondary)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircle2 size={11} color="#10b981" />
                  {feat}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <MapPin size={13} color="#0284c7" />
              <span>{srv.location}</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <button
                id={`call-dispatcher-btn-${srv.id}`}
                onClick={() => {
                  setSelectedService(srv);
                  setIsDispatcherModalOpen(true);
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#10b981',
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
                <Phone size={14} />
                <span>Call Dispatcher</span>
              </button>

              <button
                id={`message-service-btn-${srv.id}`}
                onClick={() => {
                  setSelectedService(srv);
                  setIsBookingModalOpen(true);
                }}
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
                <span>Message</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Dispatcher Modal */}
      <ServiceDispatcherModal
        isOpen={isDispatcherModalOpen}
        onClose={() => setIsDispatcherModalOpen(false)}
        service={selectedService}
      />

      {/* Service Message / Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};
