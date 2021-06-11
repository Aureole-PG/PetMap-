import jwt from 'jsonwebtoken'
export function setToken(token){
    localStorage.setItem("token",token)
}

export function getToken() {
    return localStorage.getItem("token")
}

export function userId(){
    let response = localStorage.getItem("token") 
    
    return jwt.decode(response).id
}

export function deleteToken(){
    localStorage.removeItem("token") 
    return true
}