import React from 'react'

const loading = () => {
    return (
        <div className='w-full md:p-10 p-4 space-y-5'>
        <div>
            <p className=' text-3xl'>Settings</p>
            <p className=' text-neutral-500'>Modify your companions </p>
        </div>
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7  gap-5 w-full'>
            {
                [...Array(10)].map((i, j) => {
                    return (
                        <div key={j} className=' border border-neutral-700 p-4 rounded-xl w-full space-y-2'>
                            <div className=' relative w-full overflow-hidden aspect-square rounded-xl animate-pulse bg-neutral-800' />
                            <p className=' text-lg  py-3 w-[70%] rounded-md bg-neutral-700 animate-pulse' />
                            <p className='py-3 w-20 bg-neutral-800 animate-pulse rounded-full' />
                            <div className=' flex space-x-2 w-full'>
                                <div className=' w-full py-4 bg-neutral-700 animate-pulse rounded-lg' />
                                <div className=' w-full py-4 bg-neutral-700 animate-pulse rounded-lg' />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}

export default loading