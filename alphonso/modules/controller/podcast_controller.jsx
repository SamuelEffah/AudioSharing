import React, { useContext, useEffect, useState } from "react";
import Button from "../../ui/button";
import { PlayFilled, Spinner, Pause, Plus, Edit, HeartFilledIcon, HeartIcon } from "../../icons";
import IconButton from "../../ui/icon_button";
import { useRouter } from "next/router";
import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import { usePodcastStore } from "../../stores/usePodcastStore";
import axios from "axios"
import useSWR from 'swr'
import {usePlayerStore} from "./../../stores/usePlayerStore"
import {WSContext} from "./../ws/ws_provider"

import {openUploadModal, useModalStore} from "../../shared-components/modal/upload_modal"
const fetcher = (url)=> axios.get(url).then((res)=>res.data)


const getPodcastUrl=(name="")=>{
  return name.replace(/\s+/g, "-").toLowerCase()
}

const CategoryPill = ({ category }) => {
  return (
    <div
      style={{ backgroundColor: "#1F2125", color: "#F4F4F4" }}
      className="flex mr-2 items-center justify-center rounded-full h-8 px-4 w-max"
    >
      <p className="text-sm">{category}</p>
    </div>
  );
};

const Episode = ({ episode,className, ...props }) => {
  const {podcast} = usePodcastStore()
  const isPlaying = usePlayerStore((s)=> s.episode.id == episode.id && s.isPlaying)
  const isPause = usePlayerStore((s)=> s.episode.id == episode.id && s.isPause)
  const {play, pause,ref, playCurrent } = usePlayerStore()
  
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
      let data = {
        description: episode.description,
        episodes: episode.file_name,
        id: episode.id,
        inserted_at: episode.inserted_at,
        name: episode.name,
        num_of_listeners: episode.num_of_listeners,
        podcast_id:podcast.id,
        poster_url: podcast.poster_url,
        creator_id: podcast.creator_id,
        creator_name: podcast.creator_name,
      }
      play(data)
    }
  }
  
  return (
    <div className={`flex w-full mb-4  relative ${className}`}>
      <div
        style={{ width: "60px", height: "60px" }}
        className="bg-primary-100 flex-shrink-0 rounded-xl"
      >
        <img
              className="w-full h-full bg-primary-100  rounded-l-xl"
              style={{ objectFit: "cover" }}
              src={podcast.poster_url}
              alt="podcast poster"
            />

      </div>
      <div 
      style={{width:"calc(80% - 60px)"}}
       className="flex justify-between items-center">
       
      <div className="pl-2.5 pr-1 relative">
        <p className="pb-1.5">{episode.name}</p>
        <small className="w-10/12  text-primary-300 ">
         {episode.description}
        </small>
      </div>
      <div className="">

        <IconButton
        bgColor="#DB0202"
        isToggleColor = {true}
          className="w-12 h-12 rounded-full"
          icon={
            isPlaying ? (
          <Pause width={20} height={20} />
        ) : (
          <PlayFilled width={20} height={20} />
        )
        }
        
          onClick={handleMedia}
        />
      </div>

      </div>
    </div>
  );
};

