"use client"

import React, { use, useRef, useState } from 'react'
import {
    IKImage,
    IKVideo,
    ImageKitProvider,
    IKUpload,
    ImageKitContext
} from "imagekitio-next";
import Error from 'next/error';
import config from '@/lib/config';
import { Button } from './ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';


const authenticator = async () => {
    try {
        const resp = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
        if (!resp.ok) {
            const errorText = await resp.text()
            throw new Error(errorText)
        }
        const data = await resp.json();
        const { signature, expire, token } = data;
        return {
            signature, expire, token
        }
    } catch (error) {
        throw new Error(error)
    }
}


const ImageUpload = ({ onFileChange }) => {
    const ikuploadRef = useRef();
    const { toast } = useToast()

    const [file, setFile] = useState(null);

    const onError = (err) => {
        console.log(err);
        toast({
            title: "Image Uploaded Failed",
            description: ` ${err.message}`,
            variant: "destructive",
        })

    }
    const onSuccess = (res) => {
        setFile(res);
        onFileChange(res.filePath);
        toast({
            title: "Image Uploaded Successfully",
            description: `${res.filePath} has been uploaded successfully`,
            variant: "default",
        })

    }
    return (

        <ImageKitProvider
            publicKey={config.env.imageKet.publicKey}
            authenticator={authenticator}
            urlEndpoint={config.env.imageKet.urlEndpoint}>

            <IKUpload
                className='hidden'
                ref={ikuploadRef}
                onError={onError}
                onSuccess={onSuccess}
                fileName='test-upload.png'
            />
            <Button className="upload-btn" onClick={(e) => {
                e.preventDefault();
                if (ikuploadRef.current) {

                    ikuploadRef.current?.click()
                }
            }}>
                <Image className='object-contain' src="/icons/upload.svg" width={20} height={20} alt="upload" />
                <p className='text-base text-light-100'>Upload a File</p>
                {
                    file && <p className='upload-filename'>{file.filePath}</p>
                }
            </Button>
            {file &&
                <IKImage path={file.filePath} alt={file.filePath} width={500} height={500} />
            }
        </ImageKitProvider>
    )
}

export default ImageUpload
