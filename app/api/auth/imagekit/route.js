import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imageKit = new ImageKit({
    publicKey: config.env.imageKit.publicKey,
    urlEndpoint: config.env.imageKit.urlEndpoint,
    privateKey: config.env.imageKit.privateKey,
})


export async function GET() {
    return NextResponse.json(imageKit.getAuthenticationParameters());
}