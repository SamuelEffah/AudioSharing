import React from "react"
import ReactModal from "react-modal"
import {Plus} from "../icons"
import { openUploadModal, useModalStore } from "../shared-components/modal/upload_modal"
import { usePodcastFormStore } from "../stores/usePodcastFormStore"

const styles = {
    default:{
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          },
          content: {
            top: '45%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 8,
           
            backgroundColor: "#0D0D0F",
            border: "none",
            maxHeight: "80vh",
            
     
          },
    }
}

export const Modal = ({children, isUploadModal=false,...props})=>{
  
    return (
        <ReactModal
        shouldCloseOnEsc
        shouldFocusAfterRender
        shouldCloseOnOverlayClick={false}
        style={styles["default"]}
        {...props}
        >


        <div className={`flex flex-col  w-full relative`}>

   
        <button
        style={{backgroundColor:"#1E1F22"}}
            className="p-1 w-8 h-8
            fixed right-3 z-50
             flex items-center justify-center rounded-full bg-accent text-primary-700"
            onClick={(e)=> {
            
                props?.onRequestClose?.(e)
                
                }}
        >
        <Plus width={20} height={20} className="transform rotate-45"/>
        </button>
   
        {children}
        </div>


        </ReactModal>
    )
}