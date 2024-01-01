import prismaClient from '../../prisma'

class ListPostsService{
    async execute(){
        const posts = await prismaClient.post.findMany({
            orderBy: {
                id: 'desc'
            }
        })
    
        return posts
    }
}

export { ListPostsService }