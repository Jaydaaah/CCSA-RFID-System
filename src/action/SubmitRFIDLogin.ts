"use server";

import {
    FetchAccountData,
    FetchAccountImage,
    LoginFetch,
} from "@/lib/api_calls";

function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
        return reader.result?.toString();
    });
}

export interface RFIDServerActionResponse {
    ccsaID: string;
    stdName: string;
    course: string;
}

export default async function SubmitRFIDLogin(rfid: string) {
    const res = await LoginFetch(rfid);
    if (!res) {
        return JSON.stringify({});
    }

    const data = await FetchAccountData(res._id);
    return JSON.stringify({
        _id: res._id,
        data
    });
}
