import React, { useState, useRef } from "react";

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
    let inputRef: any = useRef();

    const checkValidation = (validationRegex: any, value: any) => {
        const regex = new RegExp(validationRegex);
        if (regex.test(value) || !value) {
            setError(false)
            return true
        } else {
            setError(true)
            return false
        }
    }

    const handleChange = (e: any) => {
        let value = e.target.value;
        if (properties.validationRegex) {
            handleData(value, !checkValidation(properties['validationRegex'], value))
        } else {
            handleData(value, false)
        }
    }

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="tel"
                className={properties?.["className"] ?? 'llama-phone'}
                placeholder={properties?.['placeholder'] ?? null}
                value={props.parentState[name]?.value}
                disabled={properties?.['readOnly'] ?? false}
                maxLength={properties?.['maxlength'] ?? null}
                min={properties?.['min'] ?? null}
                max={properties?.['max'] ?? null}
                required={properties?.['required'] ?? false}
                autoFocus={properties?.['autoFocus'] ?? false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                height={properties?.['height'] ?? null}
                width={properties?.['width'] ?? null}
                style={properties?.["style"] ?? { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
                ref={inputRef}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties?.['errorMessage'] ?? `The phone number is not in its format!`}</p> : null}
            </div>
        </>
    )



}