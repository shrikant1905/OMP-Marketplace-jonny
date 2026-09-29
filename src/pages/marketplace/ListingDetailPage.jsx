import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Truck,
  Phone,
  MessageSquare,
  FileCheck,
  Calendar,
  DollarSign,
  Heart,
  Share2
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../components/AdpVerifiedBadge';
import { PoliceSafeSpotsModal } from '../../components/PoliceSafeSpotsModal';
import { ShippingCalculatorModal } from '../../components/ShippingCalculatorModal';

export const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSafeSpotsOpen, setIsSafeSpotsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const vehicle = {
    id: id || 'lst-1',
    title: '2024 Chevrolet Corvette Stingray 2LT Coupe',
    vin: '1G1YB2D47H5108491',
    stock: 'STK-8491',
    price: '$79,900',
    estPayment: '$1,140 / mo (60s Desking)',
    mileage: '3,210 miles',
    engine: '6.2L V8 DI HP VVT (495 hp)',
    transmission: '8-Speed Dual Clutch',
    exteriorColor: 'Isle of Man Green Metallic',
    interiorColor: 'Natural Dipped Leather',
    location: 'Fremont, CA (3.8 miles away)',
    seller: 'Metro West Automotive Group',
    sellerTier: 'franchise',
    sellerRating: '4.9 ★ (148 verified dealer reviews)',
    safeMeetupSpot: 'Fremont Police Dept - Safe Exchange Lot',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000&auto=format&fit=crop&q=80',
    ],
  };

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: 'none',
          color: '#0284c7',
          fontSize: '13.5px',
          fontWeight: 700,
          cursor: 'pointer',
          width: 'fit-content',
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Listings</span>
      </button>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        {/* Left: Gallery & Specs */}
        <div>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'var(--surface-secondary)',
              height: '380px',
              marginBottom: '12px',
              border: '1px solid var(--border)',
              position: 'relative',
            }}
          >
            <img
              src={vehicle.images[activeImage]}
              alt={vehicle.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
              <AdpVerifiedBadge tier={vehicle.sellerTier} size="md" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {vehicle.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                style={{
                  width: '80px',
                  height: '60px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImage === i ? '2px solid #0284c7' : '1px solid var(--border)',
                }}
              >
                <img src={img} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 16px', color: 'var(--text-primary)' }}>
              Vehicle Specifications & Title Check
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', fontSize: '13px' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>VIN Number</div>
                <div style={{ fontWeight: 700, color: '#0284c7', fontFamily: 'monospace' }}>{vehicle.vin}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Mileage</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{vehicle.mileage}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Engine</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{vehicle.engine}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Transmission</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{vehicle.transmission}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Color</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{vehicle.exteriorColor}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Title Brand</div>
                <div style={{ fontWeight: 700, color: '#10b981' }}>Clean (NMVTIS Verified)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Buy Card & Safe MeetUp */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              padding: '24px',
              boxShadow: 'var(--card-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                ADP VERIFIED DEALER LISTING
              </span>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 8px' }}>
                {vehicle.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#10b981' }}>{vehicle.price}</div>
                <div style={{ fontSize: '13px', color: '#0284c7', fontWeight: 700 }}>{vehicle.estPayment}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => alert('Connecting dealership sales desk at (510) 555-0199...')}
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Phone size={15} />
                <span>Call Dealer</span>
              </button>

              <button
                onClick={() => setInquirySent(true)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <MessageSquare size={15} />
                <span>{inquirySent ? 'Offer Sent ✓' : 'Send Offer / Chat'}</span>
              </button>
            </div>

            <button
              onClick={() => setIsShippingOpen(true)}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Truck size={16} color="#0284c7" />
              <span>Calculate Nationwide Doorstep Shipping Quote</span>
            </button>
          </div>

          {/* Police Safe Spot Box */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#10b981" />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Designated Police Safe MeetUp Spot
              </h3>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {vehicle.safeMeetupSpot}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              2000 Stevenson Blvd, Fremont, CA (2.4 mi away). 24/7 video recording and dedicated e-commerce parking spaces.
            </p>
            <button
              onClick={() => setIsSafeSpotsOpen(true)}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#0284c7',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '4px 0 0',
              }}
            >
              View All 1,600+ Police Safe Locations →
            </button>
          </div>
        </div>
      </div>

      <PoliceSafeSpotsModal isOpen={isSafeSpotsOpen} onClose={() => setIsSafeSpotsOpen(false)} />
      <ShippingCalculatorModal isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} initialItem={vehicle} />
    </div>
  );
};
