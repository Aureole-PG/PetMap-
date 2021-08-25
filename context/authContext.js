import {createContext, useEffect,useState,  useMemo} from 'react'
import jwt from 'jsonwebtoken'
import {deleteToken, getToken, setToken } from '../pages/api/token';
import Router from "next/router";
const AuthContext = createContext()
const initialState = {
    _id : undefined,
    auth: undefined,
    login: ()=> null,
    logout : ()=> null,
    setReloader: ()=> null
}

export const AuthProvider =({children})=>{
    const [auth, setAuth] = useState(initialState);
    const [reloadUser, setReloadUSer] =  useState(false)


    useEffect(() => {
        const token = getToken()
        if (token) {
        setAuth({
            token: token,
            ...jwt.decode(token)
        })

        Router.replace("/dashboard");
        
        }else{
            setAuth(null)
            Router.replace("/login");
        }
        setReloadUSer(false)
    }, [reloadUser])


    const login = (token)=>{
        let decodeToken = jwt.decode(token)
        setToken(token)
        setAuth({
            token: token,
            ...decodeToken
            })
        setReloadUSer(true)
    }
    const logOut =()=>{
    if (auth){
      deleteToken();
      setAuth(null);
      setReloadUSer(true)
    }
  }
  const authData = useMemo(
    ()=>({
      auth,
      login,
      logOut,
      setReloadUSer
    }),[auth]
  )
    return(
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext