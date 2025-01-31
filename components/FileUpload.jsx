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
import { cn } from '@/lib/utils';


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


const ImageUpload = ({ onFileChange, type, accept, placeholder, folder, variant }) => {
    const ikuploadRef = useRef();
    const { toast } = useToast()
    const [progress, setProgress] = useState(0)

    const styles = {
        button: variant == 'dark' ? "bg-dark-300" : 'bg-light-600',
        placeholder: variant == 'dark' ? "text-light-100" : 'text-slate-500',
        text: variant == 'dark' ? 'text-light-100' : 'text-dark-400'
    }

    const [file, setFile] = useState(null);

    const onError = (err) => {
        console.log(err);
        toast({
            title: `${type} Uploaded Failed`,
            description: ` ${err.message}`,
            variant: "destructive",
        })

    }
    const onSuccess = (res) => {
        setFile(res);
        onFileChange(res.filePath);
        toast({
            title: `${type} Uploaded Successfully`,
            description: `${res.filePath} has been uploaded successfully`,
            variant: "default",
        })

    }

    const onValidate = (file) => {
        if (file === "image") {
            if (file.size > 20 * 1024 * 1024) {
                toast({
                    title: "File Size too Large",
                    description: "File size should be less than 20MB",
                    variant: "destructive"
                })
                return false;
            }

        } else if (type == "video") {
            if (file.size > 50 * 1024 * 1024) {
                toast({
                    title: "File Size too Large",
                    description: "File size should be less than 50MB",
                    variant: "destructive"
                })
                return false;
            }
        }
        return true
    }


    return (

        <ImageKitProvider
            publicKey={config.env.imageKit.publicKey}
            authenticator={authenticator}
            urlEndpoint={config.env.imageKit.urlEndpoint}>

            <IKUpload
                className='hidden'
                ref={ikuploadRef}
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={(e) => {
                    setProgress(0)
                }}
                onUploadProgress={({ loaded, total }) => {
                    const percent = Math.round((loaded / total) * 100)
                    setProgress(percent)
                }}


                accept={accept}
                folder={folder}
            />
            <Button className={cn("upload-btn", styles.button)} onClick={(e) => {
                e.preventDefault();
                if (ikuploadRef.current) {

                    ikuploadRef.current?.click()
                }
            }}>
                <Image className='object-contain' src="/icons/upload.svg" width={20} height={20} alt="upload" />
                <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>


                {
                    file && <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
                }
            </Button>
            {
                progress > 0 && progress < 100 && (
                    <div className="w-ful rounded-full bg-green-200">
                        <div className="progress" style={{ width: `${progress}%` }}>
                            {progress}%
                        </div>
                    </div>
                )
            }
            {file &&
                (type == "image" ? (

                    <IKImage path={file.filePath} alt={file.filePath} width={500} height={500} />
                ) : type == "video" ? (

                    <IKVideo className='h-96 w-full rounded-xl' path={file.filePath} alt={file.filePath} width={500} height={500} />
                ) : null)
            }
        </ImageKitProvider>
    )
}

export default ImageUpload
