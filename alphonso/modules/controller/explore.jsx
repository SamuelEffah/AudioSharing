import React, { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spinner } from "../../icons";
import Avatar from "../../ui/avatar";
import axios from "axios";
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";
import HorizontalScroll from "../../ui/horizontal_scroll";
import useSWRImmutable from "swr/immutable";
import PreviewCard from "../../ui/preview_card";
const fetcher = (url) => axios.get(url).then((res) => res.data);

export const ExploreController = ({ indx = 1, ...props }) => {
  const screenSize = useDetectScreenSize();
  const [isLoading, setIsLoading] = useState(true);
  const { data: topPodcastList, error: topPodcastError } = useSWRImmutable(
    `http://localhost:4001/api/v1/podcast/explore/top-podcasts`,
    fetcher
  );
  const { data: newPodcastList, error: newPodcastError } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/podcast/explore/just-in`,
    fetcher
  );

  let main = null;


  if ((!newPodcastList && indx == 1) || (!topPodcastList && indx == 0)) {
    main = (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (
    (newPodcastList && newPodcastList.podcasts.length == 0 && indx == 1) ||
    (topPodcastList && topPodcastList.podcasts.length == 0 && indx == 0)
  ) {
    main = (
      <div className="flex  h-48 w-full justify-center items-center">
        <p className=" text-lg ">Nothing to show yet..</p>
      </div>
    );
  }

  if (newPodcastList && newPodcastList.podcasts.length > 0 && indx == 1) {
    main = (
      <div className=" w-full">
        <HorizontalScroll
          offset={15}
          itemSize={screenSize === "mobile" ? 150 : 420}
        >
          {newPodcastList.podcasts.map((p) => {
            return <PreviewCard key={p.id} podcast={p} />;
          })}
        </HorizontalScroll>
      </div>
    );
  }

  if (topPodcastList && topPodcastList.podcasts.length > 0 && indx == 0) {
    main = (
      <div className=" w-full">
        <HorizontalScroll
          offset={15}
          itemSize={screenSize === "mobile" ? 150 : 420}
        >
          {topPodcastList.podcasts.map((p) => {
            return <PreviewCard key={p.id} podcast={p} />;
          })}
        </HorizontalScroll>
      </div>
    );
  }

  return <div className="w-full relative overflow-y-auto">{main}</div>;
};
