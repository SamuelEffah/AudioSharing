import React from "react";

import ControllerOverlay from "../../shared-components/controller_overlay"
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";


const SettingsController = ({...props }) => {
    const screenSize  = useDetectScreenSize()
  return (
   <ControllerOverlay>
      <div style={{ width: "96%" }} className="">
        <h3 className="font-medium capitalize text-2xl">Settings</h3>
      </div>
      </ControllerOverlay>
  );
};

export default SettingsController