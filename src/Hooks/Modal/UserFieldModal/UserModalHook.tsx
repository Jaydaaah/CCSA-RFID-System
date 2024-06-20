"use client";

import {
    MyContextPairDefaultValue,
    MyContextPairType,
    SetStateWrapper,
} from "@/lib/extra_function";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import AddUserModal from "./Components/AddUserModal";
import EditUserModal from "./Components/EditUserModal";

/**
 * Description: A Custom hook that uses Modal that pop ups a form for adding user and editing user
 * Usage: This hook requires UserModalProvider to be at the parent level where you call the useUserModal
 */

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
    /**
     * Provides Context for the usage of useUserModal Hook
     */
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
    /**
     * To be used only if the calling component is a UserModal
     */
    const [state, _setState] = useContext(AskUserModalContext);
    return state;
}

export function useUserModal() {
    /**
     * Must be declared in a context where the parent implements the Provider Component
     * 
     * Usage:
     * callAdd - call the Add User Modal
     * callEdit - Edits the particular user
     * @param - Account
     * @property - _id
     * @property - ccsaID
     * @property - stdName
     * @property - course
     * @property - rfidTag
     */
    const [state, _setState] = useContext(AskUserModalContext);
    const setState = SetStateWrapper(_setState);
    const callAdd = useCallback(() => {
        setState({
            mode: "Add",
        });
    }, [_setState]);

    const callEdit = useCallback(
        (Account: Record<string, string>) => {
            setState({
                mode: "Edit",
                Account,
            });
        },
        [_setState]
    );

    return {
        callAdd, callEdit
    }
}
