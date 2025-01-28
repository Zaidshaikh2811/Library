import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imageKit = new ImageKit({
    publicKey: config.env.imageKet.publicKey,
    urlEndpoint: config.env.imageKet.urlEndpoint,
    privateKey: config.env.imageKet.privateKey,
})


export async function GET() {
    return NextResponse.json(imageKit.getAuthenticationParameters());
}