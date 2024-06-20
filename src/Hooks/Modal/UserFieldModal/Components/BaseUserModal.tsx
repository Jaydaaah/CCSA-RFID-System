"use client";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { ReactNode, useEffect, useRef } from "react";

// Context

// Components
import UserModalFieldstdName from "./fields/UserModalFieldstdName";
import UserModalFieldccsaID from "./fields/UserModalFieldccsaID";
import UserModalSelectcourse from "./fields/UserModalSelectcourse";
import UserModalFieldrfidTag from "./fields/UserModalFieldrfidTag";
import UserModalAvatarUpload from "./fields/UserModalAvatarUpload";
import { asUserModal } from "../UserModalHook";
import UserModalSelectAccess from "./fields/UserModalSelectAccess";

interface Props {
    account?: Record<string, string>;
    modalHeader: ReactNode;

    mode: "Add" | "Edit" | "Idle";
    formAction: (formData: FormData) => void;
}

export default function BaseUserModal({
    mode,
    account,
    modalHeader,
    formAction,
}: Props) {
    /**
     * This is the Base Component for UserModal
     * Only import if creating a modified UserModal
     */
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    // HTML Reference
    const formRef = useRef<HTMLFormElement>(null);

    const state = asUserModal();

    useEffect(() => {
        if (mode == state.mode) {
            onOpen();
        }
    }, [state]);

    useEffect(() => {
        if (!isOpen) {
            formRef.current?.reset();
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                size="xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <form ref={formRef} action={formAction}>
                        <ModalHeader>{modalHeader}</ModalHeader>
                        <ModalBody className="flex flex-row">
                            <div className="flex flex-col px-1 justify-start items-center gap-4">
                                <UserModalAvatarUpload _id={account?._id} />
                            </div>

                            <div className="flex-grow flex flex-col gap-4">
                                <UserModalFieldstdName
                                    value={account?.stdName}
                                />
                                <div className="flex gap-2 justify-start">
                                    <UserModalFieldccsaID
                                        value={account?.ccsaID}
                                    />
                                    <UserModalSelectcourse
                                        value={account?.course}
                                    />
                                </div>
                                
                                <div className="flex gap-2 justify-start">
                                    <UserModalFieldrfidTag
                                        _id={account?._id}
                                        value={account?.rfidTag}
                                    />
                                    <UserModalSelectAccess
                                        value={account?.access}
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    onClose();
                                    formRef.current?.requestSubmit();
                                }}
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
