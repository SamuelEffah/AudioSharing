import React, {useRef, useState} from "react"
import { useDetectOutside } from "../shared-hooks/useDetectOutside"




export const Dropdown = ({children,visible=true,setVisible ,className,header, ...props})=>{
    const ref = useRef(null)
     useDetectOutside(ref,()=>setVisible(false))
   
   
     return (
       <div
       className = "relative"
       ref={ref}
       {...props}
       >
       {header}
   
       {
         visible ? (
           <div
             className={` bg-accent 
             max-h-96 text-primary-100 z-50 ${className}`}
           >
            {children}
           </div>
       
   
         ) : null 
       }
   
       </div>
     )
   
   
   }

