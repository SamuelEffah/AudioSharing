import React from "react"


 const Button = ({icon,isLoading,label,height=42,className, ...props}) => {

    return(
        <button
        disabled={isLoading}
        style={{color:"#fff", height:`${height}px`}}
        className={`
        outline-none

        rounded-full
        flex items-center justify-center 
        ${className ? className  : 'w-10/12 bg-accent text-lg font-semibold'}
        ${isLoading ? 'cursor-not-allowed opacity-70' : 'opacity-100'}
        `}
        
        {...props}
        >
            {icon ? icon : null}
            <span className="">
            {label}
            </span>
        </button>
    )
}

export default Button
