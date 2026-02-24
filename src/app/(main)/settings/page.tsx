import CompanionCardActions from '@/components/settings/CompanionActions'
import { db } from '@/lib/db'
import { getServerSideUser } from '@/lib/getServerSideUser'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = async () => {

    const user = await getServerSideUser()
    if (!user) return (
        <div>
            Unauthorized
        </div>
    )
    const companions = await db.companion.findMany({
        where: {
            creatorId: user.id
        }
    })

    if (!companions.length) return (
        <div className=' w-max mx-auto mt-20 flex flex-col items-center gap-3'>
            Don&apos;t have companion
            <Link href={"/companion/new"} className=' border h-[40px] items-center flex px-[24px] rounded-lg border-neutral-500 bg-gradient-to-b from-neutral-700 to-neutral-800 via-neutral-800'>
                Create New companion
            </Link>
        </div>
    )

    const verifications = await db.verification.findMany({
        where: {
            userId: user.id
        }
    })

    return (
        <div className=' w-full md:p-10 p-4 space-y-5'>
            <div>
                <p className=' text-3xl'>Settings</p>
                <p className=' text-neutral-500'>Modify your companions </p>
            </div>
            <Suspense fallback={<Skeleton />} >
                <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 w-full'>
                    {
                        companions.map((companion) => {
                            const isVerified = verifications.find((verification) => verification.companionId === companion.id)
                            return (
                                <div key={companion.id} className=' border border-neutral-700 p-4 rounded-xl w-full space-y-2'>
                                    <Link href={`/chat/${companion.id}`}>
                                        <div className='relative w-full overflow-hidden aspect-square rounded-xl bg-neutral-600'>
                                            {companion.avatar ? (
                                                <Image src={companion.avatar} alt={companion.name} fill sizes="(max-width: 768px) 50vw, 33vw" className='object-cover hover:scale-110 transition-all duration-500' />
                                            ) : (
                                                <div className='w-full h-full flex items-center justify-center'>
                                                    <p className='text-4xl font-bold text-neutral-300'>{companion.name[0]?.toUpperCase()}</p>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <p className=' md:text-lg w-max'>
                                        {companion.name}
                                    </p>
                                    {
                                        isVerified ? <p className=' bg-green-700 text-white w-max px-4 py-0.5 text-xs rounded-full'>Verified</p> : <p className='bg-rose-500 text-white w-max px-4 py-0.5 text-xs rounded-full'>Unverified</p>
                                    }
                                    <CompanionCardActions name={companion.name} id={companion.id} avatar={companion.avatar} />
                                </div>
                            )
                        })
                    }

                </div>
            </Suspense>

        </div>

    )
}

export default page


const Skeleton = () => {
    return (
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7  gap-5 w-full'>
            {
                [...Array(10)].map((i, j) => {
                    return (
                        <div key={j} className=' border border-neutral-700 p-4 rounded-xl w-full space-y-2'>
                            <div className=' relative w-full overflow-hidden aspect-square rounded-xl animate-pulse bg-neutral-800' />
                            <p className=' text-lg  py-3 w-[50%] rounded-md bg-neutral-700 animate-pulse' />
                            <p className='py-3 w-20 bg-neutral-800 animate-pulse rounded-full' />
                            <div className=' flex space-x-5'>
                                <div className=' w-full p-5 bg-neutral-700 animate-pulse rounded-lg' />
                                <div className=' w-full p-5 bg-neutral-700 animate-pulse rounded-lg' />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}