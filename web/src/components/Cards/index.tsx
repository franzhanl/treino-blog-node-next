import { useEffect, useState } from "react";
import { Card } from "../Card";
import { api } from "@/services/api";

const Cards = () => {

  const [posts, setPosts] = useState<any>()

  useEffect(() => {
    async function getPosts() {
      api.get('/posts').then((response) => {
        setPosts(response.data)
      })
        .catch((err) => console.log(err))
    }

    getPosts()

  }, [])

  return (
    <>     
      <ul className="flex flex-col min-h-screen items-center justify-center">
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