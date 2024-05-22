import { getAccountByID, getAccounts } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const Log = Logger("UpdateControlNew");

export default async function RetrieveControl(req: Request, res: Response) {
    PrintFetch("GET");
    const _id = req.params["_id"];

    if (!_id) {
        const msg = "Please provide _id";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }
    Log(`Retrieving Accounts using _id: ${_id}`);
    const {ccsaID, stdName, course} = await getAccountByID(_id);
    if (ccsaID && stdName && course) {
        Log(`Account Information send. Properties included: ccsaID, stdName, course`, "Green", {bright: ["ccsaID", "stdName", "course"]})
        return res.status(200).json({
            ccsaID,
            stdName,
            course
        }).end();
    }
    const msg = `Error Retrieving. _id: ${_id}`;
    Log(msg, "Red");
    return res.status(403).send();
}