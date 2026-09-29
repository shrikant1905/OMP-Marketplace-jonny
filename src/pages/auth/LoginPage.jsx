import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  ShieldCheck,
  Wrench,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  Car,
  Check,
  Activity,
  Layers,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useAuth, ROLE_PRESETS } from '../../context/AuthContext';
import './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithCredentials, loginAsRole } = useAuth();

  const isJustLoggedOut = searchParams.get('logged_out') === 'true';
  const isUnauthorized = searchParams.get('unauthorized') === 'true';
  const roleParam = searchParams.get('role');
  const redirectParam = searchParams.get('redirect');

  const initialRole = (roleParam && ROLE_PRESETS.some(r => r.id === roleParam)) ? roleParam : 'DEALER_PRO';
  const initialPreset = ROLE_PRESETS.find(r => r.id === initialRole) || ROLE_PRESETS[1];

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [email, setEmail] = useState(initialPreset.email || 'marcus@dallascentralmotors.com');
  const [password, setPassword] = useState('Dealer@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Auto-fill when a role preset is chosen
  const handleRoleSelect = (preset) => {
    setSelectedRole(preset.id);
    setEmail(preset.email || 'guest@ompdeals.com');
    setPassword('DemoPass@2026');
    setAuthError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setAuthError('Please enter your email address to continue.');
      return;
    }
    if (!password.trim()) {
      setAuthError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    setTimeout(() => {
      try {
        const user = loginWithCredentials(email, password, selectedRole);
        setIsLoading(false);
        // Direct redirect strictly to this role's dashboard (or redirect param if authorized)
        const targetPath = (redirectParam && redirectParam.startsWith('/omp') && (user.id === 'DEALER_PRO' || user.id === 'EXECUTIVE_ADMIN'))
          ? redirectParam
          : (user.defaultRoute || '/omp/verified-dealer');
        navigate(targetPath);
      } catch (err) {
        setIsLoading(false);
        setAuthError('Authentication failed. Please verify credentials.');
      }
    }, 350);
  };

  return (
    <div className="omp-login-wrapper">
      {/* Return to Public Marketplace */}
      <Link to="/" className="omp-back-btn" title="Return to Marketplace">
        <ArrowLeft size={16} />
        <span>Back to Marketplace</span>
      </Link>

      <div className="omp-login-container">
        {/* ========================================================= */}
        {/* LEFT SIDE: Software Visual & Tech Showcase               */}
        {/* ========================================================= */}
        <div
          className="omp-login-visual-side"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop&q=80')`,
          }}
        >
          <div className="omp-login-visual-overlay" />

          <div className="omp-visual-content">
            <div>
              {/* Software Brand Tag */}
              <div className="omp-brand-pill">
                <Sparkles size={13} />
                <span>OMP Deals Auto Suite • Enterprise v4.2</span>
              </div>

              {/* Title & Description */}
              <h1 className="omp-software-title">
                Next-Gen <span>AI Marketplace</span> & Auto Dealership Platform.
              </h1>
              <p className="omp-software-desc">
                High-performance desking, automated DMS inventory feed sync, and verified buyer leads in one centralized automotive cockpit.
              </p>

              {/* 4 Software Highlights Grid */}
              <div className="omp-features-grid">
                <div className="omp-feature-card">
                  <div className="omp-feature-icon-box">
                    <Car size={16} />
                  </div>
                  <div>
                    <div className="omp-feature-label">60s Deal Desking</div>
                    <div className="omp-feature-sub">Instant 4-square payment calculations & rate match</div>
                  </div>
                </div>

                <div className="omp-feature-card">
                  <div className="omp-feature-icon-box">
                    <Layers size={16} />
                  </div>
                  <div>
                    <div className="omp-feature-label">DMS Lot Feed Sync</div>
                    <div className="omp-feature-sub">142+ units synced from CDK, DealerSocket & vAuto</div>
                  </div>
                </div>

                <div className="omp-feature-card">
                  <div className="omp-feature-icon-box">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="omp-feature-label">ADP & TruYou Verified</div>
                    <div className="omp-feature-sub">1,600+ safe meetup zones with zero fraud risk</div>
                  </div>
                </div>

                <div className="omp-feature-card">
                  <div className="omp-feature-icon-box">
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="omp-feature-label">AI Lead Radar 24/7</div>
                    <div className="omp-feature-sub">Real-time buyer intent scoring & auto-response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="omp-visual-bottom-bar">
              <div className="omp-status-indicator">
                <div className="omp-pulse-dot" />
                <span>All 21 OMP Modules Operational (99.98% Uptime)</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                ADP Franchise Edition
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT SIDE: Software Login Form                          */}
        {/* ========================================================= */}
        <div className="omp-login-form-side">
          <div>
            {/* Header with OMP Software Logo */}
            <div className="omp-form-header">
              <div className="omp-brand-logo-row">
                <div className="omp-logo-mark">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '19px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    OMP DEALS
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginTop: '3px' }}>
                    AI Marketplace & DMS Portal
                  </div>
                </div>
              </div>

              <h2 className="omp-form-title">Sign In to Your Workspace</h2>
              <p className="omp-form-subtitle">
                Enter your registered software credentials or choose a quick role demo preset below.
              </p>
            </div>

            {/* Logout notification if user just clicked logout */}
            {isJustLoggedOut && (
              <div className="omp-logout-alert">
                <CheckCircle2 size={16} />
                <span>You have been logged out successfully. Sign in anytime to resume.</span>
              </div>
            )}

            {/* Unauthorized Dashboard Access Alert */}
            {isUnauthorized && (
              <div
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                <Lock size={16} />
                <span>Access Restricted: Sign in with the required role to enter that dashboard.</span>
              </div>
            )}

            {/* Auth Error Banner */}
            {authError && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                <ShieldAlert size={16} />
                <span>{authError}</span>
              </div>
            )}

            {/* Forgot Password Modal Notice */}
            {showForgotNotice && (
              <div
                style={{
                  backgroundColor: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#7dd3fc',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Password reset link simulated for <strong>{email}</strong>. Check inbox or use demo credentials.</span>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(false)}
                  style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontWeight: 800, fontSize: '14px' }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Actual Form */}
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="omp-form-group">
                <label className="omp-form-label" htmlFor="omp-email-input">
                  Email Address / Dealer ID
                </label>
                <div className="omp-input-wrapper">
                  <Mail size={16} className="omp-input-icon" />
                  <input
                    id="omp-email-input"
                    type="email"
                    className="omp-text-input"
                    placeholder="e.g. marcus@dallascentralmotors.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="omp-form-group">
                <label className="omp-form-label" htmlFor="omp-pwd-input">
                  Password
                </label>
                <div className="omp-input-wrapper">
                  <Lock size={16} className="omp-input-icon" />
                  <input
                    id="omp-pwd-input"
                    type={showPassword ? 'text' : 'password'}
                    className="omp-text-input"
                    placeholder="Enter your security password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="omp-toggle-pwd-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Aux Row: Remember Me & Forgot Password */}
              <div className="omp-form-aux-row">
                <label className="omp-remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember this workstation</span>
                </label>

                <button
                  type="button"
                  className="omp-forgot-link"
                  onClick={() => setShowForgotNotice(true)}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="omp-submit-btn"
                disabled={isLoading}
                id="omp-login-submit-btn"
              >
                {isLoading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Sign In to OMP Portal</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Role Demo Selector */}
            <div className="omp-demo-roles-section">
              <div className="omp-demo-header">
                <span className="omp-demo-title">
                  <Sparkles size={12} color="#38bdf8" />
                  <span>Quick Demo Roles (1-Click Fill):</span>
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>Click to auto-populate</span>
              </div>

              <div className="omp-demo-chips-grid">
                {ROLE_PRESETS.filter((r) => r.id !== 'GUEST').map((preset) => {
                  const isSelected = selectedRole === preset.id;
                  const targetDashboardName =
                    preset.id === 'DEALER_PRO'
                      ? 'Verified Dealer Dashboard'
                      : preset.id === 'EXECUTIVE_ADMIN'
                      ? 'Central Office Dashboard'
                      : 'Member Dashboard';

                  return (
                    <div
                      key={preset.id}
                      className={`omp-demo-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => handleRoleSelect(preset)}
                      title={`Click to fill credentials for ${preset.label} -> ${targetDashboardName}`}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#0284c7' : 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {preset.id === 'DEALER_PRO' && <Car size={15} />}
                        {preset.id === 'EXECUTIVE_ADMIN' && <Building2 size={15} />}
                        {preset.id === 'MEMBER' && <ShoppingBag size={15} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="omp-demo-chip-name">{preset.roleName.split(' ')[0]} ({preset.badge.split(' ')[0]})</div>
                        <div className="omp-demo-chip-role" style={{ color: isSelected ? '#38bdf8' : '#94a3b8', fontSize: '10px' }}>
                          → {targetDashboardName}
                        </div>
                      </div>
                      {isSelected && <Check size={14} color="#38bdf8" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Security & Verification Footer */}
          <div className="omp-login-footer">
            <ShieldCheck size={14} color="#10b981" />
            <span>256-Bit SSL Encryption • TruYou™ Identity Verification • SOC2 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
