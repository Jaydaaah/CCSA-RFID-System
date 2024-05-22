"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    ServerActionCreateAccount,
    ServerActionDeleteAccount,
    ServerActionRetrieveAccounts,
    ServerActionUpdateAccount,
} from "../../(Actions)/Action";
import {
    MyContextPairDefaultValue,
    MyContextPairType,
    SetStateWrapper,
} from "@/lib/extra_function";
import {
    PendingModalProvider,
    usePendingModal,
} from "../(components)/(modal)/(provider)/PendingModalProvider";
import { compressImage } from "@/lib/image_compressor";
import { uploadImage } from "@/app/api/upload-image/upload";
import { FilterProvider, useFilter } from "./FilterContext";

type Account = Record<string, string>;

const AccountManagerContext = createContext<MyContextPairType<Account[]>>(
    MyContextPairDefaultValue<Account[]>([])
);

interface Props {
    children: ReactNode;
    initial_acclist: Record<string, string>[];
}

export function AccountManagerProvider({ initial_acclist, children }: Props) {
    const accountState = useState<Account[]>(initial_acclist);

    return (
        <PendingModalProvider>
                <AccountManagerContext.Provider value={accountState}>
                    {children}
                </AccountManagerContext.Provider>
        </PendingModalProvider>
    );
}

let loading = false;
async function LockFunction(fn: () => Promise<void>) {
    if (!loading) {
        loading = true;
        await fn();
        loading = false;
    } else {
        console.log("Pending load - cancelled");
    }
}

export function useAccountManager() {
    const { onTransition } = usePendingModal();
    const [accounts, _setAccounts] = useContext(AccountManagerContext);

    const setAccounts = useCallback(SetStateWrapper(_setAccounts), [
        _setAccounts,
    ]);

    const baseReloadAccount = useCallback(async () => {
        await LockFunction(async () => {
            const res = await ServerActionRetrieveAccounts();
            setAccounts(res.reverse());
        });
    }, []);

    const reloadAccount = useCallback(() => {
        onTransition("Reloading...", async () => {
            await baseReloadAccount();
        });
    }, []);

    const _uploadImage = useCallback(async (_id: string, image: File) => {
        if (image.size > 0) {
            const compressedImage = await compressImage(image);
            await uploadImage(_id, "jpeg", compressedImage);
        }
    }, []);

    const createAccount = useCallback(
        (created_acc: Record<string, string>, image?: File) => {
            onTransition("Creating...", async () => {
                try {
                    const res = await ServerActionCreateAccount(created_acc);
                    if (res && image) {
                        await _uploadImage(res._id, image);
                    }
                } finally {
                    await baseReloadAccount();
                }
            });
        },
        []
    );

    const deleteAccount = useCallback((_id: string) => {
        onTransition("Deleting...", async () => {
            try {
                await ServerActionDeleteAccount(_id);
            } finally {
                await baseReloadAccount();
            }
        });
    }, []);

    const updateAccount = useCallback(
        (_id: string, update: Record<string, string>, image?: File) => {
            onTransition("Updating...", async () => {
                try {
                    await ServerActionUpdateAccount(_id, update);
                    if (image) {
                        await _uploadImage(_id, image);
                    }
                } finally {
                    await baseReloadAccount();
                }
            });
        },
        []
    );

    const checkrfidDuplicates = useCallback(
        (rfidTag: string, _id?: string) => {
            for (const acc of accounts) {
                if (acc.rfidTag == rfidTag && acc._id != _id) {
                    return true;
                }
            }
            return false;
        },
        [accounts]
    );

    return {
        accounts,
        reloadAccount,
        createAccount,
        deleteAccount,
        updateAccount,
        checkrfidDuplicates,
    };
}
