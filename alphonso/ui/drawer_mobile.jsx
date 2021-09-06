import React, {useEffect, useState} from "react"
import ReactModal from "react-modal"
import {Plus} from "../icons"
import create from "zustand"
import {combine} from "zustand/middleware"
import {Discovery, Sound, 
    Favorite, Settings,
     NewsPaper, PersonAtCounter} from "./../icons"

import { NavItem } from "./side_bar_panel"
import Avatar from "./avatar"
import Button from "./button"

const items = [
    {
        label: "Discovery",
        icon: <Discovery width={21} height={21}/>,
        to: "/dashboard"
    },
    {
        label: "My Podcasts",
        icon: <Sound width={21} height={21}/>,
        to: "/my-podcasts"
    },
    {
        label: "Favorites",
        icon: <Favorite width={20} height={20}/>,
        to: "/favorites"
    },
    {
        label: "Settings",
        icon: <Settings width={20} height={20}/>,
        to: "/settings"
    }
]


const useDrawerStore= create(
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


  export const openDrawerModal = ()=>{
    useDrawerStore.getState().set({isOpen:true})

  }

const styles = {
    default:{
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          },
          content: {
            top: '0%',
            bottom:"0%",
            left: '0%',
            borderRadius: 8,
            padding: "0px",
            margin: "0px",
            backgroundColor: "#0D0D0F",
            border: "none",
            maxHeight: "100vh",
            width:"75%"
     
          },
    }
}

export const DrawerMobile = ({children, ...props})=>{
    const {isOpen, close} = useDrawerStore()


    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={()=>close()}
        shouldCloseOnEsc
        shouldFocusAfterRender
        shouldCloseOnOverlayClick={true}
        style={styles["default"]}
        {...props}
        >
        <div className={`flex 
  
         flex-col relative text-primary-700 h-full w-full relative`}>
        
       
        <div className="mt-8 mb-12 pl-4 flex items-center w-full">
        <Avatar/>
        <p className="ml-2.5  text-md">Brian Waters</p>
        </div>
      
        <div className="w-full relative">
            {items.map((v,i)=>{
                return( <NavItem 
                    key={i}
                     to={v.to}
                     label={v.label}
                    icon={v.icon}
                />)
            })}
        </div>
        <div className="flex mt-10 items-center justify-center">
        <Button
            label="Become a Creator"

        />

        </div>

        </div>


        </ReactModal>
    )
}