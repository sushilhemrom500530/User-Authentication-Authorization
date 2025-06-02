import express from "express";
import { AuthRoutes } from "./auth";


const router = express.Router();

const modulesRoute = [
    {
        path: "/auth",
        route: AuthRoutes
    },
];


modulesRoute.forEach(route => router.use(route.path, route.route))

export default router;