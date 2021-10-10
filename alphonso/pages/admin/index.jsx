import React from "react"
import ControllerOverlay from "../../shared-components/controller_overlay";
import InfoCard from "../../ui/info_card";
import LineChartAdmin from "../../ui/line_chart";
import PieChartAdmin from "../../ui/pie_chart_admin";
import AdminNavigation from "./../../data/admin_nav"
import {NavItem} from "./../../ui/side_bar_panel"

export const AdminSideBar = ({user,...props}) => {
    return (
      <div
        className="z-50 bg-primary-100 text-primary-700 fixed h-full"
        style={{ width: "120px" }}
      >
        <div className="flex flex-col items-center w-full relative h-full ">
          <div className="flex justify-center items-center">
            <p>Logo</p>
          </div>
  
          <div className="w-full mt-20">
          {AdminNavigation.map((v, i) => {
           
           return <NavItem 
            isIconBtn={true}
           key={i} to={v.to} 
           label={v.label} icon={v.icon} />
        
       })}
          </div>
  
        
        </div>
      </div>
    );
  };

const AdminPanel = ({...props})=>{

    return (
        <div 
         style={{backgroundColor:"#f0f0f0"}}
        className="w-full h-full relative overflow-y-auto">
            <AdminSideBar/>
         
                <ControllerOverlay>
                <div  className="w-full relative">
               
                <div className="w-full  my-4 mb-5 flex flex-wrap">
                    <InfoCard
                        number={1503}
                        desc="current active users"

                    />
                    <InfoCard
                        number={2303}
                        desc="Last 7 days of new users"
                        color="#7442c9"

                    />
                    <InfoCard
                        number={5432}
                        desc="Last 7 days of new podcast"
                        color="#526ecc"

                    />
                </div>
            
                <LineChartAdmin size="full"/>
                <PieChartAdmin size="md"/>
            
             </div>
                    
                </ControllerOverlay>

        </div>
    )
}


export default AdminPanel