import CompanionBars from '@/components/admin/CompanionBars'
import { db } from '@/lib/db'
import React from 'react'




const page = async() => {

    const companions = await db.companion.findMany(({
        include: {
            Creator: {
                select: {
                    name: true
                }
            },
        },
    }))
    if (!companions) return
    const verification = await db.verification.findMany({})




  return (
    <div className=' space-y-2 w-full md:px-20'>
    {
        companions.map((companion) => {
            const isVerified = verification.find(({ companionId }) => companion.id === companionId)
            return <CompanionBars key={companion.id} companion={companion} isVerified={!!isVerified} />
        })
    }
</div>
  )
}

export default page