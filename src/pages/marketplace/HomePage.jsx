import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  ShoppingBag,
  Wrench,
  Briefcase,
  Home,
  Building,
  Search,
  Sparkles,
  MapPin,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign,
  Inbox,
  Building2,
  Lock,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdpVerifiedBadge } from '../../components/AdpVerifiedBadge';
import { PoliceSafeSpotsModal } from '../../components/PoliceSafeSpotsModal';
import { ShippingCalculatorModal } from '../../components/ShippingCalculatorModal';
import { SubscriptionPlansModal } from '../../components/SubscriptionPlansModal';

export const HomePage = () => {
  const navigate = useNavigate();
  const { selectedLocation, selectedRadius, myFavList, toggleFav, currentUser, activeSubscriptions } = useAuth();
  const [activeQuickTab, setActiveQuickTab] = useState('all');
  const [isSafeSpotsOpen, setIsSafeSpotsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [shippingItem, setShippingItem] = useState(null);

  const categories = [
    { title: 'For Sale', desc: 'Electronics, Tools, Furniture', icon: ShoppingBag, color: '#f59e0b', route: '/for-sale', count: '1,420 items' },
    { title: 'AI Cars & Trucks', desc: 'Coupe, SUV, Pickup, Classic', icon: Car, color: '#0ea5e9', route: '/cars-trucks', count: '540 vehicles' },
    { title: 'Local Services', desc: 'Mechanics, AC, Electricians', icon: Wrench, color: '#10b981', route: '/services', count: '310 pros' },
    { title: 'Job Finder', desc: '30+ Local & Remote Domains', icon: Briefcase, color: '#8b5cf6', route: '/jobs', count: '185 openings' },
    { title: 'Real Estate', desc: 'Rent, Buy, Commercial', icon: Home, color: '#ec4899', route: '/real-estate', count: '92 properties' },
    { title: 'Business For Sale', desc: 'Turnkey Shops & Franchises', icon: Building, color: '#3b82f6', route: '/businesses', count: '48 businesses' },
    { title: 'Looking For', desc: 'Public Buyer Wanted Board', icon: Search, color: '#14b8a6', route: '/looking-for', count: '64 requests' },
    { title: 'MyFav Saved', desc: 'Price Drop Alerts & Bookmarks', icon: Heart, color: '#ef4444', route: '/my-fav', count: `${myFavList.length} saved` },
  ];

  const featuredListings = [
    {
      id: 'lst-1',
      type: 'car',
      title: '2024 Chevrolet Corvette Stingray 2LT Coupe',
      price: '$79,900',
      subtitle: '3,210 mi • 6.2L V8 • Isle of Man Green',
      location: 'Fremont, CA (3.8 mi away)',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
      seller: 'Metro West Automotive Group',
      adpTier: 'franchise',
      truYou: true,
      safeSpot: 'Fremont Police Dept Safe Spot',
      route: '/listing/lst-1',
    },
    {
      id: 'lst-2',
      type: 'car',
      title: '1969 Chevrolet Camaro SS 396 Classic',
      price: '$46,500',
      subtitle: 'Restored V8 4-Speed • Hugger Orange',
      location: 'San Jose, CA (11 mi away)',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
      seller: 'Classic Motors NorCal',
      adpTier: 'small',
      truYou: true,
      safeSpot: 'Union City PD Exchange Bay',
      route: '/listing/lst-2',
    },
    {
      id: 'lst-3',
      type: 'service',
      title: '24/7 Mobile Mechanic & AC Diagnostics',
      price: '$85 / hr',
      subtitle: 'Same-day brake, alternator & engine service',
      location: 'Fremont, CA (Within 20 mi)',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80',
      seller: 'Bay Area Pro Mobile Techs',
      rating: '4.9 ★ (184 reviews)',
      truYou: true,
      route: '/services',
    },
    {
      id: 'lst-4',
      type: 'job',
      title: 'Dealership Commercial Fleet Sales Specialist',
      price: '$95k - $140k / yr',
      subtitle: 'Full-time • Commission + Health & 401(k)',
      location: 'Dallas Central Motors (Dallas, TX / Remote)',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
      seller: 'Dallas Central Motors Franchise',
      adpTier: 'franchise',
      route: '/jobs',
    },
    {
      id: 'lst-5',
      type: 'real_estate',
      title: 'Modern Luxury 2-Bedroom Condominium',
      price: '$3,400 / mo',
      subtitle: '2 Bed • 2 Bath • EV Charging & Pool',
      location: 'Fremont Downtown, CA (1.5 mi away)',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
      seller: 'Pacific Bay Realty Partners',
      truYou: true,
      route: '/real-estate',
    },
    {
      id: 'lst-6',
      type: 'business',
      title: 'Turnkey 4-Bay Auto Repair & Tire Center',
      price: '$240,000',
      subtitle: 'Established 12 Yrs • $480k Annual Gross',
      location: 'Oakland, CA (18 mi away)',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80',
      seller: 'Golden State Business Brokers',
      route: '/businesses',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. HERO BANNER WITH QUICK SEARCH */}
      <div
        style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #0c4a6e 100%)',
          color: '#ffffff',
          padding: '40px 32px',
          boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
            <Sparkles size={14} color="#facc15" />
            <span>AI-POWERED OFFERUP & AUTO DMS MARKETPLACE</span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1.15, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
            Buy & Sell Locally or Nationwide with Police Safe Spots
          </h1>

          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5, margin: '0 0 24px' }}>
            Browse verified cars & trucks, hire local services, apply for high-paying jobs, and secure safe doorstep vehicle shipping.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/cars-trucks')}
              style={{
                backgroundColor: '#ffffff',
                color: '#0284c7',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Car size={18} />
              <span>Explore AI Cars & Trucks</span>
            </button>

            <button
              onClick={() => setIsSafeSpotsOpen(true)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldCheck size={18} color="#34d399" />
              <span>1,600+ Police Safe Spots</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 8 CORE CATEGORY CARDS GRID */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Explore 8 Marketplace Categories
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Full OfferUp ecosystem with AI classification and local radius matching
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(cat.route)}
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--card-shadow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)' }}>{cat.title}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{cat.desc}</div>
                  <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700, marginTop: '4px' }}>{cat.count}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2.5 DEALER PRO & EXECUTIVE WORKSPACE TILES (Role-Gated: DEALER_PRO & EXECUTIVE_ADMIN only) */}
      {(currentUser?.id === 'DEALER_PRO' || currentUser?.id === 'EXECUTIVE_ADMIN') && (
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                <Zap size={12} />
                <span>Subscribed B2B Modules</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Dealer Pro & Executive Tools
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Direct access to your active auto desking suite, AI phone attendant, and multi-store umbrella
              </p>
            </div>

            <button
              onClick={() => setIsSubscriptionOpen(true)}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '7px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Manage Plans ({activeSubscriptions.length} Active)</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {/* TILE 1: OMP CRM & Sales Desking */}
            {(() => {
              const isCrmActive = activeSubscriptions.includes('CRM');
              return (
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderRadius: '18px',
                    border: isCrmActive ? '2px solid rgba(2, 132, 199, 0.4)' : '1px solid var(--border)',
                    padding: '22px',
                    boxShadow: isCrmActive ? '0 8px 24px -6px rgba(2, 132, 199, 0.2)' : 'var(--card-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    position: 'relative',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: 'rgba(2, 132, 199, 0.12)',
                          color: '#0284c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Inbox size={24} />
                      </div>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: isCrmActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.1)',
                          color: isCrmActive ? '#10b981' : '#ef4444',
                        }}
                      >
                        {isCrmActive ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>ACTIVE ADD-ON</span>
                          </>
                        ) : (
                          <>
                            <Lock size={12} />
                            <span>LOCKED • $149/MO</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                      OMP CRM & Sales Desking
                    </h3>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.45 }}>
                      Omnichannel messaging, 24/7 AI call attendant simulator, and rapid 60-second finance & BHPH desking.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="#0284c7" />
                        <span>Unified Inbox (SMS, Email, Messenger)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="#0284c7" />
                        <span>24/7 AI Voice Phone Receptionist</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="#0284c7" />
                        <span>60s Deal Structuring Calculator</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isCrmActive) {
                        navigate('/omp/crm/inbox');
                      } else {
                        setIsSubscriptionOpen(true);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: isCrmActive ? '#0284c7' : 'rgba(2, 132, 199, 0.12)',
                      color: isCrmActive ? '#ffffff' : '#0284c7',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                      boxShadow: isCrmActive ? '0 4px 14px rgba(2, 132, 199, 0.35)' : 'none',
                    }}
                  >
                    {isCrmActive ? (
                      <>
                        <span>Launch CRM Workspace</span>
                        <ArrowRight size={15} />
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Unlock OMP CRM ($149/mo)</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })()}

            {/* TILE 2: Executive Central Office (EXECUTIVE_ADMIN Only) */}
            {currentUser?.id === 'EXECUTIVE_ADMIN' && (() => {
              const isExecActive = activeSubscriptions.includes('CENTRAL_OFFICE');
              return (
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderRadius: '18px',
                    border: isExecActive ? '2px solid rgba(139, 92, 246, 0.4)' : '1px solid var(--border)',
                    padding: '22px',
                    boxShadow: isExecActive ? '0 8px 24px -6px rgba(139, 92, 246, 0.2)' : 'var(--card-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    position: 'relative',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: 'rgba(139, 92, 246, 0.12)',
                          color: '#8b5cf6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Building2 size={24} />
                      </div>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: isExecActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.1)',
                          color: isExecActive ? '#10b981' : '#ef4444',
                        }}
                      >
                        {isExecActive ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>ACTIVE HQ PLAN</span>
                          </>
                        ) : (
                          <>
                            <Lock size={12} />
                            <span>LOCKED • $299/MO</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                      Executive Central Office
                    </h3>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.45 }}>
                      Master franchise umbrella command center with consolidated P&L, store telemetry, and DMV audit safeguards.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="#8b5cf6" />
                        <span>Multi-Store Dealership Umbrella (Dallas, Houston, Austin)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="#8b5cf6" />
                        <span>Consolidated Group P&L & Turn Telemetry</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="#8b5cf6" />
                        <span>DMV Audit Risk & Regulatory Safeguards</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isExecActive) {
                        navigate('/omp/executive/central-office');
                      } else {
                        setIsSubscriptionOpen(true);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: isExecActive ? '#8b5cf6' : 'rgba(139, 92, 246, 0.12)',
                      color: isExecActive ? '#ffffff' : '#8b5cf6',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                      boxShadow: isExecActive ? '0 4px 14px rgba(139, 92, 246, 0.35)' : 'none',
                    }}
                  >
                    {isExecActive ? (
                      <>
                        <span>Launch Central Office</span>
                        <ArrowRight size={15} />
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Unlock Central Office ($299/mo)</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 3. FEATURED LIVE MARKETPLACE LISTINGS */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Live Deals in {selectedLocation} ({selectedRadius} mi)
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Fresh listings updated every 60 seconds with verified Trust & TruYou seals
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {featuredListings.map((item) => {
            const isFav = myFavList.some((f) => f.id === item.id);

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRadius: '18px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--card-shadow)',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Image */}
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--surface-secondary)' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {item.adpTier && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <AdpVerifiedBadge tier={item.adpTier} size="sm" />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(item);
                    }}
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

                {/* Content */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>{item.price}</div>
                    <h3
                      onClick={() => navigate(item.route)}
                      style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px', cursor: 'pointer' }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.subtitle}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    <MapPin size={13} color="#0284c7" />
                    <span>{item.location}</span>
                  </div>

                  {item.safeSpot && (
                    <div
                      onClick={() => setIsSafeSpotsOpen(true)}
                      style={{
                        fontSize: '11px',
                        color: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <ShieldCheck size={13} />
                      <span>{item.safeSpot}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                    <button
                      onClick={() => navigate(item.route)}
                      style={{
                        flex: 1,
                        backgroundColor: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </button>
                    {item.type === 'car' && (
                      <button
                        onClick={() => {
                          setShippingItem(item);
                          setIsShippingOpen(true);
                        }}
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        title="Calculate Freight"
                      >
                        <Truck size={14} color="#0284c7" />
                        <span>Ship</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PoliceSafeSpotsModal isOpen={isSafeSpotsOpen} onClose={() => setIsSafeSpotsOpen(false)} />
      <ShippingCalculatorModal isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} initialItem={shippingItem} />
      <SubscriptionPlansModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />
    </div>
  );
};
