"use client"

import React from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Category } from '@prisma/client'


interface Props {
  categories: Category[]
}


const Categorie = ({ categories }: Props) => {

  const searchParams = useSearchParams()
  const router = useRouter()

  const handleNavigation = (category: string) => {
    if (searchParams.has("name")) {
      router.replace(`/home?name=${searchParams.get("name")}&category=${category}`)
    } else {
      router.replace(`/home?category=${category}`)
    }
  }



  return (
    <div className='flex overflow-scroll gap-3'>
      <Button onClick={() => router.push("/home")} className={twMerge(' py-2 px-4 bg-neutral-700/30 hover:bg-neutral-500/50 rounded-lg', !searchParams?.has("category") && "bg-neutral-500/50")}>
        New
      </Button>
      {
        categories.map(category => (
          <Button onClick={() => handleNavigation(category.name)} key={category.name} className={twMerge(' py-2 px-4 bg-neutral-700/30 hover:bg-neutral-500/50 rounded-lg', searchParams.get("category") === category.name && "bg-neutral-500/50")}>
            {category.name}
          </Button>
        ))
        }
    </div>
  )
}

export default Categorie