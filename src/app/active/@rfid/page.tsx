
import RFIDLogger from "../(components)/RFIDLogger";
import { Suspense } from "react";
import { AccountProvider } from "../(contexts)/Account";
import ImageDP from "@/assets/blank-dp.png"

export default function RFIDPage() {
    return (
        <>
        <AccountProvider default_src={ImageDP}>
            <Suspense
            >
                <RFIDLogger />
            </Suspense>
        </AccountProvider>
        </>
    );
}
