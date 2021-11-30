import React from "react";
import PreviewCard from "../../ui/preview_card";
import {Spinner} from "./../../icons"
import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import axios from "axios"
import useSWRImmutable from 'swr/immutable'
const fetcher = (url)=> axios.get(url).then((res)=>res.data)

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
    const {data, error} = useSWRImmutable( `${process.env.NEXT_PUBLIC_API_URL}/api/v1/podcast/filter/${getFormatheader(header)}`, fetcher)
    // console.log(data)
    let main 


    if (data == undefined){
    console.log("runinng not data...")
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
          >Nothing to show yet...</p>
          </div>
    )
  }
  if(data && data.podcasts.length > 0 ){
    
    main = (
      <div className="w-full flex flex-wrap">
        {data && data.podcasts.map((p)=>{
          return (  <PreviewCard  podcast={p} key={p.id}/>)
        })}
        </div>
    )
  }
    return (
   <ControllerOverlay>
      <div style={{ width: "96%" }} className="">
        <h3 className="font-medium capitalize text-2xl">{getFormatheader(header)}</h3>
      </div>
    
      <div className="mt-8 flex flex-col i">
        {main}
      </div>
      </ControllerOverlay>
  );
};

export default CategoryController