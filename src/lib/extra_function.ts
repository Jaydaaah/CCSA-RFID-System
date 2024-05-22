import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

export type MyContextPairType<type> = [type, Dispatch<SetStateAction<type>> | undefined];
export function MyContextPairDefaultValue<type>(value: type): MyContextPairType<type> {
    return [value, undefined]
}

export type MyContextPairTypeForOpti<type> = [type, ((action: type | ((pendingState: type) => type)) => void) | undefined];
export function MyContextPairTypeForOptiDefaultValue<type>(value: type): MyContextPairTypeForOpti<type> {
    return [value, undefined]
}

export function SetStateWrapper<type>(
    setState: Dispatch<SetStateAction<type>> | undefined
) {
    return (value: SetStateAction<type>) => {
        if (setState) {
            setState(value);
        }
    };
}

export function PendingStateWrapper<type>(
    pendingState: ((action: type | ((pendingState: type) => type)) => void) | undefined
) {
    return (action: type | ((pendingState: type) => type)) => {
        if (pendingState) {
            pendingState(action);
        }
    };
}