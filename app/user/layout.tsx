import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "../global.css";

import Sidebar from "@/components/AdminSideBar/AdminSideBar";
import UserClientOnly from "./UserClientOnly";
import getCurrentUser from "@/actions/getCurrentUser";
import GuestRedirect from "@/components/GuestRedirect/GuestRedirect";
import { Role } from "@/types/enum";
import AdminRedirect from "@/components/AdminRedirect/AdminRedirect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Grantaly",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return <GuestRedirect/>
  }

  if((currentUser?.role === Role.ADMIN)){
      return <AdminRedirect/>
  }

  return (
    <div >
        <UserClientOnly>
          {children}
        </UserClientOnly>
    </div>
  );
}
