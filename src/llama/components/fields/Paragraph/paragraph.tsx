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
    let paragraphRef: any = useRef();

    useEffect(() => {

        if (properties?.["className"]?.trim()) {
            paragraphRef.current.className = properties?.["className"] ?? name
        }
        if (properties["style"]) {
            paragraphRef.current.style = ""
            for (let key in properties["style"]) {
                paragraphRef.current.style.setProperty(key, properties["style"][key]);
            }
        }
    }, []);

    return(
        <div>
            <p ref={paragraphRef}>{properties.text}</p>
        </div>
    )
}