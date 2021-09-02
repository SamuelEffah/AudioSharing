import React from "react"
import Avatar from "./avatar"


const TopHostCard = ({user,marginX=0,...props})=>{

    return (
        <div 
        style={{width: "100px",height:"170px", marginLeft: marginX}}
        className="flex flex-col  relative items-center">
            <div
            className="h-24  w-full"
            style={{height:"110px"}}
            >
            <Avatar
            width={100}
            height={110}
            />
        
            </div>
            <div 
            className="pt-2.5"
            style={{height:"60px"}}
            >
                <p className="text-base font-medium">Jacob Kim</p>
                <small
                style={{color: '#808080'}}
                className="text-sm"
                >122 episodes</small>
            </div>
        </div>
    )
}

export default TopHostCard