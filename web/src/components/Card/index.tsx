import { EditDel } from "../Button/EditDel"
import { authContext } from "@/contexts/authContext"
import { useContext } from "react"
import Link from "next/link"

interface IPostProps {
  id: string
  postImage: string
  title: string
  subtitle: string
  user_id: string
}

const Card = ({id, postImage, title, subtitle, user_id }: IPostProps) => {

  const {user} = useContext(authContext)

  return (
    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
        <img
          // src="https://source.unsplash.com/random"
          src={`http://localhost:3333/files/${postImage}`}
          alt="imagem da notícia"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full p-6">
        {/* <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
          startups
        </h6> */}
        <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h4>
        <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          {subtitle}
        </p>
        <div className="flex justify-between">
          <Link
            href={`/post/show/${id}`} className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Ver mais
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </Link>

          <div className="right-5">
            {user_id === user?.id ? (<EditDel id={id} />) : ('')}
          </div>
        </div>

        
          
        </div>
        
      </div>
    
  )
}

export { Card }