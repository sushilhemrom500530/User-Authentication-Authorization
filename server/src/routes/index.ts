import express from "express";
import { AuthRoute } from "./auth";

const router = express.Router();

const modulesRoute = [
    {
        path: "/auth",
        route: AuthRoute
    },
    
]


modulesRoute.forEach(route => router.use(route.path, route.route))

export default router;