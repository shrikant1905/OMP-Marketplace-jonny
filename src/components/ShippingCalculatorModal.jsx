import React, { useState } from 'react';
import { Truck, X, ShieldCheck, MapPin, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

export const ShippingCalculatorModal = ({ isOpen, onClose, initialItem }) => {
  const [destZip, setDestZip] = useState('75001 (Dallas, TX)');
  const [carrierType, setCarrierType] = useState('open'); // open | enclosed

  const calculateShippingQuote = (inputLocation, carrier) => {
    const raw = (inputLocation || '').trim();
    if (!raw) {
      return {
        distance: 'Enter destination for distance quote',
        freightPrice: '$0.00',
        insuranceCoverage: '$100,000 Zero-Deductible Policy',
        estDelivery: 'TBD',
      };
    }

    const query = raw.toLowerCase();
    let miles = 1200;
    let locationLabel = raw;

    // 1. Specific City matching (origin is Fremont, CA)
    if (query.includes('san jose') || query.includes('oakland') || query.includes('san francisco') || query.includes('sf')) {
      miles = 35;
      locationLabel = 'San Francisco Bay Area, CA';
    } else if (query.includes('los angeles') || query.includes('la') || query.includes('anaheim') || query.includes('san diego')) {
      miles = 370;
      locationLabel = 'Southern California (LA / San Diego)';
    } else if (query.includes('las vegas') || query.includes('reno') || query.includes('nevada')) {
      miles = 540;
      locationLabel = 'Nevada (Las Vegas / Reno)';
    } else if (query.includes('phoenix') || query.includes('arizona') || query.includes('scottsdale')) {
      miles = 750;
      locationLabel = 'Phoenix / Scottsdale, AZ';
    } else if (query.includes('seattle') || query.includes('portland') || query.includes('washington') || query.includes('oregon')) {
      miles = 820;
      locationLabel = 'Pacific Northwest (Seattle / Portland)';
    } else if (query.includes('denver') || query.includes('colorado')) {
      miles = 1240;
      locationLabel = 'Denver, CO';
    } else if (query.includes('dallas') || query.includes('austin') || query.includes('houston') || query.includes('texas') || query.includes('tx')) {
      miles = 1480;
      locationLabel = 'Texas (Dallas / Houston / Austin)';
    } else if (query.includes('chicago') || query.includes('illinois')) {
      miles = 2120;
      locationLabel = 'Chicago, IL';
    } else if (query.includes('atlanta') || query.includes('georgia')) {
      miles = 2460;
      locationLabel = 'Atlanta, GA';
    } else if (query.includes('new york') || query.includes('nyc') || query.includes('boston') || query.includes('new jersey') || query.includes('ny')) {
      miles = 2940;
      locationLabel = 'New York / East Coast';
    } else if (query.includes('miami') || query.includes('florida') || query.includes('orlando')) {
      miles = 3080;
      locationLabel = 'Florida (Miami / Orlando)';
    } else {
      // 2. Check for 5-digit US zip code matching
      const zipMatch = query.match(/\b\d{5}\b/);
      if (zipMatch) {
        const zipPrefix = parseInt(zipMatch[0].substring(0, 2), 10);
        if (zipPrefix >= 90 && zipPrefix <= 96) miles = 360; // CA
        else if (zipPrefix >= 97 && zipPrefix <= 99) miles = 780; // OR/WA
        else if (zipPrefix >= 84 && zipPrefix <= 89) miles = 620; // NV/UT/AZ
        else if (zipPrefix >= 80 && zipPrefix <= 83) miles = 1150; // CO/ID/MT
        else if (zipPrefix >= 70 && zipPrefix <= 79) miles = 1520; // TX/OK/LA
        else if (zipPrefix >= 50 && zipPrefix <= 69) miles = 1950; // Midwest
        else if (zipPrefix >= 30 && zipPrefix <= 49) miles = 2380; // South
        else miles = 2920; // East Coast 00-29
      } else {
        // 3. General custom city or international text (e.g. "Indore", "Delhi", "Toronto")
        let hash = 0;
        for (let i = 0; i < query.length; i++) {
          hash = (hash << 5) - hash + query.charCodeAt(i);
          hash |= 0;
        }
        miles = Math.abs(hash % 2200) + 420;
      }
    }

    // 4. Rate calculation based on carrier type
    const ratePerMile = carrier === 'enclosed' ? 0.72 : 0.44;
    const baseFee = carrier === 'enclosed' ? 360 : 200;
    const freightAmount = Math.round((baseFee + miles * ratePerMile) / 5) * 5;

    // 5. Transit time
    let transit = '2-4 Business Days';
    if (miles < 450) transit = '1-2 Business Days';
    else if (miles < 1300) transit = '2-3 Business Days';
    else if (miles < 2200) transit = '3-5 Business Days';
    else transit = '5-7 Business Days';

    return {
      distance: `${miles.toLocaleString()} miles to ${locationLabel}`,
      freightPrice: `$${freightAmount.toLocaleString()}.00`,
      insuranceCoverage: carrier === 'enclosed' ? '$250,000 Luxury Enclosed Bond' : '$100,000 Carrier Cargo Bond',
      estDelivery: transit,
    };
  };

  const [calculatedQuote, setCalculatedQuote] = useState(() => calculateShippingQuote('75001 (Dallas, TX)', 'open'));

  if (!isOpen) return null;

  const handleCalculate = (zipToUse = destZip, typeToUse = carrierType) => {
    setCalculatedQuote(calculateShippingQuote(zipToUse, typeToUse));
  };

  const handleCarrierChange = (type) => {
    setCarrierType(type);
    handleCalculate(destZip, type);
  };

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
          maxWidth: '620px',
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
                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
              }}
            >
              <Truck size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Nationwide Doorstep Shipping & Protection
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Insured Carrier Vehicle & Cargo Transport directly to your driveway
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {initialItem && (
            <div
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '10px',
                padding: '12px 16px',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700 }}>SELECTED ITEM</span>
                <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>{initialItem.title}</div>
              </div>
              <div style={{ fontWeight: 800, color: '#10b981', fontSize: '15px' }}>{initialItem.price}</div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Destination Zip Code & City
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={destZip}
                placeholder="Enter City or Zip Code (e.g. Dallas, New York, 90210)..."
                onChange={(e) => {
                  setDestZip(e.target.value);
                  handleCalculate(e.target.value, carrierType);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCalculate(destZip, carrierType);
                  }
                }}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => handleCalculate(destZip, carrierType)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Calculate
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Transport Carrier Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => handleCarrierChange('open')}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: carrierType === 'open' ? '2px solid #0284c7' : '1px solid var(--border)',
                  backgroundColor: carrierType === 'open' ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface-secondary)',
                  color: carrierType === 'open' ? '#0284c7' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Standard Open Carrier</div>
                <div style={{ fontSize: '11px', marginTop: '2px' }}>Most economical & fast</div>
              </button>

              <button
                onClick={() => handleCarrierChange('enclosed')}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: carrierType === 'enclosed' ? '2px solid #0284c7' : '1px solid var(--border)',
                  backgroundColor: carrierType === 'enclosed' ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface-secondary)',
                  color: carrierType === 'enclosed' ? '#0284c7' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Enclosed Luxury Carrier</div>
                <div style={{ fontSize: '11px', marginTop: '2px' }}>100% weather & debris proof</div>
              </button>
            </div>
          </div>

          {/* Quote Result Box */}
          <div
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Distance:</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{calculatedQuote.distance}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Est. Transit Time:</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{calculatedQuote.estDelivery}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Cargo Protection:</span>
              <span style={{ fontSize: '12.5px', color: '#10b981', fontWeight: 600 }}>{calculatedQuote.insuranceCoverage}</span>
            </div>
            <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Total Freight & Booking:</span>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>{calculatedQuote.freightPrice}</span>
            </div>
          </div>

          <button
            onClick={() => {
              alert(`Transport Booking Request Submitted! Carrier dispatched for ${destZip}.`);
              onClose();
            }}
            style={{
              width: '100%',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>Book Insured Doorstep Delivery</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
