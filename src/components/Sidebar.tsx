"use client"

import { Home, Plus, Settings, ShieldCheck } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'
import { usePathname, useRouter } from 'next/navigation'
import { Role } from '@prisma/client'

const Sidebar = ({ userRole }: { userRole: Role }) => {
    const router = useRouter()
    const pathname = usePathname()


    return (
        <div className={twMerge(' w-24 hidden md:block space-y-5 fixed left-0 p-2 border-r-2 h-full border-neutral-600/20 bg-neutral-900')}>
            {
                routes.map(route => {

                    if (userRole === "USER" && route.label === "Admin") return
                    return (
                        <Button onClick={() => router.push(`${route.href}`)} key={route.label} className={twMerge(' flex flex-col items-center gap-1 w-full h-16 hover:bg-neutral-500/50 transition-all duration-300', pathname === route.href && "bg-neutral-500/50")}>
                            <route.icon className=' w-4 h-4' />
                            {
                                route.label === "Admin" ?
                                    <>
                                        {
                                            userRole === "ADMIN" ?
                                                <p> Admin </p>
                                                :
                                                <p>Moderator</p>
                                        }
                                    </>
                                    :
                                    <p className=' text-xs'>
                                        {route.label}
                                    </p>
                            }
                        </Button>
                    )
                }
                )
            }
        </div>
    )
}

export default Sidebar


export const routes = [
    {
        label: "Home",
        icon: Home,
        href: "/home"
    },
    {
        label: "Create",
        icon: Plus,
        href: "/companion/new"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings"
    },
    {
        label: "Admin",
        icon: ShieldCheck,
        href: "/admin/companions"
    },
]