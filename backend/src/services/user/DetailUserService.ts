import prismaClient from '../../prisma'

interface IUserId {
    id: string
}

class DetailUserService {
    async execute({id}: IUserId){
        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user
    }
}

export { DetailUserService }