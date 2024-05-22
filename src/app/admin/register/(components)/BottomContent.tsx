"use client";
import { Pagination } from "@nextui-org/react";
import { usePage } from "../(contexts)/PageContext";
import { useEffect, useState } from "react";

export default function BottomContent() {
    const { current, totalPage, itemsPerPage, setCurrentPage } = usePage();

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
