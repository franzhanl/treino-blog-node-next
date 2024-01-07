import prismaClient from '../../prisma'

interface IEditProps{
    id: string
    title: string
    subtitle: string
    description: string
    post_image: string
}

class EditPostService {
    async execute({id, title, subtitle, description, post_image}: IEditProps){
        const post = await prismaClient.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                subtitle: subtitle,
                description: description,
                post_image: post_image
            }
        })

        return post
    }
}

export { EditPostService }