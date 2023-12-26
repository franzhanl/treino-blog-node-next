import { Router } from 'express'

import { ListUserController } from './controllers/user/ListUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'

import { CreatePostController } from './controllers/post/CreatePostController'

const router = Router()

//USER
router.get('/users', new ListUserController().handle)

router.post('/register', new CreateUserController().handle)

//LOGIN
router.post('/login', new AuthUserController().handle)

//POST
router.post('/posts', new CreatePostController().handle)

export { router }