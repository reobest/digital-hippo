import React from 'react'
import { Features } from '@/constants'
const Appfeatures = async () => {
    const MONGODB_Uri = process.env.MONGODB_URI;
    console.log(MONGODB_Uri);
    return (
        <div className='w-full flex flex-wrap justify-center items-center  gap-12 bg-slate-100'>
            {Features.map((feature) => {
                return <div className='flex flex-col w-[300px] h-[300px] items-center justify-center gap-4' key={feature.name}>
                    <div className='w-[50px] rounded-full bg-blue-200 flex justify-center items-center h-[50px]'>
                        {feature.icon}
                    </div>
                    <h3>{feature.name}</h3>
                    <p className='text-slate-700 text-xs text-center'>{feature.description}</p>
                </div>
            })}
        </div>
    )
}

export default Appfeatures