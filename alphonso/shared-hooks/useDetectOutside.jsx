import React, { useEffect, useState} from "react";

export const useDetectOutside = (ref,handler) => {

  useEffect(() => {
    const listener = (e)=>{
        if(!ref.current || ref.current.contains(e.target)){
            return
        }
        handler(e)
    }
    document.addEventListener("click", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.addEventListener("click", listener);
      document.addEventListener("touchstart", listener);
    };
  },[ref,handler]);

};
