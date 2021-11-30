import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./button";
import Avatar from "./avatar";
import { openUploadModal } from "../shared-components/modal/upload_modal";
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize";
import Navigations from "../data/navigations"
import { WSContext } from "../modules/ws/ws_provider";
import { Admin, Sound, Upload } from "../icons";
import IconButton from "./icon_button"
import CreatorTag from "./creator_tag";
import { useProfileStore } from "../stores/useProfileStore";

export const NavItem = ({ isIconBtn = false, to, label, icon, ...props }) => {
  const router = useRouter();
  const isActive = router.pathname == to;
  const activeOrinActiveClass = isActive ? "bg-primary-800" : "";

  return (
    <Link href={to}>
      <a>
        {isIconBtn ? (
          <div
            className={`relative 
        flex  justify-center items-center
         w-full h-14 hover:bg-primary-800 mb-4  ${activeOrinActiveClass}`}
          >
            {isActive ? (
              <div className="bg-accent w-1 h-14 absolute left-0 top-0" />
            ) : null}
            <div className="flex  justify-center w-full">
              {React.cloneElement(icon, { width: 30, height: 30 })}
            </div>
          </div>
        ) : (
          <div
            className={`relative 
        flex  justify-center items-center
         w-full h-14 hover:bg-primary-800 mb-4  ${activeOrinActiveClass}`}
          >
            {isActive ? (
              <div className="bg-accent w-1 h-14 absolute left-0 top-0" />
            ) : null}
            <div className="flex items-center w-6/12">
              <div className="w-1/5">{icon ? icon : null}</div>
              <p className="text-xl">{label}</p>
            </div>
          </div>
        )}
      </a>
    </Link>
  );
};

const DefaultSideBar = ({user,...props}) => {
  const router = useRouter();
  const {addProfile} = useProfileStore()
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
          {Navigations.map((v, i) => {
           
              return <NavItem key={i} to={v.to} label={v.label} icon={v.icon} />
            {/* return <NavItem key={i} to={v.to} label={v.label} icon={v.icon} />; */}
          })}
         
            <NavItem
                 key={"podcasts_nav"}
                 label="My Podcasts"
                 icon={<Sound width={21} height={21} />}
                 to="/my-podcasts"
               />

          ) 
          
          {user && user.is_admin ? (
            <NavItem
                 key = {"admin_panel"}
                 label="Admin Panel"
                 icon={<Admin width={21} height={21} />}
                 to={`/admin/${user.id}`}
               />

          ) : null}

       
           
        </div>

        <div className="flex justify-center w-full mt-20">
          <Button onClick={() => openUploadModal(true)} 
          label= {user && user.isCreator ? "Upload a Podcast" : "Become a Creator"} />
        </div>
        <div
           onClick={(e)=>{
          addProfile(user)
          router.push(`/profile/${user?.username}`)
        }}
        
         className="absolute bottom-16 cursor-pointer flex items-center w-10/12">
        
        
          <Avatar url={user?.profileUrl}/>
          <div>
          <p className="ml-2.5 text-md">{user?.fullname}</p>
          
          {user && user.is_creator ? (
          <CreatorTag className="ml-2.5"/>
          ) : null}
          </div>

        
        </div>
      </div>
    </div>
  );
};

const TabletSideBar = ({user,...props}) => {
  const router = useRouter();
  const {addProfile} = useProfileStore()
  return (
    <div bg-primary-100 
      className="z-50text-primary-700 fixed h-full"
      style={{ width: "120px" }}
    >
      <div className="flex flex-col items-center w-full relative h-full ">
        <div className="flex justify-center items-center">
          <p>Logo</p>
        </div>

        <div className="w-full mt-20">
          {Navigations.map((v, i) => {
            
            return (
              <NavItem
                isIconBtn={true}
                key={i}
                to={v.to}
                label={v.label}
                icon={v.icon}
              />
            );
          })}

            <NavItem
                isIconBtn={true}
                 key={"podcasts_nav"}
                 label="My Podcasts"
                 icon={<Sound width={21} height={21} />}
                 to="/my-podcasts"
               />

          ) 
          
          {user && user.isAdmin ? (
            <NavItem
                isIconBtn={true}
                 key = {"admin_panel"}
                 label="Admin Panel"
                 icon={<Admin width={21} height={21} />}
                 to={`/admin/${user.id}`}
               />

          ) : null}
        </div>

        <div className="flex justify-center w-full mt-20">
            <button
            className="
            flex items-center justify-center
            border-none w-16 h-16 rounded-xl bg-accent"
            onClick={()=> openUploadModal(true)}
            >
            <Upload width={34} height={34}/>
            </button>
        </div>
        <div className="absolute bottom-16 flex justify-center w-10/12">
          <Avatar
          className="cursor-pointer"
            onClick={(e)=>{
          addProfile(user)
          router.push(`/profile/${user?.username}`)
        }}
        
           url={user?.profileUrl}/>
        </div>
      </div>
    </div>
  );
};

const SideBarPanel = ({ ...props }) => {
  const screenSize = useDetectScreenSize();
  const {user} = useContext(WSContext)
  console.log("user for sied ", user)
  let sideNav = null;
  if (screenSize === "big-screen") {
    sideNav = (
      <>
        <DefaultSideBar user={user} {...props} />
      </>
    );
  }
  if (screenSize === "desktop" || screenSize === "tablet") {
    sideNav = (
      <>
        <TabletSideBar user={user} {...props} />
      </>
    );
  }

  return <>{sideNav}</>;
};

export default SideBarPanel;
