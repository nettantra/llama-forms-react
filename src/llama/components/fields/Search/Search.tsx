import React, { useState } from "react";

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
      <input type="search" />
    </div>
  );
};

export default SearchField;
