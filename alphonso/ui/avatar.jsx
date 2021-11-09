import React from "react"

let profile_image = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"

const sizes = {
    sm:"w-14 h-14",
    md:"w-16 h-16",
    
}

const Avatar = ({url, width=50, height=50, optionStyles, ...props})=>{

    return (
        <div
        {...props}
        >
        <img 
     className={`relative rounded-lg`}
        style={{objectFit:"cover", width:`${width}px`, height:`${height}px`}}
        src={`${url ? url : profile_image}`} 
        alt= "profile image"/>    
        </div>
        
    )
}


export default Avatar