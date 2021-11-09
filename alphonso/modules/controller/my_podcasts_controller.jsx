import React, {useContext} from "react";
import axios from "axios"
import useSWRImmutable from 'swr/immutable'
import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import {WSContext} from "./../ws/ws_provider"
import PreviewCard from "../../ui/preview_card";
import {Spinner} from "./../../icons"
const fetcher = (url)=> axios.get(url).then((res)=>res.data)


const MyPodcastsController = ({header,...props }) => {
    const screenSize  = useDetectScreenSize()
    const {user} = useContext(WSContext)
    const {data, error} = useSWRImmutable(`http://localhost:4001/podcast/${user.id}`, fetcher)
    console.log(data)

    let main 

  if (data == undefined){
 
    main = (
      <div className="w-full flex items-center justify-center">
        <Spinner/>
      </div>
    )
  }

  if (data && data.podcasts.length == 0 ){
    console.log("runnning empty data")
    main = (
      <div className="w-full flex  justify-center">
          <p
          className="text-xl text-primary-300"
          >You don&apos;t have any podcasts at the moment...</p>

        
          </div>
    )
  }
  if(data && data.podcasts.length > 0 ){
    console.log("running data")
    main = (
      <div className="w-full flex flex-wrap">
        {data && data.podcasts.map((p)=>{
          return (  <PreviewCard isOwner={true} podcast={p} key={p.id}/>)
        })}
        </div>
    )
  }
    // console.log(error)
    
  
    return (
   <ControllerOverlay>
      <div style={{ width: "96%" }} className="relative">
        <h3 className="font-medium capitalize text-2xl">My Podcasts</h3>

      <div className="mt-8 flex flex-col i">
        {main}
      </div>
      
      </div>
      </ControllerOverlay>
  );
};

export default MyPodcastsController