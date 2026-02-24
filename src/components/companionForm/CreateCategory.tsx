"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ErrorComponent from '../reuse/ErrorComponent'

interface Props {
    isLoading: boolean
    handleCreateCategory: () => void
    onChangeCatName: (val: string) => void
    catName: string
    error: string
    isDisabled: boolean
}



const CreateCategory = ({ isLoading, isDisabled, handleCreateCategory, onChangeCatName, catName, error }: Props) => {
    return (
        <div className=''>
            <div className=' flex gap-x-2 items-center '>
                <Input value={catName} autoCapitalize="on" spellCheck="true" onChange={(e) => onChangeCatName(e.target.value)} className='' />
                <Button isloading={isLoading} isDisabled={isDisabled} onClick={() => handleCreateCategory()} variant={"primary"} className=' text-black h-fit'>Create</Button>
            </div>
            <ErrorComponent error={error} classname=' text-left' />
        </div>
    )
}

export default CreateCategory