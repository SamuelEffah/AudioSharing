import React, { useContext, useEffect, useState } from "react";
import Avatar from "./avatar";
import { Spinner } from "../icons";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import Link from "next/link"

//mock data
import Users from "../data/users";
import { WSContext } from "../modules/ws/ws_provider";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const FollowerItem = ({ user }) => {
  
  return (
    <div className="flex b relative h-16 pl-6 my-3 w-full items-center">
      <div>
        <Avatar url={user?.profile_url} width={50} height={50} />
      </div>
      <div className="pl-3  w-10/12 flex flex-col">
      <Link href={`/profile/${user.username}`}> 
        <a>

        <p className="text-base pb-1.5">{user.fullname}</p>
        </a>

      </Link>
        <small className="text-xs  text-accent-100 underline">
          Curremt listening to Growing up Ep. 1
        </small>
      </div>
    </div>
  );
};

const FollowersActivity = ({ className, ...props }) => {
  const { user } = useContext(WSContext);
  const [data, setData] = useState([])
  // const { data, error } = useSWRImmutable(
  //   `http://localhost:4001/users/${user.username}/following/activity`,
  //   fetcher);

  return (
    <div
      className="bg-primary-100
        flex flex-col items-center
         mb-10 h-auto w-11/12 rounded-xl"
    >
      <div className="flex items-center py-4 justify-between w-11/12">
        <h3 className="text-xl font-semibold">Followers Activity</h3>
        <small
          style={{ color: "#984634" }}
          className="text-sm text-accent-hover"
        >
          see all
        </small>
      </div>
      <div className="w-full relative">
      {!data ? <div className="w-full h-full flex items-center justify-center"><Spinner/></div> : null}
   

    {data && data.length > 0 ? (
        <>
        {data.map((user)=>{
            return <FollowerItem key={user.username} user={user}/>
        })}
        </>
    ): (<div className="w-full mt-4 flex items-center justify-center pb-4">
        <p className="text-bold text-base">Nothing to show yet.</p>
    </div>)}
      </div>
    </div>
  );
};

export default FollowersActivity;
