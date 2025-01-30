"use client"


import AuthForm from '@/components/AuthForm'
import { signInWithCred } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/validation'
import React from 'react'

const page = () => {








    return (
        <div>
            <AuthForm

                type="SIGN-IN"
                schema={signInSchema}
                defaultValues={{ email: "", password: "" }}
                onSubmit={signInWithCred}
            />
        </div>
    )
}

export default page
