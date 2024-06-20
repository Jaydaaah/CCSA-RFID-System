import { Request, Response } from "express";

export default async function pingControl(req: Request, res: Response) {
    return res.sendStatus(200);
}