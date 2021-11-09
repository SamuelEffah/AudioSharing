import React, {useMemo, useEffect,useState} from "react"
import Link from 'next/link'
import {useRouter} from "next/router"
import {Spinner} from "../../icons"
import Avatar from "../../ui/avatar"
import axios from "axios"
import useSWRImmutable from 'swr/immutable'
import { useProfileStore } from "../../stores/useProfileStore"
const fetcher = (url)=> axios.get(url).then((res)=>res.data)

const controllerLabels = ["podcast", "followers", "following"]


const FollowItem = ({user, ...props})=>{
        return (
           

            <div

            className="flex w-full  cursor-pointer hover:opacity-80 mb-1 py-3"
            key={user.username}
            {...props}
            >

            <Avatar url={user.profile_url}/>
            <div className="ml-2">
            <div>
            <p className="text-base mr-1.5">{user.fullname}</p>
            {/* {user.is_verfied ? <VerifiedBadge/> : null} */}
            </div>
                <small className="text-primary-300">@{user.username}</small>
            </div>
            </div>

            
        )
    }



export const FollowsController = ({id,username, size=0, indx =0 ,...props})=>{
    const router = useRouter()
    const {addProfile} = useProfileStore()
    const [isLoading, setIsLoading] = useState(true)
    const {data: followingList, error: followingError} =  useSWRImmutable( `http://localhost:4001/users/${username}/following`, fetcher)
    const {data: followersList, error: followerError} =  useSWRImmutable( `http://localhost:4001/users/${username}/followers`, fetcher)

    let main = null
    if(!followersList && indx == 1 || !followingList && indx == 2) {
        main = (
            <div className="w-full flex items-center justify-center">
                <Spinner/>
            </div>
        )
    }

    if(followersList && followersList.length == 0 && indx  == 1 ||
        followingList && followingList.length == 0 && indx  == 2 
        ){
            
            main = (
            <div className="flex mt-5 w-full justify-center items-center">

                <p className="mt-5 text-lg ">
                 Nothing to show yet..
                </p>
            </div>
        )
    }

    if(followersList && followersList.length > 0 &&  indx == 1){
        
        main = (
                  <div className=" w-full">


                {followersList.map((f)=>{
                    return (
                        <FollowItem 
                        onClick={(e)=>{
                            addProfile(f)
                            router.push(`/profile/${f.username}`)
                        }}
                         key={f.username} user={f}/>
                    )
                })

                }
            </div>
        )
    }

    if(followingList && followingList.length > 0 &&  indx == 2){
        main = (
                  <div className=" w-full">


                {followingList.map((f)=>{
                    return (
                        <FollowItem 
                         onClick={(e)=>{
                            addProfile(f)
                            router.push(`/profile/${f.username}`)
                        }}
                         key={f.username} user={f}/>
                    )
                })

                }
            </div>
        )
    }
    

    return (
        <div className="w-full relative overflow-y-auto">
           {main}
        </div>
    )

}