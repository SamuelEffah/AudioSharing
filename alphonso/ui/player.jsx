import React, {useCallback, useEffect, useState, useRef} from "react"
import {Spinner ,Next, Pause, Play, PlayFilled, Previous } from "../icons"
import Avatar from "./avatar"
import Image from 'next/image'

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
    const {playCurrent,isPlaying,isPause ,pause, episode, addRef} = usePlayerStore()
    const audioRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(()=>{
        if(audioRef.current){
            addRef(audioRef)
        }
    },[audioRef])
    useEffect(()=>{
        if(audioRef.current){
            if(audioRef.current && episode && episode.episodes){
                setIsLoading(true)
            }
           let g =  document.getElementById("audio_player")
            g.oncanplay = function(){
                setIsLoading(false)
                if(isPlaying){
                    audioRef.current.play()
                    playCurrent()
                }
            }
        }
    },[audioRef, episode])
        return (
        <div
        style={{color:'#000'}}
         className="bg-primary-700 relative p-3 w-11/12 h-56 rounded-xl">
         {!isPlaying && !isPause ?  (
             <div className="flex items-center flex-col">
             <p className="text-lg">No episode playing.</p>
            <Image  src="/cherry.png" alt="illustration" width="120" height="120" />

             </div>
         ): (

            <div className="relative">


<div className="flex items-center">
    <h4
    className="text-md font-semibold mr-3"
    >Current Playing</h4>
    {isLoading ? (
    <Spinner className="h-5 w-5"/>

    ) : null}
</div>


<audio
id="audio_player"
ref={audioRef}
controls
src={ episode?.episodes}
style={{display: 'none'}}
 />

<VolumeSlider/>

<div className="flex flex-col relative items-center pt-4">
    <div className="flex w-full">
            <Avatar url={episode?.poster_url} width={60} height={60}/>
            <div className="pl-3">
            <p 
            className="text-xl font-bold "
            >{episode?.name}</p>
           <small className="text-base">{episode?.creator_name}</small> 
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
                    if(audioRef.current){
                        audioRef.current.pause()
                        pause()
                    }
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
                    if(audioRef.current){
                        audioRef.current.play()
                        playCurrent()
                    }
                }}
            />


            )}
           
            <PlayerBtn
                icon={<Next width={22} height={22}/>}
            />
        </div>
</div>
</div>


             
         )}
      
        </div>
    )
}

export default Player