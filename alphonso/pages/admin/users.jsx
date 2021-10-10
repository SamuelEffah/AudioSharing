import React from "react"
import { defaultStyles } from "react-modal"
import { AdminSideBar } from "."
import ControllerOverlay from "../../shared-components/controller_overlay"
import DataTable from "../../ui/data_table"




const Users = ({...props})=>{

    return (
        <div
        style={{backgroundColor:"#f0f0f0"}}
         className="w-full h-full relative">
            <AdminSideBar/>
            <ControllerOverlay>
                <div className="w-full h-full relative">
                   <DataTable/>
                </div>
            </ControllerOverlay>
        </div>
    )
}


export default Users