import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Image from 'next/image';

import { user } from '@/interface/interface';
import { useRouter } from 'next/navigation';
import ProjectInitiate from './ProjectInitiate';
import Logout from './Logoutdialog';


interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Services', href: '/#services', current: false },
  { name: 'About', href: '/#about', current: false },
  { name: 'Project', href: '/#project', current: false },
]
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    user: user
}

const Header = ({user}:Props) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const router = useRouter();
    return (
        // <Disclosure as="nav" className="navbar">
           
        // </Disclosure>
         <>
         <div style={{backgroundColor:'#FFFFFF'}} className="mx-auto max-w-7xl px-6 lg:py-4 lg:px-8">
             <div className=" flex h-20 items-center justify-end">
                 <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">



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
                                    <Logout/>
                                </> : <> <Signdialog /> </>
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

export default Header;
