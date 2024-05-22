"use client";

export async function fetchImage(_id: string) {
    const response = await fetch(`/api/retrieve-image`, {
        headers: {
            _id,
        },
        cache: "no-cache"
    });
    if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 0) {
            return URL.createObjectURL(blob);
        }
    }
    return;
}