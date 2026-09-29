import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  Filter,
  Search,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  FileCheck,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdpVerifiedBadge } from '../../components/AdpVerifiedBadge';
import { ShippingCalculatorModal } from '../../components/ShippingCalculatorModal';

export const AiCarsTrucksPage = () => {
  const navigate = useNavigate();
  const { myFavList, toggleFav, selectedLocation, selectedRadius, userCustomListings } = useAuth();

  const [activeBodyType, setActiveBodyType] = useState('all');
  const [selectedMake, setSelectedMake] = useState('all');
  const [priceMax, setPriceMax] = useState('100000');
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [shippingItem, setShippingItem] = useState(null);

  const bodyTypes = [
    { id: 'all', label: 'All Body Types', icon: '🚗' },
    { id: 'classic', label: 'Antique & Classic (DB5, Camaro)', icon: '🏛️' },
    { id: 'coupe', label: 'Coupes & Convertibles', icon: '🏎️' },
    { id: 'sedan', label: 'Sedans & Hatchbacks', icon: '🚘' },
    { id: 'suv', label: 'SUVs & Crossovers', icon: '🚙' },
    { id: 'pickup', label: 'Pickup Trucks (Crew/Ext Cab)', icon: '🛻' },
    { id: 'commercial', label: 'Commercial & Dump Trucks', icon: '🚛' },
    { id: 'van', label: 'Vans & Camper Vans', icon: '🚐' },
    { id: 'bus', label: 'Buses (Transit/School)', icon: '🚌' },
  ];

  const vehicles = [
    {
      id: 'car-1',
      bodyType: 'coupe',
      make: 'Chevrolet',
      title: '2024 Chevrolet Corvette Stingray 2LT Coupe',
      price: '$79,900',
      estMonthly: '$1,140/mo (60s Desking)',
      mileage: '3,210 mi',
      specs: '6.2L V8 DI • 8-Speed Dual Clutch • RWD',
      color: 'Isle of Man Green',
      location: 'Fremont, CA',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
      dealer: 'Metro West Automotive Group',
      adpTier: 'franchise',
      vin: '1G1YB2D47H5108491',
      titleStatus: 'Clean Title (NMVTIS Verified)',
    },
    {
      id: 'car-2',
      bodyType: 'classic',
      make: 'Chevrolet',
      title: '1969 Chevrolet Camaro SS 396 Classic Muscle',
      price: '$46,500',
      estMonthly: '$680/mo (Classic Lease)',
      mileage: '42,000 mi',
      specs: '396ci Big Block V8 • 4-Speed Muncie Manual',
      color: 'Hugger Orange / Black Stripes',
      location: 'San Jose, CA',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
      dealer: 'NorCal Vintage Classics',
      adpTier: 'small',
      vin: '124379N510294',
      titleStatus: 'Clean Title • Certificate of Authenticity',
    },
    {
      id: 'car-3',
      bodyType: 'classic',
      make: 'Ford',
      title: '1965 Ford Mustang Fastback GT 289',
      price: '$52,000',
      estMonthly: '$740/mo',
      mileage: '38,100 mi',
      specs: '289ci HiPo V8 • 4-Speed Manual • Pony Interior',
      color: 'Wimbledon White / Guardsman Blue',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&auto=format&fit=crop&q=80',
      dealer: 'Golden State Collector Cars',
      adpTier: 'small',
      vin: '5F09K109482',
      titleStatus: 'Clean Title • Single Family Owned',
    },
    {
      id: 'car-4',
      bodyType: 'pickup',
      make: 'Ford',
      title: '2023 Ford F-150 Lariat Crew Cab 4x4',
      price: '$54,900',
      estMonthly: '$790/mo',
      mileage: '14,200 mi',
      specs: '3.5L EcoBoost V6 • 10-Speed Auto • 4WD',
      color: 'Agate Black Metallic',
      location: 'Dallas, TX',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop&q=80',
      dealer: 'Dallas Central Motors',
      adpTier: 'franchise',
      vin: '1FTFW1E84PKD81920',
      titleStatus: 'Clean Title • 1-Owner Corporate Fleet',
    },
    {
      id: 'car-5',
      bodyType: 'suv',
      make: 'Porsche',
      title: '2023 Porsche Macan GTS All-Wheel Drive',
      price: '$72,500',
      estMonthly: '$1,020/mo',
      mileage: '9,800 mi',
      specs: '2.9L Twin-Turbo V6 (434 hp) • 7-Speed PDK',
      color: 'Chalk White / Red Leather',
      location: 'Fremont, CA',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      dealer: 'Silicon Valley Premier Autos',
      adpTier: 'large',
      vin: 'WP1AA2AY9PLA19024',
      titleStatus: 'Clean Title • Factory Warranty Remaining',
    },
    {
      id: 'car-6',
      bodyType: 'commercial',
      make: 'Freightliner',
      title: '2022 Freightliner M2 106 26ft Box Truck with Liftgate',
      price: '$68,000',
      estMonthly: '$980/mo (Commercial Loan)',
      mileage: '48,000 mi',
      specs: 'Cummins B6.7 Turbo Diesel • Allison 2500 RDS',
      color: 'Commercial White',
      location: 'Houston, TX',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80',
      dealer: 'Houston North Auto & Commercial Mall',
      adpTier: 'franchise',
      vin: '1FVACWDT8NHJA1902',
      titleStatus: 'DOT Inspected • 100% Work Ready',
    },
  ];

  const customCars = (userCustomListings || [])
    .filter((item) => item.category === 'cars_trucks' || !item.category)
    .map((item) => ({
      id: item.id,
      bodyType: 'coupe',
      make: item.title.split(' ')[0] || 'Custom',
      title: item.title,
      price: item.price,
      estMonthly: '$420/mo (Instant Desking)',
      mileage: '8,500 mi',
      specs: item.description || 'Clean Title • Direct Private Seller',
      color: 'Custom Paint Finish',
      location: item.location || selectedLocation || 'Fremont, CA',
      image: item.image,
      dealer: 'Verified Private Seller (TruYou)',
      adpTier: 'small',
      vin: '1G1OMP' + item.id.replace(/[^0-9]/g, '').slice(0, 10),
      titleStatus: 'Clean Title (NMVTIS Verified)',
      isNewUserListing: true,
    }));

  const allVehicles = [...customCars, ...vehicles];

  const filteredVehicles = allVehicles.filter((v) => {
    const matchesBody = activeBodyType === 'all' || v.bodyType === activeBodyType;
    const matchesMake = selectedMake === 'all' || v.make.toLowerCase() === selectedMake.toLowerCase();
    const priceNum = parseInt(v.price.replace(/[^0-9]/g, '')) || 0;
    const matchesPrice = priceNum <= parseInt(priceMax);
    return matchesBody && matchesMake && matchesPrice;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
            <Sparkles size={13} />
            <span>AI Cars & Trucks Taxonomy Engine</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            AI Cars, Trucks & Classic Vehicles Finder
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Narrow search results by exact Auto Body Type, cab configuration, and NMVTIS verified title status.
          </p>
        </div>

        <button
          onClick={() => navigate('/dealer/hub')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            color: '#0284c7',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <ShieldCheck size={16} />
          <span>Dealer DMS & Desking Tools</span>
        </button>
      </div>

      {/* BODY TYPE TAXONOMY PILLS (From Client Specifications) */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {bodyTypes.map((bt) => {
          const isSelected = activeBodyType === bt.id;
          return (
            <button
              key={bt.id}
              onClick={() => setActiveBodyType(bt.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: isSelected ? '1px solid #0284c7' : '1px solid var(--border)',
                backgroundColor: isSelected ? '#0284c7' : 'var(--surface)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
              }}
            >
              <span>{bt.icon}</span>
              <span>{bt.label}</span>
            </button>
          );
        })}
      </div>

      {/* FILTER CONTROLS BAR */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '14px',
          border: '1px solid var(--border)',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Make:</span>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: 'var(--text-primary)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Makes</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="ford">Ford</option>
              <option value="porsche">Porsche</option>
              <option value="freightliner">Freightliner</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Max Price:</span>
            <input
              type="range"
              min="20000"
              max="150000"
              step="5000"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#10b981' }}>${parseInt(priceMax).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Showing <strong>{filteredVehicles.length}</strong> matching vehicles in {selectedLocation}
        </div>
      </div>

      {/* VEHICLE GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredVehicles.map((car) => {
          const isFav = myFavList.some((f) => f.id === car.id);

          return (
            <div
              key={car.id}
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
              {/* Photo */}
              <div style={{ height: '210px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--surface-secondary)' }}>
                <img src={car.image} alt={car.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                  <AdpVerifiedBadge tier={car.adpTier} size="sm" />
                  {car.isNewUserListing && (
                    <span style={{ backgroundColor: '#10b981', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 7px', borderRadius: '6px', textTransform: 'uppercase', boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)' }}>
                      ⚡ NEWLY LISTED
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleFav(car)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: 'none',
                    color: isFav ? '#ef4444' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Heart size={16} fill={isFav ? '#ef4444' : 'none'} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981' }}>{car.price}</div>
                    <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 700 }}>{car.estMonthly}</div>
                  </div>
                  <h3
                    onClick={() => navigate(`/listing/${car.id}`)}
                    style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px', cursor: 'pointer' }}
                  >
                    {car.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{car.specs}</div>
                </div>

                <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '8px 10px', borderRadius: '8px', fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>VIN: <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{car.vin.slice(0, 10)}...</strong></span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓ {car.titleStatus.split('•')[0]}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => navigate(`/listing/${car.id}`)}
                    style={{
                      flex: 1,
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    View Details & Desking
                  </button>
                  <button
                    onClick={() => {
                      setShippingItem(car);
                      setIsShippingOpen(true);
                    }}
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    title="Calculate Doorstep Shipping"
                  >
                    <Truck size={14} color="#0284c7" />
                    <span>Ship</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ShippingCalculatorModal isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} initialItem={shippingItem} />
    </div>
  );
};
