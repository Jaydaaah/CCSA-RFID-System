"use client";

import { MyContextPairDefaultValue, MyContextPairType, SetStateWrapper } from "@/lib/extra_function";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

import schoolConfig from "../../../../School-config.json";

interface Filter {
    search?: string
    except_courses?: string[]
}

const DefaultFilter: Filter = {};

const FilterContext = createContext<MyContextPairType<Filter>>(MyContextPairDefaultValue(DefaultFilter));


export function FilterProvider({children}: {children: ReactNode}) {
    const [filter, setter] = useState(DefaultFilter);

    return <FilterContext.Provider value={[filter, setter]}>
        {children}
    </FilterContext.Provider>
}

export function useFilter(accounts: Record<string, string>[]) {
    const [filter, _setFilter] = useContext(FilterContext);
    const setFilter = SetStateWrapper(_setFilter);

    const filtered = useMemo(() => {
        return accounts.filter((value, index, array) => {
            if (value.course && filter.except_courses) {
                for (const course of filter.except_courses) {
                    if (course == value.course) {
                        return false;
                    }
                }
            } else if (!filter.search) {
                return true;
            } else if (filter.search && value.stdName) {
                return value.stdName.toLowerCase().includes(filter.search.toLowerCase());
            }
        });
    }, [accounts, filter]);

    return {
        filtered,
        setFilter
    }
}

export function useSetFilter() {
    const [filter, _setFilter] = useContext(FilterContext);
    const setFilter = SetStateWrapper(_setFilter);

    return {
        filter,
        setFilter
    }
}