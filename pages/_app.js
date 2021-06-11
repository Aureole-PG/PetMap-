import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useMemo, useState, useEffect} from 'react';
import AuthContext from '../context/authContext';
import jwt from 'jsonwebtoken'
import {setToken, getToken, deleteToken} from './api/token'
import Router from "next/router";
function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined)
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
  

  if (auth===undefined) {
    return null
  }
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <AuthContext.Provider value={authData}>
      <Layout>
        <Component {...pageProps} />
      </Layout>     
    </AuthContext.Provider>
    
  )
}

export default MyApp
