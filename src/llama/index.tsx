import React, { useEffect, useState, useRef } from "react";
import MultipleForm from "./components/form/MultipleForm";
import SingleForm from "./components/form/SingleForm";
import { Progress } from "./components/utils/Progress";
interface LooseObject {
  [key: string]: any;
}

export const LlamaForm = (props: any) => {
  const { schema = {}, options, onSubmit } = props;
  const {
    type,
    title,
    description,
    wizard,
    wizardOptions = {},
    progressBar = {},
    buttons = {},
    initialStep,
    properties = {},
  } = schema;

  const [fields, setFields] = useState<LooseObject>({});
  const [fieldList, setFieldList] = useState([]);
  const [data, setData] = useState<LooseObject>({});
  const [wizardStepSet, setWizardStepSet] = useState<LooseObject>({});
  const [step, setStep] = useState(initialStep ?? 1);

  let enterButton: any = useRef();

  //loop through the fields and set the data
  const customizeData = (fields: LooseObject) => {
    let tempData: LooseObject = {};
    let list: any = [];
    let wizardSet: any = {};
    for (let key in fields) {
      tempData[key] = { value: fields[key].value || "", error: false };
      list.push(key);
      try {
        wizardSet[fields[key].step].push(key);
      } catch {
        wizardSet[fields[key].step] = [key];
      }
    }
    setData(tempData);
    setFieldList(list);
    setWizardStepSet(wizardSet);
  };

  const structureData = () => {
    if (!properties) return;
    let tempFields: any = {};
    const fields = options.fields || {};
    const value = props.data || {};

    /* Looping through the properties and setting the fields. */
    for (let key in properties) {
      tempFields[key] = {
        ...fields[key],
        step: properties[key].step
          ? properties[key].step
          : properties[key].depend
          ? properties[fields[key].parentField].step
          : 1,
        type: fields[key] ? fields[key].type : "",
        values: properties[key].enum || "",
        required: properties[key]?.depend
          ? false
          : properties[key].required || false,
        value: value[key] || "",
        parentField: fields[key]?.parentField || "",
        dependentRequired: properties[key]?.depend
          ? properties[key].required
          : false || "",
        depend: properties[key]?.depend || false,
      };
    }

    setFields(tempFields);
    customizeData(tempFields);
  };

  useEffect(() => {
    structureData();
  }, []);

  const formBuilder = () => {
    if (!props.schema) return;
    if (wizard) {
      return (
        <MultipleForm
          parentState={data}
          parentSetState={setData}
          fields={fields}
          wizardStepSet={wizardStepSet}
          onSubmit={onSubmit}
          step={setStep}
          buttons={buttons ?? ""}
          initialStep={initialStep}
          wizardStepOptions={wizardOptions}
          ref={enterButton}
          stepLength={Object.keys(wizardStepSet).length}
        />
      );
    }

    return (
      <SingleForm
        parentState={data}
        parentSetState={setData}
        renderList={fieldList}
        fields={fields}
        onSubmit={onSubmit}
        submitButtonText={buttons?.submit?.text ?? "Submit"}
        loader={buttons?.submit?.loader ?? false}
        ref={enterButton}
      />
    );
  };

  useEffect(() => {
    // for blacklist
    let btn =
      document.getElementsByClassName("btn llm-next-btn")[0] ||
      document.getElementsByClassName("btn llm-submit-btn")[0];
    let currentStepFields = wizardStepSet[step];
    btn?.removeAttribute("disabled");
    currentStepFields?.forEach((field: string) => {
      if (fields[field].blacklist) {
        if (fields[field].type === "checkbox") {
          Object.keys(data[field].value).forEach((key: string) => {
            fields[field].blacklist.includes(key) &&
              btn?.setAttribute("disabled", "true");
          });
        }
        fields[field].blacklist.includes(data[field].value) &&
          btn?.setAttribute("disabled", "true");
      }
    });
    //end

    const listener = (event: any) => {
      if (event.key === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        enterButton.current.click();
      }
    };
    document.addEventListener("keydown", listener);
    //need to clear keydown function
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [step]);

  useEffect(() => {
    let btn =
      document.getElementsByClassName("btn llm-next-btn")[0] ||
      document.getElementsByClassName("btn llm-submit-btn")[0];

    btn?.removeAttribute("disabled");
    for (let field in fields) {
      if (fields[field].blacklist) {
        if (fields[field].type === "checkbox") {
          Object.keys(data[field].value).forEach((key: string) => {
            fields[field].blacklist.includes(key) &&
              btn?.setAttribute("disabled", "true");
          });
        }
        fields[field].blacklist.includes(data[field].value) &&
          btn?.setAttribute("disabled", "true");
      }
    }
  }, [data]);

  const {
    show: pbShow,
    height: pbHeight,
    width: pbWidth,
    color: pbColor,
    text: pbText,
    textColor: pbTextColor,
    subProgress,
    align: pbAlign,
    textAlign: pbTextAlign,
    className: pbClassName,
    subProgressText: spText,
    numberToWord: numToWord,
  } = progressBar;
  return (
    <>
      <style>
        {`
        .llm-form-container{
          background-color: #FAFAFA;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          margin:auto;
      }
      .llm-heading{
          font-family: "Nunito Sans";
          margin: 20px 0px ;
          text-align: center;
      }
      .llm-description{
          font-size: "Nunito Sans";
          font-weight: "400";
          margin: 0px 0px 30px 0px;
          text-align: center;
      }
      .llm-progresbar-container{
          border-radius :40px;
          margin-top : 50px;
          display:flex;
          flex-direction: column;
          margin-bottom: 20px;
      }
      .llm-progressbar-text{
          padding:8px;
          font-weight: 500;
      }
      .llm-progressbar-steps{
          margin: 5px 5px 20px auto;
      }
      `}
      </style>
      <div className={`llm-form-container`}>
        {title && <h1 className={`llm-heading`}>{title}</h1>}
        {description && <h2 className={`llm-description`}>{description}</h2>}

        {progressBar ? (
          <Progress
            className={pbClassName ?? ""}
            height={pbHeight ?? ""}
            width={pbWidth ?? ""}
            step={step}
            stepLength={Object.keys(wizardStepSet).length}
            color={pbColor ?? ""}
            text={pbText ?? ""}
            textAlign={pbTextAlign ?? ""}
            textColor={pbTextColor ?? ""}
            ProgressBar={pbShow ?? false}
            subProgressBar={subProgress ?? false}
            align={pbAlign ?? "start"}
            spText={spText ? spText : "Step"}
            numToWord={numToWord ? true : false}
          />
        ) : null}

        <form
          className="llm-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{ minWidth: "100%", padding: "0px 20px" }}
        >
          {formBuilder()}
        </form>
      </div>
    </>
  );
};

export default LlamaForm;
