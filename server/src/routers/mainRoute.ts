import express, { Express, Router } from "express";
import AdminRoute from "./AdminRoute";
import LoginRoute from "./LoginRoute";

export default function MainRoute() {
    const router = Router();

    AdminRoute(router);
    LoginRoute(router);

    return router;
}
