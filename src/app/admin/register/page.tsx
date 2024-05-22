import { FetchAllAccountsPre } from "@/lib/api_calls";
import TableData from "./(components)/TableData";
import { PageProvider } from "./(contexts)/PageContext";
import { AccountManagerProvider } from "./(contexts)/AccountManagerContext";
import { UserModalProvider } from "./(components)/(modal)/(provider)/UserModalProvider";
import { AskActionModalProvider } from "./(components)/(modal)/(provider)/AskActionModalProvider";

export default async function RegisterPage() {
    const itemLimit = 10;
    const AccList = await FetchAllAccountsPre();

    return (
        <AccountManagerProvider initial_acclist={AccList.reverse()}>
            <PageProvider initial_page={1} itemPerPage={itemLimit}>
                <UserModalProvider>
                    <AskActionModalProvider>
                        <TableData className="max-w-[64rem] self-center px-6" />
                    </AskActionModalProvider>
                </UserModalProvider>
            </PageProvider>
        </AccountManagerProvider>
    );
}
