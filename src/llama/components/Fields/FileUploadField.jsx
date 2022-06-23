import { useState } from "react";
import React from 'react';


export default function FileUploadField(props) {
  const { properties, handleData, name } = props;
  const [error, setError] = useState(false);

  function checkFileType(file) {
    const fileTypes = properties.accept;
    if (!fileTypes) {
      return true;
    }
    if (fileTypes.includes(file.type.split("/")[1])) {
      if (properties.maxFileSize && file.size > properties.maxFileSize * 1000) {
        return false;
      }
      if (properties.minFileSize && file.size < properties.minFileSize * 1000) {
        return false;
      }
      return true;
    }
    return false;
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (checkFileType(e.target.files[0])) {
        setError(false);
        handleData(e.target.files[0]);
      } else {
        setError(true);
        handleData(e.target.files[0], true);
      }
    }
  };

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
        {properties["type"] === "range" ? (
          <span>{props.parentState[name].value}</span>
        ) : null}
        <input
          id={name}
          name={name}
          className="uploadInput"
          type={properties["type"] ? properties["type"] : "text"}
          placeholder={
            properties["placeholder"] ? properties["placeholder"] : null
          }
          disabled={properties["readOnly"] ? properties["readOnly"] : false}
          maxLength={properties["maxlength"] ? properties["maxlength"] : null}
          min={properties["min"] ? properties["min"] : null}
          max={properties["max"] ? properties["max"] : null}
          multiple={properties["multiple"] ? properties["multiple"] : null}
          required={properties["required"] ? properties["required"] : false}
          autoFocus={properties["autoFocus"] ? properties["autoFocus"] : false}
          autoComplete={properties["autoComplete"] ? "on" : "off"}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <style jsx = "true">{`
        .uploadInput::file-selector-button {
            background: #ddd;
            color:#000;
            border-radius:5px;
            border: 0px solid;
            padding: 5px 10px;
            font-size:14px;
            font-family: "Nunito Sans";
            margin-right:10px;
            cursor:pointer;
        }
        .uploadInput{
            font-size:12px;
            font-family: "Nunito Sans";
        }
      `}</style>


        <div style={{ marginBottom: "20px" }}>
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
          {error ? (
            <p
              style={{
                marginTop: "5px",
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                fontSize: "14px",
                color: "#9e001a",
              }}
            >
              {properties["errorMessage"]
                ? properties["errorMessage"]
                : "Invalid file type or size"}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
