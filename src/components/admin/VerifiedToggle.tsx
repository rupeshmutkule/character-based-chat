"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { twMerge } from 'tailwind-merge'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface Props {
    activeTitle: string
    deactiveTitles: string
    active: boolean
    type: "user" | "companion"
    id: string
}


const VerifiedToggle = ({ activeTitle, deactiveTitles, active, type, id }: Props) => {
    const [toggle, setToggle] = useState(active)
    const router = useRouter()

    const { isPending, mutate } = useMutation({
        mutationFn: async () => {
            if (type === "companion") {
                const { data } = await axios.patch(`/api/companion/${id}/verification`)
                return data
            }
            if (type === "user") {
                const { data } = await axios.patch(`/api/UVerification`, { verifierId: id })
                return data

            }
        },
        onSuccess: (data) => {
            setToggle((pre) => !pre)
            router.refresh()
        },
        onError: () => { }
    })




    return (
        <div className=' w-full flex flex-col'>
            <Button variant={"primary"} onClick={() => mutate()} className={twMerge(' w-14 p-0 active:scale-100 bg-white h-6 rounded-full flex items-center justify-normal transition-all duration-500', toggle && "bg-indigo-600")}>
                <div className={twMerge(' w-5 h-5 bg-gray-600 rounded-full transition-all duration-500', toggle ? " ml-[33px] bg-white" : " ml-1.5", isPending && `${!toggle && " border-neutral-500"}  border-t-4 bg-transparent animate-spin `)} />
            </Button>
            {
                toggle ?
                    <p className=' text-green-500 text-lg'>{activeTitle} </p>
                    :
                    <p className=' text-lg text-rose-400'>{deactiveTitles} </p>
            }
        </div>
    )
}

export default VerifiedToggle