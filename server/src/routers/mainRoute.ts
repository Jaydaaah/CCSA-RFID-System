import express, { Express, Router } from "express";
import AdminRoute from "./AdminRoute";
import LoginRoute from "./LoginRoute";
import pingControl from "../controller/pingControl";
import ActivityRoute from "./ActivityRoute";

export default function MainRoute() {
    const router = Router();

    router.get("/", pingControl);
    AdminRoute(router);
    LoginRoute(router);
    ActivityRoute(router);

    return router;
}
