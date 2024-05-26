import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { handleUpload } from "../middlewares/uploadAttachment.js"
import { createTagIfNotExists } from "../middlewares/createTagIfNotExists.js"
import { getPost, createPost, replyPost, updatePost, deletePost, addLike, getReplies, getProfilePosts, getTagsPosts, getFollowPosts, hasLike } from "../controllers/posts.controller.js"

const router = Router()

router.get('/posts-tags', authRequired, getTagsPosts)
router.get('/posts-followed', authRequired, getFollowPosts)
router.get('/profile-posts/:id', authRequired, getProfilePosts)
router.get('/posts/:id', authRequired, getPost)
router.post('/posts', authRequired, handleUpload, createTagIfNotExists, createPost)
router.post('/posts/:id', authRequired, handleUpload, createTagIfNotExists, replyPost)
router.delete('/posts/:id', authRequired, deletePost)
router.get('/posts/find-like/:id', authRequired, hasLike)
router.post('/posts/like/:id', authRequired, addLike)
router.get('/posts/replies/:id', authRequired, getReplies)

export default router