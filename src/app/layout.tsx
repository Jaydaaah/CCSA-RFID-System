import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.tw.css";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/system";
import { Providers } from "./Provider";
import { Toaster } from "react-hot-toast";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CCSA RFID Login System",
    description: "School Project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className + " h-[100vh]"}>
                <Providers className="flex flex-col h-full light text-foreground bg-background">
                    {children}
                    <Toaster position="bottom-right" reverseOrder={false} />
                </Providers>
            </body>
        </html>
    );
}
