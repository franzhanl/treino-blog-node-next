import Head from 'next/head'
import { useContext } from 'react'
import { authContext } from '@/contexts/authContext'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { Header } from '@/components/Header/Header'

export default function Home() {

  const { signOut, user } = useContext(authContext)

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header userName={user?.name}></Header>
    </>
  )
}

export const getServerSideProps = canSSRAuth( async (ctx) => {
  return{
    props: {}
  }
})
