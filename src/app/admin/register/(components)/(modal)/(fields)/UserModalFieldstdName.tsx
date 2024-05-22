"use client";

import {
    stdNameValidation,
    stdNameValidationColor,
    stdNameValidationError,
} from "@/lib/Validation";
import { Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

// Icons
import { IoPersonSharp } from "react-icons/io5";

interface Props {
    value?: string;
}


export default function UserModalFieldstdName({value}: Props) {
    const [stdName, setStdName] = useState("");

    useEffect(() => {
        if (value) {
            setStdName(value);
        }
    }, [value]);

    const OnTextChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setStdName(event.target.value);
    }, []);

    return (
        <Input
            autoFocus
            endContent={
                <IoPersonSharp className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Student name"
            placeholder="format: Last Name, First Name M."
            variant="bordered"
            isInvalid={stdNameValidation(stdName)}
            color={stdNameValidationColor(stdName)}
            errorMessage={stdNameValidationError(stdName)}
            onChange={OnTextChangeHandler}
            value={stdName}
            name="stdName"
            required
        />
    );
}
