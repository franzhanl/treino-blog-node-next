import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface IUser{
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({name, email, password}: IUser){

        const encryptedPassword = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: encryptedPassword
            },
            select: {
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }