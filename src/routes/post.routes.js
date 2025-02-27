import { Router } from 'express'


import * as postController from "../controllers/post.controller.js"
import * as postMiddleware from "../middlewares/post.middleware.js"
import * as userMiddleware from "../middlewares/user.middleware.js"

const router = Router();

router.post('/create',
    userMiddleware.authUser,
    postMiddleware.handleFileUpload,
    postController.createPost
)

router.get('/get-all',
    userMiddleware.authUser,
    postController.getAllPosts
)

router.patch('/like/:postId',
    userMiddleware.authUser,
    postController.likePost
)

router.patch('/removeLike/:postId',
    userMiddleware.authUser,
    postController.removeLikePost
)


export default router;