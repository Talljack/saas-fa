'use client'
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from './ThemeSwitcher'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
    UserButton,
    useUser,
} from '@clerk/nextjs'
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import {
    GitHubBrandIcon,
    GoogleBrandIcon,
    MailIcon,
    UserArrowLeftIcon,
} from '~/assets'
import { url } from "~/lib";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

export default function Header() {
    return (
        <>
            <div className="flex h-16 justify-center items-center pl-80 pr-24 bg-gray-700 dark:bg-light-700">
                <div className="flex w-full">
                    <div className="icon flex justify-center items-center">
                        <Image
                            src="/icon.png"
                            alt="logo"
                            width={36}
                            height={36}
                            className="max-w-40"
                        />
                        <span className="ml-2 font-bold text-white dark:text-black">SaasFa</span>
                    </div>
                    <div className="flex flex-1 gap-4 ml-10 items-center">
                        <Link href={'/pricing'} className="text-white cursor-pointer">Pricing</Link>
                        <Link href={'/reviews'} className="text-white cursor-pointer">Reviews</Link>
                        <Link href={'/contact'} className="text-white cursor-pointer">Help Center</Link>
                    </div>
                    <div className="user-info w-56 max-w-60">
                        <div
                            className="flex justify-end gap-3 md:flex-1"
                        >
                            <UserInfo />
                            <div className="pointer-events-auto">
                                <ThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function UserInfo() {
    const [open, setOpen] = useState(false)
    const pathName = usePathname()
    const { user, isSignedIn } = useUser()
    const StrategyIcon = useMemo(() => {
        const strategy = user?.primaryEmailAddress?.verification.strategy
        if (!strategy) {
            return null
        }
        switch (strategy) {
            case 'from_oauth_github':
                return GitHubBrandIcon
            case 'from_oauth_google':
                return GoogleBrandIcon
            default:
                return MailIcon
        }
    }, [user?.primaryEmailAddress?.verification?.strategy])
    useEffect(() => {
        if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: user.firstName ?? '',
                    lastName: user.lastName ?? '',
                    email: user?.primaryEmailAddress?.emailAddress,
                    id: user.id
                })
            }).catch(error => {
                console.log('error', error)
            })
        }
    }, [isSignedIn, user])
    return (
        <AnimatePresence>
            <SignedIn key={'user-info'}>
                <motion.div
                    className="pointer-events-auto relative flex items-center h-10"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                >
                    <UserButton
                        afterSignOutUrl={url(pathName).href}
                        appearance={{
                            elements: {
                                avatarBox: 'w-9 h-9 ring-2 ring-white/20'
                            }
                        }}
                    />
                    {StrategyIcon && (
                        <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 select-none items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                            <StrategyIcon className="h-3 w-3" />
                        </span>
                    )}
                </motion.div>
            </SignedIn>
            <SignedOut key={'sign-in'}>
                <motion.div
                    className="pointer-events-auto relative flex items-center h-10"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                >
                    <TooltipProvider disableHoverableContent>
                        <Tooltip open={open} onOpenChange={setOpen}>
                            <SignInButton mode="modal" redirectUrl={url(pathName).href}>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        className="group h-10 rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                                    >
                                        <UserArrowLeftIcon className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                            </SignInButton>
                            <AnimatePresence>
                                {open && (
                                    <TooltipContent asChild>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                        >
                                            登录
                                        </motion.div>
                                    </TooltipContent>
                                )}
                            </AnimatePresence>
                        </Tooltip>
                    </TooltipProvider>
                </motion.div>
            </SignedOut>
        </AnimatePresence>
    )
}
