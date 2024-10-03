"use client"
import React, { useState, useContext, useEffect } from 'react'
import { createContext } from 'react'
import { ProductType } from '@/lib/types';

interface CartContextType {
    cart: ProductType[];
    cartChanged:boolean;
    addToCart: (product: ProductType) => void;
    setCartChanged: React.Dispatch<React.SetStateAction<boolean>>; 
    setCart: React.Dispatch<React.SetStateAction<any>>; 

}
const cartContext = createContext<CartContextType | undefined>(undefined)
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [email, setEmail] = useState<string | null>(null);
    const [cartChanged,setCartChanged] = useState<boolean>(false)
    const [cart, setCart] = useState<ProductType[]>([])

    useEffect(() => {
        // Check if `localStorage` is available (i.e., we are in the browser)
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('email');
            setEmail(storedEmail);
        }
    }, []);   
    const addToCart = async (product: ProductType) => {
        const isEmail = product.userEmail == email;
        if (email ) {
            const existingProduct = cart.find((pro: any) => pro._id == product._id)
            if (existingProduct) {
                return
            } else {
                setCart(prev => [...prev, product])
            }
            try {
                const response = await fetch('https://digital-hippo-lc7e.onrender.com/api/addtocart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: product._id }),
                })
                setCartChanged(prev => !prev)
                const data = await response.json()
            } catch (error) {
                console.log(error);

            }
        }else{
            return
        }
    }
    return (
        <cartContext.Provider value={{ addToCart, cart ,cartChanged,setCartChanged , setCart}}>
            {children}
        </cartContext.Provider>
    )
}
export const useCart = () => {
    const context = useContext(cartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
