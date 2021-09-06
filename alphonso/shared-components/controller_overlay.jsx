import React from "react"
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize"


 const ControllerOverlay = ({children,...props})=>{

    const screenSize = useDetectScreenSize()
    let middleStyle = {marginLeft:"300px", width:"calc(100% - 750px"}
    if(screenSize==="big-screen"){
        middleStyle = {marginLeft:"300px", width:"calc(100% - 750px"}
    }
    if(screenSize === "desktop"){
        middleStyle = {marginLeft:"120px", width:"calc(100% - 470px"}
    }
    if(screenSize === "tablet"){
        middleStyle = {marginLeft:"120px", width:"calc(100% - 120px"}
    }
    
    if(screenSize === "mobile"){
        middleStyle = {marginLeft:"0px", width:"100%", paddingTop:"60px"}
    }
    
    return(

        <div
        className="text-primary-700  h-full pt-4 flex flex-col
       items-center"
       style={{...middleStyle}}
        >
            {children}
        </div>
    )

}


export default ControllerOverlay