'use client'

import { useState } from 'react';
import Link from 'next/link';
import NavMenu from '@/app/ui/navbar/navmenu';
import { DropDownMenu } from '@/app/ui/navbar/dropdownmenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="top-0 z-50 w-full">
        <div className="bg-white opacity-95 text-black mx-2 mt-2 rounded-lg p-4 w-full">
            <div className="flex justify-between items-center mx-4">
                <div className="text-black text-2xl font-extralight">
                  <Link href="/">{process.env.APP_NAME}</Link>
                </div>
                <div className="flex align-middle items-center text-center flex-row">
                    <div className='max-md:hidden'>
                        <NavMenu />
                    </div>
                    <div className="">
                        <DropDownMenu>
                            <button onClick={toggleMenu} className="text-black">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                >
                                </path>
                              </svg>
                            </button>
                        </DropDownMenu>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
