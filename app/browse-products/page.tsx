"use client"
import Product from '@/components/Product'
import { ProductType } from '@/lib/types'
import React, { useEffect, useState } from 'react'

const BrowseProducts = () => {
    const [Products, setProducts] = useState([])
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/fetchallproducts', {
                    method: 'GET'
                })
                const data = await response.json()
                setProducts(data.products)
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllProjects()
    }, [])
    return (
        <div className='w-full p-6 flex flex-wrap gap-5'>
            {Products && Products?.map((product: ProductType) => {
                return <Product product={product} />
            })}
        </div>
    )
}

export default BrowseProducts