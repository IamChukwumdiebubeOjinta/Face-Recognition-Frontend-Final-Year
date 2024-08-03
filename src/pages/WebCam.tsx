import React from "react";
import { Footer, WebcamHero } from "../components";

const WebCam = () => {
  return (
    <>
      <WebcamHero />
      <Footer className="fixed bottom-0 left-0 z-20 w-[97%]" />
    </>
  );
};

export default WebCam;
