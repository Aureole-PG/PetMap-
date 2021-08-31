import { useEffect, useState, useCallback } from "react"; 
import io from 'socket.io-client';
export const  useSocket= (token)=> {
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( (id) => {
        const socketTemp = io.connect( process.env.NEXT_PUBLIC_GPS_API, { 
            transports: ['websocket'],
            autoConnect: true,
            // forceNew: true,
            query: {
                'owner_id': id
            }
        });
        setSocket( socketTemp );
    },[token]);
    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);
     useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}