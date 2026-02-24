"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { twMerge } from 'tailwind-merge'


interface Props {
    children: React.ReactNode
    header: string
    desc: string
    content: React.ReactNode
    width?: "fit" | "full"
}


const CustomDialog = ({ children, header, desc, content, width }: Props) => {
    return (
        <Dialog>
            <DialogTrigger className={twMerge("w-fit h-fit", `w-${width}`)}>{children} </DialogTrigger>
            <DialogContent className={twMerge(' bg-neutral-900 border-neutral-600 text-white w-[95%] rounded-xl')}>
                <DialogHeader className='space-y-0'>
                    <DialogTitle className=' text-2xl'>
                        {header}
                    </DialogTitle>
                    <DialogDescription className=''>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog