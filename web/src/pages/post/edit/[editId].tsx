import { Header } from "@/components/Header/Header"
import Head from "next/head"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Link from "next/link"
import { api } from "@/services/api"
import Router, { useRouter } from "next/router"


export default function Edit() {

    const [previewImage, setPreviewImage] = useState<string>();
    const [postImage, setPostImage] = useState<File | null>(null)

    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')

    const router = useRouter()
    const id = router.query.editId

    async function getPostData() {
        try {
            const responsePost = await api.get(`/posts/${id}`)

            setTitle(responsePost.data.title)
            setSubtitle(responsePost.data.subtitle)
            setDescription(responsePost.data.description)
            
            setPreviewImage(`http://localhost:3333/files/${responsePost.data.post_image}`)

        } catch (err) {
            console.log(err)
        }
    }

    async function handleEdit(e: FormEvent) {
        e.preventDefault()

        if (!previewImage){
            if (postImage == null) return toast.error("Imagem é obrigatório")
        }

        if (title == "") return toast.error("É necessário digitar titulo")
        if (subtitle == "") return toast.error("É necessário digitar subtitulo")
        if (description == "") return toast.error("É necessário digitar algo para postar")

        const data = new FormData()

        if (postImage){
            data.append('file', postImage)
        }
        
        data.append('title', title)
        data.append('subtitle', subtitle)
        data.append('description', description)

        updatetePost(data)

    }

    const updatetePost = async (data: Object) => {
        await api.put(`/posts/${id}`, data).then(() => {
            toast.success("Post editado com sucesso!")
            Router.push('/')

        }).catch((err) => {
            toast.error("Falha ao editar post, tente mais tarde")
            console.log(err)
        })
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) return

        const image = e.target.files[0]

        if (!image) return

        setPostImage(image)

        setPreviewImage(URL.createObjectURL(image))

    }


    useEffect(() => {
        getPostData()

    }, [])

    return (
        <>
            <Head>
                <title>Editando Post</title>
            </Head>

            <Header />
            
            <div className="flex bg-gray-100 items-center justify-center mt-20 pt-20 pb-20 text-black">
                <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2 ">
                    <div className="flex justify-center mt-10">
                        <div className="flex w-full justify-center relative ">
                            <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Editando Post</h1>
                            <Link href={'/'} className='absolute w-auto bg-red-500 hover:bg-red-700 rounded-lg shadow-xl font-medium text-white px-4 py-2 right-7'>Voltar para Home</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Upload Foto</label>
                        <div className='flex items-center justify-center w-full'>
                            <label className='flex flex-col border-4 border-dashed w-full h-auto min-h-32 hover:bg-gray-100 hover:border-gray-300 group'>
                                <div className='flex flex-col items-center justify-center'>

                                    {previewImage ? (
                                        <div>
                                            <img src={previewImage} alt="Preview" className="hover:opacity-80" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center mt-7">
                                            <svg className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            <p className='lowercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider'>Selecione uma foto</p>
                                        </div>
                                    )}
                                </div>
                                <input type='file' onChange={(e) => handleFileChange(e)} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Titulo</label>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Título" />
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Subtitulo</label>
                        <textarea onChange={(e) => setSubtitle(e.target.value)} value={subtitle} className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" rows={3} cols={50} placeholder="Subtitulo" />
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Descrição</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" rows={9} cols={50} placeholder="Descrição" />
                    </div>

                    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>

                        <button onClick={(e) => handleEdit(e)} className='w-auto bg-blue-500 hover:bg-blue-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Confirmar</button>
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
