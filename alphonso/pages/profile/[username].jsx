import React, {useState, useEffect, useContext} from "react";
import { useRouter } from "next/router";
import moment from "moment"
import DesktopLayout from "../../modules/layout/deskop_layout";
import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import Avatar from "../../ui/avatar";
import Button from "../../ui/button";
import { WSContext } from "../../modules/ws/ws_provider";
import { useConn } from "../../shared-hooks/useConn";
import axios from "axios";
import { useTokenStore } from "../../stores/useTokens";
import { useProfileStore } from "../../stores/useProfileStore";
import { FollowsController } from "../../modules/controller/follows_controller";
import { openEditProfileModal } from "../../shared-components/modal/edit_profile_modal";
import CreatorTag from "../../ui/creator_tag";

const ProfileTab = ({ label, size, isActive = false, ...props }) => {
  return (
    <div className="flex flex-col items-center w-full relative">
      <button
        className="h-12 w-full  focus:outline-none
        "
        {...props}
      >
        <span className="font-semibold text-md pr-2.5">{size}</span>
        <span className="text-primary-600">{label}</span>
      </button>
      {isActive ? (
        <div className="absolute bottom-0 h-1 w-32 rounded bg-accent opacity-80"></div>
      ) : null}
    </div>
  );
};


const Profile = ({ ...props }) => {
  const screenSize = useDetectScreenSize()
  const [currentTabIndx, setCurrentTabIndx] = useState(1)


  const {profile, addProfile, updateProfile} = useProfileStore()

  const router = useRouter();
  const {user} = useContext(WSContext)
  const {accessToken, refreshToken} = useTokenStore()
  const { username } = router.query;

  // if(!user){
  //   return (
  //     <div>
  //       no user 
  //     </div>
  //   )
  // }

  // if (username && user && !profile){
   

  //   let ws = new WebSocket("ws://localhost:4001/socket")
  //   ws.onopen=()=>{

  //     let data = {
  //       op:"get_user",
  //       access_token: accessToken,
  //       refresh_token: refreshToken,
  //       get_user:{
  //         me_id: user.id,
  //         username: username

  //       }
  //     }

  //     ws.send(JSON.stringify(data))

  //   }
  //   ws.onmessage=(e)=>{
  //     if(e.data){
  //       updateProfile(JSON.parse(e.data))
  //     }
  //   }
  // }

 


  // useEffect(()=>{ 
  // if(user && username && !profile){


  //   let ws = new WebSocket("ws://localhost:4001/socket")
  //   ws.onopen=()=>{

  //     let data = {
  //       op:"get_user",
  //       access_token: accessToken,
  //       refresh_token: refreshToken,
  //       get_user:{
  //         me_id: user.id,
  //         username: username

  //       }
  //     }

  //     ws.send(JSON.stringify(data))

  //   }
  //   ws.onmessage=(e)=>{
  //     if(e.data){
  //       updateProfile(JSON.parse(e.data))
  //     }
  //   }

  // }

  // //  return()=>{
  // //    addProfile(null)
  // //  }
  // },[username, user, profile])

  useEffect(()=>{ 



    let ws = new WebSocket("ws://localhost:4001/socket")
    ws.onopen=()=>{

      let data = {
        op:"get_user",
        access_token: accessToken,
        refresh_token: refreshToken,
        get_user:{
          me_id: user.id,
          username: username

        }
      }

      ws.send(JSON.stringify(data))

    }
    ws.onmessage=(e)=>{
      if(e.data){
        updateProfile(JSON.parse(e.data))
      }
    }

  

   return()=>{
     addProfile(null)
   }
  },[])


  const followUser = ()=>{
    if(profile && user){

   
      let ws = new WebSocket("ws://localhost:4001/socket")
      ws.onopen=()=>{
        // op: !profile.you_are_following ? "follow_user" : "unfollow_user",
        let data = {
          op:  "follow_user",
          access_token: accessToken,
          refresh_token: refreshToken,
          follow_user:{
            user_id: user.id,
            other_user_id: profile.id

          }
        }
    

        ws.send(JSON.stringify(data))

      }
      ws.onclose=()=> console.log("connection close....")
      ws.onmessage=(e)=>{
        if(e.data){
          // console.log(e.data)
          console.log(JSON.parse(e.data))
          updateProfile(JSON.parse(e.data))
         
        }
      }
    }

  }


  return (
    <>
    <DesktopLayout

    >
   <ControllerOverlay>
     <div style={{width: "95%", overflowY: 'auto'}} className="flex  relative flex-col items-center">
     <div style={{ width: "96%" }} className={` relative flex mt-12
        ${screenSize === "mobile" ? 'flex-col items-center' : 'flex-col items-center'}
      
      `}>
      {profile ? (

     <img
          src={profile?.profile_url}
          style={{objectFit:"cover", width: (screenSize === 
          "mobile" ? "120px": "140px"), height: (screenSize === "mobile"? "120px" :"140px" ),
        
          }}
          className=" bg-primary-100 rounded-xl"
      
        />


      ): (
        <div
          style={{ width: (screenSize === 
          "mobile" ? "120px": "140px"), height: (screenSize === "mobile"? "120px" :"140px" ),
        
          }}
          className=" bg-primary-100 rounded-xl"
      
        />
      )}
     
   

        <div style={{ width: screenSize === "mobile" ? "100%" : "100%" }} 
        className="flex flex-col pt-3  items-center">
          <h4 className="text-2xl text-semibold ">{profile?.fullname}</h4>
          <small className="text-sm pt-0 pb-2 text-primary-300">@{profile?.username}</small>
         {profile && profile.is_creator ? (
         <CreatorTag/>
         ) : null }

          <small className="text-sm pt-3 text-primary-300">Joined on {moment(profile?.joined_on).format("LL")}</small>
        </div>
     </div>
    {
      user && profile &&(user.username === profile.username) ?
    <Button 
    className="w-48 mt-5 h-10 py-2.5 bg-primary-100 "
      label="Edit Profile"
      onClick={()=>{
        openEditProfileModal(true)
      }}
    /> :

    <Button 
    className="w-48 mt-8 h-10 bg-accent"
      label={profile && profile.you_are_following ? "Following" : "Follow"}
      onClick={(e)=>{
        e.preventDefault()
        followUser()
      }}
    /> 
    

    }
  

     <div className="flex justify-between  w-8/12 mt-10">
     


     
     <ProfileTab
          label="Followers"
          size={profile?.num_of_followers}
          isActive={currentTabIndx == 1 ? true : false}
          onClick={(e) => {
            e.preventDefault()
            setCurrentTabIndx(1);
          }}
        />
     <ProfileTab
          label="Following"
          size={profile?.num_of_following}
          isActive={currentTabIndx == 2 ? true : false}
          onClick={(e) => {
            e.preventDefault()
            setCurrentTabIndx(2);
          }}
        />
            
     </div>
     <div className="w-8/12 ">
     {
            profile  && profile.username ? (

         <FollowsController
          indx={currentTabIndx}
          size={currentTabIndx == 1 ? 
          profile?.num_of_followers : 
          profile?.num_of_following 
          
          }
          id={profile?.id}
          username={profile?.username}

         />


            ) : null 
          }
     </div>
     </div>
   </ControllerOverlay>
    </DesktopLayout>
  </>
  );
};

export default Profile;
