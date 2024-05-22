import { Account, getAccByRFID, getAccountByID } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const Log = Logger("LoginControl");

export default async function LoginControl(req: Request, res: Response) {
    PrintFetch("GET");
    const rfidTag: string = req.params["rfidTag"];

    if (!rfidTag) {
        const msg = "Please provide rfidTag in the parameters";
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }

    Log(`Logging account using rfidTag: ${rfidTag}`);
    const acc = await getAccByRFID(rfidTag);
    if (!acc) {
        const msg = "RFID doesn't exist";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }
    const { _id } = acc;
    Log(`Login Successful. _id (${_id}) sent`, "Green");
    return res
        .status(200)
        .json({
            _id,
        })
        .end();
}
