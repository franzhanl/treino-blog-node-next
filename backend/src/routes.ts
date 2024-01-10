import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middleware/isAuthenticated'
// User
import { ListUserController } from './controllers/user/ListUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailCurrentUserController } from './controllers/user/DetailCurrentUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
// Post
import { CreatePostController } from './controllers/post/CreatePostController'
import { ListPostsController } from './controllers/post/ListPostsController'
import { DeletePostController } from './controllers/post/DeletePostController'
import { EditPostController } from './controllers/post/EditPostController'
import { DetailPostController } from './controllers/post/DetailPostController'

import uploadConfig from './config/multer'

const router = Router()

const upload = multer(uploadConfig.upload('./tmp'))

//USER
router.get('/users', isAuthenticated, new ListUserController().handle)

router.get('/me', isAuthenticated, new DetailCurrentUserController().handle)

router.get('/users/:id', isAuthenticated, new DetailUserController().handle)

router.post('/register', new CreateUserController().handle)

//LOGIN
router.post('/login', new AuthUserController().handle)

//POST
router.post('/posts', isAuthenticated, upload.single('file'), new CreatePostController().handle)

router.get('/posts', isAuthenticated, new ListPostsController().handle)

router.delete('/posts/:id', isAuthenticated, new DeletePostController().handle)

router.get('/posts/:id', isAuthenticated, new DetailPostController().handle)

router.put('/posts/:id', isAuthenticated, upload.single('file'), new EditPostController().handle)

export { router }