import React from "react";
import Avatar from "./avatar";
import Button from "./button";


const FollowItem = ({user,...props}) =>{
    return(
        <div className="flex items-center my-3 justify-between h-14 w-full relative">
            <div className="flex items-center pl-6">
                <div>
                    <Avatar width={40} height={40}/>
                </div>
                <div className="pl-3">
                    <p>Violet Effah</p>
                    <small 
                      style={{color: '#808080'}}
                    >@violetEffah</small>
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
          <FollowItem/>
          <FollowItem/>
          <FollowItem/>
          <FollowItem/>
      </div>
    </div>
  );
};


export default PeopleToFollow