import express from "express";

import {
    dashboardHome,
    dashboardSensor,
    dashboardMaquinas
} from "../controllers/dashboardControllers.js";


const router = express.Router();

router.get("/home", dashboardHome);
router.get("/maquinas", dashboardMaquinas);
router.get("/:tipo", dashboardSensor);
router.get("/:tipo/:maquina", dashboardSensor);



export default router;