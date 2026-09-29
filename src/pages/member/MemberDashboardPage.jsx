import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, MessageSquare, PlusCircle, ShieldCheck, CheckCircle2, Eye, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MemberDashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser, myFavList } = useAuth();

  const myAds = [
    {
      id: 'my-1',
      title: '2021 Ford F-150 Lariat 4x4 (Clean Title)',
      price: '$34,900',
      views: 248,
      inquiries: 12,
      status: 'Active Live',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
            REGISTERED MEMBER / PRIVATE SELLER WORKSPACE
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            Welcome back, {currentUser.roleName.split(' ')[0]}!
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Manage your active marketplace listings, direct buyer chats, and TruYou identity seal.
          </p>
        </div>

        <button
          onClick={() => navigate('/post-ad')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <PlusCircle size={16} />
          <span>Post New Ad</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Listings</div>
          <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>1 Live</div>
        </div>
        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Buyer Inquiries (Chat)</div>
          <div style={{ fontSize: '26px', fontWeight: 900, color: '#0284c7', marginTop: '4px' }}>12 Active</div>
        </div>
        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>MyFav Bookmarks</div>
          <div style={{ fontSize: '26px', fontWeight: 900, color: '#ef4444', marginTop: '4px' }}>{myFavList.length} Saved</div>
        </div>
        <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>TruYou Identity Status</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#10b981', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={16} /> Verified Member
          </div>
        </div>
      </div>

      {/* Active Listings Table */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px' }}>
          My Active Marketplace Listings
        </h2>
        {myAds.map((ad) => (
          <div
            key={ad.id}
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src={ad.image} alt={ad.title} style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {ad.title}
                </h4>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#10b981' }}>{ad.price}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                <div><Eye size={13} style={{ display: 'inline', marginRight: '4px' }} /><strong>{ad.views}</strong> views</div>
                <div><MessageSquare size={13} style={{ display: 'inline', marginRight: '4px' }} /><strong>{ad.inquiries}</strong> chats</div>
              </div>

              <button
                onClick={() => alert(`Opening buyer chats for ${ad.title}...`)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Open Chats (12)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
