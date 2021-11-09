import React, { useContext, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { WSContext } from "../../modules/ws/ws_provider";


const CongratModal = ({ ...props }) => {
 const {user} = useContext(WSContext)
  return (
 
      <div style={{ width: "500px", height:"max-content" }} className="relative flex items-center flex-col">

       <Image  src="/confetti.gif" alt="me" width="300" height="300" />
      <div  
          className=" flex justify-center flex-col items-center  w-10/12  text-primary-700 z-50 fixed top-20">
        <h4 style={{margin:0, padding: 0}} className="text-3xl font-semibold ">Congratulations, {user?.fullname.split(' ')[0]}!</h4>
        <p className="text-2xl mt-3">You are a creator!</p>

        <p className="text-primary-300 mt-5 text-sm">You can view all your podcasts under the My Podcasts tab. Enjoy Creator! </p>
      </div>
       
   
      </div>

  );
};

export default CongratModal;
