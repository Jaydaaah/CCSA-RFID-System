"use server";

import {
    FetchAllAccounts,
    FetchCreateAccount,
    FetchDeleteAccount,
    FetchImageUpdate,
    FetchUpdateAccount,
} from "@/lib/api_calls";
import { revalidatePath } from "next/cache";

export async function ServerActionRetrieveAccounts() {
    const AccList = await FetchAllAccounts();
    return AccList;
}

export async function ServerActionCreateAccount(
    testAcc: Record<string, string>
) {
    const resdata = await FetchCreateAccount(testAcc);
    return resdata;
}

export async function ServerActionDeleteAccount(_id: string) {
    return await FetchDeleteAccount(_id);
}

export async function ServerActionUpdateAccount(
    _id: string,
    update: Record<string, string>
) {
    return await FetchUpdateAccount(_id, update);
}
