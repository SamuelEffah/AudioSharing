import React from "react"
import Button from "./button"


const Banner = ({onClick, className, ...props}) =>{


    return(
        <div 
        style={{width: '96%'}}
        className={`relative bg-primary-100 h-60 mb-6 rounded-xl ${className}`}
        onClick={onClick}
        {...props}
        >
            <div className="w-8/12 p-5 mt-2">    
            <h2  
            className="text-2xl font-semibold
             "
             style={{color:"#fff"}}
             >
                Become a Creator
            </h2>
            <p
            className="text-sm mt-3 text-primary-300"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eaque nulla ad amet minus
             facilis enim laboriosam delectus ullam impedit.</p>

            <Button
                className="mt-10 w-48"
                label="Start Today"

            />
            
            </div>
        </div>

    )
}

export default Banner