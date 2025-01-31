"use server"


import { db } from "@/database/drizzle"
// import { books } from "@/database/Schema"
import { books } from "@/database/Schema";



export const createBook = async (params) => {

    try {


        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies
        }).returning();

        return {
            success: true,
            data: newBook[0]
        }
    }
    catch (error) {


        return {
            success: false,
            error: error
        }

    }
}