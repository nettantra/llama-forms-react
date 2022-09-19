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

export default function NumberField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    let inputRef: any = useRef();

    //it block invalid character in number
    const blockInvalidChar = (e: any) => {
        ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
        return true
    }

    const handleChange = (e: any) => {
        if (e.target.value < properties?.['min']) {
            handleData(e.target.value, true)
            setError(true)
            return
        }
        if (e.target.value > properties?.['max']) {
            handleData(e.target.value, true)
            setError(true)
            return
        }
        setError(false)
        handleData(e.target.value, false)
    }

    // useEffect(() => {

    //     if (properties?.["className"]?.trim()) {
    //         inputRef.current.style = ""
    //         inputRef.current.className = properties?.["className"] ?? name
    //     }
    //     if (properties["style"]) {
    //         inputRef.current.style = ""
    //         for (let key in properties["style"]) {
    //             inputRef.current.style.setProperty(key, properties["style"][key]);
    //         }
    //     }
    // }, []);

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="number"
                className={properties?.["className"] ?? "llama-number"}
                placeholder={properties?.['placeholder'] ?? null}
                value={properties["prefix"] ? properties["prefix"] + props.parentState[name]?.value : props.parentState[name]?.value}
                disabled={properties?.['readOnly'] ?? false}
                maxLength={properties?.['maxlength'] ?? null}
                min={properties?.['min'] ?? null}
                max={properties?.['max'] ?? null}
                step={ properties?.['interval']?.toString()?? null}
                required={properties?.['required'] ?? false}
                autoFocus={properties?.['autoFocus'] ?? false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                height={properties?.['height'] ?? null}
                width={properties?.['width'] ?? null}
                style={properties?.['style'] ?? { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
                onKeyDown={blockInvalidChar}
                ref={inputRef}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties?.['errorMessage'] ?? `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )
}