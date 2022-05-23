import { Fragment, useState } from "react";
import RenderForm from "./renderForm";
import React from 'react';

export default function MultipleForm(props) {
  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const fields = props.fields;
  const data = props.parentState;
  let fieldSet = props.wizardStepSet;

  const alertRender = () => {
    return <p style={{ width: '100%', backgroundColor: "#ffc3b2", color: "#902100", padding: "5px 10px", fontSize: "16px", fontWeight: "300", fontFamily: "Nunito Sans", border: "none", borderRadius: "5px", textAlign: "center" }}>{alertMsg}</p>
  }

  const handleNext = () => {
    let currentFields = fieldSet[step];
    for (let i in currentFields) {
      if (
        data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required
      ) {
        setAlert(false)
        setAlertMsg(`${currentFields[i]} field is required`)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 5000)
        return;
      }
      if (data[currentFields[i]]?.error) {
        setAlert(false)
        setAlertMsg(`Please look into ${currentFields[i]} field`)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 5000)
        return;
      }
    }
    setStep(step + 1);
    props.step(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
    props.step(step - 1);
  };

  const handleSubmit = () => {
    let currentFields = fieldSet[step];
    for (let i in currentFields) {
      if (
        data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required
      ) {
        setAlert(false)
        setAlertMsg(`${currentFields[i]} field is required`)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 5000)
        return;
      }
      if (data[currentFields[i]]?.error) {
        setAlert(false)
        setAlertMsg(`Please look into ${currentFields[i]} field`)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 5000)
        return;
      }
    }
    let finalData = {};
    for (let key in data) {
      finalData[key] = data[key].value
    }
    props.onSubmit(finalData)

  };

  return (
    <>
      {alert && alertRender()}
      <RenderForm
        parentState={props.parentState}
        parentSetState={props.parentSetState}
        fields={fields}
        renderList={fieldSet[step]}
      />

      <button
        className="btn"
        disabled={step === 1 ? true : false}
        onClick={handlePrevious}
      >
        Previous
      </button>
      {step === parseInt(Object.keys(fieldSet).pop()) ? (
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      ) : (
        <button className="btn" onClick={handleNext}>
          Next
        </button>
      )}

      <style jsx="true">
        {`
          .btn {
            background-color: #ddd;
            border-radius: 5px;
            border: none;
            padding: 5px 10px;
            font-size: 16px;
            font-family: "Nunito Sans";
            margin: 20px 5px;
          }
        `}
      </style>
    </>
  );
}
