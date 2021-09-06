import React from "react"
import Avatar from "./avatar"
import Link from "next/link"

const TopHostCard = ({user,marginX=0,...props})=>{

    return (
        <Link href={`/users/${user.username}`}>
            <a>
        <div 
        style={{width: "100px", marginLeft: marginX}}
        className="flex flex-col  relative items-center">
            <div
            className="h-24  w-full"
            style={{height:"110px"}}
            >
            <Avatar
            url={user.profile_url}
            width={100}
            height={110}
            />
            </div>
            <div 
            className="pt-2.5"
           
            >
                <p className="text-base font-medium">{user.full_name}</p>
                <small
                style={{color: '#808080'}}
                className="text-sm"
                >{user.episodes} episodes</small>
            </div>
        </div>
            </a>
        </Link>
    )
}

export default TopHostCard