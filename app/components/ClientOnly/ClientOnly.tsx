"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import { user } from "@/interface/interface";
import Sidebar from "../AdminSideBar/AdminSideBar";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useState<user | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        // Make API call to register the user
        const response = await fetch("/api/getCurrentUserAPI", {
          method: "GET",
        });

        const data = await response.json();
        console.log(data,"i am fetched DAta")
        if (response.ok) {
          setUser(data);
        }
      } catch {
        console.error("Failed to fetch user");
      } finally {
        setHasMounted(true);
      }
    };

    getCurrentUser();
  }, []);

  const pathname = usePathname().startsWith("/auth");

  const isAdmin = usePathname().startsWith("/admin");

  if (!hasMounted) return null;

  return (
    <>
    
    {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      {!pathname && !isAdmin && <Navbar user={user} />}
      {children}
      {!pathname && !isAdmin && <Footer />}
      {/* {!pathname  && <Footer />} */}
    </>
  );
};

export default ClientOnly;
