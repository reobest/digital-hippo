"use client"
import React from 'react'
import {useRouter} from 'next/navigation'
const page = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <button className="bg-red-500 text-white p-2 w-[400px] h-[40px] " onClick={() => router.push('/')}>
        You Canceled The order Return to Home Page
      </button>
    </div>
  )
}

export default page