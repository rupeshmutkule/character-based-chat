import Categorie from '@/components/Categorie'
import Image from 'next/image'
import React, { Suspense } from 'react'
import Link from 'next/link'
import Searchbar from '@/components/Searchbar'
import { db } from '@/lib/db'
import { getServerSideUser } from '@/lib/getServerSideUser'


interface Props {
  searchParams: {
    name: string | undefined
    category: string | undefined
  }
}

async function page({ searchParams }: Props) {
  // get current user
  const user = await getServerSideUser()

  // Start with getting all public companions
  let companions: any[] = []

  // Build query based on filters
  const nameFilter = searchParams.name ? { contains: searchParams.name, mode: 'insensitive' as const } : undefined
  const categoryFilter = searchParams.category || undefined

  // Get public companions
  const publicCompanions = await db.companion.findMany({
    where: {
      isPublic: true,
      ...(categoryFilter && { category: categoryFilter }),
      ...(nameFilter && { name: nameFilter })
    },
    orderBy: { createdAt: 'desc' }
  })

  companions = publicCompanions

  // If user is logged in, also get their private companions
  if (user?.id) {
    const userCompanions = await db.companion.findMany({
      where: {
        creatorId: user.id,
        isPublic: false,
        ...(categoryFilter && { category: categoryFilter }),
        ...(nameFilter && { name: nameFilter })
      },
      orderBy: { createdAt: 'desc' }
    })
    companions = [...companions, ...userCompanions]
  }

  companions.sort((a, b) => {
    if (a.name === "Rupesh Mutkule" && b.name !== "Rupesh Mutkule") return 1;
    if (b.name === "Rupesh Mutkule" && a.name !== "Rupesh Mutkule") return -1;
    if (a.name === "Chhatrapati Shivaji Maharaj" && b.name !== "Chhatrapati Shivaji Maharaj") return 1;
    if (b.name === "Chhatrapati Shivaji Maharaj" && a.name !== "Chhatrapati Shivaji Maharaj") return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Extract unique category names from visible companions
  const uniqueCategoryNames = Array.from(new Set(companions.map(c => c.category)));

  // Fetch only categories that contain a valid companion
  const categories = await db.category.findMany({
    where: {
      name: {
        in: uniqueCategoryNames
      }
    }
  });

  if (!companions || companions.length === 0) return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-neutral-400 text-lg">No characters created yet</p>
        <p className="text-neutral-500 text-sm">Create your first character to get started!</p>
      </div>
    </div>
  )

  return (
    <div className=' w-full p-2 px-3'>
      <Searchbar />
      <Categorie categories={categories} />
      <div className='grid grid-cols-2 py-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4'>
        {
          companions && companions.map((companion) => (
            <Link href={`/chat/${companion.id}`} key={companion.id} className="w-full rounded-xl bg-neutral-700/30 hover:bg-neutral-700/50 p-5 transition-all duration-300 flex flex-col">
              <div className='relative w-full aspect-square overflow-hidden rounded-lg mb-3'>
                {companion.avatar ? (
                  <Image src={companion.avatar} alt={companion.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-cover hover:scale-[1.05] transition-all duration-500' />
                ) : (
                  <div className='w-full h-full bg-neutral-600 flex items-center justify-center'>
                    <p className='text-2xl font-bold text-neutral-300'>{companion.name[0]?.toUpperCase()}</p>
                  </div>
                )}
              </div>
              <p className='text-neutral-400 text-lg font-semibold truncate'>{companion.name}</p>
              <p className='text-neutral-500 text-xs line-clamp-2'>{companion.description}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default page



const Skeleton = () => {
  return (
    <div>
      <div className=' flex w-full space-x-3'>
        {
          [...Array(10)].map((i, j) => (
            <div key={j} className=' py-4 w-20 bg-neutral-700/30 rounded-lg bg-neutral-800 animate-pulse' />
          ))
        }
      </div>

      <div className=' grid grid-cols-2 py-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4'>
        {
          [...Array(12)].map((i, j) => (
            <div key={j} className=" w-full h-full rounded-xl bg-neutral-800 p-5 transition-all duration-300 flex flex-col space-y-2">
              <div className=' w-full relative aspect-square overflow-hidden object-cover rounded-lg bg-neutral-700/50 animate-pulse' />
              <p className=' text-neutral-4 text-lg w-32 py-3  bg-neutral-700 mx-auto animate-pulse rounded-lg' />
              <p className=' text-neutral-500 mx-auto animate-pulse w-40 py-3 bg-neutral-700 rounded-lg' />
            </div>
          ))
        }
      </div>


    </div>
  )
}