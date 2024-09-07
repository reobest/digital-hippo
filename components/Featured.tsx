import Image from 'next/image'
import React from 'react'
interface FeaturedInterface {
    prop:any, 
}
const Featured = ({prop}: FeaturedInterface) => {
  return (
    <div className={`w-full h-[400px] absolute top-[80px] z-50 bg-white flex 
    p-4 items-center justify-around`}>
        {prop.map((prop : any) => (
            <div key={prop.name} className='w-[300px] h-[300px] flex flex-col'>
                <Image src={prop.imageSrc} alt={prop.name} width={300} height={200} className='h-[200px] rounded-md'/>
                <div className='w-full mt-2'>
                    <h3>{prop.name}</h3>
                    <h5 className='text-sm text-slate-800 cursor-pointer'>Shop now</h5>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Featured