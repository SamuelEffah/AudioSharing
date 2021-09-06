import React from "react"
import {useMediaQuery} from "react-responsive"



export  const useDetectScreenSize = ()=>{
const isBigScreen = useMediaQuery({ minWidth: 1336 });
const isDesktop = useMediaQuery({ minWidth: 1080 });
const isTablet = useMediaQuery({ minWidth: 620 });
const isMobile = useMediaQuery({ maxWidth: 619 });

if(isBigScreen){
    return "big-screen"
}
if (isDesktop){
    return "desktop"
}
if(isTablet){
    return "tablet"
}
if(isMobile){
    console.log("mobile size....")
    return "mobile"
}

return "big-screen"
}
