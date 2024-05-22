import { accountCount } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const log = Logger("GetCountControl");

export default async function GetCountControl(req: Request, res: Response) {
    PrintFetch("GET");
    const count = await accountCount();
    log(`count: ${count}`);
    return res
        .json({
            count,
        })
        .end();
}
