import { useState } from "react"
import React from 'react';

export default function InputField(props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)

    const regexObject = {
        email: { regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: "Please enter a valid email" },
        number: { regex: /^[0-9]*$/, errorMessage: "Please enter a valid number" },
    }

    function checkValidation(regex, value) {
        const re = new RegExp(regex);
        return re.test(value)
    }
    const handleChange = (e) => {
        handleData(e.target.value, false)
        if (e.target.value.length == 0) {
            setError(false)
            handleData(e.target.value, false)
            return
        }
        if (properties.validationRegex) {
            setError(!checkValidation(properties['validationRegex'], e.target.value))
            handleData(e.target.value, !checkValidation(properties['validationRegex'], e.target.value))
        } else if (properties.type in regexObject) {
            setError(!checkValidation(regexObject[properties.type]['regex'], e.target.value))
            handleData(e.target.value, !checkValidation(regexObject[properties.type]['regex'], e.target.value))
        }
    }
    return (
        <>
            <div>
                <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
                {properties['type'] == 'range' && <span style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '14px', margin: '5px 0' }}>{props.parentState[name].value ? props.parentState[name].value : 0}</span>}
                <input
                    id={name}
                    name={name}
                    type={properties['type'] ? properties['type'] : "text"}
                    placeholder={properties['placeholder'] ? properties['placeholder'] : null}
                    value={props.parentState[name]?.value}
                    disabled={properties['readOnly'] ? properties['readOnly'] : false}
                    maxLength={properties['maxlength'] ? properties['maxlength'] : null}
                    min={properties['min'] ? properties['min'] : null}
                    max={properties['max'] ? properties['max'] : null}
                    step={properties['interval'] ? properties['interval'].toString() : null}
                    multiple={properties['multiple'] ? properties['multiple'] : null}
                    required={properties['required'] ? properties['required'] : false}
                    autoFocus={properties['autoFocus'] ? properties['autoFocus'] : false}
                    autoComplete={properties['autoComplete'] ? "on" : "off"}
                    height={properties['height'] ? properties['height'] : null}
                    width={properties['width'] ? properties['width'] : null}
                    pattern={properties['validationRegex'] ? properties['validationRegex'] : null}
                    style={properties['style'] ? properties['style'] : properties['type'] === 'color' ? { width: '40px', height: '40px' } : { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                    onChange={(e) => { handleChange(e) }}
                />
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                    {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : (properties.type in regexObject) ? regexObject[properties.type]['errorMessage'] : null}</p> : null}
                </div>
            </div>
        </>
    )
}