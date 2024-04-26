import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { createTag } from "../controllers/tags.controller.js"

const router = Router()

router.post('/tags', createTag)

export default router