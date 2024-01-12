import { useContext } from "react"
import { authContext } from "@/contexts/authContext"
import Link from "next/link"

const Header = () => {

  const { user, signOut } = useContext(authContext)

  return (
    // <header className="fixed bg-gray-50 w-full top-0 z-10">
    //   <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    //     <div className="sm:flex sm:items-center sm:justify-between">
    //       <div className="text-center sm:text-left">
    //         <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Bem vindo de volta, {user?.name}!</h1>

    //         <p className="mt-1.5 text-sm text-gray-500"> Vamos escrever um novo post!🎉</p>
    //       </div>

    //       <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
    //         <Link href={'/'} className="block rounded-lg bg-gray-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring" type="button">
    //           Home
    //         </Link>

    //         <Link href={'/post/new'} className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring" type="button">
    //           Criar Post
    //         </Link>

    //         <button onClick={() => signOut()} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring" type="button" >
    //           <span className="text-sm font-medium"> Sair </span>

    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             strokeWidth="2" >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    //             />
    //           </svg>
    //         </button>

    //       </div>
    //     </div>
    //   </div>
    // </header>

    <header className="fixed z-10 top-0 w-full text-gray-700 bg-slate-200 shadow-sm body-font">

      <div className="container flex flex-col items-start p-6 mx-auto md:flex-row">
        <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <h2 className="text-2xl w-auto h-5 text-gray-900 fill-current italic">Blog</h2>
        </a>

        <nav className="flex items-center justify-center text-base md:ml-auto md:mr-auto">
          <Link href="/" className="mr-5 font-medium hover:text-gray-900">Home</Link>
          <Link href="/post/new" className="mr-5 font-medium hover:text-gray-900">Criar Post</Link>
        </nav>

        <div className="flex gap-3 justify-center items-center h-full pl-6 ml-6 border-l border-gray-200">
          <div className="min-w-7">
            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
            </svg>
          </div>

          <a className="mr-5 font-medium hover:text-gray-900">{user?.name}</a>
          <button onClick={() => signOut()}
            className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-red-500 rounded shadow outline-none active:bg-red-600 hover:bg-red-400 hover:shadow-md focus:outline-none ease">
            Sair
          </button>
        </div>

      </div>
    </header>
  )
}

export { Header }