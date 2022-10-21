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
  spText,
  numToWord,
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
  const numToWordObj: any = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };
  const placement = {
    100: " hundred",
    1000: " thousand",
    1000000: " million",
    1000000000000: " trillion",
  };

  const numberToWordConverter: any = (num: any) => {
    if (numToWordObj[num]) {
      return numToWordObj[num];
    }
    if (num < 100) {
      let whole = Math.floor(num / 10) * 10;
      let part = num % 10;
      return numToWordObj[whole] + " " + numToWordObj[part];
    }
    const limiter = (val: any) => num < val;
    const limiterIndex: any = Object.keys(placement).findIndex(limiter);
    const limiterKey: any = Object.keys(placement)[limiterIndex];
    const limiterVal: any = Object.values(placement)[limiterIndex - 1];
    const limiterMod: any = Object.keys(placement)[limiterIndex - 1];

    if (num < limiterKey) {
      let whole = Math.floor(num / limiterMod);
      let part = num % limiterMod;
      if (part === 0) {
        return numberToWordConverter(whole) + limiterVal;
      } else {
        return (
          numberToWordConverter(whole) +
          limiterVal +
          " and " +
          numberToWordConverter(part)
        );
      }
    }
  };
  return (
    <>
      {ProgressBar ? (
        <div
          className={`llm-progresbar-container ${className}`}
          style={Parentdiv}
        >
          <div className={`llm-progressbar`} style={Childdiv}>
            <span className={`llm-progressbar-text`} style={progresstext}>
              {text}
            </span>
          </div>

          {subProgressBar ? (
            <div className={`llm-progressbar-steps`} style={SubStep}>
              {numToWord ? (
                <p
                  style={{ textTransform: "capitalize" }}
                >{`${spText} ${numberToWordConverter(
                  step
                )} of ${numberToWordConverter(stepLength)}`}</p>
              ) : (
                <p>{`${spText} ${step} of ${stepLength}`}</p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
