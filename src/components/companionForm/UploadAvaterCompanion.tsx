"use client"

import Image from 'next/image'
import React from 'react'
import FileUploader from '../FileUploader'
import { X } from 'lucide-react'


interface Props {
    ImageUrl: string
    onCancle: () => void
    onChangeUrl: (val: string) => void
}



const UploadAvaterCompanion = ({ ImageUrl, onCancle, onChangeUrl }: Props) => {
    return (
        <div className='mt-5 mx-auto flex justify-center'>
            {
                ImageUrl ?
                    <div className='relative w-40 h-40 overflow-hidden bg-neutral-600/50 rounded-2xl'>
                        <Image src={ImageUrl} alt='companion avatar' fill sizes="160px" className='object-cover' />
                        <button
                          onClick={() => onCancle()}
                          className='cursor-pointer absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 rounded-full p-1 transition-colors'
                          aria-label='Remove avatar'
                        >
                          <X size={20} className='text-white' />
                        </button>
                    </div>
                    :
                    <FileUploader onchange={(value: string) => onChangeUrl(value)} />
            }
        </div>
    )
}

export default UploadAvaterCompanion