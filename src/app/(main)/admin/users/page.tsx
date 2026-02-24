import UserBar from '@/components/admin/UserBar'
import { db } from '@/lib/db'
import { getServerSideUser } from '@/lib/getServerSideUser'
import React from 'react'

const page = async () => {

    const user = await getServerSideUser()
    if (user?.role !== "ADMIN") return(
        <div className=' w-max mx-auto mt-20 text-neutral-400'>
            This route only accesible to Admins
        </div>
    )


    const users = await db.user.findMany({
        where: {
            role: {
                not: "ADMIN"
            }
        },
        orderBy: {
            id: "asc"
        }
    })

    if (!users) return

    return (
        <div className=' space-y-2 w-full md:px-20'>
            {
                users.map(user => (
                    <div key={user.id}>
                        <UserBar key={user.id} user={user} />
                    </div>
                ))
            }
        </div>
    )
}

export default page