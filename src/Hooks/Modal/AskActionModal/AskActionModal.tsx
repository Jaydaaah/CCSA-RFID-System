"use client";

import { MyContextPairDefaultValue, MyContextPairType, SetStateWrapper } from "@/lib/extra_function";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

type Color = "primary" | "secondary" | "success" | "warning" | "danger" | "default";

interface AskAction {
    title?: string;
    description?: string;
    isOpen: boolean;
    color?: Color
    action?: () => void
}

const DefaultNewAction: AskAction = {
    isOpen: false,
};

const AskActionModalContext = createContext<MyContextPairType<AskAction>>(MyContextPairDefaultValue(DefaultNewAction));

export function AskActionModalProvider({children}: {children: ReactNode}) {
    const [actionState, setter] = useState(DefaultNewAction);
    const setAskAction = SetStateWrapper(setter);

    const giveAnswer = useCallback((reply: boolean) => {
        if (reply && actionState.action) {
            actionState.action();
        }
        setAskAction({
            isOpen: false,
        })
    }, [actionState])

    const replyGen = useCallback((reply: boolean) => {
        return () => {
            if (actionState.isOpen) {
                giveAnswer(reply);
            }
        }
    }, [actionState])

    return <AskActionModalContext.Provider value={[actionState, setter]}>
        <Modal
            size="sm"
            isOpen={actionState.isOpen}
            placement="top-center"
            closeButton={<></>}
        >
            <ModalContent>
                <ModalHeader>
                    {actionState.title}
                </ModalHeader>
                <ModalBody className="flex flex-col justify-center items-center">
                    <p>{actionState.description}</p>
                    <div className="flex self-end gap-3 mb-3">
                        <Button variant="flat" color={actionState.color} onClick={replyGen(true)}>Yes</Button>
                        <Button variant="flat" onClick={replyGen(false)}>No</Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        {children}
    </AskActionModalContext.Provider>
}

export function useAskActionModal() {
    const [_askAction, _setAskAction] = useContext(AskActionModalContext);
    const setAskAction = SetStateWrapper(_setAskAction);

    const AskConfirmation = useCallback((action: () => void, title: string, description?: string, color: Color = "primary") => {
        setAskAction({
            title,
            description,
            isOpen: true,
            action,
            color
        })
    }, [_setAskAction]);

    return {
        AskConfirmation
    }
}