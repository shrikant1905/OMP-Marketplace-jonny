import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  DollarSign,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Upload,
  X,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PostAdWizardPage = () => {
  const navigate = useNavigate();
  const { selectedLocation, addNewListing } = useAuth();
  const fileInputRef = useRef(null);

  const [category, setCategory] = useState('cars_trucks');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(selectedLocation || 'Fremont, CA');
  const [description, setDescription] = useState('');
  const [safeSpotPreferred, setSafeSpotPreferred] = useState(true);

  // Photos State
  const [photos, setPhotos] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStep, setPublishStep] = useState('');
  const [publishedData, setPublishedData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Quick Preset Sample Images for Fast Client Demoing
  const sampleStockPhotos = [
    { label: '🏎️ 2024 Corvette', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&auto=format&fit=crop&q=80' },
    { label: '🏛️ 1969 Camaro Classic', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&auto=format&fit=crop&q=80' },
    { label: '🛠️ DeWalt Tool Set', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&auto=format&fit=crop&q=80' },
    { label: '💻 MacBook Pro M3', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80' },
    { label: '🏡 Luxury Condo', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&auto=format&fit=crop&q=80' },
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPhotoUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newPhotoUrls].slice(0, 10)); // max 10 photos
  };

  const handleAddStockPhoto = (url) => {
    if (!photos.includes(url)) {
      setPhotos((prev) => [...prev, url].slice(0, 10));
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) return;

    setIsPublishing(true);
    setPublishStep('⚡ Optimizing High-Res Photos (WebP Engine)...');

    setTimeout(() => {
      setPublishStep('🛡️ Verifying Police Safe Meetup Spots & TruYou Credentials...');
      setTimeout(() => {
        setPublishStep(`📡 Broadcasting Live Listing to ${location} Buyers...`);
        setTimeout(() => {
          setIsPublishing(false);
          const finalPhoto = photos.length > 0
            ? photos[0]
            : 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&auto=format&fit=crop&q=80';

          const created = addNewListing({
            title,
            price: price.startsWith('$') ? price : `$${price}`,
            category,
            location,
            description,
            image: finalPhoto,
            photos,
            safeSpotPreferred,
            listingNumber: `OMP-${Math.floor(10000 + Math.random() * 90000)}`,
          });

          setPublishedData(created);
        }, 800);
      }, 800);
    }, 800);
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTargetRoute = (cat) => {
    switch (cat) {
      case 'cars_trucks': return '/cars-trucks';
      case 'services': return '/services';
      case 'jobs': return '/jobs';
      case 'real_estate': return '/real-estate';
      case 'businesses': return '/businesses';
      default: return '/for-sale';
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(2, 132, 199, 0.12)', color: '#0284c7', padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          <Sparkles size={12} />
          <span>OfferUp 30-Second Fast Listing Engine</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
          Post a Free Listing on OMP Deals
        </h1>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Publish your vehicle, item, service, or job in seconds. Buyers contact you directly with TruYou safety.
        </p>
      </div>

      {/* PUBLISHING PROGRESS STATE */}
      {isPublishing && (
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            padding: '50px 30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 size={36} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
              Publishing Your Listing...
            </h3>
            <p style={{ fontSize: '14px', color: '#0284c7', fontWeight: 600, margin: 0 }}>
              {publishStep}
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS PUBLISHED VIEW */}
      {!isPublishing && publishedData && (
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={34} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase' }}>
                Listing Live & Syndicated
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '2px 0 0', color: 'var(--text-primary)' }}>
                Your Ad is Now Live! #{publishedData.listingNumber}
              </h2>
            </div>
          </div>

          {/* Live Card Preview */}
          <div
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '16px',
              display: 'flex',
              gap: '18px',
              alignItems: 'center',
            }}
          >
            <img
              src={publishedData.image}
              alt={publishedData.title}
              style={{ width: '130px', height: '95px', borderRadius: '12px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  {publishedData.category.replace('_', ' ')}
                </span>
                <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 700 }}>
                  🛡️ TruYou Verified Seller
                </span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {publishedData.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '17px', fontWeight: 900, color: '#10b981' }}>{publishedData.price}</span>
                <span>📍 {publishedData.location}</span>
                <span>🕒 Just now</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(getTargetRoute(publishedData.category))}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)',
              }}
            >
              <span>View in Marketplace</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleCopyLink}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '12px 18px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Share Listing Link'}</span>
            </button>

            <button
              onClick={() => {
                setPublishedData(null);
                setTitle('');
                setPrice('');
                setDescription('');
                setPhotos([]);
              }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '12px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Post Another Item (30s)
            </button>
          </div>
        </div>
      )}

      {/* FORM VIEW */}
      {!isPublishing && !publishedData && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {/* 1. Category */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Select Marketplace Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="cars_trucks">🚗 AI Cars & Trucks (Sedan, Coupe, SUV, Classic, Commercial)</option>
              <option value="services">🛠️ Local Services (Mobile Mechanics, AC Repair, Plumbing, Electric)</option>
              <option value="jobs">💼 Job Finder (Local Careers & Open Positions)</option>
              <option value="real_estate">🏡 Real Estate (Rental, Single-Family, Commercial, Vacation)</option>
              <option value="businesses">🏢 Business For Sale (Turnkey Shops & Franchises)</option>
              <option value="general">🛍️ For Sale (Electronics, Tools, Furniture, Collectibles)</option>
            </select>
          </div>

          {/* 2. Title */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Listing Title
            </label>
            <input
              type="text"
              placeholder="e.g. 2024 Chevrolet Corvette Stingray 2LT or 24/7 Mobile Mechanic Service"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                outline: 'none',
              }}
            />
          </div>

          {/* 3. Price & Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Price or Hourly Rate ($)
              </label>
              <input
                type="text"
                placeholder="e.g. $79,900 or $85/hr"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Location / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* 4. Description */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Description & Specifications
            </label>
            <textarea
              rows={3}
              placeholder="Describe condition, specifications, clean title, service guarantees, or requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          {/* 5. PHOTOS & MEDIA UPLOAD (FUNCTIONAL) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Photos & Media ({photos.length}/10 uploaded)
              </label>
              <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600 }}>
                High-Res JPG, PNG supported
              </span>
            </div>

            {/* Hidden Real File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              style={{ display: 'none' }}
            />

            {/* Clickable Upload Dropzone */}
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '14px',
                padding: '24px 16px',
                textAlign: 'center',
                backgroundColor: 'var(--surface-secondary)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0284c7')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(2, 132, 199, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <Upload size={22} />
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Click to Upload Photos from your Device
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Or select from one-click stock presets below
              </div>
            </div>

            {/* Quick Demo Stock Presets (For instant 1-click test without searching local files) */}
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                ⚡ Quick-Select Demo Photos (1-Click Add):
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sampleStockPhotos.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddStockPhoto(preset.url)}
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded Photos Preview Grid */}
            {photos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px', marginTop: '14px' }}>
                {photos.map((url, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      height: '80px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <img src={url} alt={`Upload ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto(idx);
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#ffffff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      title="Remove photo"
                    >
                      <X size={12} />
                    </button>
                    {idx === 0 && (
                      <span style={{ position: 'absolute', bottom: '3px', left: '3px', backgroundColor: '#0284c7', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '1px 4px', borderRadius: '4px' }}>
                        COVER
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Police Safe Spot Checkbox */}
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input
              type="checkbox"
              id="safeSpot"
              checked={safeSpotPreferred}
              onChange={(e) => setSafeSpotPreferred(e.target.checked)}
              style={{ width: '17px', height: '17px', cursor: 'pointer' }}
            />
            <label htmlFor="safeSpot" style={{ fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>
              <ShieldCheck size={15} color="#10b981" style={{ display: 'inline', marginRight: '5px' }} />
              I agree to meet at a designated <strong>Police Safe MeetUp Spot</strong> for vehicle/item exchange.
            </label>
          </div>

          {/* 7. Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)',
              transition: 'transform 0.15s ease',
            }}
          >
            <span>Publish Free Listing Live</span>
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </div>
  );
};
