import React from "react"
import ReactModal from "react-modal"
import {Plus} from "../icons"

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

export const Modal = ({children, ...props})=>{


    return (
        <ReactModal
        shouldCloseOnEsc
        shouldFocusAfterRender
        shouldCloseOnOverlayClick={false}
        style={styles["default"]}
        {...props}
        >


        <div className={`flex flex-col  w-full relative`}>

        <div
        style={{backgroundColor:"#0D0D0F"}}
         className="w-full flex justify-end">     
     
        <button
        style={{backgroundColor:"#1E1F22"}}
            className="p-1 w-8 h-8
             flex items-center justify-center rounded-full bg-accent text-primary-700"
            onClick={(e)=> props?.onRequestClose?.(e)}
        >
        <Plus width={20} height={20} className="transform rotate-45"/>
        </button>
        </div>
        {children}
        </div>


        </ReactModal>
    )
}