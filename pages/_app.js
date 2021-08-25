import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {AuthProvider} from '../context/authContext'
import { SocketProvider } from '../context/socketContext'; 
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <AuthProvider>
      <SocketProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>     
      </SocketProvider>
    </AuthProvider>
    
  )
}

export default MyApp
