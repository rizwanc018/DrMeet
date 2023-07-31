import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./configs/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoutes.js'
import stripeRouter from './routes/stripe.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from "socket.io";


config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000
//////////////////////////////////////////////////////
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

app.get('/', (req, res) => {
    res.status(200).json({ msg: "hello world" })
})

io.on('connection', (socket) => {
    console.log('Connection....', socket.id)
    // socket.emit("me", socket.id)

    socket.on("get-my-id", cb => {
        console.log('>>>>> ',socket.id);
        cb( socket.id)
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });
})

server.listen(5001, () => console.log('socket running on port 5001'))
/////////////////////////////////////////////////////

app.use(morgan('dev'))
app.use(express.urlencoded({ extends: true }))
app.use(cookieParser())

app.use(`/api/stripe`, stripeRouter)
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api/admin', adminRouter);
app.use('/api/doc', doctorRouter);
app.use('/api/user', userRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on port : ${PORT}`));