"use client";
import BaseUserModal from "./BaseUserModal";
import { useCallback } from "react";
import { useAccountManager } from "../../../AccountManager";
interface props {
    account?: Record<string, string>;
}

export default function EditUserModal({ account }: props) {
    /**
     * This Component is already provided in the UserModalHook
     * No need to import this
     */
    
    const { updateAccount } = useAccountManager();

    const formActionEdit = useCallback(
        async (formData: FormData) => {
            if (account) {
                const access = formData.get("access") as string;
                const ccsaID = formData.get("ccsaID") as string;
                const stdName = formData.get("stdName") as string;
                const course = formData.get("course") as string;
                const rfidTag = formData.get("rfidTag") as string;
                const imagefile = formData.get("image") as File | undefined;
                if (account._id) {
                    updateAccount(account._id, {
                        access,
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
        [account, updateAccount]
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
