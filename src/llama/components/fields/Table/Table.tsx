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
    const [error, setError] = useState(false)
    const [columns, setColumns] = useState([]) as any
    const [rows, setRows] = useState([]) as any
    const [dialog, setDialog] = useState(false)
    const [dialogData, SetDialogData] = useState({
        columnName : "",
        editor : false
    })as any

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
        console.log("handleRowChange", rows)
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
        // console.log("object", row);
        return row;
    }
    // const onColumnResize = (id :any, width:any)=>{
    //     console.log(">>>", id, width);
    // }

    //<------- This function is for add rows ------->
    const addRow = () => {
        let obj: any = {}
        for(let k = 0; k < columns.length; k++){
            if(!columns[k]['key']) return
            obj[columns[k]['key']] = ""
        }
        setRows((prevState: any) => [...prevState, obj])
    console.log("rowww", obj);
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
        if(!dialogData?.['columnName']){
            setError(true);
            setTimeout(()=>{
                setError(false)
            }, 2000)
            return;
        }
        let obj : any = {}
        for(let key in dialogData){
            if(key === 'editor' && dialogData[key]){
                obj[key] = TextEditor
            }else if(dialogData[key]){
                obj['key'] = dialogData[key].toString().toLowerCase();
                obj['name'] = dialogData[key].charAt(0).toUpperCase() + dialogData[key].slice(1);
            }
        }
        // console.log("updateRows", updateRows);
        setColumns((prevState : any) => [...prevState, obj])
        // addRow()
        setDialog(false);
    }
    // const updatingRow = useMemo(()=>{

    // },[columns])
    return (<div style={{position:"relative"}}>
        <div>
            <button type="button" onClick={addRow}>add row</button>
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
                    <input type="text" placeholder='Add your column' name = "columnName" required onChange={(e : any)=>SetDialogData({...dialogData, [e.target.name] : e.target.value})}/>
                    {error? <p style={{ color: 'red', fontSize:"12px", padding: "0px", margin:"0px"}}>Column Name Can't Be empty</p>: null}
                </div>
                <div>
                    <input type="checkbox" id="editable" value={"editor"} checked={dialogData.editor} onChange={(e : any)=>SetDialogData({...dialogData, [e.target.value] : e.target.checked})}/>
                    <label htmlFor='editable'>Editable ?</label>
                </div>
            </div>
            <button type='button' onClick={dialogSubmit} style={{float:"right", width:"50%"}}>Done</button>
            <button type='button' onClick={dialogClose} style={{float:"right", width:"50%"}}>Close</button>
        </dialog>
    </div >
    );
}