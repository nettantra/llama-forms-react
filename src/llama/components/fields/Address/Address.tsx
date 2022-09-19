import React, { useState, useEffect, useMemo } from "react";

interface LooseObject {
    [key: string]: any
}

interface Props {
    properties: LooseObject,
    handleData: any,
    name: any,
    parentState: any,
}
export default function Address(props: Props) {
    const { properties, handleData, name } = props;
    // console.log("properties[];;;;;", properties);
    // console.log("props[];;;;;", props);
    const [stateDisabled, setStateDisabled] = useState(true) as any;  //active the state field
    const [cityDisabled, setCityDisabled] = useState(true) as any;  //active the city field

    const [cityInfo, setCityInfo] = useState([]) as any;       //city list
    const [countryInfo, setCountryInfo] = useState([]) as any;  //country list
    const [stateInfo, setStateInfo] = useState([]) as any;     //state list

    const [selectHome, setSelectHome] = useState("") as any;
    const [selectArea, setSelectArea] = useState(null) as any;
    const [selectLandmark, setSelectLandmark] = useState(null) as any;
    const [selectCountry, setSelectCountry] = useState(null) as any;
    const [selectState, setSelectState] = useState(null) as any;

    const [data, setData] = useState({
        "Country": "",
        "State": "",
        "City": "",
        "Home": "",
        "Area": "",
        "Landmark": "",
    }) as any

    //store the landmark value  handleOnChangeCity
    const handleOnChangeLandmark = (e: any) => {
        let val = e.target.value;
        setSelectLandmark(val)
        handleData({...props.parentState[name].value, Landmark: val})

    };
    //store the Area value  handleOnChangeCity
    const handleOnChangeArea = (e: any) => {
        let val = e.target.value;
        setSelectArea(val)
        handleData({...props.parentState[name].value, Area: val})

    };
    //store the Home value  handleOnChangeCity
    const handleOnChangeHome = (e: any) => {
        let val = e.target.value;
        setSelectHome(val)
        handleData({...props.parentState[name].value, Home: val})
    };

    //store the country value
    const handleOnChangeCountry = (e: any) => {
        let val = e.target.value;
        // console.log("check country val", val);
        let state = props.parentState[name].value.State;
        state ? props.parentState[name].value.State = "" : null;
        let city = props.parentState[name].value.City;
        city ? props.parentState[name].value.City = "" : null;
        setStateDisabled(!stateDisabled)
        setSelectCountry(val)
        handleData({...props.parentState[name].value, Country: val})
    };

    //store the state value  handleOnChangeCity
    const handleOnChangeState = (e: any) => {
        let val = e.target.value;
        let city = props.parentState[name].value.City;
        city ? props.parentState[name].value.City = "" : null;
        setSelectState(val)
        setCityDisabled(!cityDisabled)
        handleData({...props.parentState[name].value, State: val})

    };

    //store the city value  handleOnChangeCity
    const handleOnChangeCity = (e: any) => {
        let val = e.target.value;
        // console.log("city..", val)
        setData({ ...data, "Country": `${selectCountry}`, "State": `${selectState}`, "City": `${val}`, "Home": `${selectHome}`, "Area": `${selectArea}`, "Landmark": `${selectLandmark}` })
        handleData({...props.parentState[name].value, City: val})
    };

    useEffect(() => {
        try {
            handleData(props.parentState[name].value)
        } catch (error) {
        }
    }, [data])
    
    // country-details-start-----------------------------------------------
    const countryData = async () => {
        // console.log("call country")
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
                setCountryInfo(result?.map((country: any) => <option key={country.iso2} value={country.iso2} >{country.name}</option>))
            })
            .catch((error) => {
                setCountryInfo([])
            });
    };

    // state-details-start-----------------------------------------------
    const stateData = async () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "WVBtd05GNnJNMDdwbzdqY2lLM0N1NXpTT1ZyQ2JCZEo2a2FBVElvSg==");  //API_key ${selectcountry}
        var requestOptions = {
            method: 'GET',
            headers: headers,
        };
        await fetch(`https://api.countrystatecity.in/v1/countries/${props.parentState[name].value.Country}/states`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                setStateInfo(result?.map((state: any) => <option key={state.iso2} value={state.iso2}>{state.name}</option>))  //name
                setSelectState(result[0]?.iso2) //Added
                
            })
            .catch(error => console.log('error', error));
    };
    useEffect(() => {
        try {
            setStateInfo([])
            stateData()
        } catch (error) {
            setStateInfo([])
        }
    }, [selectCountry])
    // state-details-end-------------------------------------------------
    // city-details-start------------------------------------------------

    const cityData = () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "WVBtd05GNnJNMDdwbzdqY2lLM0N1NXpTT1ZyQ2JCZEo2a2FBVElvSg==");  //API_key
        var requestOptions = {
            method: 'GET',
            headers: headers,
        };
        fetch(`https://api.countrystatecity.in/v1/countries/${props.parentState[name].value.Country}/states/${props.parentState[name].value.State}/cities`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                // console.log("resss..city", result)

                setCityInfo(result?.map((city: any) => <option key={city.name} value={city.name}>{city.name}</option>))
            })
            .catch(error => console.log('error', error));
    };
    
    useEffect(() => {
        try {
            setCityInfo([])
            cityData()

        } catch (error) {
            setCityInfo([])
        }
    }, [selectState])
    // city-details-end----------------------------------------------------

    useEffect(() => {

        countryData()
    }, [])

    // console.log("countryInfo", countryInfo)
    // console.log("stateInfo", stateInfo)
    // console.log("cityInfo", cityInfo)

    // console.log("city check", props.parentState[name].value.City)
    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}
            </h3>
            <input
                value={props.parentState[name].value.Home}
                type="text"
                onChange={(e) => { handleOnChangeHome(e); }}
                placeholder="Enter your Flatno , Home , Building , Apartment"
                style={{ width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400', }}
            />
            <input
                value={props.parentState[name].value.Area}
                type="text"
                onChange={(e) => { handleOnChangeArea(e); }}
                placeholder="Enter your Area , Street , Sector , Village"
                style={{ width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400', marginTop: '10px' }}
            />
            <input
                value={props.parentState[name].value.Landmark}
                type="text"
                onChange={(e) => { handleOnChangeLandmark(e); }}
                placeholder="Enter your Landmark (E.g. near apollo hospital) "
                style={{ width: '95%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400', marginTop: '10px' }}
            />
            <select id="country" onChange={(e) => { handleOnChangeCountry(e); }} style={{ width: '97%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400', marginTop: '10px' }
            }>

                <option value={props.parentState[name].value.Country ? props.parentState[name].value.Country : ''} disabled selected>{props.parentState[name].value.Country ? countryInfo.length&&countryInfo.find((o:any) => o.props.value == props.parentState[name].value.Country).props.children : 'Select your country'}</option>
                {
                    countryInfo.length ? countryInfo : []
                }
            </select>

            <select id="state" onChange={(e) => { handleOnChangeState(e) }} style={{ width: '97%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400', marginTop: '10px' }}
            >
                <option value={props.parentState[name].value.State ? props.parentState[name].value.State : ''} disabled selected>{props.parentState[name].value.State ? stateInfo.length&&stateInfo.find((o:any) => o.props.value == props.parentState[name].value.State).props.children : 'Select your state'}</option>
                {
                    stateInfo.length ? stateInfo : []
                }
            </select>

            <select id="city" onChange={(e) => { handleOnChangeCity(e); }} style={{ width: '97%', padding: '7px', border: '1px solid #000', borderRadius: '5px', fontSize: '14px', fontFamily: 'Nunito Sans', fontWeight: '400', marginTop: '10px' }}
            >
                <option value={props.parentState[name].value.City ? props.parentState[name].value.City : ''} disabled selected>{props?.parentState[name].value.City ? cityInfo.length&&cityInfo.find((o:any) => o.props?.value == props.parentState[name].value.City).props?.children : 'Select your city'}</option>
                
                {
                    cityInfo.length ? cityInfo : []
                }
            </select>
            <p style={{ fontFamily: "Nunito Sans", fontWeight: "400", fontSize: "14px", margin: "5px 0", }}>
                {properties["description"]}&nbsp;&nbsp;
            </p>
        </>
    )
}
