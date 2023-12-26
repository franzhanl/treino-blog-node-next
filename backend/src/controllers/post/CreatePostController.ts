import { Request, Response } from 'express'
import { CreatePostService } from '../../services/post/CreatePostService'

class CreatePostController {
    async handle(req: Request, res: Response){

        const { description, user_id } = req.body

        const createPostService = new CreatePostService()

        const post = await createPostService.execute({description, user_id})

        return res.json(post)
    }
}

export { CreatePostController }