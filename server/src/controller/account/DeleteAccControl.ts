import { mongo } from "mongoose";
import {
    Account,
    accountCount,
    createAccount,
    deleteAccount,
} from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const log = Logger("DeleteAccControl");

export default async function DeleteAccControl(req: Request, res: Response) {
    PrintFetch("DELETE");
    // Checking required properties
    const _id = req.body["_id"];
    if (!_id) {
        const msg = "Provide an _id to delete with";
        log(msg, "Red")
        return res.status(400).send(msg).end();
    }

    const item = await deleteAccount(_id);
    if (item) {
        log(`Account Deleted: id: ${_id} name: ${item.stdName}`, "Yellow", {underscore: [_id, item.stdName]});
        return res.sendStatus(202).end();
    }

    log(`Account to be deleted not found but Okay`, "Yellow", {underscore: ["not found"]});
    return res.sendStatus(204).end();
}
