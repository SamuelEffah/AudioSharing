import { useContext } from "react"
import { WSContext } from "../modules/ws/ws_provider"


export const useConn = ()=>{

    return useContext(WSContext).conn

}