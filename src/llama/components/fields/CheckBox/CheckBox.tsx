import React from 'react';
interface Props {
  properties: any,
  handleData: any,
  name: any,
  parentState: any,

}

export default function CheckBoxField(props: Props) {
  const { properties, handleData, name } = props;
  let onlyChecked = properties.onlyCheck;
  let fieldName = name?.replace(/ /g, '-')

  const handleChange = (e: any) => {
    let checkObj = props.parentState[name].value || {};
    checkObj = { ...checkObj, [e.target.value]: e.target.checked }
    for (let key in checkObj) {
      if (!checkObj[key]) {
        delete checkObj[key]
      }
    }

    if (checkObj[onlyChecked] == true) {
      checkObj = { [onlyChecked]: true }
    }
    handleData(Object.keys(checkObj).length >= 1 ? checkObj : "");
  };

  return (
    <>
      <div className="llm-field-checkbox-container">
        <h3
          className="llm-field-checkbox-label"
        >
          {properties["label"]}
        </h3>
        {properties["values"] &&
          properties["values"].map((item: any, index: any) => {
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id={"llm-field-checkbox-"+fieldName+"-" +item+"-"+ index}
                  value={item}
                  onChange={handleChange}
                  style={properties.style || {}}
                  checked={props.parentState[name].value[item] || false}
                  disabled={properties?.["readOnly"] ?? false}
                  hidden={properties?.["hidden"] ?? false}
                  required={properties?.["required"] ?? false}
                  autoFocus={properties?.["autoFocus"] ?? false}
                />
                <label
                  htmlFor={"llm-field-checkbox-"+fieldName+"-"+item+"-"+ index}
                  className="llm-field-checkbox-option-label"
                >
                  {item}
                </label>
              </div>
            );
          })}
        <p
          className="llm-field-checkbox-description"
        >
          {properties["description"]}
        </p>
      </div>

      <style >{`

        .llm-field-checkbox-container{
          font-family: 'Nunito Sans';
          margin-bottom:10px;
        }

        .llm-field-checkbox-description{
          margin: 5px 0px;
          font-weight: 200;
          font-size: 14px;
        }

        .llm-field-checkbox-label{
          font-weight: 400;
          font-size: 16px;
          margin: 5px 0;
        }

        .llm-field-checkbox-option-label{
          margin: 5px 0;
          font-weight: 400;
          font-size: 14px;
        }

        input[type="checkbox"]:checked + label {
          color: #777;
          transition: all 0.2s ease;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
