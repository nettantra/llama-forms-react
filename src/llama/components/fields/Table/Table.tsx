import DataGrid, { TextEditor } from 'react-data-grid';
import React, { useState, useEffect, useMemo } from 'react';
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
    const [columns, setColumns] = useState([]) as any
    const [rows, setRows] = useState([]) as any
    const [dialog, setDialog] = useState(false)
    const [dialogData, SetDialogData] = useState({
        name : "",
        editor : false
    })

    // const columns = [
    //     { key: 'id', name: 'ID' },
    //     { key: 'title', name: 'Title', editor: TextEditor }
    // ];

    // const [rows, setRows] = useState([
    //     { id: 0, title: 'Example' },
    //     { id: 1, title: 'Demo' }
    // ]);

    const handleRowChange = (rows: any, data: any) => {
        // update logic
        console.log("handleRowChange", data)
        setRows(rows)
    }

    const onCopy = (rows: any) => {
        console.log("onCopy", rows)
    }
    //   const onPaste = (rows: any) => {
    //     console.log("onPaste", rows)
    //   }
    // function rowKeyGetter(row: any) {
    //   console.log(row);
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
            if (properties?.column?.allEditor) {
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    editor: TextEditor,
                    sortable: true,
                    // width : 30,
                    // minWidth: 50,
                    // maxWidth : 200,
                    resizable: true,
                    frozen: true,


                }
            }
            if (properties?.column?.columnEditor?.includes(item)) {
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    editor: TextEditor,
                    sortable: true,
                    // width : 30,
                    // minWidth: 50,
                    // maxWidth : 200,
                    resizable: true,
                    frozen: true,
                    // formatter: (val :any)=> {
                    //     const value = val.row.progress;
                    //     return (
                    //       <>
                    //         <progress max={100} value={value} style={{ inlineSize: 50 }} /> {Math.round(value)}%
                    //       </>
                    //     );
                    //   },

                }
            } else {
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    sortable: true,
                    // width : 30,
                    // minWidth: 50,
                    // maxWidth : 200,
                    resizable: true,
                    frozen: true,

                }
            }
        })
        setColumns(data)
        setRows(ar)

    }, [])
    const rowClass = (row: any) => {
        console.log("object", row);
        return row;
    }
    // const onColumnResize = (id :any, width:any)=>{
    //     console.log(">>>", id, width);
    // }
    const row1 = useMemo(() => {
        let ar: any = []
        let obj: any = {}
        let rowLength = properties?.column?.columnName
        for (let i = 0; i < rowLength.length; i++) {
            obj[rowLength[i].toString().toLowerCase()] = ""
        }
        //    console.log("row", obj);

        let data = properties?.column?.columnName?.forEach((item: any) => {
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
        });
        ar.push(obj)
        return ar
    }, [])
    console.log("array", row1);

    //<------- This function is for add rows ------->
    const addRow = () => {
        let obj: any = {}
        for(let k = 0; k < columns.length; k++){
            if(!columns[k]['key']) return
            obj[columns[k]['key']] = ""
        }
        setRows((prevState: any) => [...prevState, obj])
    }

    //<------- this function open the dialogs box ------>
    const addColumn = () => {
        setDialog(true);
    }
    const dialogClose = () => {
        setDialog(false);
    }
    const dialogSubmit = () => {
        setDialog(false);
        let obj : any = {
            key: 'sajal',
            name: "Sajal",
            sortable: true,
        }
        setColumns((prevState : any) => [...prevState, obj])
    }
    return (<div style={{position:"relative"}}>
        <div>
            <button type="button" onClick={addRow}>addrow</button>
            <button type="button" onClick={addColumn}>add column</button>


        </div>
        <DataGrid
            columns={columns}
            rows={rows}
            onCopy={onCopy}
            rowHeight={35}      // it increase the height of row
            headerRowHeight={100}       // it increase the height of header
            // onPaste={onPaste}
            // rowKeyGetter={rowKeyGetter}
            // minHeight={150}
            onRowsChange={handleRowChange}
            rowClass={(e: any) => rowClass(e)}
            className={properties?.['className'] ?? "fill-grid"}
        // onColumnResize={onColumnResize}
        // emptyRowsRenderer={EmptyRowsView}
        />
        <dialog id="llama_dialog_box" open={dialog} style={{padding:"20px 50px", border:"1px solid", backgroundColor:"#e3dfd5", position:"absolute", top:200}}>
            <div style={{ display: "flex", flexDirection: "column", margin: "auto", width:"auto", marginBottom:"10px"}}>
                <div>
                    <input type="text" placeholder='Add your column' required />
                </div>
                <div>
                    <input type="checkbox" id="editable" />
                    <label htmlFor='editable'>Editable ?</label>
                </div>
            </div>
            <button type='button' onClick={dialogSubmit} style={{float:"right", width:"50%"}}>Done</button>
            <button type='button' onClick={dialogClose} style={{float:"right", width:"50%"}}>Close</button>
        </dialog>
    </div >
    );
}