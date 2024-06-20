"use client";

import { MyContextPairDefaultValue, MyContextPairType, SetStateWrapper } from "@/lib/extra_function";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

import schoolConfig from "../School-config.json";

/** Use as Filter
 * Support for Search filter
 * Support for Course filter
 */

interface Filter {
    search?: string
    except_courses?: string[]
}

const DefaultFilter: Filter = {search: "", except_courses: []};

const FilterContext = createContext<MyContextPairType<Filter>>(MyContextPairDefaultValue(DefaultFilter));

export function FilterProvider({children}: {children: ReactNode}) {
    const [filter, setter] = useState(DefaultFilter);

    return <FilterContext.Provider value={[filter, setter]}>
            {children}
    </FilterContext.Provider>
}

export function useFilter() {
    const [filter, _setFilter] = useContext(FilterContext);
    const setFilter = SetStateWrapper(_setFilter);

    const filterize = useCallback((accounts: Record<string, string>[]) => {
        return accounts.filter((value) => {
            if (filter.except_courses) {
                for (const course of filter.except_courses) {
                    if (value.course && value.course == course) {
                        return false
                    }
                }
            }
            if (filter.search) {
                for (const prop of schoolConfig.ProgramProperties) {
                    if (value[prop] && value[prop].toLowerCase().includes(filter.search)) {
                        return true
                    }
                }
                return false;
            }
            return true;
        });
    }, [filter]);

    const invertArray = useCallback((base_array: string[], tobe_invert: string[]) => {
        return base_array.filter((value) => {
            return !(tobe_invert.includes(value))
        })
    }, []);

    const clearFilter = useCallback(() => {
        setFilter(DefaultFilter);
    }, [_setFilter]);

    return {
        filter,
        filterize,
        invertArray,
        setFilter,
        clearFilter
    }
}