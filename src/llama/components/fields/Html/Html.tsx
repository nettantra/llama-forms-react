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

export default function HtmlTag(props: Props) {
    const { properties, handleData, name, parentState } = props;
    let htmlData = properties?.['htmlData'] ?? ""

    return(
        <div dangerouslySetInnerHTML={{__html: htmlData}}>
        </div>
    )
}