import React, { useContext, useEffect, useRef, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Camera } from "../../icons/camera_icon";
import { WSContext } from "../../modules/ws/ws_provider";
import { useUploadAudioStore } from "../../stores/useUploadAudioStore";
import {usePodcastStore} from "../../stores/usePodcastStore"
import Button from "../../ui/button";
import { Modal } from "../../ui/modal";
import Tags from "../../ui/tags";
import { InputField } from "../input_field";
import axios from 'axios'
import { usePodcastFormStore } from "../../stores/usePodcastFormStore";
import { openUploadModal, useModalStore } from "./upload_modal";
import { set } from "nprogress";


const FormModal = ({ ...props }) => {
  const {setCurrentState, type} = useModalStore()
  const {status} = useUploadAudioStore()
  const {podcast,addPodcast} = usePodcastStore()
  const [name, setName]  = useState("")
  const [description, setDescription] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const fileUploadRef = useRef(null)
  const [previewFile,setPreviewFile] = useState(null)
  const [isEditPodcast, setIsEditPodcast] = useState(false)
  const {user} = useContext(WSContext)
  const {updatePodcast, podcastDetails} = usePodcastFormStore()
  useEffect(()=>{
      if(typeof window !== 'undefined' && type == "edit" && podcast){
        let prevElem = document.getElementById("previewImage")
        prevElem.style.backgroundImage = `url(${podcast.poster_url})`
        setName(podcast.name)
        setDescription(podcast.description)
        setSubtitle(podcast.subtitle)
       
  
      }
     
  },[type,podcast])

  useEffect(()=>{
    if(type == "edit" && podcastDetails && isEditPodcast){
     const sendUpdate = async()=>{
       await axios.post("http://localhost:4001/podcast/edit",{data:podcastDetails})
       .then((e)=>{
         if(e.data && e.data.updated){
           addPodcast(e.data.updated)
           setCurrentState(0)
           openUploadModal(false)
         }
        //  addPodcast(e.data)
        // console.log(e.data)
       })
     }
     sendUpdate()
    }
  },[isEditPodcast,podcastDetails, type])


  useEffect(()=>{
    let prevElem 
    if(typeof window !== 'undefined'){
      prevElem =document.getElementById("previewImage")
      if(previewFile){
        console.log("prev file ", previewFile)
        let url =URL.createObjectURL(previewFile)
        console.log(url)
        prevElem.style.backgroundImage ="url(" + url+ ")"
      }
    }
    return()=>{
      prevElem.style.removeProperty("backgound-image")
    }
  },[previewFile])

  const handleNext=(e)=>{
    e.preventDefault()
    let podcastInfo = {}
    if(name && description || subtitle){
      podcastInfo = {
        name,
        description,
        subtitle
      }
      // console.log("m ", m)
      if(type == "edit"){
        let m = {...podcast, ...podcastInfo}
        podcastInfo = m
      }
      // console.log("prev podc ", podcast)
      updatePodcast(podcastInfo)
  
    
      if(type == "edit"){
        setIsEditPodcast(true)
        

      }
      else{
        setCurrentState(2)
      }
    }

   
  }

  const handleUpload = (e)=>{
 
    fileUploadRef.current.click()
}
  const handleChange = async(e) =>{   
    // TODO validate file type sending to server
    if(e.target.files){
      let file = e.target.files[0]
      setPreviewFile(e.target.files[0])
        // addFile(e.target.files[0])
        let userData = {
            "user_id": user.id,
            "type": "image"
        }
       
        let formData = new FormData()
        formData.append('file', file)
        formData.append('data', JSON.stringify(userData))
       await axios({
            method: "POST",
            url: "http://localhost:5000/api/v1/audio",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        }).then((res)=>{
            console.log(res.data)
            if(res.data.status == "successful"){
              updatePodcast({poster_url: res.data.file_url, creator_id: user.id})
              
             
            }
        }).catch((e)=>{
            console.error(e)
        })
       
    }





}
  return (
 
      <div style={{ width: "600px", height:"max-content" }} className="relative flex flex-col">
        <div 
        style={{backgroundColor:'#0D0D0F'}}
         className="fixed flex items-center  ">
          <p
            style={{ color: "#BABABA" }}
            className=" font-medium
        text-sm pr-2.5
        "
          >
            Podcast Details
          </p>
          <p style={{ color: "#6D6D6D" }} className="text-sm ">
            Episode Details
          </p>
        </div>

        <div
          style={{ height: "90%" }}
          className="w-full pt-10 overflow-y-auto relative"
        >
          <div className="flex relative mb-8">
            <div
             id="previewImage"
             onClick={handleUpload}
              style={{ width: "140px", height: "140px",
              objectFit:'contain', backgroundRepeat:'no-repeat',
              }}
              className="border-dashed
             rounded-xl text-primary-300 
             flex flex-col items-center
             pt-12
              border-2 border-primary-800"
            >
              <span 
              style={{color:'#000'}}
              className="h-10 w-10 flex  items-center  justify-center rounded-full bg-primary-700">
                <Camera width={25} height={25} />
              </span>
              <input
            type="file"
            ref={fileUploadRef}
            onChange={handleChange}
            style={{display:'none'}}
             />
            </div>
            <div
              style={{ width: "calc(100% - 140px" }}
              className="pt-10 pl-2.5 text-primary-700"
            >
              <p>Add your podcast poster image *</p>
              <p className="text-sm text-primary-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing
              </p>
            </div>
          </div>

          <form action="">
            <InputField label="Name *"  value={name} 
              onChange={e=>setName(e.target.value)}

            />
            <InputField label="SubTitle"  value={subtitle}
              onChange={e=>setSubtitle(e.target.value)}
            />
            <InputField label="Description *" value={description}
            onChange={e=>setDescription(e.target.value)}
             textarea={true} />
          </form>
          <Tags isEdit={type == "edit" ? true : false} tagsList={podcast.tags}/>
        </div>
        <div
        className="flex  justify-between mt-8"
        >
        <div
         
         className="  rounded-md  px-3
       flex items-center text-primary- justify-center 
     "
       >
         <p className="text-sm" style={{ color: "#fad487" }}>{status}</p>
       </div>
       <div className="">
           <Button
           
               className={type =="edit" ?"w-44 bg-accent" :"w-32 bg-accent"}
               label={ type == "edit" ? "Save Changes" : "Next"}
               onClick ={handleNext}
           />
       </div>
        </div>
   
      </div>

  );
};

export default FormModal;
