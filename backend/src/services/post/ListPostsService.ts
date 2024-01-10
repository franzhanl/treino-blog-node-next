import prismaClient from '../../prisma'

interface IListProps {
    user_id: string
    is_reverse: string
}

class ListPostsService{
    async execute({user_id, is_reverse}: IListProps){

        let posts

        if(user_id) {
            posts = await prismaClient.post.findMany({
                where: {
                    user_id: user_id
                },
                orderBy: {
                    created_at: is_reverse === 'true' ? 'asc' : 'desc'
                }
            })
        }else{
            posts = await prismaClient.post.findMany({
                orderBy: {
                    created_at: is_reverse === 'true' ? 'asc' : 'desc'
                }
            })
        }

       
    
        return posts
    }
}

export { ListPostsService }