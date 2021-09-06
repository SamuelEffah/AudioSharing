import React from "react";
import { useRouter } from "next/router";

import DesktopLayout from "../../modules/layout/deskop_layout";
import PodcastController from "../../modules/controller/podcast_controller";


const Podcast = ({ ...props }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
    <DesktopLayout

    >
    <PodcastController/>
    </DesktopLayout>
  </>
  );
};

export default Podcast;
