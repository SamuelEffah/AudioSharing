import React from "react";
import { useMediaQuery } from "react-responsive";
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import { DrawerMobile } from "../../ui/drawer_mobile";
import NavBarMobile from "../../ui/navbar_mobile";
import { SearchModal } from "../../ui/search_modal";
import SideBarPanel from "../../ui/side_bar_panel";
import RightPanel from "../../ui/right_panel";
import SearchBar from "../../ui/search_bar";
import FollowersActivity from "../../ui/followers_activity_card";
import PeopleToFollow from "../../ui/people_to_follow_card";
import Player from "../../ui/player";

const DesktopLayout = ({ children, className, ...props }) => {
  const screenSize = useDetectScreenSize();

  let main = null;

  if (screenSize === "big-screen" || screenSize === "desktop") {
    main = (
      <>
        <SideBarPanel />
        {children}

        <RightPanel>
          <SearchBar />
          <FollowersActivity />
          <PeopleToFollow />
          <Player />
        </RightPanel>
      </>
    );
  }

  if (screenSize === "tablet") {
    main = (
      <>
        <SideBarPanel />
        {children}
      </>
    );
  }
  if (screenSize === "mobile") {
    main = (
      <>
        {<NavBarMobile />}
        {children}
      </>
    );
  }

  return (
    <div className="w-full relative h-full text-primary-700">
      {main}
      <DrawerMobile />
      <SearchModal />
    </div>
  );
};

export default DesktopLayout;
