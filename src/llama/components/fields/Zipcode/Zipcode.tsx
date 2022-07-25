import React, { useState } from "react";

interface LooseObject {
    [key: string]: any
}
interface Props {
    properties: LooseObject,
    handleData: any,
    name: any,
    parentState: any,
}

export default function ZipcodeField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)

    //it block invalid character in number
    const blockInvalidChar = (e: any) => {
        if(properties?.['blockCharacter']?.['active']){
            let value = properties?.['blockCharacter']?.['value']?? []
            value?.includes(e.key) && e.preventDefault();
            return true
        }
    }

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
        let value = e.target.value
        handleData(e.target.value, false)
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
                type="number"
                className={properties?.["className"] ?? "llama-zipcode"}
                placeholder={properties?.['placeholder'] ?? "Enter Your Zipcode"}
                value={properties?.["prefix"] ? properties?.["prefix"] + props.parentState[name]?.value : props.parentState[name]?.value}
                disabled={properties?.['readOnly'] ?? false}
                hidden={properties?.['hidden'] ?? false}
                maxLength={properties?.['maxlength'] ?? null}
                min={properties?.['min'] ?? null}
                max={properties?.['max'] ?? null}
                required={properties?.['required'] ?? false}
                autoFocus={properties?.['autoFocus'] ?? false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                style={properties?.['style'] ?? { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
                onKeyDown={blockInvalidChar}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties?.['errorMessage'] ?? `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )



}