"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

const SignInButton = () => {
    return (
        <Button onClick={() => signIn("google")} className=' bg-gradient-to-tr from-violet-700 via-fuchsia-600 to-pink-500  md:px-28 md:py-6 mx-auto px-10'>Get started</Button>
    )
}

export default SignInButton