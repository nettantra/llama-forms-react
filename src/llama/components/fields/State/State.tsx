import React, { useState, useEffect } from "react";
interface Props {
    properties: any,
    handleData: any,
    name: any,
    parentState: any,
}

export default function StateField(props: Props) {
    const { properties, handleData, name } = props;
    const [stateInfo, setStateInfo] = useState([]) as any;
    const [data, setData] = useState([]) as any

    const handleChange = (e: any) => {
        handleData(e.target.value);
    };

    const stateData = async () => {
        const selectcountry = properties?.["countryName"] ?? "IN"
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "WVBtd05GNnJNMDdwbzdqY2lLM0N1NXpTT1ZyQ2JCZEo2a2FBVElvSg==");  //API_key ${selectcountry}
        var requestOptions = {
            method: 'GET',
            headers: headers,
        };
        await fetch(`https://api.countrystatecity.in/v1/countries/${selectcountry}/states`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                let stateLabel = properties['stateLabel'] || 'name'   // show the state name
                let stateValue = properties['stateValue'] || 'name' 
                setStateInfo(result?.map((state: any) => <option key={state[stateLabel]} value={state[stateValue]}>{state[stateLabel]}</option>))
            })
            .catch((error) => {
                setStateInfo([])
                console.log('error', error)
            });
    };
    useEffect(() => {
        const values = properties.values;
        if (values) {
            let options = [];
            for (let key in values) {
                options.push(
                    <option key={key} value={values[key]}>
                        {key}
                    </option>
                );
            }
            return setData(options)
        }
        stateData()
    }, [])
    return (
        <>

            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}
            </h3>

            <select id="stateList" value={props.parentState[name]?.value} onChange={(e) => { handleChange(e); }} style={{ width: '97%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
            >
                <option value="" disabled selected>Select your state</option>
                {
                    data.length ? data : stateInfo
                }
            </select>
            <p style={{ fontFamily: "Nunito Sans", fontWeight: "400", fontSize: "14px", margin: "5px 0", }}>
                {properties["description"]}&nbsp;&nbsp;
            </p>
        </>
    )
}

