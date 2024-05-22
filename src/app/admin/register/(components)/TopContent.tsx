"use client";

import {
    Button,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { ChangeEvent, useCallback, useEffect, useId, useState } from "react";

import schoolConfig from "../../../../School-config.json";

// Custom Hooks
import { useAccountManager } from "../(contexts)/AccountManagerContext";
import { usePage } from "../(contexts)/PageContext";
import { useUserModal } from "./(modal)/(provider)/UserModalProvider";
import { useSetFilter } from "../(contexts)/FilterContext";

// Icons
import { IoSearch } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function TopContent() {
    const { accounts, reloadAccount } = useAccountManager();
    const { itemsPerPage, setCurrentPage, setItemsPerPage } = usePage();
    const { callAdd } = useUserModal();

    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<string[]>(schoolConfig.Courses);

    const onRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const onSearchTextChange = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            setSearch(target.value);
        },
        []
    );

    return (
        <div className="flex flex-col gap-4 pb-2">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<IoSearch />}
                    onChange={onSearchTextChange}
                />
                <div className="flex gap-3">
                    <Button onPress={reloadAccount} variant="flat">
                        Refresh
                    </Button>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button
                                endContent={
                                    <FaChevronDown className="text-small" />
                                }
                                variant="flat"
                            >
                                Course
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectionMode="multiple"
                            variant="flat"
                            selectedKeys={selectedCourse}
                        >
                            {schoolConfig.Courses.map((course) => (
                                    <DropdownItem key={course} className="capitalize">
                                        {course}
                                    </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        onPress={callAdd}
                        color="primary"
                        endContent={<FaPlus />}
                    >
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">
                    Total {accounts.length} users
                </span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                        value={itemsPerPage}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
