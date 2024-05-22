"use client";
/**
 * Account Hook
 *
 * use {} deconstructor
 *
 * usage: allowing LoginBox and DisplayImage client component to share the active account
 * that has been login
 *
 * return 2 objects:
 * - Account
 * - setAccount
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { ImageProvider, UseImage } from "./Image";
import { StaticImageData } from "next/image";

export interface Account {
    ccsaID: string;
    stdName: string;
    course: string;
    rfidTag: string;
    imageURL?: string;
}

export function defineNewAccount(
    ccsaID: string,
    stdName: string,
    course: string,
    rfidTag: string,
    imageURL?: string
) {
    const new_acc: Account = {
        ccsaID,
        stdName,
        course,
        rfidTag,
        imageURL,
    };
    return new_acc;
}

const emptyAccount = defineNewAccount("", "", "", "", "");

const AccountContext = createContext(emptyAccount);
const SetAccountContext = createContext<
    React.Dispatch<React.SetStateAction<Account>> | undefined
>(undefined);

interface props {
    children?: React.ReactNode;
    default_src: StaticImageData;
}

export function AccountProvider({ children, default_src }: props) {
    const [account, setAccount] = useState(emptyAccount);

    return (
        <ImageProvider default_src={default_src}>
            <AccountContext.Provider value={account}>
                <SetAccountContext.Provider value={setAccount}>
                    {children}
                </SetAccountContext.Provider>
            </AccountContext.Provider>
        </ImageProvider>
    );
}

export function useAccount() {
    const timeout_ms = 1000;
    const account = useContext(AccountContext);
    const _setAccount = useContext(SetAccountContext);

    const { setImageSrc, setImageDefault } = UseImage();

    useEffect(() => {
        if (account != emptyAccount && _setAccount) {
            const interval = setTimeout(() => {
                _setAccount(emptyAccount);
                setImageDefault();
            }, timeout_ms);
            return () => {
                clearTimeout(interval);
            };
        }
    }, [account]);

    const setAccount = useCallback(
        (account: Account) => {
            if (_setAccount && account != emptyAccount) {
                _setAccount(account);
                if (account.imageURL) setImageSrc(account.imageURL);
                else setImageDefault();
            }
        },
        [_setAccount]
    );

    return {
        account,
        setAccount,
    };
}
