import React, {useState} from "react"


 const IconButton = ({icon,onClick,className,bgColor,toggleIcon, ...props}) => {

    // const [currentIcon, setCurrentIcon] = useState(icon)
    // const [isToggleColor, setIsToggleColor] = useState(props?.isToggleColor)

    return(
        <button 
        // onMouseEnter = {()=>{setIsToggleColor(true)}}
        // onMouseLeave={()=>{setIsToggleColor(false)}}
        // style={{backgroundColor: isToggleColor ? bgColor : "transparent"}}
        className={`
        outline-none
        flex-shrink-0
        bg-accent
     
        flex items-center justify-center 
        ${  className}
      `}
        onClick = {onClick} 
        {...props}
        >
            {icon ? icon : null}
        </button>
    )
}

export default IconButton
