import { api } from "@/services/api"
import { Header } from "@/components/Header/Header"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { canSSRAuth } from "@/utils/canSSRAuth"

interface IPost {
    id: string
    title: string
    subtitle: string
    description: string
    post_image: string
    user_id: string
}

interface IAuthor {
    id: string
    name: string
    email: string
}

export default function Show() {
    
    const [post, setPost] = useState<IPost>()
    const [author, setAuthor] = useState<IAuthor>()

    const router = useRouter()
    const idPost = router.query.showId

    async function getPostData() {
        try {
            const responsePost = await api.get(`/posts/${idPost}`)
            setPost(responsePost.data)

            const author_id = responsePost.data.user_id
            const responseAuthor = await api.get(`/users/${author_id}`)
            setAuthor(responseAuthor.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPostData()
    }, [])


    return (
        <>
            <Head>
                <title>Detalhes do Post</title>
            </Head>

            <Header />

            <div className="mt-6 bg-gray-50">
                <div className=" px-10 py-6 mx-auto">

                    <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">

                        <a href="#_" className="block">
                            <img className="object-cover w-full shadow-sm h-full" src="https://source.unsplash.com/random" />
                        </a>

                        <div className="mt-2">
                            <a href="#"
                                className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500  hover:underline">{post?.title}</a>

                            <div className="flex justify-start items-center mt-2">
                                <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">{post?.subtitle}</h2>
                            </div>

                            <div className="font-light text-gray-600">

                                <a href="#" className="flex items-center mt-6 mb-6"><img
                                    src="https://avatars.githubusercontent.com/u/71964085?v=4"
                                    alt="avatar" className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
                                    <h1 className="font-bold text-gray-700 hover:underline">{author?.name}</h1>
                                </a>
                            </div>
                        </div>

                        <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">

                            <div>
                                <p className="mt-2 p-8">{post?.description}</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})
