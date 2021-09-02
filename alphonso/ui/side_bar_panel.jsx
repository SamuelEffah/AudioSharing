import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {Discovery, Settings, Sound, Favorite} from "../icons"
import Button from "./button";
import Avatar from "./avatar";

const items = [
    {
        label: "Discovery",
        icon: <Discovery width={21} height={21}/>,
        to: "/"
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




const NavItem = ({ to, label, icon, ...props }) => {
  const router = useRouter();

    const isActive = router.pathname == to
    const activeOrinActiveClass =  isActive ? "bg-primary-800":""

  return (
    <Link href="/">
      <a>
        <div className={`relative 
        flex  justify-center items-center
         w-full h-14 hover:bg-primary-800 mb-4  ${activeOrinActiveClass}`}
         >
         {isActive ? (
            <div className="bg-accent w-1 h-14 absolute left-0 top-0"/>
         ) : null}
            <div className="flex items-center w-6/12">
            <div className="w-1/5">
            {icon? icon : null}
            </div>
            <p className="text-xl">{label}</p>
           
            </div>
        </div>
      </a>
    </Link>
  );
};

const SideBarPanel = ({...props }) => {
  return (
    <div
      className="z-50 bg-primary-100 text-primary-700 fixed h-full"
      style={{ width: "300px" }}
    >
      <div className="flex flex-col items-center w-full relative h-full ">
        <div className="flex justify-center items-center">
          <p>Logo</p>
        </div>

        <div className="w-full mt-20">
        {items.map((v, i)=>{
            return (
        <NavItem
            key={i}
            to={v.to}
            label={v.label}
            icon={v.icon}

         />
            )
        })}
       
         
        </div>

        <div className="flex justify-center w-full mt-20">
            <Button
            onClick={()=>{
                console.log("clicked become a creator")
            }}
  
            label="Become a Creator"

            />
        </div>
        <div className="absolute bottom-16 flex items-center w-10/12">
        <Avatar/>
        <p className="ml-2.5  text-md">Brian Waters</p>
        </div>
      </div>
    </div>
  );
};

export default SideBarPanel;
