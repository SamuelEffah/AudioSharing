import React from "react"
import Avatar from "./avatar"

//mock data 
import Users from "../data/users"

const FollowerItem = ({user}) =>{

    return (
        <div className="flex b relative h-16 pl-6 my-3 w-full items-center">
            <div>
                <Avatar url={user.profile_url} width={50} height={50}/>
            </div>
            <div className="pl-3  w-10/12 flex flex-col">
                <p className="text-base pb-1.5">{user.full_name}</p>
                <small
                 className="text-xs  text-accent-100 underline">Curremt listening to Growing up Ep. 1</small>
            </div>
        </div>
    )
} 

const FollowersActivity = ({className, ...props})=>{

    return(
        <div className="bg-primary-100
        flex flex-col items-center
         mb-10 h-auto w-11/12 rounded-xl">
       
       <div
       className="flex items-center py-4 justify-between w-11/12"
       >
       <h3
       className="text-xl font-semibold"
       >Followers Activity</h3>
        <small 
        style={{color: '#984634'}}
        className="text-sm text-accent-hover">see all</small>
       </div>
       <div className="w-full relative">
        {Users.sort(() => 0.5 - Math.random()).slice(0,3).map((u)=>{
            return <FollowerItem key={u.id} user={u}/>
        })}
       </div>
        </div>

    )
}


export default FollowersActivity