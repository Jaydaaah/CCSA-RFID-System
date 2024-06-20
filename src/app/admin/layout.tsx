import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { SideBar } from "./(components)/SideBar";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CCSA RFID Login System",
    description: "School Project",
};

export default function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: {
        tag: string;
        item: string;
    };
}>) {
    return (
        <>
            <header className="">
                <Navbar isBlurred isBordered maxWidth="2xl" position="sticky">
                    <NavbarBrand>
                        <h1 className="font-bold text-3xl flex-grow">
                            <Link href="/">CCSA RFID</Link>
                        </h1>
                    </NavbarBrand>
                </Navbar>
            </header>
            <main className="flex-grow mx-auto w-full max-w-7xl px-6 flex">
                <SideBar />
                <div className="h-full flex flex-col pt-2">
                    {children}
                </div>
            </main>
        </>
    );
}
