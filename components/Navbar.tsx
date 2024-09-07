"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Cart from './Cart';
import { UI_Kits, Icons } from '@/constants';
import Featured from './Featured';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [openStates, setOpenStates] = useState<{ uiKits: boolean, icons: boolean }>({
        uiKits: false,
        icons: false
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Read the token from localStorage on component mount
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleClick = (key: 'uiKits' | 'icons') => {
        setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCartClick = () => {
        setIsCartOpen(prev => !prev);
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setToken(null);  // Update state
        router.push('/');
    };

    return (
        <div className='w-full h-[80px] p-4 flex justify-between'>
            {openStates.uiKits && <Featured prop={UI_Kits} />}
            {openStates.icons && <Featured prop={Icons} />}
            <div className='flex items-center justify-between w-[300px] ml-12'>
                <Image src='/logo.png' width={40} height={30} alt='logo' />
                <div className='hidden md:flex items-center justify-between w-[200px] ml-7'>
                    <Button className='flex items-center w-[100px] justify-between
                 bg-transparent rounded-md hover:bg-slate-100 text-black' onClick={() => handleClick('uiKits')}>
                        UI Kits
                        {openStates.uiKits ? (
                            <ChevronUp size={16} strokeWidth={0.75} />
                        ) : (
                            <ChevronDown size={16} strokeWidth={0.75} />
                        )}
                    </Button>
                    <Button className='flex items-center w-[100px] justify-between bg-transparent 
                rounded-md hover:bg-slate-100 text-black' onClick={() => handleClick('icons')}>
                        Icons
                        {openStates.icons ? (
                            <ChevronDown size={16} strokeWidth={0.75} />
                        ) : <ChevronUp size={16} strokeWidth={0.75} />
                        }
                    </Button>
                </div>
            </div>
            <div className='w-[350px] flex items-center justify-between gap-4'>
                {!token && <Link href='/sign-in'><Button className='sm:w-[80px] md:w-[100px] text-xs'>Sign in</Button></Link>}
                {!token && <Link href='/sign-up'><Button className='sm:w-[80px] md:w-[100px] text-xs'>Sign up</Button></Link>}
                {token && <div className='flex gap-4'>
                    <Link href='/add-product'><Button className='sm:w-[80px] md:w-[100px] text-xs'>Add product</Button></Link>
                    <Button onClick={handleLogOut} className='sm:w-[80px] md:w-[100px] text-xs'>Log out</Button>
                </div>}
                <button className='w-[100px] flex items-center'>
                    <ShoppingCart strokeWidth={1.5} onClick={handleCartClick} />
                </button>
            </div>
            <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default Navbar;
