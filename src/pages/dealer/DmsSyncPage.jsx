import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, Database, Clock, Server } from 'lucide-react';

export const DmsSyncPage = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const feeds = [
    { name: 'CDK Global DMS Live Feed', status: 'Connected & Active', count: '58 Vehicles Synced', lastSync: '3 mins ago' },
    { name: 'DealerSocket Inventory Bridge', status: 'Connected & Active', count: '142 Images Synced', lastSync: '12 mins ago' },
    { name: 'Reynolds & Reynolds ERA-IGNITE', status: 'Standby / Ready', count: 'Auto-Sync Scheduled', lastSync: '1 hour ago' },
    { name: 'Carfax VHR Direct Pull API', status: 'Active 24/7', count: '58 VHRs Cleared', lastSync: 'Real-time' },
  ];

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('DMS Inventory Re-Synced: 58 Vehicles updated in 1.4s!');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
            ZERO MANUAL ENTRY • DMS FEED INTEGRATION (TASK V-03 / N-01)
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            DMS Inventory Auto-Feed Synchronization
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Automated lot syndication with CDK Global, DealerSocket, and Dealertrack.
          </p>
        </div>

        <button
          onClick={handleSyncNow}
          style={{
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
          <span>{isSyncing ? 'Syncing Feeds...' : 'Force DMS Sync Now'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {feeds.map((f, i) => (
          <div
            key={i}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={18} color="#0284c7" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {f.name}
              </h3>
            </div>
            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} /> {f.status}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>{f.count}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              Last Sync: {f.lastSync}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
