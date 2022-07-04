import React from "react";

export const Progress = ({
  className,
  height,
  width,
  ProgressBar,
  subProgressBar,
  color,
  text,
  textAlign,
  textColor,
  stepLength,
  step,
  align,
}: any) => {
  const Parentdiv = {
    height: height ? height : 20,
    width: width ? width : "100%",
    justifyContent: align,
  };

  const Childdiv = {
    height: "100%",
    width: `${(step / stepLength) * 100}%`,
    backgroundColor: color ? color : "#99ccff",
    borderRadius: 40,
    textAlign: textAlign ? textAlign : "center",
  };

  const progresstext = {
    color: textColor ? textColor : "black",
  };

  const SubStep = {
    display: subProgressBar ? "block" : "none",
  };

  return (
    <>
      {ProgressBar ? (
        <div
          className={`llm-progresbar-container ${className}`}
          style={Parentdiv}>
          <div className={`llm-progressbar`} style={Childdiv}>
            <span className={`llm-progressbar-text`} style={progresstext}>
              {text}
            </span>
          </div>

          {subProgressBar ? (
            <div className={`llm-progressbar-steps`} style={SubStep}>
              Step {step} of {stepLength}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
