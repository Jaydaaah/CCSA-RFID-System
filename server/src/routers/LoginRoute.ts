import AuthenticationMWare from "../middleware/AuthenticationMWare";
import LoginControl from "../controller/login/LoginControl";
import { Router } from "express";
import RetrieveControl from "../controller/retrieve/RetrieveControl";
import RetrieveImageControl from "../controller/retrieve/RetrieveImageControl";

export default function LoginRoute(router: Router) {
    router.get("/login/:rfidTag", AuthenticationMWare, LoginControl);

    // Retrieving data route
    router.get("/retrieve/:_id", AuthenticationMWare, RetrieveControl);
    router.get("/retrieve/:_id/image", AuthenticationMWare, RetrieveImageControl);
}