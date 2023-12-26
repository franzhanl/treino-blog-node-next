import { ReactNode, createContext, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";

interface IAuthContextData {
    user: IUserProps | undefined
    isAuthenticated: boolean
    signIn: (credentials: ISigninProps) => Promise<void>
    signOut: () => void
}

interface IUserProps {
    id: string
    name: string
    email: string
}

interface ISigninProps {
    email: string
    password: string
}

interface TAuthProviderProps {
    children: ReactNode
}

export const authContext = createContext({} as IAuthContextData)

export const signOut = () => {
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/login')
    }catch(err){
        console.log('Erro on signOut')
    }
}

export function AuthProvider({children}: TAuthProviderProps){
    const [user, setUser] = useState<IUserProps>()

    const isAuthenticated = !!user

    const signIn = async ({email, password}: ISigninProps) => {
        try{
            const cookie = parseCookies(undefined)

            const apiLogin = axios.create({
                baseURL: 'http://localhost:3333',
                headers: {
                    Authorization: `Bearer ${cookie['@nextauth.token']}`
                }
            })
        
            const response = await apiLogin.post('/login', {email, password} )
    
            const {id, name, token} = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 *24 * 30, //expira em um mes
                path: '/' // quais camiinhos terão acesso ao cookie
            })
    
            setUser({
                id,
                name,
                email
            })

            apiLogin.defaults.headers['Authorization'] = `Bearear ${token}`
            
            toast.success("Login efetuado com sucesso !")

            Router.push('/')

        }catch(err){
            toast.error("Erro ao acessar !")
            console.log("Error on signIn:", err)
    }
}

    return(
        <authContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </authContext.Provider>
    )
}