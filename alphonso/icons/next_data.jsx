import React from "react";

export const NextData = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 4L10 8L6 12" 
    stroke={props.color ? props.color : "#C4C4C4"}
      strokeWwidth="1.33333" />
    </svg>
  );
};
