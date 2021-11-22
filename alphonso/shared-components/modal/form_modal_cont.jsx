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
import { usePodcastStore } from "../../stores/usePodcastStore";
import { Spinner } from "../../icons";

const FormModalCont = ({ ...props }) => {
const {accessToken, refreshToken} = useTokenStore()
const [isLoading, setIsLoading] = useState(true)
  const [episodeName, setEpisodeName]  = useState("")
  const [episodeDescription, setEpisodeDescription] = useState("")
    const[isPublish, setIsPublish] = useState(false) 
    const {podcast,addEpisodes, episodes} = usePodcastStore()
  const {user, setUser} = useContext(WSContext)
  const {file, status, updateStatus} = useUploadAudioStore()
  const {type, setCurrentState} = useModalStore()
  const {updatePodcast, podcastDetails,clear} = usePodcastFormStore()
  if (file && status == null && type == 'episode'){
      let userData = {
            "user_id": user.id,
            "type": "audio"
        }
        updateStatus("Uploading file...")
        let formData = new FormData()
        formData.append('file', file)
        formData.append('data', JSON.stringify(userData))
        setIsLoading(true)
        axios({
            method: "POST",
            url: "http://localhost:5000/api/v1/audio",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        }).then((res)=>{
            console.log(res.data)
            if(res.data.status == "successful"){
              updatePodcast({file_name: res.data.file_url})
              updateStatus("Upload Completed")
          
            }
        }).catch((e)=>{
            console.error(e)
        })
  }

  // }


  useEffect(()=>{
    if(type=="episode" && podcastDetails && podcastDetails.file_name){
      setIsLoading(false)
    }
    if(type == "podcast"){
      setIsLoading(false)
    }
  },[podcastDetails,type])


  // useEffect(()=>{
  //   if(isPublish){
  //     console.log(podcastDetails)
  //   }
  // },[isPublish])

  useEffect(()=>{
    if(isPublish){
      

     
        let ws = new WebSocket("ws://localhost:4001/socket")
        let data = {}
        if(type == "podcast"){
          data = {
              op: "create_podcast",
              podcast: podcastDetails,
              access_token: accessToken,
              refresh_token: refreshToken,
          }
          
        }
        else{
          data = {
            op: "upload_episode",
            episode: podcastDetails,
            access_token: accessToken,
            refresh_token: refreshToken,
        }
        }
        ws.onopen=()=>{
          
        ws.send(JSON.stringify(data))
        }
        ws.onmessage=(e)=>{
      if(e.data){
        if(type == "episode"){
         
          addEpisodes(JSON.parse(e.data))
          openUploadModal(false)
          clear()
          setCurrentState(0)
        } 
       
        if(user && user.is_creator && type == "podcast"){
          
         openUploadModal(false)
         clear()
         setCurrentState(0)
       }
       else{
         setCurrentState(3)
       if(type == "podcast"){
         setUser(JSON.parse(e.data))  
      }
      if(type == "episode"){
        addEpisodes(JSON.parse(e.data))
      }
         
        
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
    let podcastInfo = {}
      if(type == "episode"){
       podcastInfo = {
          name:episodeName,
          description: episodeDescription,
         
        }

      }
      else {
        podcastInfo = {
        episodeName,
        episodeDescription,
         
        }
      }
      updatePodcast({...podcastInfo, podcast_id: podcast.id})
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
   
           <Button
                isLoading={isLoading}
               className="w-32 bg-accent"
               label="Publish"
               onClick ={handleSubmit}
           />
       </div>
        </div>
        <div>
        {
          type == "episode" ? (      <p className="text-sm flex items-center " style={{ color: "#fad487" }}>{status}
        
        {isLoading ? <Spinner className="w-4 h-4 ml-2.5"/> : null }
    
      </p>) : null
        }
  
        </div>
   
      </div>

  );
};

export default FormModalCont;
