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
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="email"
                placeholder={properties['placeholder'] ? properties['placeholder'] : null}
                value={props.parentState[name]?.value}
                disabled={properties['readOnly'] ? properties['readOnly'] : false}
                required={properties['required'] ? properties['required'] : false}
                autoFocus={properties['autoFocus'] ? properties['autoFocus'] : false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                height={properties['height'] ? properties['height'] : null}
                width={properties['width'] ? properties['width'] : null}
                pattern={properties['validationRegex'] ? properties['validationRegex'] : null}
                style={properties['type'] === 'color' ? { width: '40px', height: '40px' } : { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : (properties.type in regexObject) ? regexObject[properties.type]['errorMessage'] : null}</p> : null}
            </div>
        </>
    )
}