"use client"
import React, { useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Category } from '@prisma/client'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import CreateCategory from './CreateCategory'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'



interface Props {
    categories: Category[]
    onChaneCat: (cat: string) => void
    category: string
    isDisabled: boolean
    setDisabled: () => void
}





const Selectcategory = ({ categories, onChaneCat, category, setDisabled, isDisabled }: Props) => {


    const router = useRouter()
    const [toggle, settoggle] = useState(false)
    const [catName, setCatName] = useState("")
    const newcategoryErrRef = useRef("")


    const { mutate: handleCreateCategory, isPending: createCategoryLoading } = useMutation({
        mutationFn: async () => {
            newcategoryErrRef.current = ""
            if (!catName) return
            setDisabled()
            const { data } = await axios.post("/api/category", { name: catName })
            return data
        },
        onSuccess: (data) => {
            setDisabled()
            router.refresh()
            onChaneCat(catName)
            settoggle(false)
            setCatName("")
        },
        onError: ({ response }: { response: { data: { message: string } } }) => {
            setDisabled()
            newcategoryErrRef.current = response.data.message
        }
    })



    return (
        <div>
            {
                toggle ?
                    <p>Create New Category</p>
                    :
                    <p className=''>Category</p>
            }
            <div className=' flex mt-2 min-h-[60px] items-center'>
                <div className={twMerge('w-max relative flex gap-1 overflow-hidden transition-all duration-500', toggle ? " w-[0%]" : "w-[100%] p-1")}>
                    <Select value={category} onValueChange={(val) => onChaneCat(val)} >
                        <SelectTrigger>
                            <SelectValue placeholder={"choose"} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories && categories.map((category, i) => (
                                    <SelectItem value={category.name} key={i}>
                                        <p>
                                            {category.name}
                                        </p>
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className={twMerge(' overflow-hidden transition-all duration-500 w-max', toggle ? "w-[100%] p-1" : "w-[0%]")} >
                    <CreateCategory onChangeCatName={(name: string) => setCatName(name)} handleCreateCategory={handleCreateCategory} isLoading={createCategoryLoading} catName={catName} error={newcategoryErrRef.current} isDisabled={isDisabled} />
                </div>
                <Button isDisabled={isDisabled} onClick={() => settoggle((pre) => !pre)} className=' border p-0 h-fit w-fit rounded-full mx-2'>
                    <Plus className={twMerge(" transition-all duration-300", toggle ? " rotate-45" : "")} />
                </Button>
            </div>
            <p className=' opacity-50 text-sm'>
                Select Category For Your AI
            </p>
        </div>
    )
}

export default Selectcategory