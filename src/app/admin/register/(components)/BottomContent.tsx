"use client";
import { Pagination } from "@nextui-org/react";

// Hooks
import { usePage } from "@/Hooks/PageContext";

export default function BottomContent() {
    const { current, totalPage, setCurrentPage } = usePage();

    return (
        <div className="flex justify-center mx-5">
            <Pagination
                showControls
                total={totalPage}
                page={current}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
            />
        </div>
    );
}
