import React, {useRef, useState} from "react"
import create from "zustand"
import {combine} from "zustand/middleware"
import { Plus } from "../../icons"
import { Modal } from "../../ui/modal"

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


  export const openUploadModal = ()=>{
    useUploadModalStore.getState().set({isOpen:true})

  }


const UploadModal = ({...props})=>{
    const {isOpen, close} = useUploadModalStore()
    const fileInputRef = useRef(null)

    const handleUpload = (e)=>{
        fileInputRef.current.click()
    }

    const handleChange = (e) =>{
        console.log("open file upload")
    }
    return (

        <Modal isOpen={isOpen} onRequestClose={()=>close()}
        
        >
    <div style={{width:'400px', height:'450px'}} className=" relative">
        <button className="
        bg-accent w-full h-20 mt-32 rounded-xl outline-none flex items-center 
        justify-center text-primary-700
        "
        onClick={handleUpload}
        >
        <span className="mr-2.5">
            <Plus width={22} height={22}/>
        </span>
        <span className=" font-semibold text-xl">
            Upload a Episode
        </span>

        </button>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            style={{display:'none'}}
        />
        <p className="pt-3.5 text-sm text-primary-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, error.</p>
    </div>

        </Modal>
    )
}


export default UploadModal