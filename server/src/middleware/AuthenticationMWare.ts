import { NextFunction, Request, Response } from "express";

export default function AuthenticationMWare(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return next();
}
