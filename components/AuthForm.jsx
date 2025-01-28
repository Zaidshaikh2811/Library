

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'

const AuthForm = ({ type, schema, defaultValues, onSubmit }) => {

    const isSignIn = type === "SIGN-IN"


    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues
    })

    const handleSubmit = (data) => {
        onSubmit(data)
    }


    return (
        <div className='flex flex-col gap-4'>

            <h1 className='text-2xl font-semibold text-white'>
                {
                    isSignIn ? "Welcome Back To BookWise" : "Create your Library Account"
                }
            </h1>
            <p className='text-light-100'>
                {
                    isSignIn ? " Sign in to your account" : " Create an account to start using BookWise"}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">

                    {
                        Object.keys(defaultValues).map((field) => {


                            return (<FormField key={field}
                                control={form.control}
                                name={field}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="capitalize">{FIELD_NAMES[field.name]}</FormLabel>
                                        <FormControl>

                                            {
                                                field.name == "universityCard" ? <ImageUpload onFileChange={field.onChange} /> : <Input className="form-input" required type={FIELD_TYPES[field.name]} {...field} />
                                            }
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />)
                        })
                    }
                    <Button type="submit" className="form-btn">{
                        isSignIn ? "Sign In" : "Sign Up"
                    }</Button>
                </form>
            </Form>
            <p className='text-center text-base font-medium'>
                {
                    isSignIn ? "Don't have an account ?" : "Already have an account ?"
                }
                <Link className='font-bold text-primary' href={isSignIn ? "/sign-up" : "/sign-in"}>
                    {
                        isSignIn ? " Sign Up" : " Sign In"
                    }
                </Link>
            </p>
        </div>
    )
}

export default AuthForm
