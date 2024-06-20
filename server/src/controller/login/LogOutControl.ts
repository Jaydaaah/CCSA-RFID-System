import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";
import { AttendanceLogOut } from "../../db/Attendance";

const Log = Logger("LogOutControl");

export default async function LogOutControl(req: Request, res: Response) {
    PrintFetch("POST");
    const attendance_id: string = req.params["attendance_id"];

    if (!attendance_id) {
        const msg = "Please provide attendance_id in the parameters";
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }

    Log(`Logging out account using attendance_id: ${attendance_id}`);
    const response = await AttendanceLogOut(attendance_id);
    if (response) {
        Log(`Logout Successful. _id (${attendance_id}) sent`, "Yellow");
    } else {
        Log(`Logout unsuccessfull for some reason. _id: ${attendance_id}`, "Red");
    }
    return res
        .sendStatus(200)
        .end();
}
