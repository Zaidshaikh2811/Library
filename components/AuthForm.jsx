

import React, { useState } from 'react'
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
import { toast, useToast } from '@/hooks/use-toast'
import { desc } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { OTPModal } from './OTPModal'

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const AuthForm = ({ type, schema, defaultValues, onSubmit }) => {
    const router = useRouter()
    const isSignIn = type === "SIGN-IN"
    const { toast } = useToast()
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [userData, setUserData] = useState(null);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues
    })

    const handleSubmit = async (data) => {


        if (!isSignIn) {


            const generatedOTP = generateOTP();
            setGeneratedOtp(generatedOTP);
            setUserData(data);

            const emailData = {
                sender: {
                    name: "BookWise"
                    , address: "zaid@gmail.com"
                },
                recipients: [
                    {
                        name: data.fullname,
                        address: data.email
                    }
                ], subject: "OTP Verification", message: `Your verification code is: ${generatedOTP}`,
                otp: generatedOTP
            }


            try {
                await axios.post("/api/email", emailData);
                setShowOtpModal(true);
            } catch (error) {
                console.error('Failed to send OTP:', error);
            }


        }


    }

    const handleOtpVerify = async (enteredOtp) => {
        if (enteredOtp === generatedOtp) {
            try {
                await onSubmit(userData)

                setShowOtpModal(false);
                toast({
                    title: "Success",
                    description: isSignIn ? "Sign In Successfully" : "Sign Up Successfully",


                })
                router.push("/")
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive"
                })
                console.error('Registration failed:', error);
            }
        } else {
            toast({
                title: "Error",
                description: "Invalid OTP",
                variant: "destructive"
            })
        }
    };



    return (
        <div className='flex flex-col gap-4'>
            <OTPModal
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                onVerify={handleOtpVerify}
                email={userData?.email}
            />

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
