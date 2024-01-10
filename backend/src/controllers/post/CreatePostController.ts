import { Request, Response } from 'express'
import { CreatePostService } from '../../services/post/CreatePostService'

class CreatePostController {
    async handle(req: Request, res: Response) {

        const { title, subtitle, description } = req.body
        const user_id = req.user_id

        const createPostService = new CreatePostService()

        if (!req.file) {
            throw new Error('error upload file')
        } else {

            const {originalname, filename: post_image} = req.file

            if (user_id) {
                const post = await createPostService.execute({
                    title,
                    subtitle,
                    description,
                    post_image,
                    user_id
                })
                return res.json(post)
            } else {
                res.status(401).end
            }
        }

    }
}

export { CreatePostController }