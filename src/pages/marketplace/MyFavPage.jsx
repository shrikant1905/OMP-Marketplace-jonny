import React, { useState } from 'react';
import { Heart, Sparkles, Trash2, MapPin, ArrowRight, Bell, BellOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OmpAiAgentModal } from '../../components/OmpAiAgentModal';
import { PriceAlertModal } from '../../components/PriceAlertModal';

export const MyFavPage = () => {
  const navigate = useNavigate();
  const { myFavList, toggleFav } = useAuth();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeAlertIds, setActiveAlertIds] = useState(['fav-1', 'fav-2']);
  const [selectedItemForAlerts, setSelectedItemForAlerts] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleViewListing = (item) => {
    if (item.category === 'Cars & Trucks') {
      navigate('/cars');
    } else if (item.category === 'Job Finder') {
      navigate('/jobs');
    } else if (item.category === 'Services') {
      navigate('/services');
    } else if (item.category === 'Businesses' || item.category === 'Business For Sale') {
      navigate('/businesses');
    } else {
      navigate('/for-sale');
    }
  };

  const toggleAlert = (itemId) => {
    setActiveAlertIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11.5px', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase' }}>
            PERSONALIZED SAVED DEALS & AI SEARCH ASSISTANT
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            MyFav: Saved Listings & Search History ({myFavList.length})
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Get instant real-time price-drop alerts and reopen your most recent searches with the OMP AI Agent.
          </p>
        </div>

        <button
          onClick={() => setIsAiModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'linear-gradient(135deg, #0284c7, #38bdf8)',
            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
          }}
        >
          <Sparkles size={16} />
          <span>Ask OMP AI to Find More</span>
        </button>
      </div>

      {/* Favorites List */}
      {myFavList.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '16px',
            border: '1px dashed var(--border)',
            padding: '50px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Heart size={42} color="var(--text-tertiary)" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            No Saved Favorites Yet
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '400px', margin: 0 }}>
            Click the heart icon on any car, job, service, or real estate property to save it here and receive price-drop notifications.
          </p>
          <button
            onClick={() => navigate('/for-sale')}
            style={{
              marginTop: '8px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {myFavList.map((item) => {
            const isAlertOn = activeAlertIds.includes(item.id);
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
                      {item.category || 'Marketplace Item'}
                    </span>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>
                      {item.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleFav(item)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    title="Remove from MyFav"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>{item.price}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="#0284c7" />
                    <span>{item.location || 'Fremont, CA'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                  <button
                    id={`view-listing-btn-${item.id}`}
                    onClick={() => handleViewListing(item)}
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>View Listing</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    id={`alert-toggle-btn-${item.id}`}
                    onClick={() => {
                      setSelectedItemForAlerts(item);
                      setIsAlertModalOpen(true);
                    }}
                    style={{
                      backgroundColor: isAlertOn ? 'rgba(16, 185, 129, 0.12)' : 'var(--surface-secondary)',
                      border: isAlertOn ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border)',
                      color: isAlertOn ? '#10b981' : 'var(--text-tertiary)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.15s ease',
                    }}
                    title="Configure price-drop alerts"
                  >
                    {isAlertOn ? <Bell size={13} color="#10b981" /> : <BellOff size={13} color="var(--text-tertiary)" />}
                    <span>{isAlertOn ? 'Alerts On' : 'Muted'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Agent Modal */}
      <OmpAiAgentModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      {/* Price Drop Alert Settings Modal */}
      <PriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        item={selectedItemForAlerts}
        isAlertActive={selectedItemForAlerts ? activeAlertIds.includes(selectedItemForAlerts.id) : false}
        onToggleAlert={toggleAlert}
      />
    </div>
  );
};
