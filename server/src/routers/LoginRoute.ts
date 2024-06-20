import AuthenticationMWare from "../middleware/AuthenticationMWare";
import LoginControl from "../controller/login/LoginControl";
import { Router } from "express";
import RetrieveControl from "../controller/retrieve/RetrieveControl";
import RetrieveImageControl from "../controller/retrieve/RetrieveImageControl";
import LogOutControl from "../controller/login/LogOutControl";

export default function LoginRoute(router: Router) {
    router.post("/login/:rfidTag", AuthenticationMWare, LoginControl);
    router.post("/logout/:attendance_id", AuthenticationMWare, LogOutControl);

    // Retrieving data route
    router.get("/retrieve/:_id", AuthenticationMWare, RetrieveControl);
    router.get("/retrieve/:_id/image", AuthenticationMWare, RetrieveImageControl);
}