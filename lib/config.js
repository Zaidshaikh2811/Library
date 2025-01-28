const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
        imageKet: {
            publicKey: process.env.NEXT_PUBLIC_IMAGE_PUBLIC_KEY,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
            privateKey: process.env.IMAGEKET_PRIVATE_KEY
        }
    }
}


export default config;