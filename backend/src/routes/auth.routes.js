import { Router } from "express";
import { login, logout, register, profile, verifyToken, hasFollow, follow, unfollow, updateProfile } from "../controllers/auth.controller.js"
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { uploadFiles } from "../middlewares/uploadProfilePicture.js";
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

router.get('/find-follow/:id', authRequired, hasFollow)
router.post('/follow/:id', authRequired, follow)
router.post('/unfollow/:id', authRequired, unfollow)

router.post('/logout', logout)

router.post('/verify', verifyToken)

router.get('/profile/:id', authRequired, profile)

router.put('/profile', 
authRequired,
uploadFiles.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'cover_picture', maxCount: 1 }
]),
createTagIfNotExists,
updateProfile)

export default router