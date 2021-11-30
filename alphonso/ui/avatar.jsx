import React from "react"

const sizes = {
    sm:"w-14 h-14",
    md:"w-16 h-16",
    
}

const Avatar = ({url, width=50, height=50, optionStyles, ...props})=>{

    return (
        <div
        {...props}
        >
        {url ? (
      <img 
      className={`relative rounded-lg`}
         style={{objectFit:"cover", width:`${width}px`, height:`${height}px`}}
         src={url} 
         alt= "profile image"/> 
        )
        : (
            <div
            className="relative rounded-lg bg-primary-100"
            style={{objectFit:"cover", width:`${width}px`, height:`${height}px`}}
            >


            </div>
        )
    
    }
  

        </div>
        
    )
}


export default Avatar