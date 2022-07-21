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

export default function RangeField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    let inputRef: any = useRef();


    const handleChange = (e: any) => {
        handleData(e.target.value, false)
    }

    useEffect(() => {

        if (properties?.["className"]?.trim()) {
            inputRef.current.style = ""
            inputRef.current.className = properties?.["className"] ?? name
        }
        if (properties["style"]) {
            inputRef.current.style = ""
            for (let key in properties["style"]) {
                inputRef.current.style.setProperty(key, properties["style"][key]);
            }
        }
    }, []);

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="range"
                value={props.parentState[name]?.value}
                min={properties['min'] ? properties['min'] : null}
                max={properties['max'] ? properties['max'] : null}
                step={properties['interval'] ? properties['interval'].toString() : null}
                required={properties['required'] ? properties['required'] : false}
                style={{ width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                className={properties['className'] ? properties['className'] : "llama-range"}
                onChange={(e) => handleChange(e) }
                ref={inputRef}
            /><span>{props.parentState[name]?.value}</span>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )



}