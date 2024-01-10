import prismaClient from '../../prisma'

interface IPost {
    title: string
    subtitle: string
    description: string
    post_image: string
    user_id: string 
}

class CreatePostService {
    async execute({title, subtitle, description, post_image, user_id}: IPost){

        const post = await prismaClient.post.create({
            data: {
                title: title,
                subtitle: subtitle,
                description: description,
                post_image: post_image,
                user_id: user_id
            }
        })

        return post
    }
}

export { CreatePostService }