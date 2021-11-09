import React, { useContext, useEffect, useRef, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Camera } from "../../icons/camera_icon";
import { WSContext } from "../../modules/ws/ws_provider";
import { useUploadAudioStore } from "../../stores/useUploadAudioStore";
import Button from "../../ui/button";
import { Modal } from "../../ui/modal";
import Tags from "../../ui/tags";
import { InputField } from "../input_field";
import axios from 'axios'
import { usePodcastFormStore } from "../../stores/usePodcastFormStore";
import {useTokenStore} from "../../stores/useTokens"
import { openUploadModal,useModalStore } from "./upload_modal";

const FormModalCont = ({ ...props }) => {
const {setCurrentState} = useModalStore()
  const {status,} = useUploadAudioStore()
const {accessToken, refreshToken} = useTokenStore()
  const [episodeName, setEpisodeName]  = useState("")
  const [episodeDescription, setEpisodeDescription] = useState("")
    const[isPublish, setIsPublish] = useState(false) 
  const {user, setUser} = useContext(WSContext)
  const {updatePodcast, podcastDetails,clear} = usePodcastFormStore()
 

  useEffect(()=>{
    if(isPublish){
      

     
        let ws = new WebSocket("ws://localhost:4001/socket")
        let data = {
            op: "create_podcast",
            podcast: podcastDetails,
            access_token: accessToken,
            refresh_token: refreshToken,
        }
        ws.onopen=()=>{
        ws.send(JSON.stringify(data))
        }
        ws.onmessage=(e)=>{
      if(e.data){
       
       
        if(user && user.is_creator){
          
         openUploadModal(false)
         clear()
         setCurrentState(0)
       }
       else{
         setCurrentState(3)
         setUser(JSON.parse(e.data))
       }
      }
    }
    
    }
    return()=>{
        setIsPublish(false)
    }
  },[isPublish])
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(episodeName && episodeDescription){
      let podcastInfo = {
        episodeName,
        episodeDescription,
       
      }
      updatePodcast(podcastInfo)
      setIsPublish(true)
    }

    else{
      console.log("some data missing")
    }
  }


  return (
 
      <div style={{ width: "600px", height:"max-content" }} className="relative flex flex-col">
        <div 
        style={{backgroundColor:'#0D0D0F'}}
         className="fixed flex items-center  ">
          <p
            style={{ color: "#6D6D6D" }}
            className=" 
        text-sm pr-2.5
        "
          >
            Podcast Details
          </p>
          <p style={{ color: "#BABABA" }} className="font-medium text-sm ">
            Episode Details
          </p>
        </div>

        <div
          style={{ height: "90%" }}
          className="w-full pt-10 overflow-y-auto relative"
        >
    

          <form action="">
            <InputField label="Episode Name *"  value={episodeName} 
              onChange={e=>setEpisodeName(e.target.value)}

            />
          
            <InputField label="Episode Description *" value={episodeDescription}
            onChange={e=>setEpisodeDescription(e.target.value)}
             textarea={true} />
          </form>
   
        </div>
        <div
        className="flex mt-8"
        >
       <div className="w-full flex justify-end">
   ]
           <Button
           
               className="w-32 bg-accent"
               label="Publish"
               onClick ={handleSubmit}
           />
       </div>
        </div>
   
      </div>

  );
};

export default FormModalCont;
