import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization

    if(!authToken) return res.status(401).end

    const [,token] = authToken.split(' ')

    try{
        const { sub } = verify(
            token,
            //@ts-expect-error variavel de ambiente
            process.env.JWT_SECRET
        )

        req.user_id = sub

        return next()

    }catch(err){
        return res.status(401).end
    }
    
    // if(!sub) return res.status(401).end

    
}

export { isAuthenticated }