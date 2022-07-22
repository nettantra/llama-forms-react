import DataGrid, { TextEditor } from 'react-data-grid';
import React, { useState, useEffect } from 'react';
interface LooseObject {
    [key: string]: any
}
interface Props {
    properties: LooseObject,
    handleData: any,
    name: any,
    parentState: any,
}

export default function TableField(props: Props) {
    const { properties, handleData, name } = props
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])

    // const columns = [
    //     { key: 'id', name: 'ID' },
    //     { key: 'title', name: 'Title', editor: TextEditor }
    // ];

    // const [rows, setRows] = useState([
    //     { id: 0, title: 'Example' },
    //     { id: 1, title: 'Demo' }
    // ]);

    const handleRowChange = (rows: any) => {
        // update logic
        console.log("handleRowChange", rows)
        // setRows(rows)
    }

    const onCopy = (rows: any) => {
        console.log("onCopy", rows)
    }
    //   const onPaste = (rows: any) => {
    //     console.log("onPaste", rows)
    //   }
    // function rowKeyGetter(row: Row) {
    //   console.log(row.id);
    //   return row.id;
    // }
    useEffect(() => {
        let ar = [] as any

        let data = properties?.column?.columnName?.map((item: any) => {
            if (properties?.rows?.[item]) {
                if (ar.length) {
                    for (let i = 0; i < properties.rows[item]?.length; i++) {
                        if (ar[i]) {
                            ar[i][item.toString().toLowerCase()] = properties.rows[item][i]

                        } else {
                            ar.push({
                                [item.toString().toLowerCase()]: properties.rows[item]?.[i]
                            })
                        }
                    }
                } else {
                    for (let i = 0; i < properties?.rows?.[item]?.length; i++) {
                        ar.push({
                            [item.toString().toLowerCase()]: properties.rows[item]?.[i]
                        })
                    }
                }
            }
            if(properties?.column?.allEditor){
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    editor: TextEditor
                }
            }
            if(properties?.column?.columnEditor?.includes(item)){
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    editor: TextEditor
                }
            }else{
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                }
            }
        })
        setColumns(data)
        setRows(ar)
    }, [])
    return (
        <DataGrid
            columns={columns}
            rows={rows}
            onCopy={onCopy}
            // onPaste={onPaste}
            // rowKeyGetter={rowKeyGetter}
            // minHeight={150}
            onRowsChange={handleRowChange}
        // emptyRowsRenderer={EmptyRowsView}
        />
    );
}