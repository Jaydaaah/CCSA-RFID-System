"use client";

import { User } from "@nextui-org/react";
import { useEffect, useState } from "react";

// Fetch function
import { fetchImage } from "@/app/api/retrieve-image/fetch";

interface Props {
    account: Record<string, string>
}

export default function CustomFetchUser({account }: Props) {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (account._id) {
            fetchImage(account._id).then((res) => {
                if (res) {
                    setImageSrc(res);
                }
            })
        } else {
            setImageSrc('');
        }
    }, [account]);

    return <User
        className="text-foreground"
        avatarProps={{src: imageSrc}}
        name={account.stdName}
        description={<span className="text-foreground-500">{account.ccsaID}</span>}>
    </User>
}