import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function canSSRGuest<P extends { [key: string]: any} >(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookie = parseCookies(ctx)

        //se a pessoa tentar acessar a pagina estando logado, redirecionamos
        //só usuarios n logados podem acessar
        if(cookie['@nextauth.token']){
            return {
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }

        return await fn(ctx)

    }
}
