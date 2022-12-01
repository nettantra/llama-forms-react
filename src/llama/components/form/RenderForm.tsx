
import React from 'react';
import { Fragment } from "react";
import DropDownField from "../fields/DropDown/DropDown";
import InputField from "../fields/Common/InputField";
import RadioField from "../fields/Radio/Radio";
import TextAreaField from "../fields/TextArea/TextArea";
import CheckBoxField from "../fields/CheckBox/CheckBox";
import FileUploadField from "../fields/File/File";
import EmailField from "../fields/Email/Email";
import ImageField from '../fields/Image/Image';
import AnchorTag from '../fields/Anchor/Anchor';
import ParagraphTag from '../fields/Paragraph/paragraph';
import ColorField from '../fields/Color/Color';
import DateTimeField from '../fields/DateTime/DateTime';
import DateField from '../fields/Date/Date';
import MonthField from '../fields/Month/Month';
import NumberField from '../fields/Number/Number';
import PasswordField from '../fields/Password/Password';
import PhoneField from '../fields/Phone/Phone';
import RangeField from '../fields/Range/Range';
import ZipcodeField from '../fields/Zipcode/Zipcode'
import TextField from '../fields/Text/Text';
import WeekField from '../fields/Week/Week';
import UrlField from '../fields/Url/Url';
import TableField from '../fields/Table/Table'
import HtmlTag from '../fields/Html/Html'
import Address from '../fields/Address/Address';
import DropZone from '../fields/DropZone/DropZone'
import CountryField from '../fields/Country/Country';
import StateField from '../fields/State/State';
import CityField from '../fields/City/City';
import TextEditorField from '../fields/TextEdiitor/TextEditor';
import SearchField from '../fields/Search/Search';

interface Props {
    fields: any,
    renderList: any,
    parentState: any,
    parentSetState: any,
}
interface LooseObject {
    [key: string]: any;
}
export default function RenderForm(props: Props) {
    const fields = props.fields
    const fieldList = props.renderList || []

    const fieldObject: LooseObject = {
        'dropdown': DropDownField,
        'anchor': AnchorTag,
        'month': MonthField,
        'password': PasswordField,
        'number': NumberField,
        'date': DateField,
        'dateTime': DateTimeField,
        'color': ColorField,
        'paragraph': ParagraphTag,
        'email': EmailField,
        'image': ImageField,
        'radio': RadioField,
        'checkbox': CheckBoxField,
        'file': FileUploadField,
        'phone': PhoneField,
        'range': RangeField,
        'zipcode': ZipcodeField,
        'text': TextField,
        'textarea': TextAreaField,
        'default': InputField,
        'week': WeekField,
        'url': UrlField,
        'table': TableField,
        'html': HtmlTag,
        'address':Address,
        'dropzone' : DropZone,
        'country':CountryField,
        'state': StateField,
        'city': CityField,
        'textEditor': TextEditorField,
        'search': SearchField,
    }


    const renderForm = (type: any, index: any, handleData: any, properties: any, data: any, key: any) => {
        const RenderField: any = fieldObject[type] || fieldObject['default']
        return (
            <Fragment key={index}>
                <RenderField
                    key={key}
                    handleData={handleData}
                    properties={properties}
                    parentState={data}
                    name={key}
                />
            </Fragment>
        )
    }


    return (
        <>
            {fieldList.map((field: any, index: any) => {
                const handleData = (
                    value = props.parentState[field].value,
                    error = false
                ) => {
                    props.parentSetState({
                        ...props.parentState,
                        [field]: { value: value, error: error },
                    });
                };
                let properties = fields[field];
                if (!properties.depend) {
                    return renderForm(
                        fields[field].type,
                        index,
                        handleData,
                        properties,
                        props.parentState,
                        field
                    );
                } else {
                    if (props.parentState[properties.parentField].value === properties?.dependent?.value[0]) {
                        return renderForm(fields[field].type, index, handleData, properties, props.parentState, field)
                    }
                    if (properties?.dependent?.type?.toLowerCase() === "multi" && properties?.dependent?.value?.every((key: string) => Object.keys(props.parentState[properties.parentField].value).includes(key))) {
                        return renderForm(fields[field].type, index, handleData, properties, props.parentState, field)
                    } if (properties?.dependent?.type?.toLowerCase() === "single" && Object.keys(props.parentState[properties.parentField].value).some((val) => properties?.dependent?.value?.includes(val))) {
                        return renderForm(fields[field].type, index, handleData, properties, props.parentState, field)
                    }
                }
            })}
        </>
    );
}