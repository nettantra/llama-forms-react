import React, { useState, useEffect } from "react";
interface Props {
    properties: any,
    handleData: any,
    name: any,
    parentState: any,
}
export default function CityField(props: Props) {
    const { properties, handleData, name } = props;
    const [cityInfo, setCityInfo] = useState([]) as any;
    const [data, setData] = useState([]) as any

    const handleChange = (e: any) => {
        handleData(e.target.value);
    };

    const cityData = () => {
        const selectCountry = properties?.["countryName"] ?? "IN"
        const selectState = properties?.["stateName"] ?? "OR"

        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "WVBtd05GNnJNMDdwbzdqY2lLM0N1NXpTT1ZyQ2JCZEo2a2FBVElvSg==");  //API_key ${selectState}
        var requestOptions = {
            method: 'GET',
            headers: headers,
        };
        fetch(`https://api.countrystatecity.in/v1/countries/${selectCountry}/states/${selectState}/cities`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                setCityInfo(result?.map((city: any) => <option key={city.name} value={city.name} >{city.name}</option>))
            })
            .catch(error => console.log('error', error));
    };
    useEffect(() => {
        const values = properties.values; //city enum value
        if (values) {
            let options: any = [];
            for (let key in values) {
                options.push(
                    <option key={key} value={values[key]}>
                        {key}
                    </option>
                );
            }
            return setData(options)
        }
        cityData()
    }, [])
    return (
        <>

            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}
            </h3>

            <select id="cityList" value={props.parentState[name]?.value} onChange={(e) => { handleChange(e); }} style={{ width: '97%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400' }}
            >
                <option value="" disabled selected>Select your city</option>
                {
                    data.length ? data : cityInfo
                }
            </select>
            <p style={{ fontFamily: "Nunito Sans", fontWeight: "400", fontSize: "14px", margin: "5px 0", }}>
                {properties["description"]}&nbsp;&nbsp;
            </p>
        </>
    )
}