import React, { useRef, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Camera } from "../../icons/camera_icon";
import Button from "../../ui/button";
import { Modal } from "../../ui/modal";
import Tags from "../../ui/tags";
import { InputField } from "../input_field";


const FormModal = ({ ...props }) => {

  return (
 
      <div style={{ width: "600px", height: "700px" }} className="relative">
        <div 
        style={{backgroundColor:'#0D0D0F'}}
         className="fixed flex items-center  ">
          <p
            style={{ color: "#BABABA" }}
            className=" font-medium
        text-sm pr-2.5
        "
          >
            Podcast Details
          </p>
          <p style={{ color: "#6D6D6D" }} className="text-sm ">
            Episode Details
          </p>
        </div>

        <div
          style={{ height: "90%" }}
          className="w-full pt-10 overflow-y-auto relative"
        >
          <div className="flex relative mb-8">
            <div
              style={{ width: "140px", height: "140px" }}
              className="border-dashed
             rounded-xl text-primary-300 
             flex flex-col items-center
             pt-12
              border-2 border-primary-800"
            >
              <span>
                <Camera width={25} height={25} />
              </span>
            </div>
            <div
              style={{ width: "calc(100% - 140px" }}
              className="pt-10 pl-2.5 text-primary-700"
            >
              <p>Add your podcast poster image *</p>
              <p className="text-sm text-primary-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing
              </p>
            </div>
          </div>

          <form action="">
            <InputField label="Name *" />
            <InputField label="SubTitle" />
            <InputField label="Description *" textarea={true} />
          </form>
          <Tags/>
        </div>
        <div
          style={{ backgroundColor: "#141517" }}
          className="  rounded-md  px-3 py-2
        flex items-center text-primary- justify-center 
        fixed bottom-3"
        >
          <p className="text-sm" style={{ color: "#844D4D" }}>Processing audio file....</p>
        </div>
        <div className="fixed bottom-2 right-5">
            <Button
            
                className="w-32"
                label="Next"
            />
        </div>
      </div>

  );
};

export default FormModal;
