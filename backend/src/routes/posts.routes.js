import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getPosts, getPost, createPost, replyPost, updatePost, deletePost } from "../controllers/posts.controller.js"

const router = Router()

// router.get('/posts', authRequired, getPosts)
router.get('/posts/:id', authRequired, getPost)
router.post('/posts', authRequired, createPost)
router.post('/posts/:id', authRequired, replyPost)
router.delete('/posts/:id', authRequired, deletePost )
// router.put('/posts/:id', authRequired, deletePost)

export default router