import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./button";
import Avatar from "./avatar";
import { openUploadModal } from "../shared-components/modal/upload_modal";
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize";
import Navigations from "../data/navigations"
import { WSContext } from "../modules/ws/ws_provider";


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
            return <NavItem key={i} to={v.to} label={v.label} icon={v.icon} />;
          })}
        </div>

        <div className="flex justify-center w-full mt-20">
          <Button onClick={() => openUploadModal(true)} label="Become a Creator" />
        </div>
        <div className="absolute bottom-16 flex items-center w-10/12">
          <Avatar url={user?.profile_url}/>
          <p className="ml-2.5  text-md">{user?.fullname}</p>
        </div>
      </div>
    </div>
  );
};

const TabletSideBar = ({user,...props}) => {
  return (
    <div
      className="z-50 bg-primary-100 text-primary-700 fixed h-full"
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
        </div>

        {/* <div className="flex justify-center w-full mt-20">
            <Button
            onClick={()=> openUploadModal()}
  
            label="Become a Creator"

            />
        </div> */}
        <div className="absolute bottom-16 flex justify-center w-10/12">
          <Avatar url={user?.profile_url} />
        </div>
      </div>
    </div>
  );
};

const SideBarPanel = ({ ...props }) => {
  const screenSize = useDetectScreenSize();
  const {user} = useContext(WSContext)

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
