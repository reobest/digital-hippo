"use client"
import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react'
interface CartProps {
    open: boolean;
    onClose: () => void;
}

const Cart = ({ open, onClose }: CartProps) => {
    const [email, setEmail] = useState<string | null>(null);
    const { cartChanged, setCartChanged, setCart, cart } = useCart()
    const [number, setNumber] = useState<{ [id: string]: number }>({});
    const [products, setProducts] = useState([])
    console.log(products);
    const totalPrice = products?.reduce((total: any, product: any) => total + (product.price * product.quantity), 0);
    const itemsCount = products ? products.length : 0

    const handleremoveCrat = async (id: string) => {
        console.log(JSON.stringify(id));

        try {
            const response = await fetch("http://localhost:3000/api/removefromcart", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify({ id })
            })
            const newCart = cart.filter((cart) => cart._id != id)
            setCart(newCart)
            const data = await response.json()
            setCartChanged(prev => !prev)
        } catch (error) {
            console.log(error);

        }
    }
    const setQuantity = async (id: string, change: number) => {
        try {
            const response = await fetch('http://localhost:3000/api/increasequantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: change, id })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCartChanged(prev => !prev)
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('email');
            setEmail(storedEmail);
        }
        const addToCart = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/cartitems", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                })
                const data = await response.json()
                setProducts(data.products)
            } catch (error) {
                console.log(error);

            }
        }
        if (email) {
            addToCart()
        }
    }, [cartChanged, email])

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='text-center'>Cart({itemsCount})</SheetTitle>
                    <SheetDescription className='text-black text-md'>
                    </SheetDescription>
                </SheetHeader>
                {itemsCount > 0 && email ? (
                    <div className='w-full'>
                        <h4> cart items:</h4>
                        <div className='w-full h-[300px] overflow-y-scroll mt-4'>
                            {products && products.map((product: any) => (
                                <div className='w-full h-[80px] flex justify-between' key={product._id}>
                                    <div className='w-[250px] h-full flex gap-3 items-center'>
                                        <div className="h-full">
                                            {product.images && product.images.length > 0 ? (
                                                <Image src={product.images[0]} alt="product" height={100} width={75} className='w-[60px] h-[60px] rounded-md' />
                                            ) : (
                                                <div>No image available</div>
                                            )}
                                        </div>
                                        <div className='h-full w-[150px]'>
                                            <h1 className='text-sm font-semibold'>{product.name}</h1>
                                            <p className='text-xs text-slate-800'>{product.category}</p>
                                            <button className='text-slate-800 flex items-center'>Remove<X className='h-[20px] w-[20px]' onClick={() => handleremoveCrat(product._id)} /></button>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => setQuantity(product._id, 1)}>+</button>
                                        <p>{product.quantity || 1}</p>
                                        <button onClick={() => setQuantity(product._id, -1)}>-</button>
                                    </div>
                                    <div className='w-[40px] h-full flex items-center'>
                                        <p className='w-full text-sm font-semibold'>${product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className='mt-4' />
                        <div className='w-full flex items-center justify-between mt-2'><span>Shipping</span><span>0.00$</span></div>
                        <div className='w-full flex items-center justify-between mt-2'><span>Transaction Fee</span><span>1.00$</span></div>
                        <div className='w-full flex items-center justify-between mt-2'><span>Total</span><span>{totalPrice + 1}$</span></div>
                        <Link href='/checkout'><Button className='w-full mt-4' >Continue To Checkout</Button></Link>
                    </div>
                ) : (
                    <div className='w-full flex flex-col justify-center items-center h-full'>
                        <Image src='/hippo-empty-cart.png' alt='empty-cart' width={200} height={200} />
                        <p>Your cart is empty.</p>
                        <Link href='/' className='text-blue-800 text-xs'>Add items to your cart to checkout</Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );

};

export default Cart;
