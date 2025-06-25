'use client';

import React from 'react';
import { Poppins } from "next/font/google";
import { Roboto } from 'next/font/google'
import { Bars3Icon } from '@heroicons/react/16/solid';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import './Header.css';



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});


function ColeHeader() {

  const pathname = usePathname()


  return (
    <>
    <header className='flex flex-col justify-between p-4 bg-[#d4edff]'>
      <Link href="/">
        <div>
          <h1 className={`text-4xl font-bold ${poppins.className}`}>Cole Kaplan</h1>
        </div>
      </Link>
      <div className={`text-2xl flex justify-between ${roboto.className}`}>
        <Link href="/">
          <p>Software Engineer & Game Developer at Georgia Tech</p>
        </Link>
        <div className=' hidden lg:flex flex-row space-x-2'>
          <Link href="/" className={`hover:text-[#A0BEE6] ${pathname === '/' ? 'active-link' : ''} ${roboto.className}`}>Home</Link>
          <p>|</p>
          <Link href="/contact" className={`hover:text-[#A0BEE6] ${pathname === '/contact' ? 'active-link' : ''} ${roboto.className}`}>Contact</Link>
        </div>
        <div className='lg:hidden justify-end'>
          <Popover>
            <PopoverTrigger><Bars3Icon className='h-6 w-6'></Bars3Icon></PopoverTrigger>
            <PopoverContent className='flex justify-end max-w-fill w-25 lg:hidden'>
              <div className='flex flex-col'>
                  <Link href="/" className={`hover:text-[#A0BEE6] ${pathname === '/' ? 'active-link' : ''} ${roboto.className}`}>Home</Link>
                  <Link href="/contact" className={`hover:text-[#A0BEE6] ${pathname === '/contact' ? 'active-link' : ''} ${roboto.className}`}>Contact</Link>
                </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
    </>
  );
}



export default ColeHeader;
