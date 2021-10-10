import React, {useContext, useEffect} from "react"
import { Spinner } from "../../icons"
import { useTokenStore } from "../../stores/useTokens"
import { WSContext } from "./ws_provider"



 export const WSAuth = ({children,...props})=>{

    const {conn, isConnecting}  = useContext(WSContext)


    if(isConnecting){
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


