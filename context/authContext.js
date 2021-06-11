import React, {createContext} from 'react'

const AuthContext = createContext(
    {
        auth: undefined,
        login: ()=> null,
        logout : ()=> null,
        setReloader: ()=> null
    }
)

export default AuthContext