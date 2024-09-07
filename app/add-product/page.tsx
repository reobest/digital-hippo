import React from 'react'
import ProductForm from '@/components/ProductForm'
const AddProduct = () => {
  return (
    <div className='w-full flex flex-col items-center'>
        <h1>Add a new product</h1>
        <ProductForm/>
    </div>
  )
}

export default AddProduct