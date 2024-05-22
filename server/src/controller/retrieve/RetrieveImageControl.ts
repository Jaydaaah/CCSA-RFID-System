import { getAccountImage } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";

const Log = Logger("UpdateControlNew");

export default async function RetrieveImageControl(req: Request, res: Response) {
    PrintFetch("GET");
    const _id = req.params["_id"];

    if (!_id) {
        const msg = "Please provide mongodb ID";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }

    Log(`Retrieving Image with _id: ${_id}`);
    const retrieve = await getAccountImage(_id);
    if (retrieve) {
        const retrieve_img = retrieve.imageBuffer;
        if (retrieve_img) {
            Log("Image sent...", "Green");
            res.set('Content-Type', "image/jpeg")
            return res.status(200).send(retrieve_img).end();
        } else {
            const msg = "Account doesn't have image";
            Log(msg, "Red");
            return res.status(404).send(msg).end();
        }
    } else {
        const msg = "Error while retrieving Account with image";
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }
}