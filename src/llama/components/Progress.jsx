import React from 'react'

export const Progress = ({ height, ProgressBar ,subProgressBar, color, text, textColor, stepLength, step }) => {
  const Parentdiv = {
    height: height ? height : 20,
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    marginTop: 50,
    marginBottom: subProgressBar? 0: 20 ,
  }

  const Childdiv = {
    height: '100%',
    width:`${step/stepLength *100}%`,
    backgroundColor: color ? color : "#99ccff",
    borderRadius: 40,
    textAlign: 'center'
  }
  const progresstext = {
    padding: 8,
    color: textColor ? textColor : "black",
    fontWeight: 800
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
          <span style={progresstext}>{text ? text : "Progress . . ."}</span>
        </div>
      </div>
      : null
    }
      <div style={SubStep}>Step {step} of {stepLength}</div>
    </>
  )
}
