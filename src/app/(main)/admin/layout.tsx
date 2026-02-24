import Categories from '@/components/admin/Categories'
import { getServerSideUser } from '@/lib/getServerSideUser'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {

    const user = await getServerSideUser()
    if (!user || user.role === "USER") return (
        <div className=' w-max mx-auto mt-20 text-neutral-400'>
            You are not authorized to this route
        </div>
    )
    const isAdmin = user?.role === "ADMIN"
    return (
        <div className=' w-full min-h-screen p-4'>
            <Categories isAdmin={isAdmin} />
            {children}
        </div>
    )
}

export default layout