import React from "react";
import Button from "../../ui/button";
import { PlayFilled } from "../../icons";
import IconButton from "../../ui/icon_button";
import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
const CategoryPill = ({ category }) => {
  return (
    <div
      style={{ backgroundColor: "#1F2125", color: "#F4F4F4" }}
      className="flex mr-2 items-center justify-center rounded-full h-8 px-4 w-max"
    >
      <p className="text-sm">{category}</p>
    </div>
  );
};

const Episode = ({ episode,className, ...props }) => {
  return (
    <div className={`flex mb-4 ${className}`}>
      <div
        style={{ width: "60px", height: "60px" }}
        className="bg-primary-100 flex-shrink-0 rounded-xl"
      />
      <div className="pl-2.5 pr-1 relative">
        <p className="pb-1.5">Episode #1 Carl Schmitt on Liberlism pt.1</p>
        <small className="w-10/12 text-primary-300 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          ullam obcaecati alias quas ducimus facere dolore illo consequatur
          labore nulla placeat cupiditate quibusdam.
        </small>
      </div>
      <div className="">
        <IconButton
          className="w-12 h-12"
          icon={<PlayFilled width={20} height={20} />}
        />
      </div>
    </div>
  );
};

const PodcastController = ({ name,...props }) => {
    const screenSize  = useDetectScreenSize()
  return (
   <ControllerOverlay>
      <div style={{ width: "96%" }} className="">
        <h3 className="font-medium text-2xl">House of Exile</h3>
      </div>
      <div style={{ width: "96%" }} className={` relative flex mt-12
        ${screenSize === "mobile" ? 'flex-col items-center' : 'flex-row'}
      
      `}>
        <div
          style={{ width: (screenSize === 
          "mobile" ? "120px": "180px"), height: (screenSize === "mobile"? "120px" :"180px" )}}
          className=" bg-primary-100 rounded-xl"
        >
          <p>image</p>
        </div>

        <div style={{ width: screenSize === "mobile" ? "100%" : "calc(100% - 200px)" }} 
        className="pt-6 pl-4 flex flex-col items-center">
          <h4 className="text-xl text-semibold">House of Exile</h4>
          <p className={`${screenSize === 'mobile' ? 'w-11/12 pt-1.5 text-center' : 'w-9/12 pt-3'} text-base text-primary-300`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolor
            cumque provident doloribus distinctio id eos vel in modi possimus
            animi voluptatum fuga laboriosam unde porro nobis accusamus sint
            corrupti ipsam culpa reprehenderit, nemo libero. Quos est
            reprehenderit accusantium officia neque minima dignissimos error,
            facere quasi numquam quam minus. Consectetur.
          </p>

          <div className="pt-6 flex items-center">
            <CategoryPill category="LifeStyle" />
            <CategoryPill category="History" />
          </div>
        </div>
      </div>
      <div style={{ width: "96%" }} className=" relative mt-10">
        <div
          style={{ width: (screenSize==="mobile" ? "100%"
           : "calc(100% - 180px)"), marginLeft: screenSize==="mobile" ? "0px" : "180px" }}
          className="pl-6 relative"
        >
          <div className="w-full">
            <p className="text-xl text-semibold">All Episodes</p>
          </div>
          <div className="w-full mt-7 relative">
            <Episode
            className={`${screenSize === 'mobile'? 'w-11/12' : 
            'w-9/12' }`}
             />
            <Episode
            className={`${screenSize === 'mobile'? 'w-11/12' : 
            'w-9/12' }`}
             />
          </div>
        </div>
      </div>
      </ControllerOverlay>
  );
};

export default PodcastController