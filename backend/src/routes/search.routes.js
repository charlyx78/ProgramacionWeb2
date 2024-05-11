import { Router } from "express"
import { searchUser } from "../controllers/search.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { searchPost } from "../controllers/search.controller.js"

const router = Router()

router.post('/search-user', authRequired, searchUser)

router.post('/search-post', authRequired, searchPost)

export default router

