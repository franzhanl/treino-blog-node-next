import { Request, Response } from 'express'
import { EditPostService } from '../../services/post/EditPostService'

class EditPostController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { title, subtitle, description } = req.body

        const editPostService = new EditPostService()
        
        if (!req.file) {
            const post = await editPostService.execute({ id, title, subtitle, description })
            return res.json(post)

        } else {
            const { originalname, filename: post_image } = req.file
            const post = await editPostService.execute({ id, title, subtitle, description, post_image })
            return res.json(post)
        }


    }
}

export { EditPostController }