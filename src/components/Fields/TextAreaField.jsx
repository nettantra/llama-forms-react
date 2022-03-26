import { useEffect, useState } from "react";

export default function TextAreaField(props) {
  const { properties, handleData, name } = props;
  const [style, setStyle] = useState(properties.style || { borderRadius: "5px", width: "100%", padding: "15px", fontSize: "12px", fontFamily: "Nunito Sans" });

  const handleChange = (e) => {
    handleData(e.target.value);
  };

  useEffect(() => {
    setStyle({
      ...style,
      minHeight: properties.height || "180px",
      minWidth: properties.width || "100%",
    });
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
          id={name}
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
          style={style}
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
