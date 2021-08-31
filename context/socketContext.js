import { createContext, useEffect } from "react";
import { useSocket} from '../hooks/useSocket'
import useAuth from "../hooks/useAuth";
export const SocketContext= createContext()

export const SocketProvider =({children})=>{
    const {auth} = useAuth()
    const {conectarSocket,desconectarSocket,socket} = useSocket()
    useEffect(()=>{
        if (auth !== null) {
            conectarSocket(auth.id)
        }
    },[auth])
    useEffect(()=>{
        if (auth === null) {
            console.log("desconectado")
            desconectarSocket()
        }
    },[auth])
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}