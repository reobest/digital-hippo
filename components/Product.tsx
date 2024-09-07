"use client"
import React, { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'
interface ProductType {
    product: {
        _id: string,
        name: string,
        productDetails: string,
        price: string,
        category?: string,
        images: string[],
    }
}
const Product = ({ product }: ProductType) => {
    const { _id, name, images, price, category } = product
    return (
        <div key={_id} className='w-[150px] h-[300px] flex flex-col space-y-2'>
            <Carousel className="w-[150px] max-w-xs h-[120px] group">
                <CarouselContent className='h-[120px] w-[150px]'>
                    {product?.images.map((image: string, index: number) => (
                        <CarouselItem key={index}>
                            <div>
                                <Card>
                                    <img className='w-[150px] h-[130px] rounded-md' src={image} alt="image" />
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
            <Link href={`/product/${_id}`}>
                <div className='w-full flex flex-col'>
                    <p className='text-[15px] font-semibold'>{name}</p>
                    <p className='text-slate-800 text-xs'>{category}</p>
                    <p className='font-semibold'>{price}$</p>
                </div>
            </Link>
        </div>
    )
}

export default Product