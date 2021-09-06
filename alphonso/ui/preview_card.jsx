import React, { useState } from "react";
import { Clock, PlayFilled } from "../icons";
import Link from "next/link";
import { Play, Pause } from "../icons";
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize";


const descriptionShortener = (description, maxLength=62)=>{
  let shortDesc = ""
  let temp = "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero"
  if(temp.length > maxLength){
    shortDesc = temp.slice(0, maxLength)
    return shortDesc + "..."
  }
  return description
}

const getPodcastUrl=(name="")=>{
  return name.replace(/\s+/g, "-").toLowerCase()
}

const PreviewPlayBtn = (props) => {
  const [isPlay, setIsPlay] = useState(false);
  
  return (
    <div
      onClick={() => setIsPlay(!isPlay)}
      className="flex cursor-default ml-8 items-center h-10 rounded-full w-36"
      style={{ backgroundColor: "#1E1F22" }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center
     rounded-full bg-accent"
      >
        {isPlay ? (
          <Pause width={20} height={20} />
        ) : (
          <PlayFilled width={20} height={20} />
        )}
      </div>
      <p className="pl-1.5">{isPlay ? "Playing..." : "Play now"}</p>
    </div>
  );
};

const MobilePreviewCard = ({podcast,marginX = 0,...props}) => {
  return (
    <Link href={`/podcast/${getPodcastUrl(podcast.name)}`}>
    <a>
    

    <div style={{ width: "150px", height: "200px", marginLeft:marginX }} className="relative">
      <div style={{ width: "150px", height: "150px" }} className="relative">
        <img
          className="w-full h-full  rounded-xl"
          style={{ objectFit: "cover" }}
          src={podcast.poster}
          alt="podcast poster"
        />
      </div>
      <div
      style={{height:"calc(100% - 150px)"}} 
      className="relative pt-1.5">
        <p className="font-medium text-lg">{podcast.name}</p>
        <small className="text-primary-300 text-base">{podcast.creator}</small>
      </div>
    </div>

    </a>
  </Link>
  );
};

const PreviewCard = ({podcast ,className, marginX = 0, ...props }) => {
  const screenSize = useDetectScreenSize();
  return (
    <>
      {screenSize === "mobile" ? (
        <MobilePreviewCard podcast={podcast} marginX={marginX} {...props} />
      ) : (
        <div
          style={{ width: "420px", marginLeft: marginX }}
          className={`flex-shrink-0 bg-primary-100 flex h-48 rounded-xl
      ${className}
      `}
          {...props}
        >
          <div style={{ width: "150px" }}>
            <img
              className="w-full h-48 bg-accent rounded-l-xl"
              style={{ objectFit: "cover" }}
              src={podcast.poster}
              alt="podcast poster"
            />
          </div>
          <div
            className="flex-shrink-0 pl-4"
            style={{ width: "calc(100% - 150px)" }}
          >
            <Link href={`/podcast/${getPodcastUrl(podcast.name)}`}>
              <a>
                <p className="font-medium text-xl  py-2">{podcast.name}</p>
              </a>
            </Link>
            <div>
              <small className="text-primary-300 text-base">
                {podcast.creator}
              </small>

              <small className="text-primary-300 text-base pl-4">
                {podcast.episodes} Episodes
              </small>
            </div>
            <div>
              <p
                className=" 
          mt-2.5
          text-base text-primary-300"
              >
                {descriptionShortener(podcast.description)}
              </p>
            </div>
            <div>
              <div className="mt-3.5 flex items-center">
                <p className="flex text-priamry-200">
                  <Clock width={18} height={18} />
                  <span className="text-sm pl-2">2hr 14min</span>
                </p>

                <PreviewPlayBtn />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewCard;
