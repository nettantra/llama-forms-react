import { useEffect, useState } from "react";
import React from 'react';
interface Props{   
  properties:any,
  handleData:any,
  name:any,
  parentState:any,
  
}

export default function CheckBoxField(props:Props) {
  const { properties, handleData, name } = props;
  const [chechBoxData, setCheckBoxData]:any = useState({});

  const handleChange = (e:any) => {
    let checkObj = { ...chechBoxData, [e.target.value]: e.target.checked}
    for (let key in checkObj) {
      if (!checkObj[key]) {
        delete checkObj[key]
      }
    }
    setCheckBoxData(checkObj);
    handleData(checkObj);
  };

  useEffect(() => {
    setCheckBoxData(props.parentState[name].value);
  }, []);

  return (
    <>
      <div>
        <h3
          style={{
            fontFamily: "Nunito Sans",
            fontWeight: "400",
            fontSize: "16px",
            margin: "5px 0",
          }}
        >
          {properties["label"]}
        </h3>
        {properties["values"] &&
          properties["values"].map((item:any, index:any) => {
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id={properties["id"]? properties["id"] : "llmaCheck" + item}
                  value={item}
                  onChange={handleChange}
                  style={properties.style || {}}
                  checked={chechBoxData[item] || false}
                />
                <label
                  htmlFor={item}
                  style={{
                    fontFamily: "Nunito Sans",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginLeft: "7px",
                  }}
                >
                  {item}
                </label>
              </div>
            );
          })}
        <p
          style={{
            margin: "5px 0px",
            fontFamily: "Nunito Sans",
            fontWeight: "200",
            fontSize: "14px",
          }}
        >
          {properties["description"]}
        </p>
      </div>

      <style >{`
        input[type="checkbox"]:checked + label {
          color: #777;
          transition: all 0.2s ease;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
