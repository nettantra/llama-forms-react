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

export default function AnchorTag(props: Props) {
    const { properties, handleData, name, parentState } = props;

    return(
        <div>
            <a href={properties.href}>{properties.text}</a>
        </div>
    )
}