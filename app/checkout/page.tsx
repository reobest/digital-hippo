"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

const Checkout = () => {
    const router = useRouter()
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch("https://digital-hippo-lc7e.onrender.com/api/cartitems");
                const data = await response.json();
                setProducts(data.products);

                const subtotal  = data.products.reduce((acc : any, product : any) => acc + (product.price * product.quantity), 0);
                setTotalAmount(subtotal + 1); // Adding $1.00 transaction fee
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleCheckout = async () => {
        const stripe : any = await stripePromise;

        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products ,amount:totalAmount*100}), // Amount in cents
            });
            const { url } = await response.json();
            router.push(`${url}`)
        } catch (error) {
            console.error('Error handling payment:', error);
        }
    };

    return (
        <div className='w-full flex items-center h-screen justify-center'>
            <div className='flex flex-wrap justify-center gap-[80px]'>
                <div className='sm:w-[300px] md:w-[400px] lg:w-[600px] h-[300px] overflow-y-scroll mt-4'>
                    {products.map((product : any) => (
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
                <div className='w-[300px] bg-slate-50 p-5 rounded-md flex flex-col space-y-5'>
                    <h1 className='text-xl font-semibold'>Order Summary</h1>
                    <div className='w-full flex items-center justify-between mt-2'>
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className='w-full flex items-center justify-between mt-2'>
                        <span>Transaction Fee</span>
                        <span>$1.00</span>
                    </div>
                    <div className='w-full flex items-center justify-between mt-2'>
                        <span>Total</span>
                        <span>${(totalAmount + 1).toFixed(2)}</span>
                    </div>
                    <Button className='w-full mt-4' onClick={handleCheckout}>Checkout</Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
