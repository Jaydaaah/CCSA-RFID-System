import { Account, createAccount, getAccountByID, updateAccount } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const Log = Logger("UpdateControlNew");

export default async function UpdateControlNew(req: Request, res: Response) {
    PrintFetch("PUT");
    const _id: string = req.body["_id"];

    const update: Record<string, string> = req.body["update"];

    if (!update) {
        const msg = "Please provide the update property inside your request";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }
    
    Log("received update");

    if (update.imageBuffer) {
        Log("Please don't include imageBuffer", "Red");
        return res.sendStatus(403).end();
    }

    const acc = await updateAccount(_id, update);
    Log(`Account Retrieved. ID: ${acc._id}`);

    if (acc) {
        acc.save();
        Log("Account updated Successfully", "Green")
        return res.sendStatus(202).end();
    } else {
        const msg = `Account ID: ${_id} not found`;
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }
}
