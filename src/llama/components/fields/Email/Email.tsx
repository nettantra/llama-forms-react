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

export default function EmailField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    let inputRef: any = useRef();


    const regexObject: any = {
        email: { regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: "Please enter a valid email" }
    }

    function checkValidation(regex: string, value: string) {
        const re = new RegExp(regex);
        return re.test(value)
    }
    const caseChange = (value: any) => {
        if (properties["lowercase"]) return value.toLowerCase();
        if (properties["uppercase"]) return value.toUpperCase();
        return value
    }
    const handleChange = (e: any) => {
        let input = e.target.value;
        let value = caseChange(input)
        if (properties.validationRegex) {
            setError(!checkValidation(properties['validationRegex'], value))
            handleData(value, !checkValidation(properties['validationRegex'], value))
        } else if (properties.type in regexObject) {
            setError(!checkValidation(regexObject[properties.type]['regex'], value))
            handleData(value, !checkValidation(regexObject[properties.type]['regex'], value))
        }
    }

    return (
        <>
            <div className="llm-field-email-container">
                <h3 className="llm-field-email-label">{properties['label']}</h3>

                <input
                    id={name}
                    name={name}
                    type="email"
                    className= {`llm-field-email ${properties['className'] ?? ''}`}
                    placeholder={properties['placeholder'] ?? null}
                    value={props.parentState[name]?.value}
                    disabled={properties['readOnly'] ?? false}
                    required={properties['required'] ?? false}
                    autoFocus={properties['autoFocus'] ?? false}
                    autoComplete={properties['autoComplete'] ? "on" : "off"}
                    height={properties['height'] ?? null}
                    width={properties['width'] ?? null}
                    pattern={properties['validationRegex'] ?? null}
                    onChange={(e) => { handleChange(e) }}
                    ref={inputRef}
                />

                <div className="llm-field-email-message-container">
                    <p className="llm-field-email-description">{properties['description']}</p>
                    {error ? <p className="llm-field-email-error-message">{properties['errorMessage'] ? properties['errorMessage'] : (properties.type in regexObject) ? regexObject[properties.type]['errorMessage'] : `Something went wrong in ${name} field`}</p> : null}
                </div>
            </div>

            <style>
                {`
                    .llm-field-email-container{
                        font-family: 'Nunito Sans';
                    }

                    .llm-field-email-label{
                        font-weight: 400;
                        font-size: 16px;
                        margin: 5px 0;
                    }

                    .llm-field-email{
                        width: 95%;
                        font-weight: 400;
                        font-size: 14px;
                        border: 1px solid #000;
                        border-radius: 5px;
                        padding: 7px;
                    }

                    .llm-field-email-message-container{
                        margin-bottom: 20px;
                    }

                    .llm-field-email-description{
                        margin: 5px 0px;
                        font-weight: 200;
                        font-size: 14px;
                    }

                    .llm-field-email-error-message{
                        marging-top: 5px;
                        font-weight: 600;
                        font-size: 14px;
                        color: #9e001a;
                    }
                `}
            </style>
        </>
    )
}