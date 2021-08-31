import { useEffect } from 'react'
import Head from 'next/head'
import Login from '../components/login'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
export default function Home() {
  const {auth} = useAuth()
  const router = useRouter()
  useEffect(()=>{
  if (auth !== null) {
    router.replace('/dashboard')
  }  
  },[auth])
  return (
    <>
      <Head>
        <title>PetMap</title>
      </Head>

      <Login/>
    </>
  )
   
}
