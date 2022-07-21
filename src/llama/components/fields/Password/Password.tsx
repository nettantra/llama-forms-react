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

export default function PasswordField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    let inputRef: any = useRef();


    const regexObject: any = {
        password: { regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, errorMessage: "Please enter a valid Password in the format 'Test@123' " },
    }

    function checkValidation(regex: string, value: string) {
        const re = new RegExp(regex);
        return re.test(value)
    }

    const handleChange = (e: any) => {
        let value = e.target.value;
        if (properties?.validationRegex) {
            setError(!checkValidation(properties['validationRegex'], value))
            handleData(value, !checkValidation(properties['validationRegex'], value))
        }
        else if (properties['dafaultValidation'] && "password" in regexObject) {
            setError(!checkValidation(regexObject['password']['regex'], value))
            handleData(value, !checkValidation(regexObject['password']['regex'], value))
        }else{
            handleData(value, false)
        }
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
                style={{ width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
                ref={inputRef}
            />
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : regexObject['password']['errorMessage']}</p> : null}
            </div>
        </>
    )



}