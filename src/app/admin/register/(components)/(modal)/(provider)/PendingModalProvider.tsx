"use client";

import { MyContextPairDefaultValue, MyContextPairType, SetStateWrapper } from "@/lib/extra_function";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import PendingModal from "../PendingModal";

interface PendingStatus {
    isOpen: boolean,
    message: string
}

const DefaultPendingStatus: PendingStatus = {
    isOpen: false,
    message: ""
}

const PendingModalContext = createContext<MyContextPairType<PendingStatus>>(MyContextPairDefaultValue(DefaultPendingStatus));


export function PendingModalProvider({children}: {children: ReactNode}) {
    const [state, setter] = useState(DefaultPendingStatus);

    return <PendingModalContext.Provider value={[state, setter]}>
        <PendingModal/>
        {children}
    </PendingModalContext.Provider>
}

export function usePendingModal() {
    const [isPending, _setPending] = useContext(PendingModalContext);
    const setPending = SetStateWrapper(_setPending);

    const setStatus = useCallback((isPending: boolean, message?: string) => {
        setPending({
            isOpen: isPending,
            message: message ?? ""
        })
    }, [setPending]);

    const onTransition = useCallback((message: string, activity: () => Promise<void>) => {
        setStatus(true, message);
        activity().then(() => {
            setStatus(false);
        });
    }, [setStatus]);

    return {
        isPending,
        setStatus,
        onTransition
    }
}