import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AdpVerifiedBadge = ({
  tier = 'franchise',
  size = 'md',
  showTierLabel = true,
  className = '',
}) => {
  const tierConfig = {
    small: {
      label: 'Independent Lot',
      badgeColor: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      border: '1px solid rgba(16, 185, 129, 0.35)',
    },
    franchise: {
      label: 'Franchise Partner',
      badgeColor: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.15)',
      border: '1px solid rgba(14, 165, 233, 0.35)',
    },
    large: {
      label: 'Enterprise Auto Group',
      badgeColor: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.15)',
      border: '1px solid rgba(139, 92, 246, 0.35)',
    },
  };

  const current = tierConfig[tier] || tierConfig.franchise;

  const sizeConfig = {
    sm: { padding: '2px 8px', fontSize: '11px', iconSize: 12 },
    md: { padding: '4px 10px', fontSize: '12px', iconSize: 14 },
    lg: { padding: '6px 14px', fontSize: '13px', iconSize: 16 },
  };

  const s = sizeConfig[size] || sizeConfig.md;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: current.bg,
        border: current.border,
        borderRadius: '9999px',
        padding: s.padding,
        color: current.badgeColor,
        fontWeight: 700,
        fontSize: s.fontSize,
        whiteSpace: 'nowrap',
      }}
      title="OMP Deals Official Verified Dealer • DMV & Identity Checked"
    >
      <ShieldCheck size={s.iconSize} />
      <span>ADP Verified</span>
      {showTierLabel && (
        <span
          style={{
            fontSize: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            padding: '1px 5px',
            borderRadius: '4px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
          }}
        >
          {current.label}
        </span>
      )}
    </div>
  );
};
