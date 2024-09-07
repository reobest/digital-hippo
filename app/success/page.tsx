"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface T extends ProductType {
  userEmail?: string;
}
const page = () => {
  const router = useRouter()
  const [products, setProducts] = useState<T[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const user: any = products[0]?.userEmail || ""
  const clearAddToCart = async() => {
    try {
      const response  = await fetch('http://localhost:3000/api/clearcart',{
        method:'GET',
      })
      const data = await response.json()
      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cartitems");
        const data = await response.json();
        setProducts(data.products);

        const subtotal = data.products.reduce((acc: any, product: any) => acc + product.price, 0);
        setTotalAmount(subtotal + 1); // Adding $1.00 transaction fee
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);
  return (
    <div className='w-full p-12 flex flex-col gap-4'>
      <p className='text-xs text-blue-500'>order successfull</p>
      <h1 className='text-3xl font-bold'>Thanks for ordering</h1>
      <p className='text-xs text-slate-800'>your order was processed and your assets are available to download below. we've sent your receipt and order detailes to <span className="font-semibold">{user}</span></p>
      <div className='w-[600px] h-[300px] overflow-y-scroll mt-[80px]'>
        {products.map((product: any) => (
          <div key={product._id} className='w-full h-[80px] flex justify-between'>
            <div className='w-[250px] h-full flex gap-3 items-center'>
              <div className="h-full">
                <Image src={product.images[0]} alt="product" height={100} width={75} className='w-[60px] h-[60px] rounded-md' />
              </div>
              <div className='h-full w-[150px]'>
                <h1 className='text-sm font-semibold'>{product.name}</h1>
                <p className='text-xs text-slate-800'>{product.category}</p>
                <button className='text-slate-800'>Remove</button>
              </div>
            </div>
            <div className='w-[40px] h-full flex items-center'>
              <p className='w-full text-sm font-semibold'>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='w-[600px] flex items-center justify-between mt-[40px]'>
        <span className='text-xs text-slate-700'>Subtotal</span>
        <span className='text-xs font-semibold'>${totalAmount.toFixed(2)}</span>
      </div>
      <div className='w-[600px] flex items-center justify-between mt-2'>
        <span className='text-xs text-slate-700'>Transaction Fee</span>
        <span className='text-xs font-semibold'>$1.00</span>
      </div>
      <div className='w-[600px]  flex items-center justify-between mt-2'>
        <span className='text-xs font-semibold'>Total</span>
        <span className='text-xs font-semibold'>${(totalAmount + 1).toFixed(2)}</span>
      </div>
      <div className='flex w-[600px] justify-between mt-[60px]'>
        <div className=' flex flex-col gap-2 items-start justify-between'>
          <span className='text-xs text-slate-700'>Shipping To</span>
          <span className='text-xs font-semibold'>{user}</span>
        </div>
        <div className='flex flex-col gap-2 items-start justify-between'>
          <span className='text-xs text-slate-700'>Order status</span>
          <span className='text-xs font-semibold'>Paying successfull</span>
        </div>
      </div>
      <div className='w-full relative mt-[20px] p-3'>
        <Button className='absolute right-3' onClick={clearAddToCart}>Continue shopping</Button>
      </div>

    </div>
  )
}

export default page