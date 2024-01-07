import prismaClient from '../../prisma'

interface IPostProps{
    id: string
}

class DetailPostService {
    async execute({id}: IPostProps){
        const post = await prismaClient.post.findFirst({
            where: {
                id: id
            }
        })

        return post
    }
}

export { DetailPostService }