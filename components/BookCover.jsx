import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const variantStyles = {
    extraSmall: "book-cover_extra_small",
    small: "book-cover_small",
    medium: "book-cover_medium",
    regular: "book-cover_regular",
    wide: "book-cover_wide"
}



const BookCover = ({
    className, variant = "regular", coverColor = "#012b48", coverImage = "https://placehold.co/400x600.png"
}) => {
    return (
        <div
            className={cn(
                "relative transition-all duration-300",
                variantStyles[variant],
                className,
            )}
        >BookSide SVG
            <div
                className="absolute z-10"
                style={{ left: "12%", width: "87.5%", height: "88%" }}
            >
                <Image src={coverImage} alt="book" fill className='
                rounded-sm object-fill'/>
            </div>
        </div>
    )
}

export default BookCover
