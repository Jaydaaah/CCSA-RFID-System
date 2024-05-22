"use client";

import { useDisclosure } from "@nextui-org/react";
import BaseUserModal from "./BaseUserModal";
import { useCallback, useEffect } from "react";
import { useAccountManager } from "../../(contexts)/AccountManagerContext";
import { uploadImage } from "@/app/api/upload-image/upload";
import { asUserModal } from "./(provider)/UserModalProvider";
import { compressImage } from "@/lib/image_compressor";

interface props {
    account?: Record<string, string>;
}

export default function EditUserModal({ account }: props) {
    const { updateAccount } = useAccountManager();

    const formActionEdit = useCallback(
        async (formData: FormData) => {
            if (account) {
                const ccsaID = formData.get("ccsaID") as string;
                const stdName = formData.get("stdName") as string;
                const course = formData.get("course") as string;
                const rfidTag = formData.get("rfidTag") as string;
                const imagefile = formData.get("image") as File | undefined;
                if (account._id) {
                    updateAccount(account._id, {
                        ccsaID,
                        stdName,
                        course,
                        rfidTag,
                    }, imagefile);
                } else {
                    console.log("no valid _id provided");
                }
            }
        },
        [account]
    );

    return (
        <BaseUserModal
            account={account}
            mode="Edit"
            modalHeader="Edit Current User"
            formAction={formActionEdit}
        />
    );
}
