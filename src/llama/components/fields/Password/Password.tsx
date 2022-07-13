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

export default function Password(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)


    const regexObject: any = {
        email: { regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: "Please enter a valid email" },
        number: { regex: /^[0-9]*$/, errorMessage: "Please enter a valid number" },
      }
    
      function checkValidation(regex: string, value: string) {
        const re = new RegExp(regex);
        return re.test(value)
      }

      const handleChange = (e: any) => {
        let value = e.target.value;
        handleData(value, false)
        if (properties.validationRegex) {
            setError(!checkValidation(properties['validationRegex'], value))
            handleData(value, !checkValidation(properties['validationRegex'], value))
        }
    }

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="password"
                placeholder={properties['placeholder'] ? properties['placeholder'] : null}
                value={properties["prefix"] ? properties["prefix"] + props.parentState[name]?.value : props.parentState[name]?.value}
                disabled={properties['readOnly'] ? properties['readOnly'] : false}
                maxLength={properties['maxlength'] ? properties['maxlength'] : null}
                required={properties['required'] ? properties['required'] : false}
                autoFocus={properties['autoFocus'] ? properties['autoFocus'] : false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                height={properties['height'] ? properties['height'] : null}
                width={properties['width'] ? properties['width'] : null}
                style={properties['type'] === 'color' ? { width: '40px', height: '40px' } : { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )



}