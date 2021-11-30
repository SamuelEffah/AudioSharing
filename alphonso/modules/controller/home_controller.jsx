import React, { useContext, useEffect, useState } from "react"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize"
import Banner from "../../ui/banner"
import HorizontalScroll from "../../ui/horizontal_scroll"
import PreviewCard from "../../ui/preview_card"
import Tabs from "../../ui/tabs"
import CategoryCard from "../../ui/category_card"
import ControllerOverlay from "../../shared-components/controller_overlay"
import TopHostCard from "../../ui/top_host_card"

//mock data
import Categories  from "../../data/categories"
import ExploreTabs from "../../data/explore_tabs"
import Users from "../../data/users"
import Podcasts from "../../data/podcasts"
import { WSContext } from "../ws/ws_provider"
import { ExploreController } from "./explore"
  
 const HomeController =()=>{

    const screenSize = useDetectScreenSize()
    const {user} = useContext(WSContext)
    const [currentIndx, setCurrentIndx] = useState(0)
  
    return (
          <ControllerOverlay>
          {user && !user.isCreator ? (
          <Banner/>
          ) : null}
           <div className="w-full  relative">
           <div className="relative pl-8">
            <h3
              className="
        text-xl font-semibold"
            >
              Explore
            </h3>
            <Tabs 
            currentIndx={currentIndx}
            setCurrentIndx={setCurrentIndx}
            data={ExploreTabs} />
          </div>
          <div className="flex h-62  w-full">
           <ExploreController
            indx={currentIndx}
           />
          </div>
        </div>
        <div className="mt-14 w-full relative">
           <div className="w-full relative pl-8 mb-6">
             <h3
              className="
        text-lg font-semibold"
            >
              Category
            </h3>
          </div>
          <div className="flex w-full">
            <HorizontalScroll offset={15} itemSize={
              
              screenSize === "mobile" ? 180 : 210
              }>
              {Categories.map((item) => {
                return (
                  <CategoryCard
                    key={item.name}
                    label={item.name}
                    icon={item.icon}
                    to={item.to}
                  />
                );
              })}
            </HorizontalScroll>
          </div>
        </div>

        <div className="mt-14 relative  w-full">
           <div className="w-full relative pl-8 mb-6">
             <h3
              className="
              text-lg font-semibold"
            >
              Top Hosts
            </h3>
          </div>
          <div className="w-full">
            <HorizontalScroll itemSize={100} offset={22}>
              {Users.map((u) => {
                return <TopHostCard key={u.id} user={u}/>;
              })}
            </HorizontalScroll>
          </div>
        </div>

        </ControllerOverlay>
    )
} 


export default HomeController