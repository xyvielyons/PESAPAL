import express from "express";
import bodyParser from "body-parser"
import pesapalRoutes from "./routes/pesapal.routes.js"

const app = express()

app.use(bodyParser.json())

app.use('/api/pesapal',pesapalRoutes)

app.listen(3005,()=>console.log('running on port 3005'))