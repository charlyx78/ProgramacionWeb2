import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js"
import postsRoutes from "./routes/posts.routes.js"
import tagsRoutes from './routes/tags.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(morgan('dev'))

app.use(express.json())

app.use(cookieParser())

app.use('/uploads/', express.static('uploads'))

app.use('/api', authRoutes)
app.use('/api', postsRoutes)
app.use('/api', tagsRoutes)

export default app;