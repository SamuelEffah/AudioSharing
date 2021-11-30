import React, {useContext} from "react";
import axios from "axios"
import useSWR from 'swr'
import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import {WSContext} from "./../ws/ws_provider"
import PreviewCard from "../../ui/preview_card";
import {Spinner} from "./../../icons"
const fetcher = (url)=> axios.get(url).then((res)=>res.data)

const FavoritesController = ({header,...props }) => {
  const screenSize  = useDetectScreenSize()
  const {user} = useContext(WSContext)
  // const {data, error} = useSWR(`http://localhost:4001/podcast/favorite/${user.id}`, fetcher)


  let main 

if (!user){

  main = (
    <div className="w-full flex items-center justify-center">
      <Spinner/>
    </div>
  )
}

if (user && user.favorites.length == 0 ){
  console.log("runnning empty data")
  main = (
    <div className="w-full flex  justify-center">
        <p
        className="text-xl text-primary-300"
        >You don&apos;t have any favorite podcast at the moment...</p>

      
        </div>
  )
}
if(user && user.favorites.length > 0 ){

  main = (
    <div className="w-full flex flex-wrap">
      {user && user.favorites.map((p)=>{
        return (  <PreviewCard isfavorite={true} podcast={p} key={p.id}/>)
      })}
      </div>
  )
}
  // console.log(error)
  

  return (
 <ControllerOverlay>
    <div style={{ width: "96%" }} className="relative">
      <h3 className="font-medium capitalize text-2xl">Favorites</h3>

    <div className="mt-8 flex flex-col i">
      {main}
    </div>
    
    </div>
    </ControllerOverlay>
);
};

export default FavoritesController