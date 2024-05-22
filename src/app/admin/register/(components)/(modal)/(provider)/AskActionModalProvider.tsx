"use client";

import { MyContextPairDefaultValue, MyContextPairType, SetStateWrapper } from "@/lib/extra_function";
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import AskActionModal from "../AskActionModal";

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
    const [state, setter] = useState(DefaultNewAction);

    return <AskActionModalContext.Provider value={[state, setter]}>
        <AskActionModal/>
        {children}
    </AskActionModalContext.Provider>
}

export function useAskActionModal() {
    const [askAction, _setAskAction] = useContext(AskActionModalContext);
    const setAskAction = SetStateWrapper(_setAskAction);

    const AskConfirmation = useCallback((action: () => void, title: string, description?: string, color: Color = "primary") => {
        setAskAction({
            title,
            description,
            isOpen: true,
            action,
            color
        })
    }, []);

    return {
        AskConfirmation
    }
}

export function asAskActionModal() {
    const [askAction, _setAskAction] = useContext(AskActionModalContext);
    const setAskAction = SetStateWrapper(_setAskAction);

    const giveAnswer = useCallback((reply: boolean) => {
        if (reply && askAction.action) {
            askAction.action();
        }
        setAskAction({
            isOpen: false,
        })
    }, [askAction])

    return {
        askAction,
        giveAnswer
    }
}