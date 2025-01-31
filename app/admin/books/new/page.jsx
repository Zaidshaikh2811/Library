import BookForm from '@/components/admin/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <Button asChild className="back-btn">

                <Link href="/admin/books">Go Back</Link>
            </Button>

            <section className='w-full max-w-2xl'>

                <BookForm
                    defaultValues={
                        {
                            title: "",
                            genre: "",
                            author: "",
                            rating: "",
                            totalCopies: "",
                            description: "",
                            coverUrl: "",
                            coverColor: "",
                            videoUrl: "",
                            summary: "",
                        }
                    }
                />
            </section>
        </div>
    )
}

export default page
