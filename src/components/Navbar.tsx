"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { Role, User } from '@prisma/client'
import Avatar from './Avatar'
import { LogOut } from 'lucide-react'
import CustomPopover from './reuse/CustomPopover'
import { routes } from './Sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Label } from '@radix-ui/react-select'


interface Props {
    user: User | null
}


const Navbar = ({ user }: Props) => {
    return (
        <div className=' w-full flex justify-between h-[65px] z-50 bg-neutral-900  border-b-2 border-neutral-500/20 left-0 fixed top-0 px-5 items-center'>
            <p className=' text-2xl md:text-3xl'>companion.ai</p>
            {
                user ?
                    <div className=' flex gap-2 items-center'>
                        <CustomPopover content={<UserNav userRole={user.role} />} >
                            <Avatar imgUrl={user.avatar} name={user.name} />
                        </CustomPopover>
                    </div>
                    :
                    <Button onClick={() => signIn("google")} className=' border border-neutral-500'>Sign-in</Button>
            }
        </div>
    )
}

export default Navbar



const UserNav = ({ userRole }: { userRole: Role }) => {

    const pathname=usePathname()
const router=useRouter()


    return (
        <div className=' grid space-y-1'>
            {
                routes.map((route) => (
                    <Button key={route.label} onClick={() => router.push(`${route.href}`)} className={twMerge(' border border-neutral-500 hover:bg-neutral-800 flex  justify-start gap-3 px-14 md:hidden',pathname===route.href&&"bg-white text-black hover:bg-neutral-300")}> <route.icon className=' h-5 w-5'/> {route.label}  </Button>
                ))
            }
            <Button variant={"destructive"} onClick={() => signOut({ redirect: true })} className=' border border-neutral-500 flex  justify-start gap-3 px-14'><LogOut className=' w-5 h-5' /> Logout  </Button>
        </div>
    )
}




