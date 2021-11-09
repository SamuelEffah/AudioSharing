import React, {useContext, useEffect} from "react"
import { Spinner } from "../../icons"
import { useTokenStore } from "../../stores/useTokens"
import { WSContext } from "./ws_provider"



 export const WSAuth = ({children,...props})=>{

    const {conn,user, isConnecting}  = useContext(WSContext)


    if(isConnecting || !user){
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner/>
            </div>
        )
    }


    return (
        <>
        {children}
        </>
    )
}


