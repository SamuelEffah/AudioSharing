import React from "react"
import {Input} from "../ui/input"




export const InputField = ({label,icon,isError,
    className,
    disabled = false,
    errorMsg,...props})=>{
    
    const errorClassName = isError ? "border-2 text-red" : ""
    const errorIconClassName  = isError ? "text-accent" : "text-primary-300"

    return (
        <div className={`mb-5 flex-shrink-0`}>
        <p className="text-primary-600 mb-0.5 ">{label}</p>
        <div className={`bg-primary-100 rounded flex ${className}
         ${disabled ? 'cursor-not-allowed': ''}   ${errorClassName} `}>
            <Input  disabled={disabled} {...props}/>
        </div>
        {isError ? (<small className="pt-1 text-red text-sm">{errorMsg}</small>) :  null}
        </div>
    )

}
