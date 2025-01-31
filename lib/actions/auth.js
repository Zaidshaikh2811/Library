"use server"
import { db } from "@/database/drizzle"
import { users } from "@/database/Schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { signIn } from "@/auth"

export const signUp = async (params) => {
    try {
        const { fullName, email, universityId, universityCard, password } = params
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser.length > 0) {
            throw new Error("User already exists")
        }

        const hashedPassword = await hash(password, 10)

        const user = await db.insert(users).values({
            fullName,
            email,
            universityId,
            universityCard,
            password: hashedPassword,
            status: "pending",
        });
        await signInWithCred({ email, password })
        return { success: true, user: user[0] }



    } catch (error) {
        throw new Error(error)
    }
}


export const signInWithCred = async (params) => {
    try {
        const { email, password } = params


        const result = await signIn("credentials", { email, password, redirect: false })
        if (result?.error) {
            return { success: false, error: result.error }
        }
        return { success: true }

    }
    catch (error) {
        throw new Error(error)
    }
}