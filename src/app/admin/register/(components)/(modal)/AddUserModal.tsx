"use client";

import BaseUserModal from "./BaseUserModal";
import { useCallback, useEffect } from "react";
import { useAccountManager } from "../../(contexts)/AccountManagerContext";

export default function AddUserModal() {
    const { createAccount } = useAccountManager();

    const formActionAdd = useCallback(
        async (formData: FormData) => {
            const ccsaID = formData.get("ccsaID") as string;
            const stdName = formData.get("stdName") as string;
            const course = formData.get("course") as string;
            const rfidTag = formData.get("rfidTag") as string;
            const imagefile = formData.get("image") as File | undefined;
            createAccount({
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
