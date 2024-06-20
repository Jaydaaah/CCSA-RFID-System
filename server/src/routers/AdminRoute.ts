import CreateAccControl from "../controller/account/CreateAccControl";
import { Router } from "express";
import AuthenticationMWare from "../middleware/AuthenticationMWare";
import UpdateValidation from "../middleware/UpdateValidation";
import GeneralRetrieveControl from "../controller/account/GeneralRetrieveControl";
import ImageControl from "../controller/account/ImageControl";
import bodyParser from "body-parser";
import DeleteAccControl from "../controller/account/DeleteAccControl";
import UpdateControlNew from "../controller/account/UpdateControlNew";

export default function AdminRoute(router: Router) {
    // create
    // requires ccsaID, stdName, course, rfidTag
    router.post("/admin/accounts", AuthenticationMWare, CreateAccControl);

    // delete
    router.delete("/admin/accounts", AuthenticationMWare, DeleteAccControl);

    // New way data update
    // requires 'update' property that contains all the updated properties
    router.put("/admin/accounts", UpdateValidation, UpdateControlNew);
    // Image update
    router.put(
        "/admin/accounts/image/:id",
        AuthenticationMWare,
        bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
        ImageControl
    );

    // retrieve
    // if given with start and count returns the specific range of data
    // otherwise return all accounts
    router.get("/admin/accounts", GeneralRetrieveControl);
}
