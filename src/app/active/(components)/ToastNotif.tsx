"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { Account } from "../(contexts)/Account";

export default function ToastAccNotif({
    ccsaID,
    stdName,
    course,
    imageURL,
}: Account) {
    const getTime = () => new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    return toast((t) => (
        <>
            <div className="justify-between flex">
                <div className="flex gap-5 overflow-visible">
                    <Badge
                        isOneChar
                        content={<CheckmarkIcon />}
                        color="success"
                        placement="bottom-right"
                    >
                        <Avatar
                            isBordered
                            radius="full"
                            className="w-20 h-20 text-large"
                            src={imageURL}
                        />
                    </Badge>

                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h3 className="text-medium font-semibold leading-none text-default-600">
                            {stdName}
                        </h3>
                        <h4 className="text-small leading-none text-default-600">
                            @{course}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                            - {ccsaID}
                        </h5>
                        <h6 className="text-small font-semibold tracking-tight text-green-700">
                            Time: {getTime()}
                        </h6>
                    </div>
                </div>
            </div>
        </>
    ));
}
