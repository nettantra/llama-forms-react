import React from 'react';
import { Fragment, useEffect, useState } from "react";
import MultipleForm from "./components/Form/multipleForm";
import SingleForm from "./components/Form/singleForm";
import {Progress} from './components/Progress'


export const LlamaForm = (props) => {
    const [fields, setFields] = useState({});
    const [fieldList, setFieldList] = useState([])
    const [data, setData] = useState({})
    const [wizardStepSet, setWizardStepSet] = useState({})
    const [step, setStep] = useState(props.schema?.initialStep ?? 1);
    
    //loop through the fields and set the data
    const customizeData = (fields) => {
        let tempData = {} 
        let list = [] 
        let wizardSet = {}
        for (let key in fields) {
            tempData[key] = { value: fields[key].value || "", error: false }
            list.push(key)
            try {
                wizardSet[fields[key].step].push(key)
            } catch {
                wizardSet[fields[key].step] = [key]
            }
        }
        setData(tempData)
        setFieldList(list)
        setWizardStepSet(wizardSet)
    }

    const structureData = () => {
        if (!props.schema) return
        let tempFields = {} 
        const schema = props.schema.properties || {}
        const options = props.options.fields || {}
        const value = props.data || {}
        //loop in schema object
        for (let key in schema) {
            tempFields[key] = {
                ...options[key],
                step: schema[key].step ? schema[key].step : schema[key].depend ? schema[options[key].parentField].step : 1,
                type: options[key] ? options[key].type : "",
                values: schema[key].enum || "",
                required: schema[key].required || false,
                value: value[key] || "",
                parentField: options[key]?.parentField || "",
                dependentValue: options[key]?.dependentValue || "", 
                depend: schema[key]?.depend || false,
            }
        }
        setFields(tempFields)
        customizeData(tempFields)
    }

    useEffect(() => {
        structureData()
    }, [])

    const formBuilder = () => {
        if (!props.schema) return
        if (props.schema.wizard) {
            return (
                <MultipleForm
                    parentState={data}
                    parentSetState={setData}
                    fields={fields}
                    wizardStepSet={wizardStepSet}
                    onSubmit={props.onSubmit}
                    step={setStep}
                    button={{"next":props.schema.nextButtonText, "previous":props.schema.prevButtonText, "submit":props.schema.submitButtonText}}
                    initialStep={props?.schema?.initialStep}
                    wizardStepOptions = {props?.schema?.wizardOptions}
                />
            )
        }
      
        return (
            <SingleForm
                parentState={data}
                parentSetState={setData}
                renderList={fieldList}
                fields={fields}
                onSubmit={props.onSubmit}
                submitButtonText={props.schema.submitButtonText}
            />
        )

    }

    return (
        <>
            <div style={{ backgroundColor: "#FAFAFA", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                <h1 style={{ fontFamily: 'Nunito Sans', margin: "20px 0px" }}>{props.schema?.title}</h1>
                <h2 style={{ fontFamily: 'Nunito Sans', fontWeight: "400", margin: "0px 0px 30px 0px" }}>{props.schema?.description}</h2>
                <Progress height={props.schema.progressBarHeight} step={step} stepLength={Object.keys(wizardStepSet).length} color={props.schema.progressBarColor} text={props.schema.progressBarText} textColor={props.schema.progressBarTextColor} ProgressBar={props.schema.ProgressBar} subProgressBar={props.schema.subProgressBar}/>
                <form onSubmit={(e) => { e.preventDefault() }} style={{ minWidth: '100%', padding: "0px 20px" }}>
                    {formBuilder()}
                </form>
            </div>
        </>
    )
}

export default LlamaForm;