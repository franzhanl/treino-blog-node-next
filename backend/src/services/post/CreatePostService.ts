import prismaClient from '../../prisma'

interface IPost {
    description: string
    user_id: string
}

class CreatePostService {
    async execute({description, user_id}: IPost){

        const post = await prismaClient.post.create({
            data: {
                description: description,
                user_id: user_id
            }
        })

        return post
    }
}

export { CreatePostService }