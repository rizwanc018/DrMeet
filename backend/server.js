import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./configs/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import cors from 'cors'

config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extends: true }))

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/api/admin', adminRouter);
app.use('/api/doc', doctorRouter);


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on port : ${PORT}`));