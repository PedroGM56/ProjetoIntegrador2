import express from "express"

import {
    temperatura

} from "../controllers/dashboardControllers.js"



const router = express.Router()



router.get("/temperatura", temperatura)




export default router