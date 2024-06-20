"use client";

import {
    Button,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Tooltip,
} from "@nextui-org/react";
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

// Custom Hooks
import { useAccountManager } from "@/Hooks/AccountManager";
import { usePage } from "@/Hooks/PageContext";
import { useUserModal } from "@/Hooks/Modal/UserFieldModal/UserModalHook";

// Icons
import { IoSearch } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

// School Config
import schoolConfig from "../../../../School-config.json";
import { useFilter } from "@/Hooks/Filter";

export default function TopContent() {
    const { accounts, reloadAccount } = useAccountManager();
    const { itemsPerPage, setCurrentPage, setItemsPerPage } = usePage();
    const { invertArray, setFilter } = useFilter();
    const { callAdd } = useUserModal();

    const [search, setSearch] = useState("");
    const [isWorking, setWorking] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<string[]>(
        schoolConfig.Courses
    );

    const inputSearchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isWorking) {
            setFilter({
                search: search.toLowerCase().trim(),
                except_courses: invertArray(
                    schoolConfig.Courses,
                    selectedCourse
                ),
            });
        }
    }, [search, selectedCourse, isWorking]);

    const onRowsPerPageChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setItemsPerPage(Number(event.target.value));
            setCurrentPage(1);
        },
        [setItemsPerPage, setCurrentPage]
    );

    const onSearchTextChange = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            setSearch(target.value);
        },
        [setSearch]
    );

    return (
        <div className="flex flex-col gap-4 pb-2">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    ref={inputSearchRef}
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search..."
                    startContent={<IoSearch />}
                    endContent={
                        <span
                            className="text-lg text-default-400 cursor-pointer hover:opacity-50"
                            onClick={() => {
                                setSearch("");
                                setWorking(false);
                            }}
                        >
                            <IoCloseOutline />
                        </span>
                    }
                    value={search}
                    onChange={onSearchTextChange}
                    onKeyUp={({ key }) => {
                        if (key === "Enter") {
                            setWorking(false);
                        } else if (key == "Escape") {
                            setSearch('');
                            setWorking(false);
                        } else {
                            setWorking(true);
                        }
                    }}
                    onBlur={() => {
                        setWorking(false);
                    }}
                    onFocus={() => {
                        setWorking(true);
                    }}
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
                            onSelectionChange={(keys: any) => {
                                setSelectedCourse(Array.from(keys.values()));
                            }}
                        >
                            {schoolConfig.Courses.map((course) => (
                                <DropdownItem
                                    key={course}
                                    className="capitalize"
                                >
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
