import SignUpForm from '@/components/SignUpForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Signup = () => {
    return (
        <div className='w-full flex flex-col items-center space-y-6'>
            <Image
                src='/logo.png'
                width={100}
                height={100}
                alt='logo'
            />
            <h1 className='text-3xl font-semibold'>Create an account</h1>
            <Link href='/sogn-in' className='text-blue-800'>Already have an account? sign-in</Link>
            <SignUpForm />
        </div>
    )
}

export default Signup