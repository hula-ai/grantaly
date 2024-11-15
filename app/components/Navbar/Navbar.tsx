'use client'
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Image from 'next/image';

import LogoutModal from './Logoutdialog';
import { user } from '@/interface/interface';
import { usePathname, useRouter } from 'next/navigation';
import ProjectInitiate from './ProjectInitiate';
import { Role } from '@/types/enum';


interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    user: user
}

const Navbar = ({user}:Props) => {

    const pathname = usePathname();
    const loggedIn = pathname.includes('/admin') || pathname.includes('/user') ? true :false
    const admin = user.role === Role.ADMIN ? true : false; 


    const navigation: NavigationItem[] = [
        { name: loggedIn ? 'home' : 'Dashboard', href: loggedIn ? '/' : admin ? '/admin/dashboard' : '/user/dashboard' , current: true },
        { name: 'Services', href: '#services', current: false },
        { name: 'About', href: '#about', current: false },
        { name: 'Project', href: '#project', current: false },
        { name: 'Contact', href: '#contactus', current: false },
    ]

    const [isOpen, setIsOpen] = React.useState(false);

    const router = useRouter();
    return (
        // <Disclosure as="nav" className="navbar">
           
        // </Disclosure>
         <>
         <div style={{backgroundColor:'#FFFFFF'}} className="mx-auto max-w-7xl px-6 lg:py-4 lg:px-8">
             <div className="relative flex h-20 items-center justify-between">
                 <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

                     {/* LOGO */}

                     <div onClick={()=>{router.push('/')}} className="cursor-pointer flex flex-shrink-0 items-center">
                         
                         <Image
                            className="mx-auto h-12 w-auto"
                            src="/assets/logo/logo-b.svg"
                            alt="Your Company"
                            width={2000}
                            height={2000}
                        />
                     </div>

                     {/* LINKS */}

                     <div className="hidden lg:block m-auto">
                         <div className="flex space-x-4">
                             {navigation.map((item) => (
                                 <Link
                                     key={item.name}
                                     href={item.href}
                                     className={classNames(
                                         item.current ? ' text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
                                         'px-3 py-4 text-lg font-normal opacity-75 space-links'
                                     )}
                                     aria-current={item.href ? 'page' : undefined}
                                 >
                                     {item.name}
                                 </Link>
                             ))}
                         </div>
                     </div>
                 </div>

                 {/* SIGNIN DIALOG */}

                        { 
                            user ? 
                                <>
                                    {user?.role !== Role.ADMIN && <ProjectInitiate />}
                                    <LogoutModal/>
                                </> : <> <Signdialog />
                                    <Registerdialog /> </>
                        }

                 {/* REGISTER DIALOG */}




                 {/* DRAWER FOR MOBILE VIEW */}

                 {/* DRAWER ICON */}

                 <div className='block lg:hidden'>
                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                 </div>

                 {/* DRAWER LINKS DATA */}

                 <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                     <Drawerdata user={user} />
                 </Drawer>

             </div>
         </div>
     </>
    )
}

export default Navbar;
