"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Edit, Trash, Trash2 } from 'lucide-react'
import CustomDialog from '../reuse/CustomDialog'
import DeleteCompanion from '../admin/DeleteCompanion'
import Link from 'next/link'


interface Props {
    name: string
    id: string
    avatar: string
}


const CompanionCardActions = ({ name, id, avatar }: Props) => {
    return (
        <div className=' w-full flex mt-5 space-x-3'>
            <CustomDialog content={<DeleteCompanion name={name} id={id} avatar={avatar} />} width="full" header='Remove companion' desc='Delete companion permenantly'>
                <div className=' w-full border-neutral-700 border flex justify-center py-2 rounded-md'>
                    <Trash2 className=' h-5 w-5'/>
                </div>
            </CustomDialog>
            <Link href={`/companion/${id}`} className='  w-full'>
                <Button variant={'primary'} className=' w-full py-2 h-fit text-black bg-neutral-200'>
                    <Edit className=' h-5 w-5'/>
                </Button>
            </Link>
        </div>
    )
}

export default CompanionCardActions