import { Input } from '@/components/ui/input'
import React from 'react'

const loading = () => {
    return (
        <div className=' w-full  p-2 px-5 space-y-3'>
            <Input disabled placeholder='Search here......' className=' mb-3 border border-neutral-500' />

            <div className=' flex w-full space-x-3'>
                {
                    [...Array(10)].map((i, j) => (
                        <div key={j} className=' py-4 w-20 bg-neutral-700/30 rounded-lg bg-neutral-800 animate-pulse' />
                    ))
                }
            </div>

            <div className=' grid grid-cols-2 py-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4'>
                {
                    [...Array(12)].map((i, j) => (
                        <div key={j} className=" w-full h-full rounded-xl bg-neutral-800 p-5 transition-all duration-300 flex flex-col space-y-2">
                            <div className=' w-full relative aspect-square overflow-hidden object-cover rounded-lg bg-neutral-700/50 animate-pulse' />
                            <p className=' text-neutral-4 text-lg w-32 py-3  bg-neutral-700 mx-auto animate-pulse rounded-lg' />
                            <p className=' text-neutral-500 mx-auto animate-pulse w-40 py-3 bg-neutral-700 rounded-lg' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default loading