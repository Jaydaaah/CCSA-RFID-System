"use client";

import {
    MyContextPairDefaultValue,
    MyContextPairType,
    SetStateWrapper,
} from "@/lib/extra_function";
import { useDisclosure } from "@nextui-org/react";
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
import BaseUserModal from "../BaseUserModal";
import AddUserModal from "../AddUserModal";
import EditUserModal from "../EditUserModal";

interface UserModal {
    mode: "Add" | "Edit" | "Idle";
    Account?: Record<string, string>;
}

const defaultUserModal: UserModal = {
    mode: "Idle",
};

const AskUserModalContext = createContext<MyContextPairType<UserModal>>(
    MyContextPairDefaultValue(defaultUserModal)
);

export function UserModalProvider({ children }: { children: ReactNode }) {
    const [state, setter] = useState(defaultUserModal);

    return (
        <AskUserModalContext.Provider value={[state, setter]}>
            <AddUserModal/>
            <EditUserModal account={state.Account}/>
            {children}
        </AskUserModalContext.Provider>
    );
}

export function asUserModal() {
    const [state, _setState] = useContext(AskUserModalContext);
    return state;
}

export function useUserModal() {
    const [state, _setState] = useContext(AskUserModalContext);
    const setState = SetStateWrapper(_setState);
    const callAdd = useCallback(() => {
        setState({
            mode: "Add",
        });
    }, []);

    const callEdit = useCallback(
        (Account: Record<string, string>) => {
            setState({
                mode: "Edit",
                Account,
            });
        },
        []
    );

    return {
        callAdd, callEdit
    }
}
