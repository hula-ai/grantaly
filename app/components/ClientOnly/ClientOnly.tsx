'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthRoute, setIsAuthRoute] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Check if the current path starts with "Auth"
    if (typeof window !== 'undefined') {
      setIsAuthRoute(window.location.pathname.startsWith('/Auth'));
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      {!isAuthRoute && <Navbar />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
};

export default ClientOnly;
