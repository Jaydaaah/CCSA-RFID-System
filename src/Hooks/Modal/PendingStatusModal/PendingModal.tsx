"use client";

import { MyContextPairDefaultValue, MyContextPairType, SetStateWrapper } from "@/lib/extra_function";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { Modal, ModalContent, ModalBody, CircularProgress } from "@nextui-org/react";

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

    return (
        <PendingModalContext.Provider value={[state, setter]}>
            <Modal
                size="sm"
                isOpen={state.isOpen}
                placement="top-center"
                closeButton={<></>}
            >
                <ModalContent>
                    <ModalBody className="flex justify-center items-center">
                        <CircularProgress
                            className="my-20"
                            label={state.message}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            {children}
        </PendingModalContext.Provider>
    )
}

export function usePendingModal() {
    const [isPending, _setPending] = useContext(PendingModalContext);
    const setPending = SetStateWrapper(_setPending);

    const setStatus = useCallback((isPending: boolean, message?: string) => {
        setPending({
            isOpen: isPending,
            message: message ?? ""
        })
    }, [_setPending]);

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