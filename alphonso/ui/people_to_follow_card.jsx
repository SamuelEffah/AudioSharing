import React from "react";
import Avatar from "./avatar";
import Button from "./button";

//mock data
import Users from "../data/users";

const FollowItem = ({user,...props}) =>{
    return(
        <div className="flex items-center my-3 justify-between h-16 w-full relative">
            <div className="flex items-center pl-6">
                <div>
                    <Avatar url={user.profile_url} width={50} height={50}/>
                </div>
                <div className="pl-3">
                    <p>{user.full_name}</p>
                    <small className="text-sm"
                      style={{color: '#808080'}}
                    >@{user.username}</small>
                </div>
            </div>
            <Button
            height={34}
            className="w-32 h-10"
                label="Follow"
            />

        </div>
    )
}


const PeopleToFollow = ({ className, ...props }) => {
  return (
    <div
      className="bg-primary-100
                flex flex-col items-center
                 mb-10 h-auto w-11/12 rounded-xl"
    >
      <div className="flex items-center py-4 justify-between w-11/12">
        <h3 className="text-xl font-semibold">People to Follow</h3>
        <small
          style={{ color: "#984634" }}
          className="text-sm text-accent-hover"
        >
          see all
        </small>
      </div>
      <div className="w-full relative">
      {Users.sort(() => 0.5 - Math.random()).slice(0,3).map((u)=>{
            return <FollowItem key={u.id} user={u}/>
        })}
        
      </div>
    </div>
  );
};


export default PeopleToFollow