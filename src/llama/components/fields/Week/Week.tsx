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

export default function WeekField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    let weekRef : any = useRef();

    function checkValidation(regex: string, value: string) {
        const re = new RegExp(regex);
        if(re.test(value) || !value){
            setError(false);
            return true;
        }else{
            setError(true);
            return false;
        }
    }
    const handleChange = (e: any) => {
        let value = e.target.value;
        if (properties.validationRegex) {
            handleData(value, !checkValidation(properties['validationRegex'], value))
        } else{
            handleData(value, false)
        }
    }

    useEffect(() => {
        if (properties?.["className"]?.trim()) {
            weekRef.current.style = ""
            weekRef.current.className = properties?.["className"] ?? name
        }
        if (properties["style"]) {
            weekRef.current.style = ""
            for (let key in properties["style"]) {
                weekRef.current.style.setProperty(key, properties["style"][key]);
            }
        }
    }, []);

    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
            <input
                id={name}
                name={name}
                type="week"
                list="weekList"
                placeholder={properties['placeholder'] ? properties['placeholder'] : null}
                value={props.parentState[name]?.value}
                disabled={properties['readOnly'] ? properties['readOnly'] : false}
                required={properties['required'] ? properties['required'] : false}
                autoFocus={properties['autoFocus'] ? properties['autoFocus'] : false}
                autoComplete={properties['autoComplete'] ? "on" : "off"}
                hidden={properties["hidden"] ? properties["hidden"] : false}
                readOnly={properties["readonly"] ? properties["readonly"] : false}
                max={properties["max"] ? properties["max"] : null}
                min={properties["min"] ? properties["min"] : null}
                step={properties["step"]?properties["step"] : null}
                pattern={properties['validationRegex'] ? properties['validationRegex'] : null}
                style={{ width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
                onChange={(e) => { handleChange(e) }}
                ref={weekRef}
            />
                {properties?.enum?.length?
                <datalist id="weekList">
                    {
                        properties?.enum?.map((item : any)=>{
                            return (
                                <option value={item}/>
                            )
                        })
                    }
                </datalist>
                : null}
            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
                {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties['errorMessage'] ? properties['errorMessage'] : `Something went wrong in ${name} field`}</p> : null}
            </div>
        </>
    )
}