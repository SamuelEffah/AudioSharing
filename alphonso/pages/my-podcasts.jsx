import React from "react"
import FavoritesController from "../modules/controller/favorites_controller"
import MyPodcastsController from "../modules/controller/my_podcasts_controller"
import DesktopLayout from "../modules/layout/deskop_layout"

const MyPodcasts = ({...props})=>{

    return (

        <>

        <DesktopLayout>
            <MyPodcastsController/>
      </DesktopLayout>


      </>
    )
}


export default MyPodcasts;