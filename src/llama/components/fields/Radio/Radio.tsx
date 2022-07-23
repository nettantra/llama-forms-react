import React from 'react';

interface Props {
  properties: any,
  handleData: any,
  name: any,
  parentState: any,
}
export default function RadioField(props: Props) {
  const { properties, handleData, name } = props;

  const handleChange = (e: any) => {
    handleData(e.target.value);
  };

  return (
    <>
      <div className='llm-field-radio-container'>
        <h3
          className='llm-field-radio-label'
        >
          {properties["label"]}
        </h3>
        {properties["values"].map((value: any, index: any) => {
          return (
            <div key={index}>
              <input
                type="radio"
                id={value}
                className= {`llm-field-radio llm-field-radio-${index}`}
                name={name}
                value={value}
                checked={props.parentState[name].value === value}
                onChange={(e) => {
                  handleChange(e);
                }}
                disabled={
                  properties["readOnly"] ?? false
                }
              />
              <label
                htmlFor={value}
                className="llm-field-radio-option-label"
              >
                {value}
              </label>
            </div>
          );
        })}
        <p className='llm-field-radio-description'>{properties["description"]}</p>
      </div>

      <style >{`

        .llm-field-radio-label{
          font-family: 'Nunito Sans';
          margin: 5px 0px;
          font-weight: 400;
          font-size: 16px;
        }

        .llm-field-radio-description{
          font-family: 'Nunito Sans';
          margin: 5px 0px;
          font-weight: 200;
          font-size: 14px;
        }

        .llm-field-radio-option-label{
          font-family: 'Nunito Sans';
          margin-left: 7px;
          font-weight: 400;
          font-size: 14px;
        }

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
