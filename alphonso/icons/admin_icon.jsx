import React from "react";

export const Admin = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.33801 1.59C4.38559 1.85248 3.43965 2.1379 2.50101 2.446C2.41529 2.47376 2.3391 2.52504 2.28111 2.59399C2.22312 2.66295 2.18567 2.7468 2.17301 2.836C1.61901 6.993 2.89901 10.026 4.42601 12.024C5.07252 12.8784 5.84341 13.6311 6.71301 14.257C7.05901 14.501 7.36501 14.677 7.60601 14.79C7.72601 14.847 7.82401 14.885 7.89901 14.908C7.93181 14.9195 7.96562 14.9279 8.00001 14.933C8.03398 14.9275 8.06743 14.9191 8.10001 14.908C8.17601 14.885 8.27401 14.847 8.39401 14.79C8.63401 14.677 8.94101 14.5 9.28701 14.257C10.1566 13.6311 10.9275 12.8784 11.574 12.024C13.101 10.027 14.381 6.993 13.827 2.836C13.8145 2.74676 13.777 2.66285 13.719 2.59388C13.661 2.52491 13.5848 2.47366 13.499 2.446C12.848 2.233 11.749 1.886 10.662 1.591C9.55201 1.29 8.53101 1.067 8.00001 1.067C7.47001 1.067 6.44801 1.29 5.33801 1.591V1.59ZM5.07201 0.56C6.15701 0.265 7.31001 0 8.00001 0C8.69001 0 9.84301 0.265 10.928 0.56C12.038 0.86 13.157 1.215 13.815 1.43C14.0901 1.52085 14.334 1.68747 14.5187 1.9107C14.7034 2.13394 14.8213 2.40474 14.859 2.692C15.455 7.169 14.072 10.487 12.394 12.682C11.6824 13.621 10.834 14.4479 9.87701 15.135C9.5461 15.3728 9.19549 15.5819 8.82901 15.76C8.54901 15.892 8.24801 16 8.00001 16C7.75201 16 7.45201 15.892 7.17101 15.76C6.80452 15.5819 6.45391 15.3728 6.12301 15.135C5.16603 14.4478 4.31759 13.621 3.60601 12.682C1.92801 10.487 0.545005 7.169 1.14101 2.692C1.17869 2.40474 1.29665 2.13394 1.48132 1.9107C1.666 1.68747 1.9099 1.52085 2.18501 1.43C3.1402 1.11681 4.10281 0.826725 5.07201 0.56V0.56Z"
        fill={props.color ? props.color : "#C4C4C4"}
      />
      <path
        d="M9.5 6.49995C9.50016 6.81027 9.40407 7.11301 9.22497 7.36644C9.04587 7.61986 8.79258 7.8115 8.5 7.91495L8.885 9.90495C8.89901 9.97733 8.89684 10.0519 8.87864 10.1233C8.86045 10.1948 8.82668 10.2613 8.77976 10.3182C8.73283 10.375 8.67392 10.4208 8.60723 10.4523C8.54054 10.4837 8.46772 10.5 8.394 10.4999H7.606C7.53236 10.4998 7.45966 10.4834 7.3931 10.4519C7.32653 10.4204 7.26774 10.3746 7.22093 10.3178C7.17412 10.261 7.14044 10.1945 7.1223 10.1231C7.10416 10.0517 7.10201 9.97724 7.116 9.90495L7.5 7.91495C7.24076 7.82329 7.0117 7.66214 6.83786 7.44911C6.66401 7.23608 6.55206 6.97936 6.51425 6.70701C6.47644 6.43465 6.51422 6.15715 6.62345 5.90481C6.73269 5.65248 6.90919 5.43502 7.13365 5.27621C7.35812 5.1174 7.62192 5.02335 7.89623 5.00433C8.17053 4.9853 8.44479 5.04205 8.68903 5.16835C8.93327 5.29466 9.13809 5.48567 9.28111 5.72051C9.42414 5.95535 9.49986 6.22498 9.5 6.49995V6.49995Z"
        fill={props.color ? props.color : "#C4C4C4"}
      />
    </svg>
  );
};