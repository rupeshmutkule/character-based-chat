import Image from 'next/image'
import React from 'react'
import CustomTooltip from './reuse/CustomTooltip'


interface Props {
    imgUrl: string | null
    name: string
}


const Avatar = ({ imgUrl, name }: Props) => {
    return (
        <CustomTooltip message={name} >
            {
                imgUrl ?
                    <div className='relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
                        <Image src={imgUrl} alt={name} fill sizes="40px" className='object-cover' />
                    </div>
                    :
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-neutral-600 flex-shrink-0'>
                        <p className='text-sm font-bold'>{name[0]?.toUpperCase()}</p>
                    </div>
            }
        </CustomTooltip>
    )
}

export default Avatar