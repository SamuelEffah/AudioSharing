import React, { useCallback, useEffect, useMemo, useState } from "react";
import { VolumeHigh, VolumeMedium, VolumeMute } from "./../icons";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { usePlayerStore } from "../stores/usePlayerStore";

const variants = {
  visible: {
    height: "160px",
    transition: {
      duration: 0.3,
      type: "easeOut",
    },
  },
  hidden: {
    height: "32px",
    transition: {
      duration: 0.3,
      type: "easeIn",
    },
  },
};

const item = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const VolumeSlider = ({ isMute = false, className, ...props }) => {
  const [currentIcon, setCurrentIcon] = useState(
    isMute ? (
      <VolumeMute width={22} height={22} />
    ) : (
      <VolumeMedium width={22} height={22} />
    )
  );

  const [volumeLevel, setVolumeLevel] = useState(-100);
  const [isAnimateHeight, setIsAnimateHeight] = useState(false);
  const [isVolumeBtn, setIsVolumeBtn] = useState(isMute ? isMute : false);
  const {ref} = usePlayerStore()
  useEffect(() => {
    if (isVolumeBtn) {
      setCurrentIcon(<VolumeMute width={21} height={21} />);
    } else {
      setCurrentIcon(<VolumeMedium width={18} height={18} />);
    }
  }, [isVolumeBtn]);

  return (
    <motion.div
      onMouseEnter={() => setIsAnimateHeight(true)}
      onMouseLeave={() => setIsAnimateHeight(false)}
      animate={isAnimateHeight ? "visible" : "hidden"}
      variants={variants}
      initial={"hidden"}
      style={{ backgroundColor: "#DADADA" }}
      className="w-9 absolute flex-shrink-0 bottom-7 z-40 right-3 flex
      flex-col items-center justify-end
        rounded-full "
    >
      <motion.div
        variants={item}
        style={{ height: "100px" }}
        className="w-2 flex flex-items mb-2 rounded-full relative bg-transparent"
      >
        <motion.div
          variants={item}
          className=" h-full  w-full flex items-center justify-end rounded-full"
        >
          <Slider
            reverse={true}
            vertical={true}
            min={-100}
            max={0}
            value={volumeLevel}
            railStyle={{ backgroundColor: "var(--color-accent)" }}
            trackStyle={{ backgroundColor: "#BFBFBF" }}
            handleStyle={{
              backgroundColor: "var(--color-accent)",
              border: "none",
            }}
            onChange={(v) => {
              setVolumeLevel(v);
              if(ref.current){
             let elem = document.getElementById("audio_player")
             elem.volume  = Math.abs(v/100)

              }
            }}
          />
        </motion.div>
      </motion.div>
      <button
        onClick={() => {
          setIsVolumeBtn(!isVolumeBtn);
        }}
        className="w-8  flex-shrink-0 cursor-pointer rounded-full flex items-center 
    justify-center outline-none h-8  "
      >
        {currentIcon}
      </button>
    </motion.div>
  );
};

export default VolumeSlider;
