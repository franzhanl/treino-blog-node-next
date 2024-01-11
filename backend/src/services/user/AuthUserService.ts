import { compare } from 'bcryptjs'
import prismaClient from '../../prisma'
import { sign } from 'jsonwebtoken'

interface IUserAuth {
    email: string
    password: string
}

class AuthUserService {
    async execute({email, password}: IUserAuth){

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if (user === null) throw new Error('Email/Password incorrect')

        const encryptedPassword = compare(password, user.password)

        if (!encryptedPassword) throw new Error('Email/Password incorrect')

        const token = sign({
            name: user.name,
            email: user.email
        },
        //@ts-expect-error variavel de ambiente
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '30d'
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }