"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import schoolConfig from "../../../../../School-config.json";

// Icon
import { GiDiploma } from "react-icons/gi";

interface Props {
    value?: string;
}


export default function UserModalSelectcourse({value}: Props) {
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
            label="Course"
            placeholder="Select Course"
            variant="bordered"
            onSelectionChange={onSelectionChangeHandler}
            name="course"
            selectionMode="single"
            selectedKeys={[select]}
            isInvalid={!schoolConfig.Courses.includes(select)}
            required
        >
            {schoolConfig.Courses.map((courseitem) => (
                <SelectItem key={courseitem} value={courseitem}>
                    {courseitem}
                </SelectItem>
            ))}
        </Select>
    );
}