const PodcastController = ({...props }) => {
    const screenSize  = useDetectScreenSize()
    const {setType,setCurrentState} = useModalStore()
    const router = useRouter()
    const {clear, podcast, episodes, addFav} = usePodcastStore()
    const [isFav, setIsFav] = useState(podcast?.is_favorite || undefined )
    const {name} = router.query
    const {user} = useContext(WSContext)
    const {data, error} = useSWR(`http://localhost:4001/podcast/episodes/${podcast.id}`, fetcher)
    const [episodesList, setEpisodesList] = useState(data)
    
    useEffect(()=>{
      if(podcast){
        router.push(`/podcast/${getPodcastUrl(podcast.name)}`)
      }
    },[podcast])


    
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
  },[podcast.id, user.id])

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
   <ControllerOverlay>
      <div style={{ width: "96%" }} className="flex items-center">
        <h3 className="font-medium text-2xl capitalize">{name.replace("-", " ")}</h3>
       {user && user.id == podcast.creator_id ?(

        <div className="border-b  text-primary-300 cursor-pointer flex items-center justify-center ml-10">
          <span>
            <Edit/>
          </span>
          <p 
          onClick={()=>{
            setType("edit")
            setCurrentState(1)
            openUploadModal(true)
          }}
          className="pl-1.5">
          Edit podcast</p>
        </div>

       ): null}
       
     </div>
      <div style={{ width: "96%" }} className={` relative flex mt-12
        ${screenSize === "mobile" ? 'flex-col items-center' : 'flex-row'}
      
      `}>
        <div
          style={{ width: (screenSize === 
          "mobile" ? "120px": "180px"), height: (screenSize === "mobile"? "120px" :"180px" )}}
          className=" bg-primary-100 rounded-xl"
        >
             <img
              className="w-full h-full bg-primary-100  rounded-l-xl"
              style={{ objectFit: "cover" }}
              src={podcast.poster_url}
              alt="podcast poster"
            />
            
        </div>

        <div style={{ width: screenSize === "mobile" ? "100%" : "calc(100% - 200px)" }} 
        className={`pt-1 pl-4  flex flex-col ${screenSize === "mobile" ? 'items-center': ''}`}>
        {isFav != undefined ? (
         <div className="flex items-center mb-2">
            <button
            onClick={()=>{
              setIsFav(!isFav)
              handleFav()
            }}
            >
            {isFav ? (<HeartFilledIcon />): (<HeartIcon/>)}
            </button>
           <p className="text-xs text-primary-300 pl-1.5">Add to favorites</p>
         </div>


        ) : null}
          <h4 className="text-xl text-semibold capitalize">{name.replace("-", " ")}</h4>
          <p className={`${screenSize === 'mobile' ? 'w-11/12 pt-1.5 text-center' : 'w-9/12 pt-3'} text-base text-primary-300`}>
           {podcast.description}
          </p>

          <div className="pt-6 flex items-center">
          {podcast.tags.map((t,i)=>{
            return (
              <CategoryPill key={i} category={t} />
            )
          })}
           
          </div>
          <div>
            <p style={{fontSize:'12px'}} className="mt-4 text-primary-300">{podcast?.creator_name}</p>
          </div>
        </div>
      </div>
      <div style={{ width: "96%" }} className=" relative mt-10">
        <div
          style={{ width: (screenSize==="mobile" ? "100%"
           : "calc(100% - 180px)"), marginLeft: screenSize==="mobile" ? "0px" : "180px" }}
          className="pl-6 relative"
        >
          <div className="w-full flex items-center">
            <p className="text-xl text-semibold">All Episodes</p>
           
           {user && user.id == podcast.creator_id ? (

            <button
            onClick={()=> {
              setType('episode')
              openUploadModal(true)
              }}
            style={{
              fontSize:'13px',
              color:"#000",
              backgroundColor:"#D7DBDC"
            }}
             className="
              flex items-center px-3 py-2 ml-4 text-base font-bold justify-center border-none rounded-full
            ">
              <Plus />
              <span>Add New Episode</span>
            </button>


           ) : null}
          </div>
          <div className="w-full mt-7 relative">
          {data && data.episodes ?  (
            <div>
            {data.episodes.map((e)=>{
              return (
                <Episode
                episode={e}
                key= {e.id}
                
            className={`${screenSize === 'mobile'? 'w-11/12' : 
            'w-9/12' }`}
             />
              )
            })}
            </div>

          ) : (
            <div className="w-full flex items-center justify-center">
                <Spinner/>
            </div>
          )}
    
          </div>
        </div>
      </div>
      </ControllerOverlay>
  );
};

export default PodcastController