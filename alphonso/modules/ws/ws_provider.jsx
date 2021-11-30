import React, {createContext,useMemo,useState, useEffect} from "react"
import { useTokenStore } from "../../stores/useTokens"
import router, {useRouter} from "next/router"
import io from "socket.io-client";



const socket = io(process.env.NEXT_PUBLIC_API_URL)

export const WSContext = createContext({
    user: null,
    conn: null,
    isConnecting: null, 
    setIsConnecting: ()=>{},
    setUser: ()=> {},
    setConn: ()=>{}
})



export const WSProvider = ({children})=>{
    const {replace} = useRouter()
    const [user, setUser] = useState(null)
    const [conn, setConn] = useState(null)
    const [isConnecting, setIsConnecting] = useState(true)
    const {isTokens,accessToken, refreshToken,clearTokens} = useTokenStore()
    
    useEffect(()=>{
        if(!conn && accessToken && refreshToken){
            socket.connect()
            setConn(socket)
            socket.emit("auth", {accessToken, refreshToken})
            socket.on("getUser", (data)=>{
            setUser(data)
            setIsConnecting(false)
        })

        }
    
        // socket.emit("auth", {accessToken, refreshToken})
        // socket.on("getUser", (data)=>{
        //     console.log(data)
        //     // setUser()
        //     // setIsConnecting(false)
        // })
    },[conn, isTokens, accessToken,isConnecting, refreshToken])
    // http://127.0.0.1:4001
    //reconnect to server there're tokens
    // useEffect(()=>{
        
    //     if(!conn && accessToken && refreshToken){
           
    //        Connection(accessToken, refreshToken).then((c)=>{
    //             console.log(c.user)   
    //             setConn(c)
    //             setUser(c.user)
    //             setIsConnecting(false)
                
    //         }).catch(err=>{
    //            clearTokens()
    //            console.log(accessToken)
    //            console.log(refreshToken)
    //            console.log(window.location.pathname)
    //         replace(`/?next=${window.location.pathname}`);
    //        })
        
    //     }
    // }, [conn, isTokens, accessToken,isConnecting, refreshToken]
    // )




    useEffect(()=>{
        router.prefetch("/discovery")
    },[])


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




