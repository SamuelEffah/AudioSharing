import React, {useState, useRef} from "react"
import { Plus } from "../../icons"
import { useModalStore } from "./upload_modal"



export const UploadFile = ({...props})=>{
    const {setCurrentState} = useModalStore()
    const fileInputRef = useRef(null)

const handleUpload = (e)=>{
 
    fileInputRef.current.click()
}

const handleChange = (e) =>{
    console.log("open file upload")
    console.log(e.target.files)

    setCurrentState(1)

}
    return(
      <div
      
       style={{width:'400px', height:'450px'}} className=" relative"
       {...props}
       >
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

    )
  }