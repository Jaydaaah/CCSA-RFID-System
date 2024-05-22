"use client";

import { Link } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NavigationLinks = [
    {
        Label: "Overview",
        href: "/admin",
    },
    {
        Label: "Manage Account",
        href: "/admin/register",
    },
];

export function SideBar() {
    const asPath = usePathname();
    const router = useRouter();

    useEffect(() => {
        NavigationLinks.map(({ href }) => {
            if (!(asPath == href)) {
                router.prefetch(href);
            }
        });
    }, []);

    return (
        <div className="max-w-64 w-64 min-w-52 h-full flex flex-col border-x-1 p-4 gap-1">
            {NavigationLinks.map(({ Label, href }, index) => (
                <Link key={`${Label}-${index}`} isBlock href={href} color="foreground" size="md" className={"rounded-xl px-4 " + ((asPath == href) ? "bg-gray-500/10" : "")}>
                    {Label}
                </Link>
            ))}
        </div>
    );
}
