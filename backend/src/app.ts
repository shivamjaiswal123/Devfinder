import express from 'express'
import cookieParser from "cookie-parser";
import userRouter from './router/user.router';
import roomRouter from './router/room.router'

export const app = express()

app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/room', roomRouter)