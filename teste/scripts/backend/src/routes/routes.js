import express from "express";

import { dashboardSensor, dashboardHome } from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get('/home', dashboardHome)
router.get("/:tipo", dashboardSensor);

export default router;