"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    ServerActionCreateAccount,
    ServerActionDeleteAccount,
    ServerActionRetrieveAccounts,
    ServerActionUpdateAccount,
} from "../app/admin/(Actions)/Action";
import {
    MyContextPairDefaultValue,
    MyContextPairType,
    SetStateWrapper,
} from "@/lib/extra_function";
import {
    PendingModalProvider,
    usePendingModal,
} from "./Modal/PendingStatusModal/PendingModal";
import { compressImage } from "@/lib/image_compressor";
import { uploadImage } from "@/app/api/upload-image/upload";
import { useFilter } from "./Filter";

/**
 * Description: Provides Context for Account Management
 * To be used in Table Data component
 * 
 * Dependencies - PendingStatus Hook, useFilter Hook
 */

type Account = Record<string, string>;

const AccountManagerContext = createContext<MyContextPairType<Account[]>>(
    MyContextPairDefaultValue<Account[]>([])
);

interface Props {
    children: ReactNode;
    initial_acclist: Record<string, string>[];
}

export function AccountManagerProvider({ initial_acclist, children }: Props) {
    const {filter, filterize} = useFilter();

    // Use filter Hook
    const [unfilteredAccount, setter] = useState<Account[]>(initial_acclist);

    const accounts = useMemo(() => {
        return filterize(unfilteredAccount);
    }, [filter, unfilteredAccount]);

    return (
        <PendingModalProvider>
                <AccountManagerContext.Provider value={[accounts, setter]}>
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
    /**
     * A custom hook for Account management
     * 
     * @property accounts - Record<string, string>
     * @property reloadAccount - calls reload
     * @property createAccount - creates a
     * @property deleteAccount - deletes account
     * @property updateAccount - Edits particular account
     * @property checkrfidDuplicates - Checks for duplicate for validation purpose
     */
    const { onTransition } = usePendingModal();
    const [accounts, _setAccounts] = useContext(AccountManagerContext);

    const setAccounts = useCallback(SetStateWrapper(_setAccounts), [_setAccounts]);

    const baseReloadAccount = useCallback(async () => {
        await LockFunction(async () => {
            const res = await ServerActionRetrieveAccounts();
            setAccounts(res.reverse());
        });
    }, [setAccounts]);

    const reloadAccount = useCallback(() => {
        onTransition("Reloading...", async () => {
            await baseReloadAccount();
        });
    }, [baseReloadAccount]);

    const _uploadImage = useCallback(async (_id: string, image: File) => {
        if (image.size > 0) {
            const compressedImage = await compressImage(image);
            await uploadImage(_id, "jpeg", compressedImage);
        }
    }, []);

    const createAccount = useCallback(
        (created_acc: Record<string, string>, image?: File) => {
            /** Creates Accounts
             * @param created_acc
             * @property - access
             * @property - stdName
             * @property - ccsaID
             * @property - course
             * @property - rfidTag
             * 
             * @param image - Image File
             */
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
        [baseReloadAccount]
    );

    const deleteAccount = useCallback((_id: string) => {
        /** Deletes particular using mongoDB _id
         * @param _id - MongoDB ID to be deleted
         */
        onTransition("Deleting...", async () => {
            try {
                await ServerActionDeleteAccount(_id);
            } finally {
                await baseReloadAccount();
            }
        });
    }, [baseReloadAccount]);

    const updateAccount = useCallback(
        (_id: string, update: Record<string, string>, image?: File) => {
            /** Updates particular account provided by MongoDB ID
             * @param _id - MongoDB ID to be updated
             * @param update - Contains the update values
             * @property - can be any of the following (ccsaID, stdName, course, rfidTag)
             * 
             * @param image - update Image file
             */
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
        [baseReloadAccount]
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
