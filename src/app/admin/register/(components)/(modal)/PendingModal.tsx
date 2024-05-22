"use client";
import { CircularProgress, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { usePendingModal } from "./(provider)/PendingModalProvider";

export default function PendingModal() {
    const {isPending} = usePendingModal();

    return (
        <Modal
            size="sm"
            isOpen={isPending.isOpen}
            placement="top-center"
            closeButton={<></>}
        >
            <ModalContent>
                <ModalBody className="flex justify-center items-center">
                    <CircularProgress className="my-20" label={isPending.message}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
