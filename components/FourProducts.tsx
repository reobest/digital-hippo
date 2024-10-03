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
    const Port = 3000 || 10000
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProdects = async () => {
            try {
                const response = await fetch(`http://localhost:10000/api/getproducts`, {
                    method: 'GET'
                })
                if (response.ok) {
                    const data = await response.json()
                    setProducts(data.products)
                }
                else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {

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