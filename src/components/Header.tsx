"use client"
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import Avatar from './Avatar'
import CustomTooltip from './reuse/CustomTooltip'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface Props {
    companionName: string
    companionAvatar: string | null
}



const Header = ({ companionAvatar, companionName }: Props) => {
    const router = useRouter()
    return (
        <div className='w-full h-16 bg-neutral-800 flex justify-between items-center px-5'>
            <div className=' flex gap-5 items-center w-full max-w-5xl mx-auto'>
                <Button onClick={() => router.back()} className=' bg-neutral-700 p-0 rounded-full'>
                    <CustomTooltip message='Back'>
                        <ChevronLeft className=' h-10 w-10 p-1 rounded-full' />
                    </CustomTooltip>
                </Button>
                <div className=' flex space-x-2 items-center'>
                    <Avatar name={companionName} imgUrl={companionAvatar} />
                    <p className=' text-lg'> {companionName} </p>
                </div>
            </div>


        </div>
    )
}

export default Header