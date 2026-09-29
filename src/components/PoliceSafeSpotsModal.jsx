import React, { useState } from 'react';
import { ShieldCheck, MapPin, Search, X, CheckCircle2, Video, Car } from 'lucide-react';
import { toast } from '../utils/ompToast';

export const PoliceSafeSpotsModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const spots = [
    {
      id: 1,
      name: 'Fremont Police Department - Headquarters Safe Spot',
      address: '2000 Stevenson Blvd, Fremont, CA 94538',
      distance: '2.4 miles away',
      features: ['24/7 CCTV Video Surveillance', 'Marked Well-Lit Parking Stalls', 'Police Lobby Access', 'Direct Officer Intercom'],
      status: 'Active 24/7',
    },
    {
      id: 2,
      name: 'Union City Police Dept - Community Exchange Zone',
      address: '3900 Alvarado-Niles Rd, Union City, CA 94587',
      distance: '4.8 miles away',
      features: ['High-Def Camera Recording', 'Designated E-Commerce Spaces', 'Emergency Call Box'],
      status: 'Active 24/7',
    },
    {
      id: 3,
      name: 'Hayward Police Station - Safe Transaction Parking',
      address: '300 W Winton Ave, Hayward, CA 94544',
      distance: '9.2 miles away',
      features: ['24/7 Security Patrols', 'License Plate Reader Monitored', 'Well-Lit Parking'],
      status: 'Active 24/7',
    },
    {
      id: 4,
      name: 'San Jose Police Substation - South Bay Meetup Lot',
      address: '6087 Great Oaks Pkwy, San Jose, CA 95119',
      distance: '14.5 miles away',
      features: ['24/7 Monitored Bay', 'Covered Safe Shelter', 'Officer Assistance Desk'],
      status: 'Active 24/7',
    },
  ];

  if (!isOpen) return null;

  const filteredSpots = spots.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
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
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                1,600+ Police Safe MeetUp Spots
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Official Safe Transaction Zones for OfferUp & OMP Deals Buyers and Sellers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '10px 14px',
            }}
          >
            <Search size={16} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search by city, zip code, or police station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* Spot List */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {spot.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    <MapPin size={14} color="#0284c7" />
                    <span>{spot.address}</span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                  }}
                >
                  {spot.distance}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {spot.features.map((feat, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  onClick={() => {
                    toast.success(`Safe MeetUp Confirmed: ${spot.name} tagged for your deal!`);
                    onClose();
                  }}
                  style={{
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Select for Transaction
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
