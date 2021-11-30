import React, { useContext, useRef, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Spinner } from "../../icons";
import { WSContext } from "../../modules/ws/ws_provider";
import { useProfileStore } from "../../stores/useProfileStore";
import { useTokenStore } from "../../stores/useTokens";
import Button from "../../ui/button";
import { Modal } from "../../ui/modal";
import Tags from "../../ui/tags";
import { InputField } from "../input_field";
import axios from "axios"

const useEditProfileModalStore= create(
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


  

  export const openEditProfileModal = (action)=>{
    useEditProfileModalStore.getState().set({isOpen:action})

  }

const EditProfileModal  = ({ ...props }) => {
    
    const {user, setUser} = useContext(WSContext)
    const {accessToken, refreshToken} = useTokenStore()
    
    const {isOpen,close} = useEditProfileModalStore()
    const [fullname, setFullname] = useState(user?.fullname)
    const [username, setUsername] = useState(user?.username)
    const [profileUrl, setProfileUrl] = useState(user?.profileUrl)
    const [isLoading, setIsLoading] = useState(false)
    const {updateProfile, addProfile} = useProfileStore()
    const ENDPOINT = process.env.NEXT_PUBLIC_API_URL+"/api/v1/users/edit"

    const onSaveEdit = async()=>{
        if(user){
             setIsLoading(true)
             let data = {
                id:  user.id,
                accessToken,
                refreshToken,
                 data:{
                  fullname, 
                  username,
                  profileUrl: profileUrl
                }
              }
             await axios.post(ENDPOINT, {data: data})
                .then((e)=>{
                  if(e.data && e.data.user){
                    console.log("update ", e.data.user)
                    setUser(e.data.user)
                    updateProfile(e.data.user)
                    openEditProfileModal(false)
                  }
               
         
                setIsLoading(false)
                })
        
     
          }
    }

    return (
    <Modal
    
    isOpen={isOpen} onRequestClose={()=>close()} 
    >

      <div style={{width:'400px', height:'450px'}} className="relative">
        

        <div
          style={{ height: "90%" }}
          className="w-full overflow-y-auto relative"
        >
        <h4 className="text-xl font-semibold text-primary-700 py-5 pb-8">Edit Profile</h4>
          <form action="">
            <InputField label="Fullname" value={fullname}
            onChange={(e)=> setFullname(e.target.value)}
             />
            <InputField label="Username" value={username}
                 onChange={(e)=> setUsername(e.target.value)}

            />
            <InputField label="Profile Url" 
             onChange={(e)=> setProfileUrl(e.target.value)}
            value={profileUrl} />
          </form>
        </div>
        <div className="fixed bottom-2 flex items-center right-5">
           
           {
               isLoading ? (
            <div className="mr-3.5">
                <Spinner/>
            </div>
               ) : null
           }
            <Button
                isLoading={isLoading}
                className="w-32 bg-accent"
                label="Save"
                onClick = {(e)=>{
                    e.preventDefault()
                    onSaveEdit()
                }}
            />
        </div>
      </div>

    </Modal>

  );
};

export default EditProfileModal;
