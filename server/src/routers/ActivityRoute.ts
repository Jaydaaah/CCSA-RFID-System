import AuthenticationMWare from "../middleware/AuthenticationMWare";
import LoginControl from "../controller/login/LoginControl";
import { Router } from "express";
import LogOutControl from "../controller/login/LogOutControl";
import AddFilesControl from "../controller/activity/AddFilesControl";
import AddProcessControl from "../controller/activity/AddProcessControl";

export default function ActivityRoute(router: Router) {
    // Activity route
    router.put("/activity/files/:attendance_id", AuthenticationMWare, AddFilesControl);
    router.put("/activity/process/:attendance_id", AuthenticationMWare, AddProcessControl);
}