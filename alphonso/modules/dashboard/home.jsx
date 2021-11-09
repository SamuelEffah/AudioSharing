import React from "react";
import DesktopLayout from "../layout/deskop_layout";
import HomeController from "../controller/home_controller";
import { Spinner } from "../../icons";

const Home = (props) => {

  return (
    <>
      <DesktopLayout
      >
      <HomeController/>
      </DesktopLayout>
    </>
  );
};



export default Home;

