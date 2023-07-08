import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";


config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extends: true }))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on port : ${PORT}`));