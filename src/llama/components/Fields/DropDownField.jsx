import React from 'react';


export default function DropDownField(props) {
  const { properties, handleData, name } = props;

  const handleChange = (e) => {
    handleData(e.target.value);
  };


  //loop through the values object
  const values = properties.values;
  let options = [];
  for (let key in values) {
    options.push(
      <option key={key} value={values[key]}>
        {key}
      </option>
    );
  }
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

        <div style={{ display: "flex", flexDirection: "row" , marginBottom:"20px"}}>
          <p
            style={{
              fontFamily: "Nunito Sans",
              fontWeight: "400",
              fontSize: "14px",
              margin: "5px 0",
            }}
          >
            {properties["description"]}&nbsp;&nbsp;
          </p>
          <div
            style={{
              backgroundColor: "#ddd",
              borderRadius: "5px",
              border: "0px",
              padding: "0px 5px",
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <select
              value={props.parentState[name].value}
              autoFocus={
                properties["autofocus"] ? properties["autofocus"] : false
              }
              disabled={properties["readOnly"] ? properties["readOnly"] : false}
              onChange={(e) => {
                handleChange(e);
              }}
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontFamily: "Nunito Sans",
              }}
            >
              {props.parentState[name].value ? null : (
                <option value="">Select</option>
              )}
              {options}
            </select>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          select:focus {
            outline: none;
          }
        `}
      </style>
    </>
  );
}
