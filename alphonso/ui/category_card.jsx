import React from "react"


const CategoryCard = ({to,icon,label, className,marginX=0, onClick, ...props}) =>{

    return(
        <div
        style={{width: '210px', marginLeft: marginX}} 
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
    )
}




export default CategoryCard