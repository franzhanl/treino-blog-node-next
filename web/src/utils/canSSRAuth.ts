import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";


export function canSSRAuth<P extends { [key: string]: any} >(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        const token = cookies['@nextauth.token']

        if(!token){
            return{
                redirect:{
                    destination: '/login',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx)
        }catch(err){
            // if(err instance of AuthTokenError){}
            destroyCookie(ctx, '@nextauth.token')

            return{
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
    }
}