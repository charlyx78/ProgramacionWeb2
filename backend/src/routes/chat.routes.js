import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getContacts, getMessages, sendMessage } from "../controllers/chat.controller.js"

const router = Router()

router.post('/message/:id', authRequired, sendMessage)
router.get('/message/:id', authRequired, getMessages)
router.get('/contacts', authRequired, getContacts)

export default router