import React, { useCallback, useEffect, useMemo, useState } from "react";
import { VolumeHigh, VolumeMedium, VolumeMute } from "./../icons";
import { motion, useMotionValue, useTransform } from "framer-motion";

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

const VolumeSlider = ({
  isMute = false,
  volumeLevel = 50,
  className,
  ...props
}) => {
 
  const [currentIcon, setCurrentIcon] = useState(
    isMute ? (
      <VolumeMute width={22} height={22} />
    ) : (
      <VolumeMedium width={22} height={22} />
    )
  );

  const [isAnimateHeight, setIsAnimateHeight] = useState(false);

  const [isVolumeBtn, setIsVolumeBtn] = useState(isMute ? isMute : false);

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
      style={{ backgroundColor: "#DADADA" }}
      className="w-9 absolute flex-shrink-0 bottom-7 z-50 right-3 flex
      flex-col items-center justify-end
        rounded-full "
    >
     
      <motion.div
        variants={item}
        style={{ height: "100px" }}
        className="w-1 flex flex-items  justify-end rounded-full relative bg-primary-300"
      >
        <motion.div
    
          variants={item}
          
          style={{ height: volumeLevel + "px" }}
          className="bg-accent absolute bottom-0 w-full flex items-center justify-center rounded-full"
        >
          <motion.div
 
           style={{}} variants={item}
          className="w-4 h-4 rounded-full bg-accent absolute top-0"
          ></motion.div>
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
