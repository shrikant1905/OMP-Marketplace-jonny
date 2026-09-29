import React, { useState } from 'react';
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize,
  DollarSign,
  Key,
  Building2,
  Calendar,
  Clock,
  X,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../../utils/ompToast';

export const RealEstatePage = () => {
  const { selectedLocation } = useAuth();
  const [dealType, setDealType] = useState('all'); // all | rent | buy
  const [selectedTourProp, setSelectedTourProp] = useState(null);
  // Real Dynamic Calendar Dates based on today
  const getDynamicUpcomingDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 1; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const prefix = i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const datePart = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days.push({ id: `${prefix} (${datePart})`, label: `${prefix} (${datePart})` });
    }
    return days;
  };

  const upcomingDays = getDynamicUpcomingDays();
  const [selectedDate, setSelectedDate] = useState(() => upcomingDays[0]?.id || 'Tomorrow');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM (Morning)');

  const handleConfirmTour = () => {
    toast.success(`In-Person Tour Confirmed! ${selectedTourProp?.broker} will host your on-site walkthrough on ${selectedDate} at ${selectedTimeSlot}.`);
    setSelectedTourProp(null);
  };

  const properties = [
    {
      id: 're-1',
      title: 'Modern 2-Bedroom Luxury Condominium with EV Charging',
      price: '$3,400 / mo',
      type: 'Rent / Lease',
      category: 'condo',
      beds: 2,
      baths: 2,
      sqft: '1,150 sq ft',
      location: 'Fremont Downtown, CA',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
      broker: 'Pacific Bay Realty Group',
    },
    {
      id: 're-2',
      title: 'Contemporary 4-Bedroom Single Family Home with Pool',
      price: '$1,385,000',
      type: 'Buy / Sale',
      category: 'single_family',
      beds: 4,
      baths: 3,
      sqft: '2,640 sq ft',
      location: 'San Jose Foothills, CA',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
      broker: 'Silicon Valley Premier Real Estate',
    },
    {
      id: 're-3',
      title: 'Commercial Flex Warehouse & Office Facility with Loading Dock',
      price: '$8,200 / mo',
      type: 'Commercial Lease',
      category: 'commercial',
      beds: 0,
      baths: 2,
      sqft: '4,800 sq ft',
      location: 'Oakland Port Industrial Park, CA',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
      broker: 'NorCal Commercial Brokerage',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#ec4899', fontWeight: 700, textTransform: 'uppercase' }}>
          REAL ESTATE MARKETPLACE • RESIDENTIAL & COMMERCIAL
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Properties for Lease & Sale in {selectedLocation}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Find single-family homes, apartments, commercial offices, industrial warehouses, and vacation properties.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {properties.map((prop) => (
          <div
            key={prop.id}
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
            <div style={{ height: '200px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--surface-secondary)' }}>
              <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(2, 132, 199, 0.9)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                {prop.type}
              </span>
            </div>

            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981' }}>{prop.price}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px' }}>
                  {prop.title}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '14px', fontSize: '12.5px', color: 'var(--text-secondary)', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                {prop.beds > 0 && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Bed size={15} /> {prop.beds} Beds
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Bath size={15} /> {prop.baths} Baths
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Maximize size={15} /> {prop.sqft}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <MapPin size={14} color="#0284c7" />
                <span>{prop.location}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px' }}>
                <button
                  onClick={() => setSelectedTourProp(prop)}
                  style={{
                    flex: 1,
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Contact Broker & Schedule Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Tour Modal */}
      {selectedTourProp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setSelectedTourProp(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              width: '100%',
              maxWidth: '540px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '18px 22px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--surface-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284c7',
                  }}
                >
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Schedule In-Person Tour
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Free on-site walkthrough with verified licensed broker
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTourProp(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Property Summary Card */}
              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '10px', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase' }}>
                    {selectedTourProp.type}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                    {selectedTourProp.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {selectedTourProp.location}
                  </div>
                </div>
                <div style={{ fontWeight: 900, color: '#10b981', fontSize: '16px' }}>
                  {selectedTourProp.price}
                </div>
              </div>


              {/* Preferred Day Chips */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  SELECT PREFERRED DAY (DYNAMIC CALENDAR)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {upcomingDays.map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setSelectedDate(d.id)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: selectedDate === d.id ? '2px solid #0284c7' : '1px solid var(--border)',
                        backgroundColor: selectedDate === d.id ? 'rgba(2, 132, 199, 0.1)' : 'var(--surface-secondary)',
                        color: selectedDate === d.id ? '#0284c7' : 'var(--text-primary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Window Chips */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  SELECT TIME WINDOW
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['10:00 AM (Morning)', '1:30 PM (Afternoon)', '5:00 PM (Evening)'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: selectedTimeSlot === slot ? '2px solid #0284c7' : '1px solid var(--border)',
                        backgroundColor: selectedTimeSlot === slot ? 'rgba(2, 132, 199, 0.1)' : 'var(--surface-secondary)',
                        color: selectedTimeSlot === slot ? '#0284c7' : 'var(--text-primary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Person On-Site Meeting Details */}
              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  border: '1px solid var(--border)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '15px' }}>📍</span>
                <span>
                  <strong>On-Site Walkthrough:</strong> Meet listing broker directly at <strong>{selectedTourProp.location}</strong>. Licensed broker will have full access & keys ready.
                </span>
              </div>

              {/* Broker Agency Box */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Exclusive Listing Broker:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selectedTourProp.broker}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#10b981',
                    fontWeight: 700,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  ✓ Verified Realtor
                </span>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleConfirmTour}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  marginTop: '4px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Confirm In-Person Tour</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
