"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useId, useState } from "react";
import schoolConfig from "../../../../../School-config.json";

// Icon
import { GiDiploma } from "react-icons/gi";

interface Props {
    value?: string;
}


export default function UserModalSelectAccess({value}: Props) {
    const [select, setSelect] = useState('');

    useEffect(() => {
        if (value) {
            setSelect(value);
        }
    }, [value]);

    const onSelectionChangeHandler = useCallback(({
        currentKey,
    }: { currentKey: string } | any) => {
        if (currentKey) {
            setSelect(currentKey)
        }
    }, [setSelect]);

    return (
        <Select
            startContent={
                <GiDiploma className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Status"
            placeholder="Account Status"
            variant="bordered"
            onSelectionChange={onSelectionChangeHandler}
            name="access"
            color={select == "Enabled" ? "success" : "warning"}
            selectionMode="single"
            selectedKeys={[select]}
            required
        >
            <SelectItem key="Enabled" value="Enabled">
                Enabled
            </SelectItem>
            <SelectItem key="Disabled" value="Disabled">
                Disabled
            </SelectItem>
        </Select>
    );
}
