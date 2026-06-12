import express from "express"
import cors from "cors"

import dashboardRoutes from "../backend/src/routes/routes.js"


const app = express()


app.use(cors())
app.use(express.json())


app.use("/dashboard", dashboardRoutes)



app.listen(3000,()=>{

console.log("Servidor rodando na porta 3000")

})