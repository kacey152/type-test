import React from "react";
import "./ProgressBar.css";

export const ProgressBar = (props) => {
  const { current, total } = props;
  const progressPercentage = (current / total) * 100;
  return (
      <div className="track border border-black m-5">
        <div
          className="character"
          style={{ left: `calc(${progressPercentage}% - ${progressPercentage * 9 / 100}vw)` }}
        ></div>
      </div>
  );
};
