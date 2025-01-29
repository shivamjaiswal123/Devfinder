import express from 'express'
import cookieParser from "cookie-parser";
import userRouter from './router/user.router';
import roomRouter from './router/room.router'
import cors from "cors";

export const app = express()

app.use(express.json())
app.use(cookieParser())
// Configure CORS to allow credentials (cookies) and specify frontend origin
app.use(
    cors({
      origin: 'http://localhost:3001', // Your frontend URL
      credentials: true, // Allow cookies to be sent
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Authorization
    })
  );

app.use('/api/v1/user', userRouter)
app.use('/api/v1/room', roomRouter)