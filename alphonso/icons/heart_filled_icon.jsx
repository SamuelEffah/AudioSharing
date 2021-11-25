import React from "react";

export const HeartFilledIcon = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    {...props}
    >
      <g clipPath="url(#clip0_606_25)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 1.31399C12.438 -3.24801 23.534 4.73499 8 15C-7.534 4.73599 3.562 -3.24801 8 1.31399Z"
          fill="red"
        />
      </g>
      <defs>
        <clipPath id="clip0_606_25">
          <rect width="16" height="16" fill="red" />
        </clipPath>
      </defs>
    </svg>
  );
};
