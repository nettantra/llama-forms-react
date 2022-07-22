import React, { useState, useRef, useEffect } from "react";

interface LooseObject {
    [key: string]: any
}
interface Props {
    properties: LooseObject,
    handleData: any,
    name: any,
    parentState: any,
}

export default function PasswordField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    const [passwordType, setPasswordType] = useState(true)

    let inputRef: any = useRef();

    const regexObject: any = {
        password: { regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, errorMessage: "Please enter a valid Password in the format 'Test@123' " },
    }

    function checkValidation(regex: string, value: string) {
        const re = new RegExp(regex);
        return re.test(value)
    }

    const handleChange = (e: any) => {
        let value = e.target.value;
        if (properties?.validationRegex) {
            setError(!checkValidation(properties['validationRegex'], value))
            handleData(value, !checkValidation(properties['validationRegex'], value))
        }
        else if (properties['dafaultValidation'] && "password" in regexObject) {
            setError(!checkValidation(regexObject['password']['regex'], value))
            handleData(value, !checkValidation(regexObject['password']['regex'], value))
        } else {
            handleData(value, false)
        }
    }

    return (
        <>
            <div className="llm-field-password-container-wrap">
                <h3 className="llm-field-password-label" >{properties['label']}</h3>

                <div className="llm-field-password-container">
                    <input
                        id={name}
                        name={name}
                        className={`llm-field-password ${properties['className'] ?? ''}`}
                        type={passwordType ? "password" : "text"}
                        placeholder={properties['placeholder'] ?? null}
                        value={properties["prefix"] ? properties["prefix"] + props.parentState[name]?.value : props.parentState[name]?.value}
                        disabled={properties['readOnly'] ?? false}
                        maxLength={properties['maxlength'] ?? null}
                        required={properties['required'] ?? false}
                        autoFocus={properties['autoFocus'] ?? false}
                        autoComplete={properties['autoComplete'] ? "on" : "off"}
                        height={properties['height'] ?? null}
                        width={properties['width'] ?? null}
                        style={properties['togglePassword'] ? { borderRadius: "5px 0 0 5px" } : { borderRadius: '5px' }}
                        onChange={(e) => { handleChange(e) }}
                        ref={inputRef}
                    />
                    {
                        properties['togglePassword'] ? (
                            <span
                                onClick={() => setPasswordType(!passwordType)}
                                className="llm-field-password-show"
                                style={{}}
                            >
                                {passwordType ? "Show" : "Hide"}
                            </span>
                        ) : null
                    }
                </div>

                <div className="llm-field-password-message-container">
                    <p className="llm-field-password-description">{properties['description']}</p>
                    {error ? <p className="llm-field-password-error-message">{properties['errorMessage'] ? properties['errorMessage'] : regexObject['password']['errorMessage']}</p> : null}
                </div>
            </div>

            <style>
                {`
                    .llm-field-password-container{
                        display: flex;
                    }

                    .llm-field-password-label{
                        font-family: 'Nunito Sans';
                        font-weight: 400;
                        font-size: 16px;
                        margin: '5px 0';
                    }
                    
                    .llm-field-password {
                        width: 95%;
                        padding:7px;
                        border:1px solid #000;
                        border-radius:5px;
                        font-size: 14px;
                        font-weight: 400;
                        font-family: Nunito Sans;
                    }

                    .llm-field-password-show{
                        width: 6%;
                        padding:7px;
                        border:1px solid #000;
                        font-size: 14px;
                        border-radius: 0 5px 5px 0;
                        font-weight: 400;
                        cursor:pointer;
                        font-family: 'Nunito Sans';
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .llm-field-password-message-container{
                        margin-bottom: 20px;
                    }
                    
                    .llm-field-password-description{
                        margin: '5px 0px';
                        font-family: 'Nunito Sans';
                        font-weight: 200;
                        font-size: 14px;
                    }

                    .llm-field-password-error-message{
                        marging-top: 5px;
                        font-family: 'Nunito Sans';
                        font-weight: 600;
                        font-size: 14px;
                        color: #9e001a;
                    }

                `}
            </style>

        </>
    )
}