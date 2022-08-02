import React, { useState, useEffect } from "react";

interface Props {
    properties: any,
    handleData: any,
    name: any,
    parentState: any,
}
export default function CountryField(props: Props) {
    const { properties, handleData, name } = props;
    const [countryInfo, setCountryInfo] = useState([]) as any;
    const [data, setData] = useState([]) as any

    const handleChange = (e: any) => {
        handleData(e.target.value);
    };

    const countryData = async () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "WVBtd05GNnJNMDdwbzdqY2lLM0N1NXpTT1ZyQ2JCZEo2a2FBVElvSg==");  //API_key

        var requestOptions = {
            method: 'GET',
            headers: headers,
        };
        await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                let countryLabel = properties['countryLabel'] || 'name'   // show the country name
                let countryValue = properties['countryValue'] || 'name' // store the country value
                setCountryInfo(result?.map((country: any) => <option key={country[countryLabel]} value={country[countryValue]}>{country[countryLabel]}</option>))
            })
            .catch((error) => {
                setCountryInfo([])
                console.log('error', error)
            });
    };
    useEffect(() => {
        const values = properties.values;
        if (values) {
            let options = []
            for (let key in values) {
                options.push(
                    <option key={key} value={values[key]}>
                        {key}
                    </option>
                );
            }
            return setData(options)
        }
        countryData()
    }, [])
    return (
        <>

            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}
            </h3>

            <select id="browsers" value={props.parentState[name]?.value} onChange={(e) => handleChange(e)} style={{ width: '97%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
            >
                <option value="" disabled selected>Select your country</option>
                {
                    data.length ? data : countryInfo
                }
            </select>
            <p style={{ fontFamily: "Nunito Sans", fontWeight: "400", fontSize: "14px", margin: "5px 0", }}>
                {properties["description"]}&nbsp;&nbsp;
            </p>
        </>
    )
}
