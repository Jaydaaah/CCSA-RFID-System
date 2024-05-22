"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { useAccountManager } from "./AccountManagerContext";

// Created Context
export interface PageInfo {
    itemPerPage: number;
    totalItem: number;
    curPage: number;
}

const CurPageContext = createContext<
    [number, Dispatch<SetStateAction<number>> | undefined]
>([0, undefined]);
const ItemsPerPageContext = createContext<
    [number, Dispatch<SetStateAction<number>> | undefined]
>([0, undefined]);
const TotalPageContext = createContext<number>(0);

interface Props {
    initial_page?: number;
    itemPerPage: number;
    children?: ReactNode;
}

function CalculateTotalPage(totalItem: number, itemPerPage: number) {
    return Math.max(Math.ceil(totalItem / itemPerPage), 1);
}

export function PageProvider({ children, initial_page, itemPerPage }: Props) {
    const { accounts } = useAccountManager();

    const [curPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemPerPage);
    const [totalPage, setTotalPage] = useState(
        CalculateTotalPage(accounts.length, itemPerPage)
    );

    useEffect(() => {
        setTotalPage(CalculateTotalPage(accounts.length, itemsPerPage));
    }, [accounts, itemsPerPage]);

    return (
        <CurPageContext.Provider value={[curPage, setCurrentPage]}>
            <ItemsPerPageContext.Provider
                value={[itemsPerPage, setItemsPerPage]}
            >
                <TotalPageContext.Provider value={totalPage}>
                    {children}
                </TotalPageContext.Provider>
            </ItemsPerPageContext.Provider>
        </CurPageContext.Provider>
    );
}

export function usePage() {
    const [current, _setCurPageInfo] = useContext(CurPageContext);
    const [itemsPerPage, _setItemsPerPage] = useContext(ItemsPerPageContext);
    const totalPage = useContext(TotalPageContext);

    const setCurrentPage = useCallback(
        (page_num: number) => {
            if (_setCurPageInfo) {
                _setCurPageInfo(page_num);
            }
        },
        [_setCurPageInfo]
    );

    const setItemsPerPage = useCallback(
        (itemsPerPage: number) => {
            if (_setItemsPerPage) {
                _setItemsPerPage(itemsPerPage);
            }
        },
        [_setItemsPerPage]
    );

    return {
        current,
        totalPage,
        itemsPerPage,
        setCurrentPage,
        setItemsPerPage,
    };
}
