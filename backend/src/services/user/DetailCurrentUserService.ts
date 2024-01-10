import prismaClient from '../../prisma'

class DetailCurrentUserService{
    async execute(user_id: string | undefined){

        const userData = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        return userData
    }
}

export { DetailCurrentUserService }