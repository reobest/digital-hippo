"use client"
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
const Hero = () => {
    const handleClick = async () => {
        try {
            const data = await fetch('http://localhost:3000/rayan')
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            const res = await data.json();
            console.log(res);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='w-full flex h-[400px] md:h-[300px] items-start justify-center'>
            <div className='w-[100%] sm:w-[65%] md:w-[65%] lg:w-[45%] flex flex-col items-center h-[100%] gap-5'>
                <h1 className='text-5xl  text-center font-semibold'>Your marketplace for high-quality <span className='text-blue-600'>Digital assets</span></h1>
                <p className='text-center'>Welcome to digitalHippo. Every asset in our platform is verified by our team to ensure our highest quality standards</p>
                <div className='w-full flex items-center justify-around'>
                  <Link href="/browse-products"><Button className={buttonVariants()}>Browse Trending</Button></Link>
                    <Button className='bg-transparent box-border text-black flex gap-2 hover:bg-slate-100 hover:gap-5' onClick={handleClick}>
                        Our quality promise
                        <MoveRight size={16} strokeWidth={3} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Hero