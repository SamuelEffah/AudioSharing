import React from "react";

export const PrevData = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10 4L6 8L10 12" 
        stroke={props.color ? props.color : "#C4C4C4"}
       strokeWidth="1.33333" />
    </svg>
  );
};
