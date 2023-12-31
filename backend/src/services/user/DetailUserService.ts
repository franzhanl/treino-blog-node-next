import prismaClient from '../../prisma'

class DetailUserService{
    async execute(user_id: string | undefined){

        const userData = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        return userData
    }
}

export { DetailUserService }