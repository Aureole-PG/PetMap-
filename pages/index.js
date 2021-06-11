import Head from 'next/head'
import Login from './login'
import Dashboard from './dashboard'
import useAuth from '../hooks/useAuth'
import Layout from '../layout/layout'
export default function Home() {
  const {auth} = useAuth()

  if (auth) {
    return (
      <>
        <Head>
          <title>User</title>
        </Head>
  
        <Dashboard/>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>PetMap</title>
        </Head>
  
        <Login/>
      </>
    )
  }

  
}

Home.Layout = Layout
