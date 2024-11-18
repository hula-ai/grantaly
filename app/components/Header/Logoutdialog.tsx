import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import { useRouter } from "next/navigation";

const Logout = () => {

  const router = useRouter();
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Sign out and redirect to the home page or desired URL
    router.push('/');
  };

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
        <div className="hidden lg:block">
          <button
            className="text-blue text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out leafbutton bg-lightblue hover:text-white hover:bg-blue"
            onClick={handleSignOut} // Call handleSignOut on click
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}

export default Logout