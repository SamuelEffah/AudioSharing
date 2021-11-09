import React from "react";

const CreatorTag = ({ className, ...props }) => {
  return (
    <small style={{ color: "#0cfad2" }} 
    className={`mt-0 text-sm font-light ${className}`}>
      Creator
    </small>
  );
};


export default CreatorTag