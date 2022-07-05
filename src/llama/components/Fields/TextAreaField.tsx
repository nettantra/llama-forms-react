import React,{ useEffect, useRef, useState } from "react";

interface Props{   
  properties:any,
  handleData:any,
  name:any,  
  parentState:any, 
}

export default function TextAreaField(props:Props) {
  const { properties, handleData, name } = props;
  let textareaRef : any = useRef()
//********
const caseChange = (value:any) => {
  if (properties["lowercase"]) return value.toLowerCase();
  if (properties["uppercase"]) return value.toUpperCase();
  return value
}
//**** */
  const handleChange = (e:any) => {
    const value = caseChange(e.target.value)
    handleData(value);
  };

useEffect(() => {
  if (properties?.["className"]?.trim()) {
    textareaRef.current.style = ""
    textareaRef.current.className = properties?.["className"] ?? name
  }
  if (properties["style"]) {
    textareaRef.current.style = ""
    for (let key in properties["style"]) {
      textareaRef.current.style.setProperty(key, properties["style"][key]);
    }
  }
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
        <textarea
          id={properties?.["id"]?? name}
          ref={textareaRef}
          name={name}
          placeholder={
            properties["placeholder"] ? properties["placeholder"] : null
          }
          value={props.parentState[name].value}
          disabled={properties["readOnly"] ? properties["readOnly"] : false}
          maxLength={properties["maxlength"] ? properties["maxlength"] : null}
          readOnly={properties["readOnly"] ? properties["readOnly"] : false}
          required={properties["required"] ? properties["required"] : false}
          autoFocus={properties["autofocus"] ? properties["autofocus"] : false}
          autoComplete={properties["autoComplete"] ? "on" : "off"}
          style={{ borderRadius: "5px", width: "95%", padding: "7px", fontSize: "12px", fontFamily: "Nunito Sans", minHeight: properties?.height || "180px", minWidth: properties?.width || "95%" }}
          rows={properties["rows"] ? properties["rows"] : null}
          cols={properties["cols"] ? properties["cols"] : null}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p style={{
          marginTop: "5px",
          marginBottom: "20px",
          fontFamily: "Nunito Sans",
          fontWeight: "200",
          fontSize: "14px",
        }}>{properties["description"]}</p>
      </div>
    </>
  );
}
