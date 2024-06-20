"use client";

import BaseUserModal from "./BaseUserModal";
import { useCallback } from "react";
import { useAccountManager } from "../../../AccountManager";

export default function AddUserModal() {
    /**
     * This Component is already provided in the UserModalHook
     * No need to import this
     */
    const { createAccount } = useAccountManager();

    const formActionAdd = useCallback(
        async (formData: FormData) => {
            const access = formData.get("access") as string;
            const ccsaID = formData.get("ccsaID") as string;
            const stdName = formData.get("stdName") as string;
            const course = formData.get("course") as string;
            const rfidTag = formData.get("rfidTag") as string;
            const imagefile = formData.get("image") as File | undefined;
            createAccount({
                access,
                ccsaID,
                stdName,
                course,
                rfidTag,
            }, imagefile);
        },
        [createAccount]
    );

    return (
        <BaseUserModal
            mode="Add"
            modalHeader="Add New User"
            formAction={formActionAdd}
        />
    );
}
