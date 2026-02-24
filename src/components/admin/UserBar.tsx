
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import VerifiedToggle from './VerifiedToggle'

interface Props {
    user: User
}


const UserBar = ({ user }: Props) => {
    return (
        <div className=' p-2 items-center grid grid-cols-4 border-b border-neutral-800'>
            <div className='relative w-20 h-20 rounded-full overflow-hidden bg-neutral-700 flex-shrink-0'>
                {
                    user.avatar ?
                    <Image src={user.avatar} alt={user.name} fill sizes="80px" className="object-cover" loading="lazy" />
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                        <p className='text-xl font-bold text-neutral-300'>{user.name[0]?.toUpperCase()}</p>
                    </div>
                }
            </div>
            <div className=''>
                <p >{user.name}</p>
                <p className=' text-neutral-500'>{user.email}</p>
            </div>
            <VerifiedToggle activeTitle={"Moderator"} type="user" deactiveTitles="User" active={user.role === "MODERATOR"} id={user.id} />
        </div>
    )
}

export default UserBar