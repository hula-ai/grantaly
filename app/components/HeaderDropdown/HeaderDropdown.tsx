"use client";
import { Role } from "@/utils/constant";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HeaderDropdown = () => {
  const { data: token, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const signOutUser = await signOut({ callbackUrl: "/login", redirect: true });
    console.log("signOut", signOutUser);
    router.push("/login");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center space-x-2 bg-white text-purple-100 font-bold py-2 px-4 rounded-md hover:bg-purple-100"
        type="button"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <span>{token?.user?.name}</span>
        {/* <ChevronDownIcon color="black" className="h-6 w-6" /> */}
      </button>

      <div
        className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-5 px-2">
          {(token?.user.role == Role.admin || token?.user.role == Role.superAdmin) && (
            <Link href={"/admin/dashboard"}>
              <a>
                <div
                  className="menu-item py-3 px-5 text-black font-medium hover:bg-purple-100 hover:text-white border-b-2 border-gray-100"
                  role="menuitem"
                >
                  Dashboard
                </div>
              </a>
            </Link>
          )}
          <Link href={"/profile"}>
            <a>
              <div
                className="menu-item py-3 px-5 text-black font-medium hover:bg-purple-100 hover:text-white border-b-2 border-gray-100"
                role="menuitem"
              >
                Profile
              </div>
            </a>
          </Link>
          <div
            className="menu-item py-3 px-5 text-black font-medium hover:bg-purple-100 hover:text-white border-b-2 border-gray-100 cursor-pointer"
            role="menuitem"
            onClick={handleSignOut}
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
