import React, {createContext,useMemo,useState, useEffect} from "react"
import { useTokenStore } from "../../stores/useTokens"
import {useRouter} from "next/router"
import { Connection } from "./socket"



export const WSContext = createContext({
    user: null,
    conn: null,
    isConnecting: null, 
    setIsConnecting: ()=>{},
    setUser: ()=> {},
    setConn: ()=>{}
})



export const WSProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [conn, setConn] = useState(null)
    const [isConnecting, setIsConnecting] = useState(true)
    const {isTokens,accessToken, refreshToken} = useTokenStore()
    
    

    //reconnect to server there're tokens
    useEffect(()=>{
        if(!conn){
            setIsConnecting(true)
           Connection(accessToken, refreshToken).then((c)=>{
               setConn(c)
               setUser(c.user)
              
               setIsConnecting(false)
           })
        
        }
    }, [conn, isTokens, accessToken, refreshToken]
    )


    return (
        <WSContext.Provider
        value={
            useMemo(
                ()=>({
                    conn,
                    setConn,
                    isConnecting,
                    setIsConnecting,
                    user,
                    setUser
                }),
                [conn, user, isConnecting]
            )
        }
        >
        {children}
        </WSContext.Provider>
    )

}




