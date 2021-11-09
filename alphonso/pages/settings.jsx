import React from "react"
import SettingsController from "../modules/controller/settings_controller"
import DesktopLayout from "../modules/layout/deskop_layout"


const Settings = ({...props})=>{

    return(
       <DesktopLayout>
            <SettingsController/>
       </DesktopLayout>
    )
}


export default Settings