import React from "react";

import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";


const getFormatheader = (category)=>{
    let header = ""
    let temp = category.split("-")
    if(temp.length > 1){
        return `${temp[0]} & ${temp[1]}`
    }
    return temp[0]
}

const CategoryController = ({header,...props }) => {
    const screenSize  = useDetectScreenSize()
  return (
   <ControllerOverlay>
      <div style={{ width: "96%" }} className="">
        <h3 className="font-medium capitalize text-2xl">{getFormatheader(header)}</h3>
      </div>
    
      </ControllerOverlay>
  );
};

export default CategoryController