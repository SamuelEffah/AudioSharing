import React, { useContext, useRef, useState } from "react";
import create from "zustand";
import {useRouter} from "next/router"
import { combine } from "zustand/middleware";
import { Spinner } from "../../icons";
import Button from "../../ui/button";
import Avatar from "../../ui/avatar"
import { Modal } from "../../ui/modal";

import axios from "axios"
import { useUserStore } from "../../stores/useUserStore";

const useUserModalStore= create(
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


  

  export const openUserModal = (action)=>{
    useUserModalStore.getState().set({isOpen:action})

  }

const UserModal  = ({ ...props }) => {
    const router = useRouter()
    const {id} = router.query
    const {isOpen,close} = useUserModalStore()
    const {user, updateUser} = useUserStore()
    
    

    const banUser = async()=>{
        let url = process.env.NEXT_PUBLIC_API_URL+"/api/v1/users/admin/ban/user"
        let data = {
            adminId: id,
            userId: user.id,
            action: !user.isBan
        }

        await axios.post(url,{data: data}).then((e)=>{
           if(e.data && e.data.user){
               updateUser(e.data.user)
           }
        })

        
    }

const deleteUser=async()=>{
    let url = process.env.NEXT_PUBLIC_API_URL+"/api/v1/users/admin/delete/user"
    let data = {
        adminId: id,
        userId: user.id
    }
    openUserModal(false)
    // await axios.post(url,{data: data}).then((e)=>{
    //    if(e.data && e.data.status){
    //        if(e.data.status){
    //            openUserModal(false)
    //        }
    //    }
    // })
}
        

    const promoteUserToCreator = async()=>{
        let url = process.env.NEXT_PUBLIC_API_URL+"/api/v1/users/admin/promote/user"
        let data = {
            adminId: id,
            userId: user.id,
            action: !user.isCreator
        }

        await axios.post(url,{data: data}).then((e)=>{
           if(e.data && e.data.user){
               updateUser(e.data.user)
           }
        })

        
    }
    
    return (
    <Modal
    
    isOpen={isOpen} 
    
    onRequestClose={()=>close()} 
    >

      <div style={{width:'300px', height:'350px'}} className="relative">
        

        <div
          style={{ height: "90%" }}
          className="w-full overflow-y-auto relative text-primary-600"
        >
            <div className="mt-8 flex items-center">
            <Avatar url={user.profileUrl} width={60} height={60}/>
            <small className="pl-3">{user.fullname}</small>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div>
                <p> {user?.followers?.length}</p>
                <small className="text-primary-300">Followers</small>
                </div>
                <div>
                <p> {user?.following?.length}</p>
                <small className="text-primary-300">Following</small>
                </div>
                <div>
                <p> {user?.podcasts?.length}</p>
                <small className="text-primary-300">Podcasts</small>
                </div>
            </div>
            <div className="w-full flex flex-col mt-6 items-center justify-center">
                <Button
                className="text-base bg-primary-100 w-10/12"
                height={35}
                onClick={banUser}
                label={user && user.isBan ? "Remove Banned" : "Ban User"}
                />
                <Button
                className="text-base mt-4 bg-primary-100 w-10/12"
                height={35}
                label={user && user.isCreator ? "Remove Creator" : "Promote to Creator"}
                onClick={promoteUserToCreator}
                />
                <Button
                className="text-base mt-4 bg-accent w-10/12"
                height={35}
                onClick={deleteUser}
                label="Delete Permanently"
                />
            </div>
          
          
        </div>
      </div>

    </Modal>

  );
};

export default UserModal;
