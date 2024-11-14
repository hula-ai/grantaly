"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { user as UserType } from "@/interface/interface";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/AdminSideBar/AdminSideBar";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const AdminClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null); // Renamed to currentUser to avoid conflict with imported user type
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname().startsWith("/auth");

  // Use effect to handle the client-side mounting logic
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
          setCurrentUser(data);
        }
      } catch {
        console.error("Failed to fetch user");
      } finally {
        setHasMounted(true);
      }
    };

    getCurrentUser();
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <div>
          <Header user={currentUser} />
        </div>
        {/* Main Content */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminClientOnly;
