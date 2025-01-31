"use client"

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { borrowBook } from '@/lib/actions/borrow'


const BorrowBook = ({ userId, bookId, borrowingEligibility: {
    isEligible,
    message
} }) => {

    const router = useRouter()
    const [borrowing, setBorrowing] = React.useState(false)
    const { toast } = useToast()
    const borrowBookFunc = async () => {
        if (isEligible) {
            toast({
                title: "Error",
                description: message,
                variant: "destructive"
            })
        }
        setBorrowing(true)
        try {

            const response = await borrowBook(bookId, userId)

            if (response.success) {

                toast({
                    title: "Success",
                    description: "Book Borrowed Successfully",
                    variant: "default"
                })
                router.push("/books")
            }
        } catch (error) {
            console.log(error);

            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setBorrowing(false)
        }
    }

    return (
        <Button className="book-overview_btn" onClick={borrowBookFunc} disabled={borrowing}>
            <Image src="/icons/book.svg" width={20} height={20} alt="book" />
            <p className='font-bebas-neue text-xl text-dark-100'>{
                borrowing ? "Borrowing..." : "Borrow Book"

            } </p>
        </Button>
    )
}

export default BorrowBook
