import React from "react"


 const Button = ({icon,label,height=42, onClick,className, ...props}) => {

    return(
        <button
        style={{color:"#fff", height:`${height}px`}}
        className={`
        outline-none
        bg-accent
        rounded-full
        flex items-center justify-center 
        ${className ? className : 'w-10/12 '}
        `}
        onClick = {onClick} 
        {...props}
        >
            {icon ? (<span>{icon}</span>) : null}
            <span className="text-lg font-semibold">
            {label}
            </span>
        </button>
    )
}

export default Button
