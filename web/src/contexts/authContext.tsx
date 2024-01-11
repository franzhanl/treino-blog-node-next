import { ReactNode, createContext, useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";
import { api } from "@/services/api";

interface IAuthContextData {
  user: IUserProps | undefined
  isAuthenticated: boolean
  signIn: (credentials: ISigninProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: ISignUpProps) => Promise<void>
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

interface ISignUpProps {
  name: string
  email: string
  password: string
}

interface IAuthProviderProps {
  children: ReactNode
}

export const authContext = createContext({} as IAuthContextData)

export const signOut = () => {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/login')
  } catch (err) {
    console.log('Erro on signOut')
  }
}


export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserProps>()

  const isAuthenticated = !!user

  useEffect(() => {
    async function getCurrentUserData() {
      //tenta pegar algo no token
      const { '@nextauth.token': token } = parseCookies()

      if (token) {
        await api.get('/me').then(response => {
          const { id, name, email } = response.data

          setUser({
            id,
            name,
            email
          })
        })
          .catch(() => {
            signOut()
          })
      }
    }

    getCurrentUserData()

  }, [])

  const signIn = async ({ email, password }: ISigninProps) => {
    try {

      const response = await api.post('/login', { email, password })

      const { id, name, token } = response.data

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //expira em um mes
        path: '/' // quais camiinhos terão acesso ao cookie
      })

      setUser({
        id,
        name,
        email
      })

      api.defaults.headers['Authorization'] = `Bearear ${token}`

      toast.success("Login efetuado com sucesso !")

      Router.push('/')

    } catch (err) {
      toast.error("Erro ao acessar !")
      console.log("Error on signIn:", err)
    }
  }

  const signUp = async ({ name, email, password }: ISignUpProps) => {

    api.post('/register', { name, email, password }).then(() => {
      toast.success("Cadastrado com sucesso!")
      Router.push('/login')
    })
      .catch((err) => {
        toast.error("Houve um erro ao cadastrar, tente mais tarde")
      })
  }

  return (
    <authContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </authContext.Provider>
  )
}