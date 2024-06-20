"use client";
import { ReactNode } from "react";

// Providers
import { PageProvider } from "@/Hooks/PageContext";
import { AccountManagerProvider } from "@/Hooks/AccountManager";
import { UserModalProvider } from "@/Hooks/Modal/UserFieldModal/UserModalHook";
import { AskActionModalProvider } from "@/Hooks/Modal/AskActionModal/AskActionModal";
import { FilterProvider } from "@/Hooks/Filter";

interface Props {
    children: ReactNode;
    initial_acclist: Record<string, string>[];
    initial_page?: number | undefined;
    itemPerPage: number;
}

export default function StackProvider({
    children,
    initial_acclist,
    initial_page,
    itemPerPage,
}: Props) {
    return (
        <>
            <FilterProvider>
                <AccountManagerProvider initial_acclist={initial_acclist}>
                    <PageProvider
                        initial_page={initial_page}
                        itemPerPage={itemPerPage}
                    >
                        <UserModalProvider>
                            <AskActionModalProvider>
                                {children}
                            </AskActionModalProvider>
                        </UserModalProvider>
                    </PageProvider>
                </AccountManagerProvider>
            </FilterProvider>
        </>
    );
}
