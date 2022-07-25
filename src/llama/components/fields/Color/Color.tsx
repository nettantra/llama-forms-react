import React from "react";
interface LooseObject {
    [key: string]: any
}
interface Props {
    properties: LooseObject,
    handleData: any,
    name: any,
    parentState: any,
}

export default function ColorField(props: Props) {
    const { properties, handleData, name } = props

    const handleChange = (e: any) => {
        handleData(e.target.value, false)
    }

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="color"
                className={properties?.['className'] ?? 'llama-color'}
                value={props.parentState[name]?.value}
                disabled={properties?.['readOnly'] ?? false}
                required={properties?.['required'] ?? false}
                autoFocus={properties?.['autoFocus'] ?? false}
                autoComplete={properties?.['autoComplete'] ? "on" : "off"}
                height={properties?.['height'] ?? null}
                width={properties?.['width'] ?? null}
                style={properties?.['style'] ?? { width: '40px', height: '40px' }}
                onChange={(e) => { handleChange(e) }}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
            </div>
        </>
    )
}