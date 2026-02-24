"use client"
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Category, Companion } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from "axios"
import Selectcategory from './companionForm/SElectcategory'
import UploadAvaterCompanion from './companionForm/UploadAvaterCompanion'
import NameNDescription from './companionForm/NameNDescription'
import HeaderInfo from './companionForm/HeaderInfo'
import { createCompanionRequest } from '@/lib/validator/companion.validator'
import InstructionComp from './companionForm/InstructionComp'
import ErrorComponent from './reuse/ErrorComponent'


interface Props {
    categories: Category[]
    companion: Companion | null
}



const CompanionForm = ({ categories, companion }: Props) => {

    const router = useRouter()

    const [name, setName] = useState(companion?.name || "")
    const [category, setCategory] = useState(companion?.category || "")
    const [desc, setDesc] = useState(companion?.description || "")
    const [ImageUrl, setImageUrl] = useState(companion?.avatar || "")
    const [instruction, setInstruction] = useState(companion?.instruction || "")
    const handleCreateErrRef = useRef("")

    const [isDisabled, setIsDisabled] = useState(false)



    const { mutate: create, isPending: createLoading } = useMutation({
        mutationFn: async () => {
            const payload: createCompanionRequest = {
                name: name,
                description: desc,
                category: category,
                avatar: ImageUrl,
                instruction
            }
            handleCreateErrRef.current = ""
            setIsDisabled(true)
            if (companion) {
                const { data } = await axios.patch(`/api/companion/${companion.id}`, payload)
                return data
            } else {
                const { data } = await axios.post("/api/companion", payload)
                return data
            }
        },
        onSuccess: ({ redirectId }) => {
            router.replace(`/chat/${redirectId}`)
            setIsDisabled(false)
        },
        onError: ({ response }: { response: { data: { message: string } } }) => {
            setIsDisabled(false)
            handleCreateErrRef.current = response.data.message
        }

    })



    return (
        <div className=' w-full'>
            <HeaderInfo />
            <UploadAvaterCompanion ImageUrl={ImageUrl} onChangeUrl={(url: string) => setImageUrl(url)} onCancle={() => setImageUrl("")} />
            <div className=' mt-5  flex-col gap-8 grid grid-cols-1 md:w-[50%] mx-auto px-5'>
                <NameNDescription onChangeName={(name: string) => setName(name)} onChangeDesc={(desc: string) => setDesc(desc)} name={name} desc={desc} />
                <Selectcategory categories={categories} category={category} onChaneCat={(val: string) => setCategory(val)} setDisabled={() => setIsDisabled((pre) => !pre)} isDisabled={isDisabled} />
                <InstructionComp isDisabled={isDisabled} name={name} instruction={instruction} onChangeInstrution={(val: string) => setInstruction(val)} onChangeDesc={(val: string) => setDesc(val)} />
            </div>
            <ErrorComponent error={handleCreateErrRef.current} />
            <div className=' mt-10 text-center mx-auto flex space-x-5 md:w-[50%] px-5'>
                <Button onClick={() => router.back()} isDisabled={isDisabled} className=' border-2 border-neutral-600/50 w-full'>
                    Cancle
                </Button>
                <Button onClick={() => create()} isloading={createLoading} isDisabled={isDisabled} variant={"primary"} className=' text-black w-full'>
                    {
                        companion ?
                            <>Update</>
                            :
                            <>Create</>
                    }
                </Button>
            </div>
        </div>
    )
}

export default CompanionForm