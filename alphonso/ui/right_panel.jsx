import React from "react"



const RightPanel = ({children,...props}) =>{

    return(
        <div
        style={{width:'450px'}}
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