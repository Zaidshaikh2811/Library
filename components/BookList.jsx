import React from 'react'
import BookCard from './BookCard'

const BookList = ({ title, books, containerClassname }) => {
    return (
        <div className={containerClassname}>
            <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>
            <ul className='book-list'>
                {books.map((book) => <BookCard key={book.title} {...book} />)}
            </ul>
        </div>
    )
}

export default BookList
