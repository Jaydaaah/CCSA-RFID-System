"use client";

import { rfidTagValidation, rfidTagValidationColor, rfidTagValidationError } from "@/lib/Validation";
import { Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

// Icons
import { RiRfidFill } from "react-icons/ri";

// Hooks
import { useAccountManager } from "../../../(contexts)/AccountManagerContext";

interface Props {
    _id?: string
    value?: string;
}


let rfidHasDuplicate = false;

export default function UserModalFieldrfidTag({_id, value}: Props) {
    const [rfidTag, setRfidTag] = useState('');
    const {checkrfidDuplicates} = useAccountManager();

    useEffect(() => {
        if (value) {
            setRfidTag(value);
        }
    }, [value]);

    const OnTextChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRfidTag(event.target.value);
    }, []);

    useEffect(() => {
        rfidHasDuplicate = checkrfidDuplicates(rfidTag, _id);
    }, [rfidTag, _id])
    
    return (
        <Input
            endContent={
                <RiRfidFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="RFID Tag"
            type="password"
            variant="bordered"
            isInvalid={rfidTagValidation(rfidTag) || rfidHasDuplicate}
            color={rfidHasDuplicate ? "danger" : rfidTagValidationColor(rfidTag)}
            errorMessage={rfidTagValidationError(rfidTag)}
            onChange={OnTextChangeHandler}
            value={rfidTag}
            name="rfidTag"
            required
        />
    );
}
