import Head from 'next/head'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { Header } from '@/components/Header/Header'
import { Cards } from '@/components/Cards'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Header />

      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 '>
        <main className="sm:flex sm:items-start sm:justify-between mt-20">

          <Cards />

          <aside className='flex justify-center items-center min-w-56 min-h-svh bg-gray-400'>
            Google AdSense
          </aside>
          
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
