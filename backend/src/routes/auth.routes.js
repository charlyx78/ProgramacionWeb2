import { Router } from "express";
import { login, logout, register, profile, verifyToken } from "../controllers/auth.controller.js"
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { uploadFiles } from "../middlewares/uploadFiles.js";
import { createTagIfNotExists } from '../middlewares/createTagIfNotExists.js'

const router = Router()

router.post('/register', 
    uploadFiles.fields([
        { name: 'picture', maxCount: 1 },
        { name: 'cover_picture', maxCount: 1 }
    ]),
    createTagIfNotExists,
    register
)

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/profile/:id', authRequired, profile)

export default router