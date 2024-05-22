"use client";

import Image from "next/image";
import RFIDSvg from "@/assets/rfid-icon.svg";
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { defineNewAccount } from "../(contexts)/Account";
import ToastAccNotif from "./ToastNotif";
import SubmitRFIDLogin from "@/action/SubmitRFIDLogin";
import Transition from "./Transition";
import { fetchImage } from "@/app/api/retrieve-image/fetch";

const RFIDPattern = /\b\d{10}\b/g;
const validation = /^[0-9\b]+$/;

export default function RFIDLogger() {
    const timeout_ms = 1000;
    const [rfidtext, setRfidtext] = useState("");
    const [accepting, setAccepting] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            divRef.current?.focus();
            setAccepting(true);
        }, 1000);
    }, []);


    useEffect(() => {
        if (RFIDPattern.test(rfidtext)) {
            SubmitRFIDLogin(rfidtext)
                .then((response) => {
                    console.log("received response");
                    const json: {
                        _id: string;
                        data:
                            | {
                                  ccsaID: string;
                                  stdName: string;
                                  course: string;
                              }
                            | {
                                  ccsaID?: undefined;
                                  stdName?: undefined;
                                  course?: undefined;
                              };
                    } = JSON.parse(response);
                    return json;
                })
                .then(async ({ _id, data }) => {
                    if (data?.ccsaID && data?.stdName && data?.course) {
                        setAccepting(false);
                        const image = await fetchImage(_id);
                        const acc = defineNewAccount(
                            data.ccsaID,
                            data.stdName,
                            data.course,
                            rfidtext,
                            image
                        );
                        ToastAccNotif(acc);
                        setRfidtext("");
                        setAccepting(true);
                    }
                });
        }

        const timeout = setTimeout(() => {
            if (rfidtext) {
                setRfidtext("");
            }
        }, timeout_ms);

        return () => {
            clearTimeout(timeout);
        };
    }, [rfidtext]);

    const onKeyInput = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (accepting && validation.test(event.key)) {
            setRfidtext((prev) => prev + event.key);
        }
    }, [accepting]);

    return (
        <>
            <Transition className="self-center">
                <div
                    ref={divRef}
                    className={
                        "bg-white flex w-[15rem] h-[18rem] p-8 overflow-clip rounded-lg shadow-sm shadow-gray-300 " +
                        "focus:shadow-lg focus:shadow-gray-300 focus:outline-none focus:-translate-y-1 transition-all " +
                        (rfidtext ? "scale-110" : "")
                    }
                    tabIndex={0}
                    onKeyUp={onKeyInput}
                    onBlur={(event) => {
                        setTimeout(() => {
                            event.target.focus();
                        }, 10000)
                    }}
                >
                    <Image  
                        src={RFIDSvg}
                        alt=""
                        className="h-[18rem]"
                        priority
                    ></Image>
                </div>
            </Transition>

            <div className="self-center h-[8rem] flex flex-col-reverse">
                <CircularProgress
                    className={
                        "transition-all ease-soft-spring duration-500 " +
                        (rfidtext ? "opacity-100" : "opacity-0 -translate-y-24")
                    }
                    size="lg"
                    aria-label="Loading..."
                ></CircularProgress>
            </div>
        </>
    );
}
