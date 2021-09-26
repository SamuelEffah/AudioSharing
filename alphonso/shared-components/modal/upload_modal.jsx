import React, {useRef, useCallback,useState} from "react"
import create from "zustand"
import {combine} from "zustand/middleware"
import { Modal } from "../../ui/modal"
import FormModal, { openFormModal } from "./form_modal"
import { UploadFile } from "./upload_file"



export const useModalStore = create(
    combine(
      {
      currentState:0,
      },
      (set) => ({
        setCurrentState: (state) => set({ currentState: state }),
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
    const {currentState} = useModalStore()
    const {isOpen, close} = useUploadModalStore()


    const renderState = (currentState)=>{
      
      if(currentState == 0 ){
        return <UploadFile />
      }
      if(currentState == 1){
        return <FormModal/>
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