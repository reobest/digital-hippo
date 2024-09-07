"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Check, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SimilarProducts from '@/components/SimilarProducts'
import { ProductType } from '@/lib/types'
import { useCart } from '@/context/CartContext'
const ProductDetails = ({ params }: { params: { id: string } }) => {
    const { addToCart } = useCart()
    const [product, setProduct] = useState<ProductType | null>(null)
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/fetchproduct?id=${params.id}`, {
                    method: 'GET'
                })
                const data = await response.json()
                setProduct(data.product)
            } catch (error) {
                console.log(error);

            }
        }
        fetchProject()
    }, [])

    return (
        <div className='w-full flex flex-col items-center md:justify-center'>
            <div className='sm:w-[400px] lg:w-[900px] flex flex-col lg:flex-row gap-3 mt-[50px]'>
                <div className='w-[100%] lg:w-[50%] flex flex-col space-y-6'>
                    <p className='text-xs text-slate-800'>Home     /    Products</p>
                    <h1 className='text-3xl font-bold'>{product?.name}</h1>
                    <p><span className='font-bold text-sm'>${product?.price}</span> | <span className='text-sm text-slate-800'>{product?.category}</span></p>
                    <p className='text-slate-700'>{product?.productDetails}</p>
                    <p className='flex gap-4'>
                        <Check strokeWidth={1.25} className='text-green-500' />
                        Eligable for instant delivery
                    </p>
                    <Button onClick={ () => product && addToCart(product)}>Add to cart</Button>
                    <p className='flex gap-4'>
                        <Shield strokeWidth={0.5} />
                        30 Days return guarantee
                    </p>
                </div>
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {product && product?.images?.map((image: any, index: any) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <img className='rounded-md h-[300px]' src={image} alt="image" />
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    />
                    <CarouselNext
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    />
                </Carousel>
            </div>
            <SimilarProducts />
        </div>
    )
}

export default ProductDetails