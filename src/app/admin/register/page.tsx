import TableData from "./(components)/TableData";

// Providers
import StackProvider from "./provider";

// Fetch function
import { FetchAllAccountsPre } from "@/lib/api_calls";

export default async function RegisterPage() {
    const itemLimit = 10;
    const AccList = await FetchAllAccountsPre();

    return (
        <StackProvider
            initial_acclist={AccList.reverse()}
            initial_page={1}
            itemPerPage={itemLimit}
        >
            <TableData className="max-w-[64rem] self-center px-6" />
        </StackProvider>
    );
}
