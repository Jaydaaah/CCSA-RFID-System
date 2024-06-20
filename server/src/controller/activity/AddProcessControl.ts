import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";
import { AddOpenedProcess } from "../../db/Attendance";

const Log = Logger("AddProcessControl");

export default async function AddProcessControl(req: Request, res: Response) {
    PrintFetch("PUT");
    const attendance_id: string = req.params["attendance_id"];
    const opened_process: string = req.body["opened_process"];

    if (!attendance_id) {
        const msg = "Please provide attendance_id in the parameters";
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }

    if (!opened_process) {
        const msg = "Please provide opened_process in the body";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }

    Log(`Updating opened process with attendance_id: ${attendance_id}`);
    const response = await AddOpenedProcess(attendance_id, opened_process);
    if (response) {
        Log(`Update Successful. attendance_id (${attendance_id}) sent`, "Yellow");
    } else {
        Log(`Update unsuccessfull for some reason. attendance_id: ${attendance_id}`, "Red");
    }
    return res
        .sendStatus(200)
        .end();
}
