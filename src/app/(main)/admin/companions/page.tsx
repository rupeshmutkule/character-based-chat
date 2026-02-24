import CompanionBars from '@/components/admin/CompanionBars'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const Page = async () => {
  const companions = await db.companion.findMany({
    include: {
      Creator: {
        select: {
          name: true,
        },
      },
    },
  })

  const verification = await db.verification.findMany({
    select: {
      companionId: true,
    },
  })

  return (
    <div className="space-y-2 w-full md:px-20">
      {companions.map((companion) => {
        const isVerified = verification.some(
          (v) => v.companionId === companion.id
        )

        return (
          <CompanionBars
            key={companion.id}
            companion={companion}
            isVerified={isVerified}
          />
        )
      })}
    </div>
  )
}

export default Page