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

export default function UrlField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)

    const regexObject: any = {
        url: { regex: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i, errorMessage: "Please enter a valid url" }
    }
    const checkValidation = (regex: string, value: string) => {
        const re = new RegExp(regex);
        if (re.test(value) || !value) {
            setError(false);
            return true;
        } else {
            setError(true);
            return false;
        }
    }
    const caseChange = (value: any) => {
        if (properties["lowercase"]) return value.toLowerCase();
        if (properties["uppercase"]) return value.toUpperCase();
        return value
    }
    const handleChange = (e: any) => {
        let input = e.target.value;
        let value = caseChange(input)
        if (properties?.validationRegex) {
            handleData(value, !checkValidation(properties['validationRegex'], value))
        } else if (properties?.type in regexObject) {
            handleData(value, !checkValidation(regexObject[properties.type]['regex'], value))
        }
    }

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="url"
                className={properties?.["className"] ?? "llama-url"}
                placeholder={properties?.['placeholder'] ?? null}
                value={props.parentState[name]?.value}
                disabled={properties?.['readOnly'] ?? false}
                required={properties?.['required'] ?? false}
                autoFocus={properties?.['autoFocus'] ?? false}
                autoComplete={properties?.['autoComplete'] ? "on" : "off"}
                size={properties?.['size'] ?? null}
                maxLength={properties?.['maxLength'] ?? null}
                minLength={properties?.['minLength'] ?? null}
                pattern={properties?.['validationRegex'] ?? null}
                style={properties?.['style'] ?? { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ?? (properties.type in regexObject) ? regexObject[properties.type]['errorMessage'] : `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )
}