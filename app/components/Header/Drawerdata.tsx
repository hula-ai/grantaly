import React from "react";
import Link from "next/link";
import { user } from "@/interface/interface";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Role } from "@/types/enum";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  user: user | null;
}

const Data = ({ user }: Props) => {

  const isLogin = user;
  const isAdmin = user?.role === Role.ADMIN


  const navigation: NavigationItem[] = isLogin ? [
    { name: "Home", href: "/", current: true },
    { name: "Services", href: "#services", current: false },
    { name: "About", href: "#about", current: false },
    { name: "Project", href: "#project", current: false },
    { name: "Help", href: "/", current: false },
    { name: "Dashboard", href: isAdmin ? "/admin/dashboard" : "/user/dashboard", current: false },
    { name: "Project", href: isAdmin ? "/admin/project" : "/user/project", current: false },
    { name: "Schedule", href: isAdmin ? "/admin/schedule" : "/user/schedule", current: false },
  ] :   
  [ 
    { name: "Home", href: "/", current: true },
    { name: "Services", href: "#services", current: false },
    { name: "About", href: "#about", current: false },
    { name: "Project", href: "#project", current: false },
    { name: "Help", href: "/", current: false },
  ]


  const router = useRouter();
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "text-black hover:opacity-100"
                    : "hover:text-black hover:opacity-100",
                  "px-2 py-1 text-lg font-normal opacity-75 block"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                {!(user?.role === Role.ADMIN) && <button
                  onClick={() => {
                    router.push("/project-initialization");
                  }}
                  className="bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded"
                >
                  Project Initiate
                </button>}
              <button onClick={()=>{
                signOut({ callbackUrl: '/' });
                router.push('/');
              }} className="bg-white w-full text-blue border border-lightblue font-medium py-2 px-4 rounded">
                LogOut
              </button>
              </>
            ) : (
              <>
                <div className="mt-4"></div>
                <button
                  onClick={() => {
                    router.push("/auth/signin");
                  }}
                  className="bg-white w-full text-blue border border-lightblue font-medium py-2 px-4 rounded"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                  className="bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
