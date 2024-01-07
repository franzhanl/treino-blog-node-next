import { useContext, useEffect, useState } from "react";
import { Card } from "../Card";
import { api } from "@/services/api";
import { authContext } from "@/contexts/authContext";

const Cards = () => {

  const [posts, setPosts] = useState<any>()
  const [filterMyPosts, setFilterMyPosts] = useState(false)
  const [isReverse, setIsReverse] = useState(false)

  const { user } = useContext(authContext)

  const queryParams = new URLSearchParams()

  async function getPosts() {
    api.get(`/posts?${queryParams.toString()}`).then((response) => {
      setPosts(response.data)
    })
      .catch((err) => console.log(err))
  }

  useEffect(() => {

    if (isReverse) queryParams.append('is_reverse', 'true')

    if (filterMyPosts && user?.id) queryParams.append('user_id', user.id)

    getPosts()

  }, [filterMyPosts, isReverse])

  return (
    <>
      <ul className="flex flex-col min-h-screen items-center justify-start">
      <div className="flex items-center gap-10">
        <strong className="text-black">Filtrar</strong>
        <button onClick={() => filterMyPosts === false ? setFilterMyPosts(true) : setFilterMyPosts(false)} className={`block rounded-lg ${filterMyPosts ? 'bg-blue-800' : 'bg-blue-500'} px-5 py-3 text-sm font-medium text-white transition focus:outline-none `}>Minhas postagens</button>
        <button onClick={() => isReverse === false ? setIsReverse(true) : setIsReverse(false)} className={`block rounded-lg ${isReverse ? 'bg-blue-800' : 'bg-blue-500'} px-5 py-3 text-sm font-medium text-white transition focus:outline-none `}>Posts mais antigos</button>
      </div>
        
        {posts?.map((post: any, index: any) => {
          return (
            <li className="mt-6" key={index}>
              <Card id={post.id} title={post.title} description={post.description} user_id={post.user_id}></Card>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export { Cards }