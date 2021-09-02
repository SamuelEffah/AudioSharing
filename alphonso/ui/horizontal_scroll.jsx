import React, { useEffect, useMemo, useState } from "react";
import { RightArrow, LeftArrow } from ".././icons";
import { motion } from "framer-motion";



const ScrollBtn = ({ onClick, className, icon, direction, ...props }) => {
  const directionClass = direction == "right" ? "right-0" : "left-0";
  return (
    <button
      onClick={onClick}
      className={`z-50 absolute bg-primary-700 shadow-lg  flex items-center justify-center
         w-12 h-12 rounded-full ${directionClass} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

const getPanelWidth = () => {
  if (typeof window !== "undefined") {
    return document.getElementById("middlePanel").clientWidth;
  }
};

const HorizontalScroll = ({ children, offset = 0, itemSize, ...props }) => {
  const itemsLength = children ? children.length : 0;
  const itemWidth = itemSize + offset;
  const [panelWidth, setPanelWidth] = useState(getPanelWidth());
  const maxChildrenVisible = panelWidth / itemWidth;
  const maxWidth = itemsLength * itemWidth;
  const [currentAction, setCurrentAction] = useState(null);
  const [position, setPosition] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isDisableLeft, setIsDisableLeft] = useState(
    !(itemsLength > Math.ceil(maxChildrenVisible))
  );
  const [isDisableRight, setIsDisableRight] = useState(true);

  useEffect(() => {
    const getWidth = () => {
      setPanelWidth(getPanelWidth());
    };

    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  useEffect(() => {
    let r = maxChildrenVisible % 1;
    let maxLeftMove =
      (itemsLength - Math.ceil(maxChildrenVisible)) * itemWidth +
      Math.floor(itemWidth - itemWidth * r);
    if (currentAction == "moveLeft" && maxLeftMove != Math.abs(translate)) {
      let temp = position - 1;
      if (Math.abs(temp) <= itemsLength - Math.ceil(maxChildrenVisible)) {
        let moveXLeft = itemWidth * -1;
        setTranslate(translate + moveXLeft);
        setPosition(temp);
        setIsDisableRight(false);
      }
      if (Math.abs(temp) == itemsLength - Math.ceil(maxChildrenVisible)) {
        setTranslate(maxLeftMove * -1);

        setIsDisableLeft(true);
      }
      setCurrentAction(null);
    }
    

    if (currentAction == "moveRight" && translate != 0) {
      let temp = position + 1;
      let moveXRight = itemWidth;
      let minMoveRight = maxLeftMove - itemWidth;
      if (temp <= 0) {
        setTranslate(translate + moveXRight);
        setPosition(temp);
        setIsDisableLeft(false);
      }
      if (temp == 1) {
        setTranslate(translate + Math.floor(itemWidth - itemWidth * r));
        setIsDisableRight(true);
      }

      setCurrentAction(null);
    }


  }, [translate, currentAction, position]);

  return (
    <div className="w-full overflow-x-hidden relative flex items-center">
      {isDisableLeft ? null : (
        <ScrollBtn
          direction="left"
          icon={<LeftArrow width={24} height={24} />}
          onClick={(e) => {
            e.preventDefault();
            setCurrentAction("moveLeft");
          }}
        />
      )}
      <motion.div
        animate={{ x: `${translate}px` }}
        transition={{ duration: 0.5 }}
        //    style={{transform:`translateX(${translate}px)`}}
        className=" flex flex-row"
      >
        {children.map((item, i) => {
            return React.cloneElement(item, { marginX: `${offset}px`});
          
        })}
      </motion.div>
      {isDisableRight ? null : (
        <ScrollBtn
          direction="right"
          icon={<RightArrow width={24} height={24} />}
          onClick={(e) => {
            e.preventDefault();
            setCurrentAction("moveRight");
          }}
        />
      )}
    </div>
  );
};

export default HorizontalScroll;
