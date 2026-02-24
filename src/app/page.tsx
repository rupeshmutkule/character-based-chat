import banner from "../../public/1.png"
import SignInButton from '@/components/SignInButton'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className=' h-screen w-screen flex py-2'>
    <div className=' w-full h-full flex flex-col'>
        <p className=' text-3xl md:px-10 px-3'>Companion.ai</p>
        <div className=' grid justify-center w-full space-y-10 flex-1'>
            <div className=' w-max mx-auto mt-20 text-2xl lg:text-6xl bg-gradient-to-r from-white/80 to-neutral-800  text-transparent bg-clip-text'>
                Chat with your favourite persone
            </div>
            <SignInButton />
            <div className='relative w-full h-64 lg:h-80 mx-auto'>
              <Image 
                src={banner} 
                alt='Companion.ai banner' 
                priority
                className="object-contain" 
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
        </div>
        <div className=' w-full border-t border-t-neutral-700 my-2 py-2 px-10'>
            <p className='text-sm text-neutral-600'>copyrights @2026 Companion.ai. All rights reserved.</p>
        </div>
    </div>
</div>
  )
}

export default page