import React from "react"
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize"
import Link from "next/link"

const CategoryCard = ({to,icon,label, className,marginX=0, onClick, ...props}) =>{
    const screenSize = useDetectScreenSize()
    return(
        <Link href={to}>
            <a>
        <div
        style={{width: screenSize === "mobile"? "180px" : '210px', marginLeft: marginX}} 
        className="bg-primary-100
        cursor-pointer
         rounded-lg flex h-32 items-center justify-center flex-col">
            <div
            style={{backgroundColor: '#343741'}} 
            className="w-14 h-14 rounded-full flex items-center justify-center">
                {icon ? icon : null}
            </div>
            <p
            className="mt-3"
            >{label}</p>
        </div>
                
            </a>
        </Link>
    )
}




export default CategoryCard