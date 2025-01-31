"use client"

import { adminSideBarLinks } from '@/constants'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useSession } from 'next-auth/react'

const Sidebar = ({ session }) => {
    const pathname = usePathname()
    return (
        <div className='admin-sidebar'>
            <div>
                <div className='logo'>
                    <Image src="/icons/admin/logo.svg" width={40} height={40} alt="logo" />

                    <h1>BookWise</h1>
                </div>
                <div className="mt-10 flex-col gap-5">
                    {adminSideBarLinks.map((link) => {
                        const isSelected =
                            (link.route !== "/admin" &&
                                pathname.includes(link.route) &&
                                link.route.length > 1) ||
                            pathname === link.route;
                        return (
                            <Link key={link.route} href={link.route}>
                                < div className={cn('link', isSelected && "bg-primary-admin shadow-sm")} >
                                    <div className="relative size-5">
                                        <Image src={link.img} fill alt="icon"
                                            className={`${isSelected} ? "brightness-0 invert": "object-contain" `}
                                        />

                                    </div>
                                    <p className={cn(isSelected ? "text-white" : "text-dark")}>{link.text}</p>
                                </div >
                            </Link>
                        )
                    })}
                </div>

            </div>
            <div className="user">
                <Avatar>
                    <AvatarFallback className="bg-amber-100">
                        {getInitials(session?.user?.name || "IN")}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-md:hidden">
                    <p className="font-semibold text-dark-200">{session?.user?.name}</p>
                    <p className="text-xs text-light-500">{session?.user?.email}</p>
                </div>
            </div>
        </div >
    )
}

export default Sidebar
