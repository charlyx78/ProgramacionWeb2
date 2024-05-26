import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getMessages, sendMessage } from "../controllers/chat.controller.js"

const router = Router()

router.post('/message/:id', authRequired, sendMessage)
router.get('/message/:id', authRequired, getMessages)

export default router