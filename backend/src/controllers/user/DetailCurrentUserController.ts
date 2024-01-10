import { Request, Response } from 'express'
import { DetailCurrentUserService } from '../../services/user/DetailCurrentUserService'

class DetailCurrentUserController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id

        const detailCurrentUserService = new DetailCurrentUserService()

        const userData = await detailCurrentUserService.execute(user_id)

        return res.json(userData)
    }
}

export { DetailCurrentUserController }