import { getAccountByID } from "../../db/Accounts";
import { Request, Response } from "express";
import sharp from "sharp";
import { Logger, PrintFetch } from "../../debug/log";

const log = Logger("ImageControl");

export default async function ImageControl(req: Request, res: Response) {
    PrintFetch("PUT");
    const _id: string = req.params["id"];
    if (!_id) {
        const msg = "Missing mongodb ID. Please provide one";
        log(msg, "Red");
        return res.status(400).send(msg).end();
    }

    if (
        req.headers["content-type"] !== "image/jpeg" &&
        req.headers["content-type"] !== "image/png"
    ) {
        const msg = `Please provide a valid content-type header (e.g. image/jpeg), received: ${req.headers["content-type"]}`;
        log(msg, "Red", { bright: ["content-type"] });
        return res.status(400).send(msg).end();
    }

    let img_buffer: Buffer;
    try {
        log("Preparing image for conversion", "Cyan");
        img_buffer = await sharp(req.body)
            .resize(300)
            .jpeg({ quality: 50 })
            .toBuffer();
    } catch (error) {
        const msg = `Encountered an error while Reading uploaded image`;
        console.log(error);
        log(msg, "Red");
        return res.status(400).send(msg).end();
    }

    log(`Retrieving Account by ID...`);
    const acc = await getAccountByID(_id);
    if (acc) {
        acc.imageBuffer = img_buffer;
        await acc.save();
        log(`Account Found and Image update sucess`, "Green");
        return res.status(200).send("image updated").end();
    } else {
        const msg = `Account ID: ${_id} not found`;
        log(msg, "Red");
        return res.status(400).send(msg).end();
    }
}
