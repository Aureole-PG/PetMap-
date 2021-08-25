import { createContext, useEffect } from "react";
import { useSocket} from '../hooks/useSocket'
import useAuth from "../hooks/useAuth";
export const SocketContext= createContext()

export const SocketProvider =({children})=>{
    const {auth} = useAuth()
    const {conectarSocket,desconectarSocket,socket} = useSocket()
    useEffect(()=>{
        console.log("___________________",auth.id)
        if (auth !== undefined || auth !== "undefined") {
            conectarSocket(auth.id)
        }
    },[auth])
    useEffect(()=>{
        if (!auth) {
            desconectarSocket()
        }
    },[auth])
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}