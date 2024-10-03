"use client"
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/lib/types'
import Product from './Product'
const SimilarProducts = () => {
    const [similarProducts, setSimilarProducts] = useState([])
    useEffect(() => {
        const fetchSimilarProjects = async () => {
            try {
                const response = await fetch('https://digital-hippo-lc7e.onrender.com/api/fetchsimilar', {
                    method: 'GET'
                })
                const data = await response.json()
                setSimilarProducts(data.products)
            } catch (error) {
                console.log(error);

            }
        }
        fetchSimilarProjects()
    }, [])

    return (
        <div className='w-full mt-[150px] p-4'>
            <h1 className='text-2xl font-bold'>Similar Icons</h1>
            <p className='text-xs text-slate-800 mt-3'>Browse similar high quality icons just like My product </p>
            <div className='w-full flex px-2 gap-2 mt-7'>
                {similarProducts && similarProducts?.map((product: ProductType) => {
                    return <Product product={product} key={product._id} />
                })}
            </div>
        </div>
    )
}

export default SimilarProducts