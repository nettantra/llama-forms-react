import React from 'react';

export default function RadioField(props) {
  const { properties, handleData, name } = props;

  const handleChange = (e) => {
    handleData(e.target.value);
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
        {properties["values"].map((value, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={props.parentState[name].value === value}
                onChange={(e) => {
                  handleChange(e);
                }}
                disabled={
                  properties["readOnly"] ? properties["readOnly"] : false
                }
              />
              <label
                htmlFor={value}
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "400",
                  fontSize: "14px",
                  marginLeft: "7px",
                }}
              >
                {value}
              </label>
            </div>
          );
        })}
        <p style={{
          marginTop: "5px",
          marginBottom: "20px",
          fontFamily: "Nunito Sans",
          fontWeight: "200",
          fontSize: "14px",
        }}>{properties["description"]}</p>
      </div>

      <style jsx>{`
        [type="radio"]:checked,
        [type="radio"]:not(:checked) {
          position: absolute;
          left: -9999px;

        }
        [type="radio"]:checked + label,
        [type="radio"]:not(:checked) + label {
          position: relative;
          padding-left: 28px;
          cursor: pointer;
          line-height: 20px;
          display: inline-block;
          color: #000;
        }
        [type="radio"]:checked + label:before,
        [type="radio"]:not(:checked) + label:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 14px;
          height: 14px;
          border: 1px solid #999;
          border-radius: 100%;
          background: #fff;
        }
        [type="radio"]:checked + label:after,
        [type="radio"]:not(:checked) + label:after {
          content: "";
          width: 10px;
          height: 10px;
          background: #1475ff;
          position: absolute;
          top: 3px;
          left: 3px;
          border-radius: 100%;
          -webkit-transition: all 0.2s ease;
          transition: all 0.2s ease;
        }
        [type="radio"]:not(:checked) + label:after {
          opacity: 0;
          -webkit-transform: scale(0);
          transform: scale(0);
        }
        [type="radio"]:checked + label:after {
          opacity: 1;
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      `}</style>
    </>
  );
}
