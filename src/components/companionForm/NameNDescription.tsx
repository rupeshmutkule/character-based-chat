import React from 'react'
import { Input } from '../ui/input'


interface Props {
    onChangeName: (val: string) => void
    onChangeDesc: (val: string) => void
    name: string
    desc: string
}




const NameNDescription = ({ onChangeName, onChangeDesc, name, desc }: Props) => {
    return (
        <>
            <div>
                <p className=''>Name</p>
                <div className='mt-2'>
                    <Input value={name} placeholder='example Elon Musk...' onChange={(e) => onChangeName(e.target.value)} className=' w-full bg-neutral-800 px-4 py-2 rounded-lg ' />
                </div>
                <p className=' opacity-50 text-sm'>This is how your AI companion will be Named</p>
            </div>
            <div>
                <p className=''>Description</p>
                <div className='mt-2'>
                    <Input value={desc} placeholder='example CEO & Founder od Tesla,SpaceX' onChange={(e) => onChangeDesc(e.target.value)} className=' w-full bg-neutral-800 text-white px-4 py-2 rounded-lg' />
                </div>
                <p className=' opacity-50 text-sm'>
                    Short description for your AI Companion
                </p>
            </div>
        </>
    )
}

export default NameNDescription