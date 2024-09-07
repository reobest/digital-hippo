import SignIn from '@/components/SignIn'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Signin = () => {
    return (
        <div className='w-full flex flex-col items-center space-y-6'>
            <Image
                src='/logo.png'
                width={100}
                height={100}
                alt='logo'
            />
            <h1 className='text-3xl font-semibold'>Login to your acoount</h1>
            <Link href='/sign-up' className='text-blue-800'>Dont have an account? sign-up</Link>
            <SignIn />
        </div>
    )
}

export default Signin