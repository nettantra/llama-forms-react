import React, { useState } from 'react';
import FileUploadField from '../File/File';


interface Props {
    properties: any,
    handleData: any,
    name: any,
    parentState: any,
}

export default function ImageField(props: Props) {
    const { properties, handleData, name, parentState } = props;

    properties.accept = ["jpg", "png", "jpeg"];
    
    return (
        <>
            <FileUploadField
                handleData={handleData}
                properties={properties}
                parentState={parentState}
                name={name}
            />
        </>
    )
}