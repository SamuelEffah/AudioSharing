import React, { useEffect,useState } from "react";
import ReactModal from "react-modal";
import { LeftArrow } from "../icons";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Input } from "./input";


const useSearchStore = create(
  combine(
    {
      isOpen: false,
    },
    (set) => ({
      close: () => set({ isOpen: false }),
      set,
    })
  )
);

export const openSearchModal = () => {
  useSearchStore.getState().set({ isOpen: true });
};

const styles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "0%",
      bottom: "0%",
      left: "0%",
      borderRadius: 8,
      padding: "0px",
      margin: "0px",
      backgroundColor: "#0D0D0F",
      border: "none",
      maxHeight: "100vh",
      width: "100%",
    },
  },
};

export const SearchModal = ({ children, ...props }) => {
  const { isOpen, close } = useSearchStore();
  const [query, setQuery] = useState("")
  const [queryResults, setQueryResults] = useState([])

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      shouldCloseOnEsc
      shouldFocusAfterRender
      shouldCloseOnOverlayClick={true}
      style={styles["default"]}
      {...props}
    >
      <div
        className={`flex 
  
         flex-col relative text-primary-700 h-full w-full relative`}
      >
        <div
          style={{ height: "60px" }}
          className=" w-full
        flex items-center z-50
         relative bg-primary-100"
         
        >
          <button
          onClick={()=> close()}
            className="
            absolute  left-2 outline-none
            w-10 h-10 bg-primary-100
            flex justify-center items-center
            rounded-full
            "
          >
            <LeftArrow width={35} height={35} />
          </button>
            <Input
                autoFocus
                style={{width:'85%'}}
                className="ml-16 h-full"
                placeholder="search  for podcast or anyone"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
            />


        </div>

        <div
        style={{height:"calc(100% - 60px)"}}
         className=" overflow-y-auto">

            <div className="flex justify-center mt-20 w-full">
            <p className="
            text-lg font-medium top-
            ">Try searching for @sameffah</p>

            </div>
        </div>
      </div>
    </ReactModal>
  );
};
