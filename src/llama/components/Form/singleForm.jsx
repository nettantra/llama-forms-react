import { useState } from "react";
import RenderForm from "./renderForm";
import React from 'react';


export default function SingleForm(props) {
    const fields = props.fields
    const data = props.parentState

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");



    const alertRender = () => {
        return <p style={{ width: '100%', backgroundColor: "#ffc3b2", color: "#902100", padding: "5px 10px", fontSize: "16px", fontWeight: "300", fontFamily: "Nunito Sans", border: "none", borderRadius: "5px", textAlign: "center" }}>{alertMsg}</p>
    }


    const handleSubmit = () => {
        setAlert(false);
        for (let key in fields) {
            if (data[key].value === "" && fields[key].required) {
                setAlert(false)
                setAlertMsg(`${key} field is required`)
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 5000)
                return
            }
            if (data[key].error) {
                setAlert(false)
                setAlertMsg(`Please look into ${key} field`)
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 5000)
                return
            }
        }
        let finalData = {}
        for (let key in data) {
            finalData[key] = data[key].value
        }
        props.onSubmit(finalData)
    }


    return (
        <>
            {alert && alertRender()}
            <RenderForm
                parentState={props.parentState}
                parentSetState={props.parentSetState}
                fields={props.fields}
                renderList={props.renderList}
            />
            <button style={{ backgroundColor: "#ddd", borderRadius: "5px", border: "none", padding: "5px 10px", fontSize: "16px", fontFamily: "Nunito Sans", margin: "20px 0px" }} onClick={handleSubmit}>
                {props?.submitButtonText ?? "Submit"}
            </button>
        </>
    )
}