import { Request, Response } from 'express'
import { DetailPostService } from '../../services/post/DetailPostService'

class DetailPostController {
    async handle(req: Request, res: Response){
        const {id} = req.params

        const detailPostService = new DetailPostService()

        const post = await detailPostService.execute({id})

        return res.json(post)
    }
}

export { DetailPostController }