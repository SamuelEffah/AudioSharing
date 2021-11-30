import React from "react"
import {useRouter} from "next/router"
import Head from "next/head"
import RightPanel from "../ui/right_panel";
import FollowersActivity from "../ui/followers_activity_card";
import Player from "../ui/player";
import Search from "./search";
import { useDetectScreenSize } from "../shared-hooks/useDetectScreenSize";

export const Layout = ({children})=>{
    const screenSize = useDetectScreenSize();
    const router  = useRouter()
    const currentPath  = router.asPath.split("/")[1]
    let main = (<> {children}</>);
    console.log(router.asPath)
    if (screenSize === "big-screen" && currentPath != "admin" && router.asPath != "/" || 
    screenSize === "desktop" && currentPath != "admin" && router.asPath != "/") {
      main = (
        <>
          
          {children}
            <RightPanel>
    <Search/>
    <FollowersActivity />
    <Player />
    </RightPanel>
  
        </>
      );
    }
  
    return(
        <>
        <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Podcast</title>
        </Head>
        {main}

        </>
    )
}


