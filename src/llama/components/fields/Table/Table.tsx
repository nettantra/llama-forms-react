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
    let col = properties?.['values'] || [];
    let action = properties?.action || [];
    let ro = props.parentState[name].value || []

    const [error, setError] = useState(false)
    const [columns, setColumns] = useState([]) as any
    const [rows, setRows] = useState([]) as any
    const [dialog, setDialog] = useState(false)
    const [dialogData, SetDialogData] = useState({
        columnName: "",
        editor: false
    }) as any

    // const columns = [
    //     { key: 'id', name: 'ID' },
    //     { key: 'title', name: 'Title', editor: TextEditor },
    //     {
    //         key: "action", name: 'Action', formatter: function (dependentValues: any) {
    //             console.log("dependentValues", dependentValues)
    //             return <button onClick={rowClickHandler} type="button">Delete</button>
    //         }
    //     }

    // ];

    // const [rows, setRows] = useState([
    //     { id: 0, title: 'Example',
    //     { id: 1, title: 'Demo' }
    // ]);

    const handleRowChange = (rows: any, data: any) => {
        // update logic
        // console.log("handleRowChange", rows)
        handleData(rows, false)
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
    // useEffect(() => {
    //     let ar = [] as any

    //     let data = properties?.column?.columnName?.map((item: any) => {
    //         if (properties?.rows?.[item]) {
    //             if (ar.length) {
    //                 for (let i = 0; i < properties.rows[item]?.length; i++) {
    //                     if (ar[i]) {
    //                         ar[i][item.toString().toLowerCase()] = properties.rows[item][i]

    //                     } else {
    //                         ar.push({
    //                             [item.toString().toLowerCase()]: properties.rows[item]?.[i]
    //                         })
    //                     }
    //                 }
    //             } else {
    //                 for (let i = 0; i < properties?.rows?.[item]?.length; i++) {
    //                     ar.push({
    //                         [item.toString().toLowerCase()]: properties.rows[item]?.[i]
    //                     })
    //                 }
    //             }
    //         }
    //         if (properties?.column?.allEditor) {
    //             return {
    //                 key: item.toString().toLowerCase(),
    //                 name: item,
    //                 editor: TextEditor,
    //                 sortable: true,
    //                 // width : 30,
    //                 // minWidth: 50,
    //                 // maxWidth : 200,
    //                 resizable: true,
    //                 frozen: true,


    //             }
    //         }
    //         if (properties?.column?.columnEditor?.includes(item)) {
    //             return {
    //                 key: item.toString().toLowerCase(),
    //                 name: item,
    //                 editor: TextEditor,
    //                 sortable: true,
    //                 // width : 30,
    //                 // minWidth: 50,
    //                 // maxWidth : 200,
    //                 resizable: true,
    //                 frozen: true,
    //                 // formatter: (val :any)=> {
    //                 //     const value = val.row.progress;
    //                 //     return (
    //                 //       <>
    //                 //         <progress max={100} value={value} style={{ inlineSize: 50 }} /> {Math.round(value)}%
    //                 //       </>
    //                 //     );
    //                 //   },

    //             }
    //         } else {
    //             return {
    //                 key: item.toString().toLowerCase(),
    //                 name: item,
    //                 sortable: true,
    //                 // width : 30,
    //                 // minWidth: 50,
    //                 // maxWidth : 200,
    //                 resizable: true,
    //                 frozen: true,

    //             }
    //         }
    //     })
    //     setColumns(data)
    //     setRows(props.parentState[name].value?? ar)

    // }, [])
    // const rowClass = (row: any) => {
    //     console.log("object", row);
    //     return row;
    // }
    // const onColumnResize = (id :any, width:any)=>{
    //     console.log(">>>", id, width);
    // }

    const columnData = useMemo(() => {
        return col?.map((item: any) => {
            if (properties?.column?.allEditor) {
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    editor: TextEditor,
                    sortable: true,
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
                    resizable: true,
                    frozen: true,
                }
            }
            if (dialogData.editor) {
                return {
                    key: item.toString().toLowerCase(),
                    name: item,
                    editor: TextEditor,
                    sortable: true,
                    resizable: true,
                    frozen: true,
                }
            }
            if (action.includes(item)) {
                return {
                    key: item.toString().toLowerCase(), 
                    name: item, 
                    formatter: function (dependentValues: any) {
                        // console.log("dependentValues", dependentValues)
                        return <button onClick={() => {rowClickHandler(dependentValues?.row)}} type="button">Delete</button>
                    }
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
    }, [col.length, ro.length])

    //<------- This function is for add rows ------->
    const addRow = () => {
        //first we have to check column exist or not??
        let obj: any = {}
        for (let k = 0; k < col.length; k++) {
            obj[col[k].toString().toLowerCase()] = ""
            // if (!columnData[k]['key']) return
            // obj[columnData[k]['key']] = ""
        }
        setRows((prevState: any) => [...prevState, obj])
        // ro.push(obj)
        handleData([...props.parentState[name].value, obj])

        // console.log("rowww", obj);
        // col.push("Sajal")
    }
    //<------- this function open the dialogs box ----->
    const addColumn = () => {
        setDialog(true);
    }
    // <------ this function closed the dialog box ----->
    const dialogClose = () => {
        setDialog(false);
    }
    // <----- this function add the dialog data ----->
    const dialogSubmit = () => {
        if (!dialogData?.['columnName']) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 2000)
            return;
        }
        let obj: any = {}
        for (let key in dialogData) {
            if (key === 'editor' && dialogData[key]) {
                obj[key] = TextEditor
            } else if (dialogData[key]) {
                obj['key'] = dialogData[key].toString().toLowerCase();
                obj['name'] = dialogData[key].charAt(0).toUpperCase() + dialogData[key].slice(1);
            }
        }
        //we need to update rows
        const updateRows = ro.map((cur: any) => {
            cur[dialogData['columnName']] = "";
            return cur
        })
        setRows(updateRows)
        col.push(dialogData?.['columnName'])
        handleData(updateRows)
        // ro = updateRows
        setColumns((prevState: any) => [...prevState, obj])
        setDialog(false);
    }
    // const rowData = useMemo(() => {
    //     return ro
    // }, [ro.length])

    // },[columns])

    const rowClickHandler = (row: any) => {
        //convert the row's key's values to string.
        let str1 = Object.values(row).toString()
        const indexOfObject = props.parentState[name].value?.findIndex((obj: any) => {
            let str2 = Object.values(obj).toString()
            return str2 === str1
        })
        // delete the row from the rows array
        const newRows = [...props.parentState[name].value]
        newRows.splice(indexOfObject, 1)
        handleData(newRows)
    }

    return (<div style={{ position: "relative" }}>
        <div>
            <button type="button" onClick={addRow}>add row</button>
            <button type="button" onClick={addColumn}>add column</button>
        </div>
        <DataGrid
            columns={columnData}
            rows={props.parentState[name].value || []}
            onCopy={onCopy}
            rowHeight={35}      // it increase the height of row
            headerRowHeight={100}       // it increase the height of header
            // onPaste={onPaste}
            // rowKeyGetter={(i: any) => rows[i]}
            // minHeight={150}
            onRowsChange={handleRowChange}
            // rowClass={(e: any) => rowClass(e)}
            className={properties?.['className'] ?? "fill-grid"}
        // onRowClick={rowClickHandler}
        // onColumnResize={onColumnResize}
        // emptyRowsRenderer={EmptyRowsView}

        />
        <dialog id="llama_dialog_box" open={dialog} style={{ padding: "20px 50px", border: "1px solid", backgroundColor: "#e3dfd5", position: "absolute", top: 200 }}>
            <div style={{ display: "flex", flexDirection: "column", margin: "auto", width: "auto", marginBottom: "10px" }}>
                <div>
                    <input type="text" placeholder='Add your column' name="columnName" required onChange={(e: any) => SetDialogData({ ...dialogData, [e.target.name]: e.target.value })} />
                    {error ? <p style={{ color: 'red', fontSize: "12px", padding: "0px", margin: "0px" }}>Column Name Can't Be empty</p> : null}
                </div>
                <div>
                    <input type="checkbox" id="editable" value={"editor"} checked={dialogData.editor} onChange={(e: any) => SetDialogData({ ...dialogData, [e.target.value]: e.target.checked })} />
                    <label htmlFor='editable'>Editable ?</label>
                </div>
            </div>
            <button type='button' onClick={dialogSubmit} style={{ float: "right", width: "50%" }}>Done</button>
            <button type='button' onClick={dialogClose} style={{ float: "right", width: "50%" }}>Close</button>
        </dialog>
    </div >
    );
}