import React, { useState } from 'react';
import { ShoppingBag, Search, Tag, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MakeOfferModal } from '../../components/MakeOfferModal';

export const ForSalePage = () => {
  const navigate = useNavigate();
  const { myFavList, toggleFav, selectedLocation, userCustomListings } = useAuth();
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedOfferItem, setSelectedOfferItem] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const customForSaleListings = (userCustomListings || [])
    .filter((item) => !item.category || item.category === 'general')
    .map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: 'general',
      location: item.location || selectedLocation || 'Fremont, CA',
      condition: 'Like New (Direct from Seller)',
      image: item.image,
      seller: 'Verified Private Seller',
      truYou: true,
      safeSpot: 'Fremont Police Dept Safe Spot',
      isNew: true,
    }));

  const defaultItems = [
    {
      id: 'item-1',
      title: 'DeWalt 20V Max Cordless 5-Tool Combo Kit with Case',
      price: '$240',
      category: 'tools',
      location: 'Fremont, CA',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80',
      seller: 'Mike Henderson',
      truYou: true,
      safeSpot: 'Fremont Police Dept Safe Spot',
    },
    {
      id: 'item-2',
      title: 'Apple MacBook Pro 16" M3 Max (36GB RAM, 1TB SSD)',
      price: '$2,450',
      category: 'electronics',
      location: 'San Jose, CA',
      condition: 'Mint in Box',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
      seller: 'Elena Rostova',
      truYou: true,
      safeSpot: 'Union City PD Exchange Lot',
    },
    {
      id: 'item-3',
      title: 'Herman Miller Aeron Ergonomic Office Chair (Size B)',
      price: '$580',
      category: 'furniture',
      location: 'Oakland, CA',
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1580481077197-734ed1c40a1b?w=600&auto=format&fit=crop&q=80',
      seller: 'Bay Area Design Studio',
      truYou: true,
      safeSpot: 'Hayward Police Station Bay',
    },
    {
      id: 'item-4',
      title: 'Sony Alpha A7 IV Full-Frame Mirrorless Camera + 24-70mm Lens',
      price: '$1,890',
      category: 'electronics',
      location: 'Fremont, CA',
      condition: 'Like New (Shutter count 840)',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
      seller: 'David Chen',
      truYou: true,
      safeSpot: 'Fremont Police Dept Safe Spot',
    },
  ];

  const items = [...customForSaleListings, ...defaultItems];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
          GENERAL MARKETPLACE & CLASSIFIEDS
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          For Sale in {selectedLocation}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Browse electronics, tools, furniture, and collectibles with verified seller identity and police safe spots.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {items.map((item) => {
          const isFav = myFavList.some((f) => f.id === item.id);
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--surface-secondary)' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => toggleFav(item)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: 'none',
                    color: isFav ? '#ef4444' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Heart size={15} fill={isFav ? '#ef4444' : 'none'} />
                </button>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>{item.price}</div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Condition: {item.condition}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <MapPin size={13} color="#0284c7" />
                  <span>{item.location}</span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} /> TruYou Seller
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOfferItem(item);
                      setIsOfferModalOpen(true);
                    }}
                    style={{
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MakeOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        item={selectedOfferItem}
      />
    </div>
  );
};
