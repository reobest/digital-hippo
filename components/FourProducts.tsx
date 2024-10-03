"use client"
import React, { useEffect, useState } from 'react'
import Product from '@/components/Product'
import Link from 'next/link'
interface ProductType {
    _id: string,
    name: string,
    productDetails: string,
    price: string,
    category: string,
    images: string[],
}
const FourProducts = () => {
    const ports = ['http://localhost:/10000/api/getproducts','http://localhost:3000/api/getproducts','https://digital-hippo-lc7e.onrender.com/api/getproducts',];
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProdects = async () => {
            for (const port of ports) {
                try {
                    const response = await fetch(`http://localhost:${port}/api/getproducts`, {
                        method: 'GET'
                    })
                    if (response.ok) {
                        const data = await response.json()
                        setProducts(data.products)
                        break
                    }
                    else {
                        console.error('Failed to fetch products');
                    }
                } catch (error) {

                }
            }
        }
        fetchProdects()
    }, [])
    console.log(products);
    return (
        <div className='w-full h-[400px] p-4'>
            <div className='w-full  flex justify-between my-5'>
                <h1 className='text-3xl font-bold'>Brand New</h1>
                <Link href="/browse-products"><button className='text-blue-600'>shop the collection ...</button></Link>
            </div>
            <div className='w-full flex justify-center gap-5'>
                {products && products?.map((product: ProductType) => {
                    return <Product product={product} key={product._id} />
                })}
            </div>
        </div>
    )
}

export default FourProducts