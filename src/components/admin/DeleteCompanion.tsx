"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'


interface Props {
    name: string
    id: string
    avatar: string
}


const DeleteCompanion = ({ name, id, avatar }: Props) => {
    const router = useRouter()
    const [isClosing, setIsClosing] = useState(false)

    const { mutate: deleteCompanion, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(`/api/companion/${id}`)
            return data
        },
        onSuccess: () => {
            setIsClosing(true)
            // Hard refresh the page to show updated companion list and close dialog
            setTimeout(() => {
                window.location.reload()
            }, 300)
        },
        onError: (error: any) => {
            console.error("Deletion failed:", error)
            alert(error.response?.data?.message || "Failed to delete companion")
        }
    })

    const handleDelete = () => {
        deleteCompanion()
    }

    return (
        <div className=' space-y-5'>
            <div className='space-y-2 mx-auto w-fit'>
                <div className='relative w-40 h-40 rounded-lg overflow-hidden bg-neutral-600'>
                    {avatar ? (
                        <Image src={avatar} alt={name} fill sizes="160px" className='object-cover' />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                            <p className='text-4xl font-bold text-neutral-300'>{name[0]?.toUpperCase()}</p>
                        </div>
                    )}
                </div>
                <p className=' text-center font-semibold'>{name}</p>
            </div>
            <p className=' text-center font-bold text-lg mt-4'>Are you sure you want to delete this chat?</p>
            <p className=' text-rose-500 mx-auto w-fit text-sm'>All related chats and data will be permanently deleted</p>
            <div className=' w-full flex gap-5 justify-between pt-5'>
                <DialogClose 
                    className=' w-full border border-neutral-600 rounded-md hover:bg-neutral-800/30'
                    disabled={isPending || isClosing}
                >
                    Cancel
                </DialogClose>
                <Button 
                    variant={"primary"} 
                    className=" text-black w-full" 
                    onClick={handleDelete}
                    isloading={isPending}
                    isDisabled={isPending || isClosing}
                >
                    {isPending ? "Deleting..." : "Remove"}
                </Button>
            </div>
        </div>
    )
}

export default DeleteCompanion