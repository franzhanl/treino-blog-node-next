import prismaClient from '../../prisma'

class DeletePostService{
    async execute(id: string){
        const post = await prismaClient.post.delete({
            where: {
                id: id
            }
        })

        return post
    }
}

export { DeletePostService }