"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'

const Searchbar = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const [name, setname] = useState(searchParams?.get("category") || "")

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchParams.has("category")) {
                if (!name) return router.push(`/home?category=${searchParams.get("category")}`)
                router.push(`/home?name=${name}&category=${searchParams.get("category")}`)
            } else {
                if (!name) return router.push("/home")
                router.push(`/home?name=${name}`)
            }
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [name, router, searchParams])


    return (
        <Input value={name} onChange={(e) => setname(e.target.value)} placeholder='Search here......' className=' mb-3 border border-neutral-500' />
    )
}

export default Searchbar