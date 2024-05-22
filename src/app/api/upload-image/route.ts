import { FetchImageUpdate } from "@/lib/api_calls";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const _id = req.headers.get('_id') ;
    if (_id) {
        const image = await req.blob();
        if (image.size > 0) {
            await FetchImageUpdate(_id, image);
        }
    }
    return new Response();
};