import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from "./routes/auth.routes.js"
import postsRoutes from "./routes/posts.routes.js"
import tagsRoutes from './routes/tags.routes.js'
import searchRoutes from './routes/search.routes.js'
import chatRoutes from './routes/chat.routes.js'

dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://programacion-web2-self.vercel.app', 'https://www.pw2-diceapp.com'],
    credentials: true
}))

app.use(morgan('dev'))

app.use(express.json())

app.use(cookieParser())

app.use('/uploads/', express.static('uploads'))

app.use('/api', authRoutes)
app.use('/api', postsRoutes)
app.use('/api', tagsRoutes)
app.use('/api', searchRoutes)
app.use('/api', chatRoutes)

export default app;
