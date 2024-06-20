import { NextFunction, Request, Response } from "express";
import { Logger, PrintFetch } from "../debug/log";

const Log = Logger("Middleware - UpdateValidation");

export default function UpdateValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const _id: string = req.body['_id'];

    const header = req.headers["content-type"];

    if (!_id) {
        const msg = "mongodb _id required";
        Log(msg, "Magenta");
        return res.status(400).send("mongodb _id required").end();
    }

    if (header !== "application/json") {
        const msg = `this required content-type: application/json. instead got ${header}`;
        Log(msg, "Magenta");
        return res.status(400).send(msg).end();
    }

    return next();
}
