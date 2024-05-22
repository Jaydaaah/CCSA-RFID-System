"use client";
import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import CustomFetchUser from "./CustomFetchUser";

import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAccountManager } from "../(contexts)/AccountManagerContext";
import { useCallback, useId, useMemo } from "react";
import { rfidTagValidation } from "@/lib/Validation";
import { useUserModal } from "./(modal)/(provider)/UserModalProvider";
import { usePage } from "../(contexts)/PageContext";
import BottomContent from "./BottomContent";
import TopContent from "./TopContent";
import { useAskActionModal } from "./(modal)/(provider)/AskActionModalProvider";

interface Props {
    className?: string;
}

export default function TableData({ className }: Props) {
    const { accounts, deleteAccount } = useAccountManager();
    const { callEdit } = useUserModal();
    const { current, itemsPerPage } = usePage();
    const {AskConfirmation} = useAskActionModal();

    const items = useMemo((): Record<string, string>[] => {
        return accounts.slice(
            itemsPerPage * (current - 1),
            itemsPerPage * current
        );
    }, [current, itemsPerPage, accounts]);

    const deleteHandler = useCallback((_id: string) => {
        return async function () {
            AskConfirmation(() => {
                deleteAccount(_id);
            }, "Deleting", "Are you sure you want to delete this account?", "danger");
        };
    }, []);

    const editHandler = useCallback((account: Record<string, string>) => {
        return function () {
            callEdit(account);
        };
    }, []);

    return (
        <Table
            layout="fixed"
            aria-label="Example static collection table"
            className={className + " " + "max-h-[calc(100vh-5rem)]"}
            topContent={<TopContent/>}
            bottomContent={<BottomContent />}
            fullWidth
        >
            <TableHeader>
                <TableColumn width="90">Student Name</TableColumn>
                <TableColumn className="text-center" width="30">Course</TableColumn>
                <TableColumn className="text-center" width="30">
                    RFID Tag
                </TableColumn>
                <TableColumn width="50">Action</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"No rows to display."}>
                {({ _id, stdName, ccsaID, course, rfidTag }) => {
                    return (
                        <TableRow key={_id ?? useId()}>
                            <TableCell className="">
                                <CustomFetchUser
                                    account={{ _id, stdName, ccsaID }}
                                />
                            </TableCell>
                            <TableCell className="text-center">{course ?? "."}</TableCell>
                            <TableCell className="text-center">
                                <Chip
                                    className="capitalize"
                                    color={
                                        rfidTagValidation(rfidTag)
                                            ? "danger"
                                            : "success"
                                    }
                                    variant="flat"
                                    size="sm"
                                >
                                    {rfidTagValidation(rfidTag)
                                        ? "Not Secure"
                                        : "Secure"}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-10">
                                    <Tooltip content="Edit">
                                        <span
                                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                            onClick={editHandler({
                                                _id,
                                                stdName,
                                                ccsaID,
                                                course,
                                                rfidTag,
                                            })}
                                        >
                                            <FaEdit className="" />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete">
                                        <span
                                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                            onClick={deleteHandler(_id)}
                                        >
                                            <FaRegTrashAlt color="red" />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                }}
            </TableBody>
        </Table>
    );
}
