"use client";
/**
 * Image Hook
 *
 * important: Do not use this hook.
 * this is a part of Account hook
 *
 * usage:
 */

import { StaticImageData } from "next/image";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const ImageContext = createContext("");
const SetImageContext = createContext<
    React.Dispatch<React.SetStateAction<string>> | undefined
>(undefined);

interface props {
    children: React.ReactNode;
    default_src: StaticImageData;
}

let _default_src: StaticImageData;

export function ImageProvider({ children, default_src }: props) {
    const [ImageSrc, setImageSrc] = useState(default_src.src);
    _default_src = default_src;

    return (
        <ImageContext.Provider value={ImageSrc}>
            <SetImageContext.Provider value={setImageSrc}>
                {children}
            </SetImageContext.Provider>
        </ImageContext.Provider>
    );
}

export function UseImage() {
    const ImageSrc = useContext(ImageContext);
    const _setImageSrc = useContext(SetImageContext);

    const setImageSrc = useCallback(async (url: string) => {
        if (_setImageSrc) {
            if (!url) {
                throw new Error("Image URL can't be empty");
            }
            const res = await fetch(url);
            const imageblob = await res.blob();
            const blobURL = URL.createObjectURL(imageblob);
            _setImageSrc(blobURL);
        }
    }, []);

    const setImageDefault = useCallback(() => {
        if (_setImageSrc) {
            _setImageSrc(_default_src.src);
        }
    }, [ImageSrc]);

    return {
        ImageSrc,
        setImageSrc,
        setImageDefault,
    };
}
