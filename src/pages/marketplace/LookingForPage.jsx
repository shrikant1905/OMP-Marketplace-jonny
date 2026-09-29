import React, { useState } from 'react';
import { Search, PlusCircle, MapPin, Tag, MessageSquare, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LookingForPage = () => {
  const { selectedLocation } = useAuth();
  const [requests, setRequests] = useState([
    {
      id: 'req-1',
      buyer: 'Robert Garcia (Verified Buyer)',
      budget: 'Up to $38,000 Cash',
      item: 'Looking for 1967-1969 Chevrolet Camaro or Chevelle (Clean Title)',
      location: 'Fremont, CA (Will travel 100 mi)',
      posted: '2 hours ago',
      desc: 'Looking for a running project or restored 1st gen Camaro with V8 engine. Have certified cashier check ready for serious sellers.',
    },
    {
      id: 'req-2',
      buyer: 'Apex Construction Group',
      budget: 'Budget $45,000 - $65,000',
      item: 'Looking for 2019+ Freightliner or Isuzu 24-26ft Box Truck with Tuckaway Liftgate',
      location: 'San Jose, CA',
      posted: '5 hours ago',
      desc: 'Need work-ready diesel box truck under 100k miles. Ready to buy this week.',
    },
    {
      id: 'req-3',
      buyer: 'Sarah Jenkins',
      budget: '$85 / hr',
      item: 'Seeking Licensed Mobile Electrician for Tesla Wall Connector in Garage',
      location: 'Oakland, CA',
      posted: '1 day ago',
      desc: 'Need 60A breaker panel installation and 240V dedicated line installed this Saturday.',
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newPostTitle || !newBudget) return;
    const newReq = {
      id: `req-${Date.now()}`,
      buyer: 'You (Verified Buyer)',
      budget: newBudget,
      item: newPostTitle,
      location: selectedLocation,
      posted: 'Just now',
      desc: newDesc || 'Inquiring with verified local sellers.',
    };
    setRequests([newReq, ...requests]);
    setNewPostTitle('');
    setNewBudget('');
    setNewDesc('');
    alert('Your "Looking For" demand post has been broadcasted to verified sellers in the area!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#14b8a6', fontWeight: 700, textTransform: 'uppercase' }}>
          PUBLIC BUYER DEMAND & "WANTED" BOARD
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Looking For (Buyer Wanted Requests)
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Post custom buyer requests for rare collector cars, unique equipment, commercial fleet, or specialized contractor gigs.
        </p>
      </div>

      {/* Post a Request Form */}
      <form
        onSubmit={handleCreateRequest}
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} color="#14b8a6" />
          <span>Post What You Are Looking For</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
          <input
            type="text"
            placeholder="What vehicle, item or service are you searching for? (e.g. 1965 Mustang Fastback)"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Target Budget (e.g. $35,000 Cash)"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <textarea
          placeholder="Add any specific details (mileage, condition, timeline, preferred safe meetup spot)..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          rows={2}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            outline: 'none',
            resize: 'none',
          }}
        />

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#14b8a6',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Broadcast Request to Sellers
        </button>
      </form>

      {/* Requests Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {requests.map((req) => (
          <div
            key={req.id}
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#14b8a6', fontWeight: 700 }}>{req.buyer} • {req.posted}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                  {req.item}
                </h3>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981' }}>{req.budget}</div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {req.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <MapPin size={13} color="#0284c7" />
                <span>{req.location}</span>
              </div>
              <button
                onClick={() => alert(`Opening chat to send an offer to ${req.buyer}...`)}
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <MessageSquare size={13} />
                <span>I Have This / Contact Buyer</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
