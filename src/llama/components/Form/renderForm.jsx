import React from "react";
import { Fragment } from "react";
import DropDownField from "../Fields/DropDownField";
import InputField from "../Fields/InputField";
import RadioField from "../Fields/RadioField";
import TextAreaField from "../Fields/TextAreaField";
import CheckBoxField from "../Fields/CheckBoxField";
import FileUploadField from "../Fields/FileUploadField";

export default function RenderForm(props) {
  const fields = props.fields;
  const fieldList = props.renderList || [];

  const renderForm = (type, index, handleData, properties, data, key) => {
    // switch case for the different field types
    switch (type) {
      case "dropdown": {
        return (
          <Fragment key={index}>
            <DropDownField
              handleData={handleData}
              properties={properties}
              parentState={data}
              name={key}
            />
          </Fragment>
        );
      }
      case "radio": {
        return (
          <Fragment key={index}>
            <RadioField
              handleData={handleData}
              properties={properties}
              parentState={data}
              name={key}
            />
          </Fragment>
        );
      }
      case "checkbox": {
        return (
          <Fragment key={index}>
            <CheckBoxField
              handleData={handleData}
              properties={properties}
              parentState={data}
              name={key}
            />
          </Fragment>
        );
      }
      case "file": {
        return (
          <Fragment key={index}>
            <FileUploadField
              handleData={handleData}
              properties={properties}
              parentState={data}
              name={key}
            />
          </Fragment>
        );
      }
      case "textarea": {
        return (
          <Fragment key={index}>
            <TextAreaField
              key={key}
              handleData={handleData}
              properties={properties}
              parentState={data}
              name={key}
            />
          </Fragment>
        );
      }
      default: {
        return (
          <Fragment key={index}>
            <InputField
              handleData={handleData}
              properties={properties}
              parentState={data}
              name={key}
            />
          </Fragment>
        );
      }
    }
  };

  return (
    <>
      {fieldList.map((field, index) => {
        const handleData = (
          value = props.parentState[field].value,
          error = false
        ) => {
          props.parentSetState({
            ...props.parentState,
            [field]: { value: value, error: error },
          });
        };
        let properties = fields[field];
        if (!properties.depend) {
          return renderForm(
            fields[field].type,
            index,
            handleData,
            properties,
            props.parentState,
            field
          );
        } else {
          if (
            props.parentState[properties.parentField].value ===
            properties.dependentValue
          ) {
            return renderForm(
              fields[field].type,
              index,
              handleData,
              properties,
              props.parentState,
              field
            );
          }
        }
      })}
    </>
  );
}
