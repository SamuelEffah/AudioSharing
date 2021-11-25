import React, { useContext, useEffect, useState } from "react";
import { Clock, PlayFilled, HeartFilledIcon, HeartIcon } from "../icons";
import Link from "next/link";
import { Play, Pause } from "../icons";
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize";
import { usePlayerStore } from "../stores/usePlayerStore";
import Button from "./button";
import router from "next/router";
import axios from "axios";
import moment from "moment";
import { usePodcastStore } from "../stores/usePodcastStore";
import { WSContext } from "../modules/ws/ws_provider";
const playerStatus = (isPlaying, isPause)=>{

  if(isPlaying && !isPause){
    return "Playing..."
  }

  if(!isPlaying && isPause){
    return "Pause"
  }
  if(!isPlaying && !isPause){
    return "Play now"
  }
}

const descriptionShortener = (description, maxLength=62)=>{
  let shortDesc = ""
  let temp = description
  if(temp.length > maxLength){
    shortDesc = temp.slice(0, maxLength)
    return shortDesc + "..."
  }
  return description
}

const getPodcastUrl=(name="")=>{
  return name.replace(/\s+/g, "-").toLowerCase()
}

const PreviewPlayBtn = ({isPlaying,isPause,...props}) => {
   const {ref} = usePlayerStore()
  
  return (
    <div
      
      className="flex cursor-default  items-center h-10 rounded-full w-36"
      style={{ backgroundColor: "#1E1F22" }}
      {...props}
    >
      <div
        className="w-10 h-10 flex items-center justify-center
     rounded-full bg-accent"
      >
        {isPlaying ? (
          <Pause width={20} height={20} />
        ) : (
          <PlayFilled width={20} height={20} />
        )}
      </div>
    
      <p className="pl-1.5">{playerStatus(isPlaying,isPause)}</p>
    </div>
  );
};

const MobilePreviewCard = ({podcast,marginX = 0,...props}) => {
  return (
   

    <div 
       onClick= {(e)=>{
                addPodcast(podcast)
                router.push(`/podcast/${getPodcastUrl(podcast.name)}`)
              }}
    style={{ width: "150px", height: "200px", marginLeft:marginX }} className="relative">
      <div style={{ width: "150px", height: "150px" }} className="relative">
        <img
          className="w-full h-full  rounded-xl"
          style={{ objectFit: "cover" }}
          src={podcast.poster_url}
          alt="podcast poster"
        />
      </div>
      <div
      style={{height:"calc(100% - 150px)"}} 
      className="relative pt-1.5">
        <p className="font-medium text-lg">{podcast.name}</p>
        <small className="text-primary-300 text-base">{podcast.creator}</small>
      </div>
    </div>

  );
};

const PreviewCard = ({podcast,className, isfavorite=false, isOwner=false,  marginX = 0, ...props }) => {
  const isPlaying = usePlayerStore((s)=> s.episode.id == podcast.id && s.isPlaying)
  const isPause = usePlayerStore((s)=> s.episode.id == podcast.id && s.isPause)
  const {play, pause, playCurrent,episode, ref} = usePlayerStore()
  const [isFav, setIsFav] = useState(podcast?.is_favorite)
  const {addPodcast,addFav} = usePodcastStore()
  const {user} = useContext(WSContext)
  

  useEffect(()=>{
    const checkFav = async()=>{

      let favData = {
        podcast_id: podcast.id,
        creator_id: user.id
      }
      await axios.post("http://localhost:4001/podcast/check-favorite",{data: favData})
        .then((e)=>{
          if(e.data){
     
            addFav(e.data.is_favorite)
            setIsFav(e.data.is_favorite)
            
          }
        })
    }
    checkFav()
  },[podcast.id, user.id,])
  
  const screenSize = useDetectScreenSize();
  
  const handleMedia= ()=>{
    if(isPlaying){
      ref.current.pause()
      pause()
    }
    if(isPause){
      ref.current.play()
      playCurrent()
    }
    if(!isPlaying && !isPause){
      play(podcast)
    }
  }

  const handleFav = async()=>{
    let favData = {
      id: podcast.id,
      act: !isFav
    }
    await axios.post("http://localhost:4001/podcast/favorite",{data: favData})
      .then((e)=>{
        if(e.data){
          addFav(!isFav)
          setIsFav(!isFav)
        }
      })

  }
  
  return (
    <>
      {screenSize === "mobile" ? (
        <MobilePreviewCard podcast={podcast} marginX={marginX} {...props} />
      ) : (
        <div
          style={{ width: "420px", marginLeft: marginX }}
          className={`flex-shrink-0 bg-primary-100 flex h-48 rounded-xl
      ${className}
      `}
          {...props}
        >
          <div style={{ width: "150px" }}>
            <img
              className="w-full h-48 bg-primary-100  rounded-l-xl"
              style={{ objectFit: "cover" }}
              src={podcast.poster_url}
              alt="podcast poster"
            />
          </div>
          <div
            className="flex-shrink-0 pl-4"
            style={{ width: "calc(100% - 150px)" }}
          >
           
                <p
                onClick= {(e)=>{
                addPodcast(podcast)
                router.push(`/podcast/${getPodcastUrl(podcast.name)}`)
              }}
                 className="font-medium text-xl  cursor-pointer py-2">{podcast.name}</p>
            
            <div>
         
              <small className={`text-primary-300 text-base ${isOwner ? 'font-semibold text-primary-700' : ''}`}>
                {isOwner ? 'You' :  podcast.creator}
              </small>
              
              <small className="text-primary-300 text-base pl-4">
                { podcast.num_of_eps} Episodes
              </small>
            </div>

            {isOwner ? (
              <div className="mt-3">
              <small className="text-primary-300 text-base">
                Publish on {moment(podcast.inserted_at).format("LL")}
              </small>
              </div>

            ) : (
            <div>
              <p
                className=" 
          mt-2.5
          text-base text-primary-300"
              >
                {descriptionShortener(podcast.description)}
              </p>
            </div>


            )}
            {isOwner ? (
            <div className="mt-4">
              <Button
              onClick= {(e)=>{
                addPodcast(podcast)
                router.push(`/podcast/${getPodcastUrl(podcast.name)}`)
              }}
              label="View"

              />
              
            </div>

            ) : (

            <div className="w-full relative">
              <div className="mt-3.5 flex justify-between items-center">
      
                <PreviewPlayBtn 
           
                isPlaying={isPlaying}
                isPause={isPause}
                onClick={handleMedia}
                  />
              {isfavorite ? (
              <button
              onClick={handleFav}
              className="mr-5"
              >
                  {isFav ? (<HeartFilledIcon />): (<HeartIcon/>)}
              </button>
              ) : null}
              </div>
            </div>

            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewCard;
