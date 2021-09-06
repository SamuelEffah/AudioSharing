import React from "react"
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize"



const RightPanel = ({children,...props}) =>{

    const screenSize = useDetectScreenSize()
    let rightPanelWidth = 450
    if(screenSize === "big-screen"){
        rightPanelWidth = 450 
    }
    if(screenSize === "desktop"){
        rightPanelWidth = 350
    }

    return(
        <div
        style={{width:rightPanelWidth +'px'}}
        id="rightPanel"
        className="z-50 
        flex flex-col items-center
        text-primary-700 pt-4 absolute right-0 top-0 h-full "
        >
    {children}
        </div>

    )
}


export default RightPanel