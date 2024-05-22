"use client";

import { ccsaIDValidation, ccsaIDValidationColor, ccsaIDValidationError } from "@/lib/Validation";
import { Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

// Icons
import { GoHash } from "react-icons/go";

interface Props {
    value?: string;
}

export default function UserModalFieldccsaID({value}: Props) {
    const [ccsaID, setccsaID] = useState('');

    useEffect(() => {
        if (value) {
            setccsaID(value);
        }
    }, [value]);

    const OnTextChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setccsaID(event.target.value.toUpperCase());
    }, []);

    return (
        <Input
            endContent={
                <GoHash className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="CCSA ID"
            variant="bordered"
            isInvalid={ccsaIDValidation(ccsaID)}
            color={ccsaIDValidationColor(ccsaID)}
            errorMessage={ccsaIDValidationError(ccsaID)}
            onChange={OnTextChangeHandler}
            value={ccsaID}
            name="ccsaID"
            required
        />
    );
}
