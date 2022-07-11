
import React from 'react';
import { Fragment} from "react";
import DropDownField from "../fields/DropDown/DropDown";
import InputField from "../fields/Common/InputField";
import RadioField from "../fields/Radio/Radio";
import TextAreaField from "../fields/TextArea/TextArea";
import CheckBoxField from "../fields/CheckBox/CheckBox";
import FileUploadField from "../fields/File/File";


interface Props{  
    fields:any,
    renderList:any,  
    parentState:any,
    parentSetState:any,
    
    }
export default function RenderForm(props:Props) {
    const fields = props.fields
    const fieldList = props.renderList || []

    const renderForm = (type:any, index:any, handleData:any, properties:any, data:any, key:any) => {
        // switch case for the different field types
        switch (type) {
            case 'dropdown': {
                return (
                    <Fragment key={index}>
                        <DropDownField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'radio': {
                return (
                    <Fragment key={index}>
                        <RadioField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'checkbox': {
                return (
                    <Fragment key={index}>
                        <CheckBoxField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'file': {
                return (
                    <Fragment key={index}>
                        <FileUploadField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'textarea': {
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
                )
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
                )
            }
        }
    }


    return (
        <>
            {fieldList.map((field:any, index:any) => {
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
                    if (props.parentState[properties.parentField].value === properties?.dependent?.value[0]) {
                        return renderForm(fields[field].type, index, handleData, properties, props.parentState, field)
                    }
                    if (properties?.dependent?.type?.toLowerCase() === "multi" && properties?.dependent?.value?.every((key : string) => Object.keys(props.parentState[properties.parentField].value).includes(key))) {
                        return renderForm(fields[field].type, index, handleData, properties, props.parentState, field)
                    } if (properties?.dependent?.type?.toLowerCase() === "single" && Object.keys(props.parentState[properties.parentField].value).some((val) => properties?.dependent?.value?.includes(val))) {
                        return renderForm(fields[field].type, index, handleData, properties, props.parentState, field)
                    }
                }
            })}
    </>
    );
}