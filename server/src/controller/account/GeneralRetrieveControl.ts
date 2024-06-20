import { Account, getAccounts, getAccountsRange } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const log = Logger("GeneralRetrieveControl");

export default async function GeneralRetrieveControl(
    req: Request,
    res: Response
) {
    PrintFetch("GET");
    const page: number = req.body["page"];
    const count: number = req.body["count"];
    if (page && count) {
        log(`Has page: ${page} and count: ${count}`);
        if (count) {
            const retrieve: Account[] = await getAccountsRange(page, count);
            log(
                `List of accounts sent. count: ${retrieve.length}, stored in property: retrieve`, "Green"
            );
            return res.status(200).json(retrieve).end();
        }
        const msg = "please include count: int";
        log(msg, "Red");
        return res.status(400).send(msg).end();
    } else {
        log(`retrieving all accounts since page and count is not provided`)
        const retrieve = await getAccounts();
        log(`List of accounts sent. count: ${retrieve.length}, stored in property: retrieve`, "Green")
        return res
            .status(200)
            .json(retrieve)
            .end();
    }
}
