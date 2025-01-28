"use client"


import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validation'
import React from 'react'

const page = () => {
    return (
        <div>
            <AuthForm

                type="SIGN-UP"
                schema={signUpSchema}
                defaultValues={{
                    email: "", password: "",
                    fullName: "",
                    universityId: 0,
                    universityCard: "",
                }}
                onSubmit={() => { }}
            />
        </div>
    )
}

export default page
