import React from "react"
import ProfileController from "../../modules/controller/profile_controller"
import DesktopLayout from "../../modules/layout/deskop_layout"

const Profile = ({...props})=>{

    return (

        <>

        <DesktopLayout>
        <ProfileController/>
      </DesktopLayout>


      </>
    )
}


export default Profile;