import { Request, Response } from 'express'
import { ListPostsService } from '../../services/post/ListPostsService'

class ListPostsController{
    async handle(req: Request, res: Response){
        
        const listPostsService = new ListPostsService()

        const posts = await listPostsService.execute()

        return res.json(posts)
    }
}

export { ListPostsController }