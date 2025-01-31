"use client"

import { IKVideo, ImageKitProvider } from 'imagekitio-next'
import React from 'react'

const BookVideo = ({ videoUrl }) => {
    return (
        <ImageKitProvider publicKey={process.env.NEXT_PUBLIC_IMAGE_PUBLIC_KEY}
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        >
            <IKVideo
                path={videoUrl}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}

                controls={true}
                autoPlay={false}
                loop={true}
                className='w-full rounded-xl'


            />

        </ImageKitProvider>
    )
}

export default BookVideo
