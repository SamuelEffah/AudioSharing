import React, {useCallback, useEffect, useState} from "react"
import { Next, Pause, Play, PlayFilled, Previous } from "../icons"
import Avatar from "./avatar"

//mock data 
import Podcasts from "../data/podcasts"
import VolumeSlider from "./volume_slider"

const PlayerBtn = ({onClick,className,icon,...props})=>{

    return (
        <button
        className={`w-12 h-12 mx-4 flex-shrink-0 rounded-full flex items-center justify-center ${className}`}
        onClick={onClick}
        {...props}
        >
            {icon}
        </button>

    )
}


const Player = ({className,...props}) =>{

    const [isPlay, setIsPlay] = useState(true)

    return (

        <div
        style={{color:'#000'}}
         className="bg-primary-700 relative p-3 w-11/12 h-56 rounded-xl">
            <div>
                <h4
                className="text-md font-semibold"
                >Current Playing</h4>
            </div>
         
            <VolumeSlider/>
          
            <div className="flex flex-col relative items-center pt-4">
                <div className="flex w-full">
                        <Avatar url={Podcasts[0].poster} width={60} height={60}/>
                        <div className="pl-3">
                        <p 
                        className="text-xl font-bold "
                        >{Podcasts[0].name}</p>
                       <small className="text-base">{Podcasts[0].creator}</small> 
                        </div>
                   
                </div>
                    <div className="mt-6 flex items-center justify-center w-full">
                        <PlayerBtn
                            icon={<Previous width={22} height={22}/>}
                        />
                        
                        <PlayerBtn
                            className="bg-accent w-16 h-16"
                            icon={ isPlay ? 
                                 <Pause width={22} height={22}/>
                                 : 
                                 <PlayFilled width={24} height={24}/>
                                 }
                            onClick={(e)=>{
                                e.preventDefault()
                                setIsPlay(!isPlay)
                            }}
                        />
                        <PlayerBtn
                            icon={<Next width={22} height={22}/>}
                        />
                    </div>
            </div>
        </div>
    )
}

export default Player