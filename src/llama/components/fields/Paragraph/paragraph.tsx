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

export default function ParagraphTag(props: Props) {
    const { properties, handleData, name, parentState } = props;

    return(
        <div>
            <p>{properties.text}</p>
        </div>
    )
}