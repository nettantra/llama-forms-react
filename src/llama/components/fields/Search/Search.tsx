import React, { ChangeEvent, useState } from "react";

interface LooseObject {
  [key: string]: any;
}
interface Props {
  properties: LooseObject;
  handleData: any;
  name: any;
  parentState: any;
}
const SearchField = (props: Props) => {
  const { properties, handleData, name } = props;
  const [error, setError] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleData(e.target.value, false);
  };
  return (
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
      <input
        type="search"
        id={name}
        name={name}
        className={properties["className"] || "llama-" + name}
        placeholder={properties?.["placeholder"] || null}
        value={props.parentState[name]?.value}
        maxLength={properties?.["maxlength"] || null}
        minLength={properties?.["minLength"] || null}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        
      />
    </div>
  );
};

export default SearchField;
