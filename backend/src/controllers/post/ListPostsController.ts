import { Request, Response } from 'express'
import { ListPostsService } from '../../services/post/ListPostsService'

class ListPostsController{
    async handle(req: Request, res: Response){

        const user_id = req.query.user_id as string
        const is_reverse = req.query.is_reverse as string
        
        const listPostsService = new ListPostsService()
        
        const posts = await listPostsService.execute({user_id, is_reverse})

        return res.json(posts)
    }
}

export { ListPostsController }