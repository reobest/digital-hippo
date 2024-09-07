"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
const Verification = () => {
const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(token);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}),
        });

        if (response.ok) {
          setIsVerified(true);
        } else {
          throw new Error('Failed to verify email');
        }
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 h-screen'>
      <Image src='/hippo-email-sent.png' alt='email-sent' width={200} height={500} />
      {loading ? (
        <p>Loading...</p>
      ) : isVerified ? (
        <>
          <h3>You are all set</h3>
          <p className='text-xs text-slate-600'>Thank you for verifying your account</p>
          <Link href='/sign-in'><Button className='w-[200px]'>Sign In</Button></Link>
        </>
      ) : (
        <p className='text-xs text-red-600'>{error || 'Verification failed. Please try again later.'}</p>
      )}
    </div>
  );
};

export default Verification;
