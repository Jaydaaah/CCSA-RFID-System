"use client";

export async function uploadImage(_id: string, type: "jpeg" | "png", image: File) {
    return await fetch("/api/upload-image", {
        headers: {
            "_id": _id,
            "Content-Type": `image/${type}`,
        },
        method: "POST",
        body: image
    })
};