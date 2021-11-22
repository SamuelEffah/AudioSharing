import React, {useRef, useCallback,useState, useMemo, useEffect, useContext} from "react"
import create from "zustand"
import {combine} from "zustand/middleware"
import { WSContext } from "../../modules/ws/ws_provider"
import { useUploadAudioStore } from "../../stores/useUploadAudioStore"
import { Modal } from "../../ui/modal"
import FormModal, { openFormModal } from "./form_modal"

import { UploadFile } from "./upload_file"

import axios from "axios"
import { usePodcastFormStore } from "../../stores/usePodcastFormStore"
import FormModalCont from "./form_modal_cont"
import CongratModal from "./congrat_modal"

export const useModalStore = create(
    combine(
      {
      currentState:0,
      type:'podcast'
      },
      (set) => ({
        setCurrentState: (state) => set({ currentState: state }),
        resetFormState: ()=> set({
          currentState: 0
        }),
        setType:(type)=> set({
          type: type
        }),
        set,
      })
    )
  )

const useUploadModalStore= create(
    combine(
      {
        isOpen:false,
      },
      (set) => ({
        close: () => set({ isOpen: false }),
        set,
      })
    )
  )


  

  export const openUploadModal = (action)=>{
    useUploadModalStore.getState().set({isOpen:action})

  }



const UploadModal = ({...props})=>{
    const {currentState, type} = useModalStore()
    const {isOpen, close} = useUploadModalStore()
    const {file,status,updateStatus} = useUploadAudioStore()
    const {updatePodcast} = usePodcastFormStore()
    const {user} = useContext(WSContext)
    
    if(file && status == null && type=="podcast" ){
      let userData = {
            "user_id": user.id,
            "type": "audio"
        }
        updateStatus("Uploading file...")
        let formData = new FormData()
        formData.append('file', file)
        formData.append('data', JSON.stringify(userData))
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
    // useEffect(()=>{
    //   console.log("file from effect", file)
    // },[file])
    const renderState = (currentState)=>{
    
      if(currentState == 0 ){
        return <UploadFile />
      }
      if(currentState == 1){
        return <FormModal/>
      }
      
      if(currentState == 2){
        return <FormModalCont/>
      }
      if( currentState == 3){
        return <CongratModal/>
      }

    }
    return (

        <Modal
         isOpen={isOpen} onRequestClose={()=>close()} 
        >
        {renderState(currentState)}
        </Modal>
    )
}


export default UploadModal