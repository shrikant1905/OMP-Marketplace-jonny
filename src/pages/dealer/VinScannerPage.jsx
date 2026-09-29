import React, { useState } from 'react';
import { Camera, Scan, DollarSign, CheckCircle2, ShieldCheck, Car } from 'lucide-react';

export const VinScannerPage = () => {
  const [vin, setVin] = useState('1G1YB2D47H5108491');
  const [isScanning, setIsScanning] = useState(false);
  const [decoded, setDecoded] = useState({
    year: 2024,
    make: 'Chevrolet',
    model: 'Corvette Stingray',
    trim: '2LT Coupe',
    engine: '6.2L V8 DI HP VVT (495 hp)',
    transmission: '8-Speed Dual Clutch',
    kbb: { trade: '$68,400', private: '$74,200', retail: '$81,900' },
    title: 'Clean Title (No salvage/flood brand)',
    odometer: '3,210 miles (DMV Verified)',
  });

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
          OPTICAL VIN SCANNER & VHR BOOKOUT (TASK E-02)
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 0' }}>
          Mobile VIN Barcode Scanner & KBB/NADA Bookout
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
          Scan door jamb or windshield barcode on the lot to decode specs and pull instant valuation.
        </p>
      </div>

      {/* Input Box */}
      <div style={{ backgroundColor: 'var(--surface)', borderRadius: '18px', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              color: '#0284c7',
              fontSize: '15px',
              fontWeight: 800,
              fontFamily: 'monospace',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSimulateScan}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Camera size={16} />
            <span>{isScanning ? 'Scanning...' : 'Scan Barcode'}</span>
          </button>
        </div>
      </div>

      {/* Decoded Result */}
      {decoded && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'var(--surface)', borderRadius: '18px', border: '1px solid var(--border)', padding: '24px' }}>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              ✓ VIN DECODED (NMVTIS VERIFIED)
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
              {decoded.year} {decoded.make} {decoded.model}
            </h2>
            <div style={{ fontSize: '13px', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>{decoded.trim}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12.5px' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Engine</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{decoded.engine}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Transmission</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{decoded.transmission}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Odometer</div>
                <div style={{ fontWeight: 700, color: '#10b981' }}>{decoded.odometer}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Title Brand</div>
                <div style={{ fontWeight: 700, color: '#10b981' }}>{decoded.title}</div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface)', borderRadius: '18px', border: '1px solid var(--border)', padding: '24px' }}>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              KBB / NADA LIVE VALUATION
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', marginTop: '12px' }}>
              <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Wholesale</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>{decoded.kbb.trade}</div>
              </div>
              <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Private Party</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#0284c7' }}>{decoded.kbb.private}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(2, 132, 199, 0.1)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(2, 132, 199, 0.3)' }}>
                <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700 }}>Dealer Retail</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981' }}>{decoded.kbb.retail}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
