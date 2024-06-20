import { mongo } from "mongoose";
import { Account, createAccount } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const Log = Logger("CreateAccControl");

export default async function CreateAccControl(req: Request, res: Response) {
    PrintFetch("POST");
    // Checking required properties
    const {access, ccsaID, stdName, course, rfidTag}: Account = req.body;
    
    if (!ccsaID || !stdName || !course || !rfidTag) {
        const msg = "When creating account, make sure to send request with the following properties ccsaID, stdName, course, rfidTag";
        Log(msg, "Red", {bright: ["ccsaID", "stdName", "course", "rfidTag"]});
        return res.status(400).send(msg).end();
    }

    // Creating New Account on the Database 
    const new_acc: Account = {
        access,
        ccsaID,
        stdName,
        course,
        rfidTag
    }
    try {
        const {_id} = await createAccount(new_acc).save();
        Log("Account Created", "Green");
        return res.status(201).json({
            _id
        }).end();
    } catch (error) {
        Log("Encountered an Error", "Magenta");
        if (error instanceof mongo.MongoServerError) {
            console.error(error.errmsg);
            return res.status(403).send(`rfid tag has duplicate value (${rfidTag})`).end();
        }
        throw error;
    }
}
