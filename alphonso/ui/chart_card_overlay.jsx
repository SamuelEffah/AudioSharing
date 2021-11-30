import React from "react"

const cardSizes = {
    sm:{
        width: "300px",
        height: "max-content"
    },
    
    md:{
        width: "440px",
        height: "405px"
    },
    full:{
        width: "100%",
        height: "360px"
    },

}

const ChartCardOverlay = ({size="full",title="",className,children,...props})=>{

    return (
        <div 
        style={{width:cardSizes[size]["width"], height:cardSizes[size]["height"],
        backgroundColor:"rgba(255,255,255,0.8)", color:"#000"}}
        className={`p-2  relative mb-5 flex-col rounded-xl justify-center items-center`}>
        <div className="w-full px-2 py-1.5">
            <h4 className="text-xl  mb-3  mt-2">{title}</h4>
        </div>
        {children}
        </div>
    )
}


export default ChartCardOverlay;