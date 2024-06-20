import { getAccByRFID } from "../../db/Accounts";
import { Request, Response } from "express";
import { Logger, PrintFetch } from "../../debug/log";
import { AttendanceLogIn } from "../../db/Attendance";

const Log = Logger("LoginControl");

export default async function LoginControl(req: Request, res: Response) {
    PrintFetch("POST");
    const rfidTag: string = req.params["rfidTag"];
    const computer_name: string = req.body['computer_name'];

    if (!rfidTag) {
        const msg = "Please provide rfidTag in the parameters";
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }

    if (!computer_name) {
        const msg = "Please provide computer_name in the body";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }

    Log(`Logging account using rfidTag: ${rfidTag}`);
    const acc = await getAccByRFID(rfidTag);
    if (!acc) {
        const msg = "RFID doesn't exist";
        Log(msg, "Red");
        return res.status(400).send(msg).end();
    }
    const { _id, access } = acc;
    if (access != "Enabled") {
        const msg = `Account is Disabled, _id: ${_id}`;
        Log(msg, "Red");
        return res.status(403).send(msg).end();
    }
    const response = await AttendanceLogIn(_id, computer_name);
    if (response) {
        Log(`Login Successful. _id (${_id}) sent`, "Green");
    } else {
        Log(`Login unsuccessfull for some reason. _id: ${_id}`, "Red");
    }
    return res
        .status(200)
        .json({
            acc_id: _id,
            attendance_id: response._id
        })
        .end();
}
