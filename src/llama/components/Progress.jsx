import React from 'react'

export const Progress = ({ height, width, ProgressBar ,subProgressBar, color, text, textAlign, textColor, stepLength, step, align }) => {
  const Parentdiv = {
    height: height ? height : 20,
    width: width ? width : '100%',
    borderRadius: 40,
    marginTop: 50,
    marginBottom: subProgressBar? 0: 20 ,
    display: 'flex',
    justifyContent: align,
  }

  const Childdiv = {
    height: '100%',
    width:`${step/stepLength *100}%`,
    backgroundColor: color ? color : "#99ccff",
    borderRadius: 40,
    textAlign: textAlign ? textAlign : "center",
  }
  const progresstext = {
    padding: 8,
    color: textColor ? textColor : "black",
    fontWeight: 500
  }
  const SubStep = {
    display: subProgressBar? "block": "none" ,
    marginTop:5,
    marginBottom:"30px",
    marginLeft:"auto",

  }
  return (
    <>
    {
      ProgressBar?
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progresstext}>{text}</span>
        </div>
      </div>
      : null
    }
      <div style={SubStep}>Step {step} of {stepLength}</div>
    </>
  )
}
