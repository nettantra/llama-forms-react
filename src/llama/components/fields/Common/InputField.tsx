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

export default function InputField(props: Props) {
  const { properties, handleData, name } = props
  const [error, setError] = useState(false)

  let capsWarning: any = useRef();
  let inputRef: any = useRef();

  const regexObject: any = {
    email: { regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorMessage: "Please enter a valid email" },
    number: { regex: /^[0-9]*$/, errorMessage: "Please enter a valid number" },
  }

  function checkValidation(regex: string, value: string) {
    const re = new RegExp(regex);
    return re.test(value)
  }
  //*****

  // const prefix = 'prefix-'
  const caseChange = (value: any) => {
    if (properties["lowercase"]) return value.toLowerCase();
    if (properties["uppercase"]) return value.toUpperCase();
    return value
  }
  //it add prefix with input value
  const prefixChange = (value: any) => {
    if (properties["prefix"]) return value.substring(properties["prefix"].length)
    return value
  }
  //it block invalid character in number
  const blockInvalidChar = (e: any) => {
    if (properties["type"] === "number") ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    return true
  }
  // this function check the capsLock event in input field
  const handleCapsLockChek = (e: any) => {
    if (e.getModifierState("CapsLock")) {
      capsWarning.current.hidden = false;
      capsWarning.current.style.color = 'red';
      capsWarning.current.innerHTML = properties?.["capsLockMessage"]?.trim() || "WARNING! Caps lock is ON.";
      inputRef.current.value = "";
    } else {
      capsWarning.current.hidden = true;
    }
  }

  // const suffixChange = (input) => {
  //     if(["text", "number"].includes(properties['type'])) return input.replace(/^/g, `${prefix + " "}`)
  //     // prefix +" "+ input.substring(prefix.length);
  //     return input

  // }
  //*** */
  const handleChange = (e: any) => {
    let input = e.target.value
    // let n = prefix + j    
    // let i = input.replace(/^/g, `${prefix + " "}`)
    // ["text", "number"].includes(properties['type'])?  prefix + input.substring(prefix.length) : input
    if (input.length > properties["maxLength"]) {
      setError(true)
      return false
    }
    let value = caseChange(input)
    value = prefixChange(value)
    handleData(value, false)

    if (value.length === 0) {
      setError(false)
      handleData(value, false)
      return
    }
    if (properties.validationRegex) {
      setError(!checkValidation(properties['validationRegex'], value))
      handleData(value, !checkValidation(properties['validationRegex'], value))
    } else if (properties.type in regexObject) {
      setError(!checkValidation(regexObject[properties.type]['regex'], value))
      handleData(value, !checkValidation(regexObject[properties.type]['regex'], value))
    }
  }

  return (
    <>
      <div>
        <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}</h3>
        {properties['type'] === 'range' && <span style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '14px', margin: '5px 0' }}>{props.parentState[name].value ? props.parentState[name].value : 0}</span>}
        <input
          id={name}
          name={name}
          className={properties['className'] ?? "llama-"+name}
          type={properties['type'] ?? "text"}
          placeholder={properties?.['placeholder'] ?? null}
          value={properties["prefix"] ? properties["prefix"] + props.parentState[name]?.value : props.parentState[name]?.value}
          disabled={properties?.['readOnly'] ?? false}
          maxLength={properties?.['maxlength'] ?? null}
          min={properties?.['min'] ?? null}
          max={properties?.['max'] ?? null}
          step={properties['interval'] ? properties['interval'].toString() : null}
          multiple={properties?.['multiple'] ?? null}
          required={properties?.['required'] ?? false}
          autoFocus={properties?.['autoFocus'] ?? false}
          autoComplete={properties['autoComplete'] ? "on" : "off"}
          height={properties?.['height'] ?? null}
          width={properties?.['width'] ?? null}
          pattern={properties?.['validationRegex'] ?? null}
          style={properties?.['style'] ?? { width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
          onChange={(e) => { handleChange(e) }}
          onKeyDown={blockInvalidChar}
          onKeyUp={properties["capsLockWaring"] ? handleCapsLockChek : (e) =>  console.log("caps lock warning is disabled") }
          ref={inputRef}
        />
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '5px 0px', fontFamily: 'Nunito Sans', fontWeight: '200', fontSize: '14px' }}>{properties['description']}</p>
          <p id="text" ref={capsWarning} hidden></p>
          {error ? <p style={{ marginTop: '5px', fontFamily: 'Nunito Sans', fontWeight: '600', fontSize: '14px', color: '#9e001a' }}>{properties?.['errorMessage'] ?? (properties.type in regexObject) ? regexObject[properties.type]['errorMessage'] : null}</p> : null}
        </div>
      </div>
    </>
  )
}