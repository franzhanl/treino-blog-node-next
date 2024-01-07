import { Router } from 'express'

import { isAuthenticated } from './middleware/isAuthenticated'
// User
import { ListUserController } from './controllers/user/ListUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
// Post
import { CreatePostController } from './controllers/post/CreatePostController'
import { ListPostsController } from './controllers/post/ListPostsController'
import { DeletePostController } from './controllers/post/DeletePostController'
import { EditPostController } from './controllers/post/EditPostController'
import { DetailPostController } from './controllers/post/DetailPostController'

const router = Router()

//USER
router.get('/users', new ListUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.post('/register', new CreateUserController().handle)

//LOGIN
router.post('/login', new AuthUserController().handle)

//POST
router.post('/post', isAuthenticated, new CreatePostController().handle)

router.get('/posts', new ListPostsController().handle)

router.delete('/posts/:id', new DeletePostController().handle)

router.get('/posts/:id', new DetailPostController().handle)

router.put('/posts/:id', isAuthenticated, new EditPostController().handle)


export { router }