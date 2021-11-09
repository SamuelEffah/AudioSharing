import React from "react";

export const Input = ({
  textarea = false,
  disabled=false,
  className,
  placeholder,
  ...props
}) => {
  return (
    <>
      {textarea ? (
        <textarea
          placeholder
          disabled={disabled}
          className={`bg-transparent text-primary-700 flex-shrink-0 h-16  w-full focus:outline-none resize-none  ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          {...props}
        />
      ) : (
        <input
          className={` rounded-lg bg-primary-100 px-3 
        placeholder-primary-300 flex-shrink-0  focus:outline-none  ${
          disabled
            ? "cursor-not-allowed text-primary-600 opacity-75"
            : "text-primary-700"
        }  ${className ? className : 'w-full  h-12'}`}
          type="text"
          placeholder={placeholder}
          // disabled={disabled}
          {...props}
        />
      )}
    </>
  );
};
