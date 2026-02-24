import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    error: string
    classname?: string
}


const ErrorComponent = ({ error, classname }: Props) => {
    return (
        <div className={twMerge(' text-rose-500 text-sm w-full text-right transition-all duration-500 overflow-hidden h-[0px]', error && "h-[20px]" , classname)}>
            {error}
        </div>
    )
}

export default ErrorComponent