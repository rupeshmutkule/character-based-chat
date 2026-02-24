import { Companion, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import VerifiedToggle from './VerifiedToggle'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import CustomDialog from '../reuse/CustomDialog'
import DeleteCompanion from './DeleteCompanion'


interface Props {
    companion: Companion & { Creator: { name: string } }
    isVerified: boolean

}


const CompanionBars = ({ companion, isVerified }: Props) => {
    return (
        <div className=' p-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 space-y-2  border-b border-neutral-800'>
            <div className='relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-600'>
                <Link href={`/chat/${companion.id}`}>
                    {companion.avatar ? (
                        <Image src={companion.avatar} alt={companion.name} fill sizes="80px" className='object-cover' />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                            <p className='text-lg font-bold text-neutral-300'>{companion.name[0]?.toUpperCase()}</p>
                        </div>
                    )}
                </Link>
            </div>
            <div className=''>
                <p >{companion.name}</p>
                <p className=' text-neutral-500 text-sm'>Hosted by {companion.Creator.name}</p>
            </div>
            <p className=' w-fit'>{companion.category} </p>
            <VerifiedToggle activeTitle='Verified' type="companion" deactiveTitles='Unverified' active={isVerified} id={companion.id}/>
            <Link href={`/companion/${companion.id}`} className=' w-fit p-1'>
                <Edit />
            </Link>
            <CustomDialog  content={<DeleteCompanion name={companion.name} id={companion.id} avatar={companion.avatar} />} header='Remove companion' desc='Delete companion permenantly'>
                <Trash2 className=' p-1 w-8 h-8'/>
            </CustomDialog>
        </div>
    )
}

export default CompanionBars