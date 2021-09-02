import React from "react";

export const Clock = (props) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 9.375C7.41625 9.375 9.375 7.41625 9.375 5C9.375 2.58375 7.41625 0.625 5 0.625C2.58375 0.625 0.625 2.58375 0.625 5C0.625 7.41625 2.58375 9.375 5 9.375Z"
        stroke="#363636"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 2.5V5L6.25 6.25"
        stroke="#363636"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
