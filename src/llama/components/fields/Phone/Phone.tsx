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

export default function PhoneField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)

    const validate = (val: any) => {

        if (properties['validationRegex']) {
            const regex = new RegExp(properties['validationRegex']);
            if (regex.test(val) || !val) {
                setError(false)
            } else {
                setError(true)
            }
        }
    }

    const handleChange = (e: any) => {

        handleData(e.target.value, false)
        validate(e.target.value)
    }

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="tel"
                placeholder={properties['placeholder'] ? properties['placeholder'] : null}
                value={props.parentState[name]?.value}
                disabled={properties['readOnly'] ? properties['readOnly'] : false}
                maxLength={properties['maxlength'] ? properties['maxlength'] : null}
                min={properties['min'] ? properties['min'] : null}
                max={properties['max'] ? properties['max'] : null}
                step={properties['interval'] ? properties['interval'].toString() : null}
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
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : `The phone number is not in its format!`}</p> : null}
            </div>
        </>
    )



}