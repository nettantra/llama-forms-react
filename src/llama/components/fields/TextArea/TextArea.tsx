import React, { useEffect, useRef, useState } from "react";

interface Props {
  properties: any,
  handleData: any,
  name: any,
  parentState: any,
}

export default function TextAreaField(props: Props) {
  const { properties, handleData, name } = props;
  let textareaRef: any = useRef()
  //********
  const caseChange = (value: any) => {
    if (properties["lowercase"]) return value.toLowerCase();
    if (properties["uppercase"]) return value.toUpperCase();
    return value
  }
  //**** */
  const handleChange = (e: any) => {
    const value = caseChange(e.target.value)
    handleData(value);
  };

  return (
    <>
      <div className="llm-field-textarea-container">
        <h3
          className="llm-field-textarea-label"
        >
          {properties["label"]}
        </h3>
        <textarea
          id={properties?.["id"] ?? name}
          ref={textareaRef}
          name={name}
          className={`llm-field-textarea ${properties['className'] ?? ''}`}
          placeholder={
            properties["placeholder"] ? properties["placeholder"] : null
          }
          value={props.parentState[name].value}
          disabled={properties["readOnly"] ?? false}
          maxLength={properties["maxlength"] ?? null}
          readOnly={properties["readOnly"] ?? false}
          required={properties["required"] ?? false}
          autoFocus={properties["autofocus"] ?? false}
          autoComplete={properties["autoComplete"] ? "on" : "off"}
          style={{ minHeight: properties?.height || "180px", minWidth: properties?.width || "95%" }}
          rows={properties["rows"] ? properties["rows"] : null}
          cols={properties["cols"] ? properties["cols"] : null}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p  className="llm-field-textarea-description">{properties["description"]}</p>
      </div>

      <style>
        {`
          .llm-field-textarea-container{
            font-family: 'Nunito Sans';
          }

          .llm-field-textarea-label{
            font-weight: 400;
            font-size: 16px;
            margin: 5px 0;
          }

          .llm-field-textarea{
            width: 95%;
            font-weight: 400;
            font-size: 12px;
            border: 1px solid #000;
            border-radius: 5px;
            padding: 7px;
          }

          .llm-field-textarea-description{
            margin-top: 5px;
            margin-bottom: 20px;
            font-weight: 200;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
}
