'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <>
    <Navbar/>
      { children }
    <Footer/>
    </>
  );
};

export default ClientOnly;
