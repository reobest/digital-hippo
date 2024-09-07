import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full flex flex-col items-center gap-7 p-6'>
            <Image src='/logo.png' width={40} height={30} alt='logo' />
            <div className='w-[70%] flex flex-col rounded-md p-6 bg-slate-50 items-center'>
                <h1 className='text-base font-semibold w-full text-center p-6'>Become a Seller</h1>
                <p className='text-slate-800 w-[70%] text-center'>If you&rsquo; like to sell high-quality digital products you can do so in minutes <span className='font-semibold'>Get started</span></p>
            </div>
            <p className='w-[80%] text-xs text-slate-600 flex justify-around'>
                <span>&#169; 2023 All Rights Reserved</span>Terms<span></span><span>Privacy Policy</span><span>Cookie Policy</span>
            </p>
        </div>
    )
}

export default Footer