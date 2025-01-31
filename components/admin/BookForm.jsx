"use client"

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

import { toast, useToast } from '@/hooks/use-toast'

import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validation'
import { Textarea } from '../ui/textarea'
import ImageUpload from '../FileUpload'
import ColorPicker from './ColorPicker'



const BookForm = ({ type, ...book }) => {
    const router = useRouter()

    const { toast } = useToast()


    const form = useForm({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        }
    })

    const handleSubmit = async (data) => {


        console.log(data);


    }




    return (
        <div className='flex flex-col gap-4'>



            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">

                    <FormField
                        control={form.control}
                        name={"title"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Book Title</FormLabel>
                                <FormControl>
                                    <Input required

                                        {...field}
                                        className="book-form_input"
                                        placeholder="Enter your book title"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"author"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Book Author</FormLabel>
                                <FormControl>
                                    <Input required

                                        {...field}
                                        className="book-form_input"
                                        placeholder="Book Author Name"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"genre"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">genre</FormLabel>
                                <FormControl>
                                    <Input required

                                        {...field}
                                        className="book-form_input"
                                        placeholder="Book Genre"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"rating"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Rating</FormLabel>
                                <FormControl>
                                    <Input required
                                        type="number"
                                        min={1}
                                        max={5}
                                        {...field}
                                        className="book-form_input"
                                        placeholder="Book Rating"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"totalCopies"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Total Copies</FormLabel>
                                <FormControl>
                                    <Input required
                                        type="number"
                                        min={1}
                                        max={10000}
                                        {...field}
                                        className="book-form_input"
                                        placeholder="Total Copies Of Book"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"coverUrl"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Book Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        type="image"
                                        accept="image/*"
                                        placeholder="Book Cover"
                                        folder="books/covers"
                                        variant="light"
                                        onFileChange={field.onChange}
                                        value={field.value}

                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"coverColor"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Primary Color</FormLabel>
                                <FormControl>
                                    <ColorPicker
                                        onPickerChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"description"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Book Description</FormLabel>
                                <FormControl>
                                    <Textarea

                                        required
                                        placeholder="Book Description"
                                        {...field}
                                        row={10}
                                        className="book-form_input"
                                    />

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"videoUrl"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Book Trailer</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        type="video"
                                        accept="video/*"
                                        placeholder="Upload a book Trailer"
                                        folder="books/videos"
                                        variant="light"
                                        onFileChange={field.onChange}
                                        value={field.value}

                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name={"summary"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">Book Summary</FormLabel>
                                <FormControl>
                                    <Textarea

                                        required
                                        placeholder="Book Summary"
                                        {...field}
                                        row={5}
                                        className="book-form_input"
                                    />

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit" className="book-form_btn text-light-100">Submit</Button>
                </form>
            </Form>

        </div>
    )
}

export default BookForm
