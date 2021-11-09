import React, {useCallback, useEffect, useState, useRef} from "react"
import { Next, Pause, Play, PlayFilled, Previous } from "../icons"
import Avatar from "./avatar"

//mock data 
import Podcasts from "../data/podcasts"
import VolumeSlider from "./volume_slider"
import { usePlayerStore } from "../stores/usePlayerStore"

const PlayerBtn = ({className,icon,...props})=>{

    return (
        <button
        className={`w-12 h-12 mx-4 flex-shrink-0 rounded-full flex items-center justify-center ${className}`}
        
        {...props}
        >
            {icon}
        </button>

    )
}


const Player = ({className,...props}) =>{
    const {playCurrent,isPlaying ,pause, episode, addRef} = usePlayerStore()
  
        return (
        <div
        style={{color:'#000'}}
         className="bg-primary-700 relative p-3 w-11/12 h-56 rounded-xl">
            <div>
                <h4
                className="text-md font-semibold"
                >Current Playing</h4>
            </div>
            {/* <audio
            id="audio_player"
            ref={audioRef}
            controls
        
            // style={{display: 'none'}}
             >
             <source id="audio_source"  type="audio/mpeg"/>
             </audio> */}
            <VolumeSlider />
          
            <div className="flex flex-col relative items-center pt-4">
                <div className="flex w-full">
                        <Avatar url={episode?.poster} width={60} height={60}/>
                        <div className="pl-3">
                        <p 
                        className="text-xl font-bold "
                        >{episode?.name}</p>
                       <small className="text-base"></small> 
                        </div>
                   
                </div>
                    <div className="mt-6 flex items-center justify-center w-full">
                        <PlayerBtn
                            icon={<Previous width={22} height={22}/>}
                        />
                        
                        {isPlaying? (
                            <PlayerBtn
                            className="bg-accent w-16 h-16"
                            icon={  
                                 <Pause width={22} height={22}/>
                                
                                 }
                            onClick={()=>{
                                console.log("pause")
                            }}
                        />

                        ) : (

                            <PlayerBtn
                            className="bg-accent w-16 h-16"
                            icon={ 
                                 <PlayFilled width={24} height={24}/>
                                 }
                            onClick={()=>{
                                console.log("play")
                            }}
                        />


                        )}
                       
                        <PlayerBtn
                            icon={<Next width={22} height={22}/>}
                        />
                    </div>
            </div>
        </div>
    )
}

export default Player