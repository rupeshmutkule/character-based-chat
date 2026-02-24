"use client"


import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'



interface Props {
    children: React.ReactNode
    content: React.ReactNode
}


const CustomPopover = ({ children, content }: Props) => {
    return (
        <Popover>
            <PopoverTrigger>{children} </PopoverTrigger>
            <PopoverContent align="start" className='p-2 w-fit'>{content} </PopoverContent>
        </Popover>
    )
}

export default CustomPopover