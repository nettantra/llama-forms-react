import React, { useState, forwardRef } from "react";
import RenderForm from "./RenderForm";

interface Props {
  fields: any,
  parentState: any,
  parentSetState: any,
  renderList: object,
  submitButtonText: String,
  onSubmit: any
}

const SingleForm = forwardRef((props: Props, ref: any) => {
  const fields = props.fields;
  const data = props.parentState;

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const alertRender = () => {
    return (
      <p
        style={{
          width: "100%",
          backgroundColor: "#ffc3b2",
          color: "#902100",
          padding: "5px 10px",
          fontSize: "16px",
          fontWeight: "300",
          fontFamily: "Nunito Sans",
          border: "none",
          borderRadius: "5px",
          textAlign: "center",
        }}>
        {alertMsg}
      </p>
    );
  };

  const handleSubmit = () => {
    setAlert(false);
    for (let key in fields) {
      if (data[key].value === "" && fields[key].required) {
        setAlert(false);
        setAlertMsg(`${key} field is required`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
        return;
      }
      if (data[key].error) {
        setAlert(false);
        setAlertMsg(`Please look into ${key} field`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
        return;
      }
      if (data[key].value === "" && fields[key].dependentRequired) {
        if (fields[key]?.dependent?.value?.every((val: any) => Object.keys(data[fields[key]?.parentField]?.value).includes(val)) || Object.keys(data[fields[key]?.parentField]?.value).some((val: any) => fields[key]?.dependent?.value?.includes(val)) || fields[key]?.dependent?.value[0] === data[fields[key]?.parentField]?.value) {
          setAlert(false);
          setAlertMsg(`${key} field is required`);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
          return;
        }
      }
    }
    let finalData: any = {};
    for (let key in data) {
      if (fields[key].type === "anchor" || fields[key].type === "paragraph") {
        continue
      }
      finalData[key] = data[key].value;
    }
    props.onSubmit(finalData);
  };

  return (
    <>
      {alert && alertRender()}
      <RenderForm
        parentState={props.parentState}
        parentSetState={props.parentSetState}
        fields={props.fields}
        renderList={props.renderList}
      />
      <button
        style={{
          backgroundColor: "#ddd",
          borderRadius: "5px",
          border: "none",
          padding: "5px 10px",
          fontSize: "16px",
          fontFamily: "Nunito Sans",
          margin: "20px 0px",
        }}
        onClick={handleSubmit}
        ref={ref}>
        {props?.submitButtonText ?? "Submit"}
      </button>
    </>
  );
})
export default SingleForm;
