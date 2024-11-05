'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export interface user {
  email: string;
  password: string;
}
interface ClientOnlyProps {
  children: React.ReactNode;
  user: user|null;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children,user }) => {
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
      {!isAuthRoute && <Navbar user={user} />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
};

export default ClientOnly;
