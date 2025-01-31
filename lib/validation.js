import { z } from "zod"


export const signUpSchema = z.object({
    fullName: z.string().min(3, { message: "Fullname must be at least 3 characters long" }).max(30, { message: "Fullname must be at most 30 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University card is required"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),

})


export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})



export const bookSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(30, { message: "Title must be at most 30 characters long" }),
    genre: z.string().min(3, { message: "Genre must be at least 3 characters long" }).max(30, { message: "Genre must be at most 30 characters long" }),
    author: z.string().min(3, { message: "Author must be at least 3 characters long" }).max(30, { message: "Author must be at most 30 characters long" }),
    rating: z.coerce.number().min(0, { message: "Rating must be at least 0" }).max(5, { message: "Rating must be at most 5" }),
    totalCopies: z.coerce.number().int().positive().lte(10000),
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }).max(300, { message: "Description must be at most 300 characters long" }),
    coverUrl: z.string().nonempty("Cover URL is required"),
    coverColor: z.string().trim().regex(/^#(?:[0-9a-fA-F]{6})$/i),
    videoUrl: z.string().nonempty("Video URL is required"),
    summary: z.string().trim().min(3, { message: "Summary must be at least 3 characters long" }).max(300, { message: "Summary must be at most 300 characters long" }),

})