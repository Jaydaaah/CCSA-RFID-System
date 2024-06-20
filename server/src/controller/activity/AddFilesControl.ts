import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";
import { AddCreatedFiles } from "../../db/Attendance";

const Log = Logger("AddFilesControl");

export default async function AddFilesControl(req: Request, res: Response) {
    PrintFetch("PUT");
    const attendance_id: string = req.params["attendance_id"];
    const created_file: string = req.body["created_file"];

    if (!attendance_id) {
        const msg = "Please provide attendance_id in the parameters";
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }

    if (!created_file) {
        const msg = "Please provide created_file in the body";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }

    Log(`Updating created files with attendance_id: ${attendance_id}`);
    const response = await AddCreatedFiles(attendance_id, created_file);
    if (response) {
        Log(`Update Successful. attendance_id (${attendance_id}) sent`, "Yellow");
    } else {
        Log(`Update unsuccessfull for some reason. attendance_id: ${attendance_id}`, "Red");
    }
    return res
        .sendStatus(200)
        .end();
}
