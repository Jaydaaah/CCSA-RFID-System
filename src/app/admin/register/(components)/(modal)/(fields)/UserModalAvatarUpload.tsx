"use client";

import { fetchImage } from "@/app/api/retrieve-image/fetch";
import { Avatar, Button } from "@nextui-org/react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

// icons
import { LuUpload } from "react-icons/lu";

interface Prop {
    _id?: string;
}

export default function UserModalAvatarUpload({ _id }: Prop) {
    const [image, setImage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (_id) {
            fetchImage(_id).then((res) => {
                if (res) {
                    setImage(res);
                }
            });
        }
    }, [_id]);

    const InputFileChange = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            const files = target.files;
            if (files && files.length > 0) {
                setImage(URL.createObjectURL(files[0]));
            } else {
                setImage("");
            }
        },
        []
    );

    return (
        <>
            <Avatar src={image} className="w-[9rem] h-[9rem]"></Avatar>
            <Button
                startContent={<LuUpload />}
                variant="flat"
                onPress={() => {
                    fileInputRef.current?.click();
                }}
            >
                <input
                    ref={fileInputRef}
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg"
                    formNoValidate={false}
                    onChange={InputFileChange}
                    hidden
                />
                Upload Image
            </Button>
        </>
    );
}
