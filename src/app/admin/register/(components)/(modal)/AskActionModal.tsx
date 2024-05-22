"use client";
import { Button, CircularProgress, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { usePendingModal } from "./(provider)/PendingModalProvider";
import { asAskActionModal } from "./(provider)/AskActionModalProvider";
import { useCallback } from "react";

export default function AskActionModal() {
    const {askAction, giveAnswer} = asAskActionModal();

    const replyGen = useCallback((reply: boolean) => {
        return () => {
            if (askAction.isOpen) {
                giveAnswer(reply);
            }
        }
    }, [askAction])

    return (
        <Modal
            size="sm"
            isOpen={askAction.isOpen}
            placement="top-center"
            closeButton={<></>}
        >
            <ModalContent>
                <ModalHeader>
                    {askAction.title}
                </ModalHeader>
                <ModalBody className="flex flex-col justify-center items-center">
                    <p>{askAction.description}</p>
                    <div className="flex self-end gap-3 mb-3">
                        <Button variant="flat" color={askAction.color} onClick={replyGen(true)}>Yes</Button>
                        <Button variant="flat" onClick={replyGen(false)}>No</Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
