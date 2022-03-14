import React from "react";
import Loader from "react-loader-spinner";

const Spinners: React.FC<{
  type:
    | "Audio"
    | "BallTriangle"
    | "Bars"
    | "Circles"
    | "Grid"
    | "Hearts"
    | "Oval"
    | "Puff"
    | "Rings"
    | "TailSpin"
    | "ThreeDots"
    | "Watch"
    | "RevolvingDot"
    | "Triangle"
    | "Plane"
    | "MutatingDots"
    | "CradleLoader";
  w: number;
  h: number;
}> = ({ type, w, h }) => {
  return <Loader type={type} color="#00BFFF" height={h} width={w} />;
};

export default Spinners;
