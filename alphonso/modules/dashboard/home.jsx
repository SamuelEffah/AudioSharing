import React from "react";
import SideBarPanel from "../../ui/side_bar_panel";
import Banner from "../../ui/banner";
import PreviewCard from "../../ui/preview_card";
import HorizontalScroll from "../../ui/horizontal_scroll";
import Tabs from "../../ui/tabs";
import CategoryCard from "../../ui/category_card";
import {
  Football,
  HeartHalfFilled,
  NewsPaper,
  PaintBrush,
  PersonAtCounter,
} from "../../icons";
import TopHostCard from "../../ui/top_host_card";
import RightPanel from "../../ui/right_panel";
import SearchBar from "../../ui/search_bar";
import FollowersActivity from "../../ui/followers_activity_card";
import PeopleToFollow from "../../ui/people_to_follow_card";
import Player from "../../ui/player";

const testItems = [1, 2, 3, 4, 5,7,8,9];
const tabItems = ["Recent Played", "Top Podcasts", "Just in"];

const categoryList = [
  {
    name: "Lifestyle & Health",
    icon: <HeartHalfFilled width={22} height={22} />,
    to: "/",
  },

  {
    name: "Arts & Entertainments",
    icon: <PaintBrush width={22} height={22} />,
    to: "/",
  },
  {
    name: "News & Politics",
    icon: <NewsPaper width={26} height={26} />,
    to: "/",
  },
  {
    name: "Sports",
    icon: <Football width={26} height={26} />,
    to: "/",
  },
  {
    name: "Business & Technology",
    icon: <PersonAtCounter width={26} height={26} />,
    to: "/",
  },
];

const Home = (props) => {
  return (
    <div className="w-full relative h-full">
      <SideBarPanel />
      <div
        className="text-primary-700 h-full pt-4 flex flex-col
        items-center"
        id="middlePanel"
      >
        <Banner />
        <div className="w-full relative">
          <div className="relative ml-8">
            <h3
              className="
        text-xl font-semibold"
            >
              Explore
            </h3>
            <Tabs data={tabItems} />
          </div>
          <div className="flex h-62  w-full">
            <HorizontalScroll offset={32} itemSize={420}>
              {testItems.map((v, i) => {
                return <PreviewCard key={i} />;
              })}
            </HorizontalScroll>
          </div>
        </div>
        <div className="mt-8 w-full relative">
          <div className="w-full relative ml-8 mb-6">
            <h3
              className="
        text-lg font-semibold"
            >
              Category
            </h3>
          </div>
          <div className="flex  w-full">
            <HorizontalScroll offset={22} itemSize={210}>
              {categoryList.map((item) => {
                return (
                  <CategoryCard
                    key={item.name}
                    label={item.name}
                    icon={item.icon}
                  />
                );
              })}
            </HorizontalScroll>
          </div>
        </div>
        <div className="mt-8 relative  w-full">
          <div className="w-full relative ml-8 mb-6">
            <h3
              className="
        text-lg font-semibold"
            >
              Top Hosts
            </h3>
          </div>
          <div className="w-full">
            <HorizontalScroll itemSize={100} offset={22}>
              {testItems.map((v, i) => {
                return <TopHostCard key={i} />;
              })}
            </HorizontalScroll>
          </div>
        </div>
      </div>
      <RightPanel>
        <SearchBar/>
        <FollowersActivity/>
        <PeopleToFollow/>
        <Player/>
      </RightPanel>
    </div>
  );
};

export default Home;
