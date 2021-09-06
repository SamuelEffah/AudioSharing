import React from "react"
import FavoritesController from "../modules/controller/favorites_controller"
import DesktopLayout from "../modules/layout/deskop_layout"

const Favorites = ({...props})=>{

    return (

        <>

        <DesktopLayout>
        <FavoritesController/>
      </DesktopLayout>


      </>
    )
}


export default Favorites;