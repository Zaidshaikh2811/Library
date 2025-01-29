import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import React from 'react'

const page = () => {
    return (
        <div>
            <form action={async () => {
                "use server"
                await signOut()
            }} className='flex justify-end'>
                <Button>LogOut</Button>
            </form>

            <BookList title="My Books" books={sampleBooks} containerClassname="mt-20" />
        </div>
    )
}

export default page
