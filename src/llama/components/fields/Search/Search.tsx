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
    <>
      <div className="llm-field-search-container">
        <h3 className="llm-field-search-label">{properties["label"]}</h3>
        <input
          type="search"
          id={name}
          name={name}
          className={`llm-field-search ${properties["className"] || ""}`}
          placeholder={properties?.["placeholder"] || null}
          value={props.parentState[name]?.value}
          maxLength={properties?.["maxlength"] || null}
          minLength={properties?.["minLength"] || null}
          autoFocus={properties['autoFocus'] ?? false}
          autoComplete={properties['autoComplete'] ? "on" : "off"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
        />
      </div>
    </>
  );
};

export default SearchField;
