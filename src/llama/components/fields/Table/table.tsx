import './App.css';
import DataGrid, { TextEditor } from 'react-data-grid';
import { useState } from 'react';
import React from 'react';

function App() {
    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title', editor: TextEditor }
    ];

    const [rows, setRows] = useState([
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
    ]);

    const handleRowChange = (rows: any) => {
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
    // function rowKeyGetter(row: Row) {
    //   console.log(row.id);
    //   return row.id;
    // }

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

export default App;
