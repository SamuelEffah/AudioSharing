import React from "react"


const InfoCard = ({color,desc, number ,...props})=>{
    
    return (
        <div
        style={{width:"200px", height: "80px", color:color ? color:"#38b072",
        backgroundColor:"rgba(255,255,255,0.8)"}}
         className="flex items-center justify-center mr-5 rounded-xl">
            <div className="flex flex-col items-center">
                <h4 className="text-2xl font-semibold">{number}</h4>
                <small className="">{desc}</small>
            </div>
        </div>
    )
}


export default InfoCard