import React, {useState} from "react";
import { Clock } from "../icons";
import { Play, Pause } from "../icons";

const PreviewPlayBtn = (props)=>{
    const [isPlay, setIsPlay] = useState(false)
  return(
    <div
    onClick={()=> setIsPlay(!isPlay)}
    className="flex cursor-default ml-8 items-center h-10 rounded-full w-36"
    style={{backgroundColor:"#1E1F22"}}
    >
    <div className="w-10 h-10 flex items-center justify-center
     rounded-full bg-accent">
     {isPlay ? 
      <Pause width={20} height={20}/>
     :
      <Play width={18} height={18}/>
     }
    </div>
  <p className="pl-1.5">
    {isPlay ? 'Playing...' : 'Play now'}
  </p>
    </div>
  )
}

const PreviewCard = ({className,marginX=0, ...props}) => {
  return (
    <div
      style={{ width: "420px", marginLeft:marginX}}
      className={`flex-shrink-0 bg-primary-100 flex h-48 rounded-xl
      ${className}
      `}
      {...props}
    >
      <div style={{ width: "150px" }}>
        <img
          className="w-full h-48 bg-accent rounded-l-xl"
          style={{ objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1545264835-3e14e4dae383?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=708&q=80"
          alt="podcast poster"
        />
      </div>
      <div className="flex-shrink-0 pl-4" style={{ width: "calc(100% - 150px)" }}>
        <p
          className="font-medium text-xl  py-2"
        >
          House of Exile
        </p>
        <div>
          <small
            className="text-primary-300 text-base"
          >
            Natalie Bruce
          </small>

          <small
            className="text-primary-300 text-base pl-4"
          >
            112 Episodes
          </small>
        </div>
        <div>
          <p
          className=" 
          mt-2.5
          text-base text-primary-300"
          >Lorem ipsum dolor, sit amet Error, doloremque? Animi deseruntm...
          </p>
        </div>
        <div>
          <div className="mt-3.5 flex items-center">
           <p className="flex text-priamry-200">
             <Clock width={18} height={18}/>
             <span className="text-sm pl-2">2hr 14min</span>
           </p>

           <PreviewPlayBtn/>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default PreviewCard;
