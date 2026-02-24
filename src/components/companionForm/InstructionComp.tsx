"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { twMerge } from 'tailwind-merge'
import ErrorComponent from '../reuse/ErrorComponent'
import { generatePrompt } from '@/lib/generatePrompt'

interface Props {
    instruction: string
    onChangeInstrution: (val: string) => void
    onChangeDesc: (val: string) => void
    isDisabled: boolean
    name: string
}



const InstructionComp = ({ instruction, onChangeInstrution, onChangeDesc, isDisabled, name }: Props) => {


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleGenerate = async () => {
        if (!name) {
            setError("Please enter a name first.")
            return;
        }
        setLoading(true)
        setError("")
        try {
            const res = await generatePrompt(name)
            if (res && res.error) {
                setError(res.error)
            } else if (res && res.instruction) {
                onChangeInstrution(res.instruction)
                onChangeDesc(res.description)
            } else {
                setError("Failed to generate response correctly.")
            }
        } catch (e: any) {
            setError(e?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }



    return (
        <>
            <div className=' py-8 border-b pb-2 border-neutral-600'>
                <p className=' font-bold text-2xl'>Configurations</p>
                <p className=' opacity-50 text-sm'>Detailed instruction for your Companion behavior</p>
            </div>
            <div className="mt-5" >
                <p className=''>Instructions</p>
                <div className='mt-1'>
                    <Textarea value={instruction} onChange={(e) => onChangeInstrution(e.target.value)} placeholder='example You are financial character whose name is elon musk. you are entrepreneur and investor.you are a passion for space exploration ,electric vehicle,sustainable energy and advancing technology. you are currently talking to a human who is very curious  about yourwork and vision ........................................' className='h-60 resize-y' />
                </div>
                <ErrorComponent error={error} />
                <div className=' flex justify-between mt-1 items-center'>
                    <p className=' opacity-50 text-sm'>Describe in detail your companion&apos;s backstory and relevant details </p>
                    <Button isDisabled={isDisabled} isloading={loading} onClick={handleGenerate} className={twMerge(' bg-gradient-to-tr from-fuchsia-500 to-pink-500 via-purple-500', loading && "from-fuchsia-500/30 to-pink-500/30 via-purple-500/30 text-white/30")}>Generate with Ai</Button>
                </div>
            </div>
        </>
    )
}

export default InstructionComp