import React, { useState, forwardRef } from "react";
import RenderForm from "./renderForm";
import Loader from "../Loader";

interface LooseObject {
  [key: string]: any;
}
interface Props {
  initialStep: number;
  fields: any;
  parentState: object;
  parentSetState: object;
  wizardStepSet: object;
  onSubmit: any;
  buttons: LooseObject;
  step: any;
  wizardStepOptions: any;
  stepLength : any;
}

const MultipleForm = forwardRef((props: Props, ref: any) => {
  const [step, setStep] = useState(props.initialStep ?? 1);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = props.fields;
  const data: any = props.parentState;
  let fieldSet: LooseObject = props.wizardStepSet;

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

  const handleNext = async () => {
    setLoading(true);
    let currentFields = fieldSet[step];
    for (let i in currentFields) {
      if (
        data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required
      ) {
        setAlert(false);
        setAlertMsg(`${currentFields[i]} field is required`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 3000);
        return;
      }
      if (data[currentFields[i]]?.error) {
        setAlert(false);
        setAlertMsg(`Please look into ${currentFields[i]} field`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 3000);
        return;
      }
    }
    let finalData: any = {};
    for (let key in data) {
      if (fields[key].type === "anchor" || fields[key].type === "paragraph") {
        continue
      }
      finalData[key] = data[key].value;
    }

    let currentData = {
      step: step,
      data: finalData,
      stepLength: props?.stepLength
    };

    let wizardStepOptions = props?.wizardStepOptions;

    // if onNext not available for specific steps then call global one
    if (wizardStepOptions && props?.wizardStepOptions[step]?.onNext) {
      await props?.wizardStepOptions[step]?.onNext(currentData);
    } else {
      if (wizardStepOptions?.onNext) {
        await wizardStepOptions.onNext(currentData);
      }
    }

    setStep(step + 1);
    props.step(step + 1);
    setLoading(false);
  };

  const handlePrevious = async() => {
    setLoading(true);

    //final data for return
    let finalData: any = {};
    for (let key in data) {
      if (fields[key].type === "anchor" || fields[key].type === "paragraph") {
        continue
      }
      finalData[key] = data[key].value;
    }

    let currentData = {
      step: step,
      data: finalData,
      stepLength: props?.stepLength
    };

    let wizardStepOptions = props?.wizardStepOptions;

    // if onNext not available for specific steps then call global one
    if (wizardStepOptions && props?.wizardStepOptions[step]?.onPrev) {
      await props?.wizardStepOptions[step]?.onPrev(currentData);
    } else {
      if (wizardStepOptions?.onPrev) {
        await wizardStepOptions.onPrev(currentData);
      }
    }


    setStep(step - 1);
    props.step(step - 1);
    setLoading(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    let currentFields = fieldSet[step];
    for (let i in currentFields) {
      if (
        data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required
      ) {
        setAlert(false);
        setAlertMsg(`${currentFields[i]} field is required`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 5000);
        return;
      }
      if (data[currentFields[i]]?.error) {
        setAlert(false);
        setAlertMsg(`Please look into ${currentFields[i]} field`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 5000);
        return;
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
    setLoading(false);
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
        className='btn'
        disabled={step === 1 ? true : false}
        onClick={handlePrevious}>
        {[
          props?.buttons?.["previous"]?.text ?? "Previous",
          props?.buttons?.["previous"]?.loader ? (
            loading ? (
              <Loader key={"key"} />
            ) : null
          ) : null,
        ]}
      </button>
      {step === parseInt(String(Object.keys(fieldSet).pop())) ? (
        <button className='btn' onClick={handleSubmit} ref={ref}>
          {[
            props?.buttons?.["submit"]?.text ?? "Submit",
            props?.buttons?.["next"]?.loader ? (
              loading ? (
                <Loader key={"key"} />
              ) : null
            ) : null,
          ]}
        </button>
      ) : (
        <button
          className='btn'
          onClick={handleNext}
          disabled={loading}
          ref={ref}>
          {[
            props?.buttons?.["next"]?.text ?? "Next",
            props?.buttons?.["next"]?.loader ? (
              loading ? (
                <Loader key={"key"} />
              ) : null
            ) : null,
          ]}
        </button>
      )}

      <style>
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
});
export default MultipleForm;
