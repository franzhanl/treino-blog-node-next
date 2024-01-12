import prismaClient from '../../prisma'

interface IEditProps{
    id: string
    title: string
    subtitle: string
    description: string
    post_image?: string
}

class EditPostService {
    async execute({id, title, subtitle, description, post_image}: IEditProps){

        const postData = {
            title: title,
            subtitle: subtitle,
            description: description,
            // Inclui post_image apenas se estiver presente
            ...(post_image && { post_image: post_image }),
        }

        const post = await prismaClient.post.update({
            where: {
                id: id
            },
            data: postData
        })

        return post
    }
}

export { EditPostService }