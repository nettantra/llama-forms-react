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

export default function DateTimeField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)

    const handleChange = (e: any) => {
        handleData(e.target.value, false)
    }

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type='datetime-local'
                className={properties?.['className'] ?? "llama-datetime"}
                value={props.parentState[name]?.value}
                disabled={properties?.['readOnly'] ?? false}
                required={properties?.['required'] ?? false}
                autoFocus={properties?.['autoFocus'] ?? false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                height={properties?.['height'] ?? null}
                width={properties?.['width'] ?? null}
                style={properties?.['style'] ?? { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => handleChange(e)}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties?.['errorMessage'] ?? `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )



}