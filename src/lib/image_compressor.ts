import imageCompression from "browser-image-compression";

export async function compressImage(imageFile: File) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true,
    };
    try {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile;
    } catch (error) {
        console.error("for some reason image is not compressed");
        return imageFile;
    }
}
