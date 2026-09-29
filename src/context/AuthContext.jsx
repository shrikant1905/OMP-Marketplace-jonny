import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLE_PRESETS = [
  {
    id: 'GUEST',
    label: 'Public Buyer / Guest',
    subtitle: 'Browse 8 categories, Ask OMP AI, No login needed',
    icon: 'User',
    email: '',
    roleName: 'Guest Visitor',
    badge: 'Guest',
    defaultRoute: '/marketplace',
  },
  {
    id: 'DEALER_PRO',
    label: 'ADP Verified Auto Dealer',
    subtitle: 'DMS Lot sync, 60s Deal desking, AI Lead radar, VIN scanner',
    icon: 'ShieldCheck',
    email: 'marcus@dallascentralmotors.com',
    roleName: 'Marcus Vance (General Manager)',
    badge: 'ADP Franchise Partner',
    defaultRoute: '/omp/verified-dealer',
  },
  {
    id: 'EXECUTIVE_ADMIN',
    label: 'Executive Dealer Group Admin',
    subtitle: 'Master Umbrella Central Office, Multi-store P&L, RBAC',
    icon: 'Building2',
    email: 'alexander.wright@nergy.io',
    roleName: 'Alexander Wright (Franchise Umbrella Owner)',
    badge: 'Executive Admin',
    defaultRoute: '/omp/executive/central-office',
  },
  {
    id: 'MEMBER',
    label: 'Registered Member / Seller',
    subtitle: 'Post ads, Chat with buyers, MyFav alerts, TruYou ID',
    icon: 'ShoppingBag',
    email: 'sarah.miller@gmail.com',
    roleName: 'Sarah Miller (Private Seller)',
    badge: 'TruYou Verified',
    defaultRoute: '/member/dashboard',
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('omp_user');
    return saved ? JSON.parse(saved) : ROLE_PRESETS[0]; // default to GUEST
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('omp_theme') || 'light';
  });

  const [selectedRadius, setSelectedRadius] = useState('50');
  const [selectedLocation, setSelectedLocation] = useState('Fremont, CA');
  const [myFavList, setMyFavList] = useState([
    { id: 'fav-1', title: '2024 Chevrolet Corvette Stingray 2LT', category: 'Cars & Trucks', price: '$79,900', location: 'Fremont, CA' },
    { id: 'fav-2', title: 'Commercial Vehicle Fleet Sales Specialist', category: 'Job Finder', price: '$95k/yr', location: 'San Jose, CA' },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('omp_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const loginAsRole = (roleId) => {
    const preset = ROLE_PRESETS.find((r) => r.id === roleId) || ROLE_PRESETS[0];
    setCurrentUser(preset);
    localStorage.setItem('omp_user', JSON.stringify(preset));
    return preset;
  };

  const loginWithCredentials = (email, password, roleId) => {
    let matched = ROLE_PRESETS.find(
      (r) => (roleId && r.id === roleId) || (email && r.email && r.email.toLowerCase() === email.toLowerCase())
    );
    if (!matched) {
      const defaultRole = ROLE_PRESETS.find((r) => r.id === (roleId || 'DEALER_PRO')) || ROLE_PRESETS[1];
      matched = {
        ...defaultRole,
        id: defaultRole.id,
        email: email || defaultRole.email,
        roleName: email ? `${email.split('@')[0]} (${defaultRole.badge})` : defaultRole.roleName,
        defaultRoute: defaultRole.defaultRoute,
      };
    } else if (email && email.toLowerCase() !== matched.email.toLowerCase()) {
      matched = {
        ...matched,
        email: email,
      };
    }
    setCurrentUser(matched);
    localStorage.setItem('omp_user', JSON.stringify(matched));
    return matched;
  };

  const logout = () => {
    const guest = ROLE_PRESETS[0];
    setCurrentUser(guest);
    localStorage.setItem('omp_user', JSON.stringify(guest));
    return guest;
  };

  const toggleFav = (item) => {
    setMyFavList((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const [userCustomListings, setUserCustomListings] = useState(() => {
    const saved = localStorage.getItem('omp_custom_listings');
    return saved ? JSON.parse(saved) : [];
  });

  const addNewListing = (newListing) => {
    const listingWithMeta = {
      ...newListing,
      id: `custom-${Date.now()}`,
      postedAt: 'Just now',
      truYou: true,
    };
    setUserCustomListings((prev) => {
      const updated = [listingWithMeta, ...prev];
      localStorage.setItem('omp_custom_listings', JSON.stringify(updated));
      return updated;
    });
    return listingWithMeta;
  };

  // Multi-tier Subscription Management (Marketplace Free vs CRM vs Central Office)
  const [activeSubscriptions, setActiveSubscriptions] = useState(() => {
    const saved = localStorage.getItem('omp_subscriptions');
    return saved ? JSON.parse(saved) : ['MARKETPLACE', 'CRM', 'CENTRAL_OFFICE']; // Pro access default for testing
  });

  const toggleSubscription = (tierId) => {
    setActiveSubscriptions((prev) => {
      let updated;
      if (prev.includes(tierId)) {
        updated = prev.filter((id) => id !== tierId);
      } else {
        updated = [...prev, tierId];
      }
      localStorage.setItem('omp_subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  const hasSubscription = (tierId) => {
    return activeSubscriptions.includes(tierId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginAsRole,
        loginWithCredentials,
        logout,
        theme,
        toggleTheme,
        selectedRadius,
        setSelectedRadius,
        selectedLocation,
        setSelectedLocation,
        myFavList,
        toggleFav,
        userCustomListings,
        addNewListing,
        activeSubscriptions,
        toggleSubscription,
        hasSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
