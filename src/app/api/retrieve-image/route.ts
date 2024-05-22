import { FetchAccountImage } from "@/lib/api_calls";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: NextResponse) {
    const _id = req.headers.get('_id') ;
    if (_id) {
        const imageblob = await FetchAccountImage(_id);
        if (imageblob) {
            return new Response(imageblob);
        }
    }
    return NextResponse.json({ error: 'Error retrieving image' }, { status: 400 })
};