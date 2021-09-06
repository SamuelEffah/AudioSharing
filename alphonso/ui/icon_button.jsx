import React, {useState} from "react"


 const IconButton = ({icon,onClick,className,toggleIcon, ...props}) => {

    const [currentIcon, setCurrentIcon] = useState(icon)

    return(
        <button 
   
        className={`
        outline-none
        flex-shrink-0
        bg-accent
        rounded-full
        flex items-center justify-center 
        ${className}
        `}
        onClick = {onClick} 
        {...props}
        >
            {icon ? icon : null}
        </button>
    )
}

export default IconButton
