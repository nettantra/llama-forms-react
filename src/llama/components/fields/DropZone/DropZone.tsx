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

const DropZone = (props: Props) => {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
  return (
    <div
        // className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        // onDragOver={this.onDragOver}
        // onDragLeave={this.onDragLeave}
        // onDrop={this.onDrop}
        // onClick={this.openFileDialog}
        // style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <input
        //   ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
        //   onChange={this.onFilesAdded}
        />
        <img
          alt="upload"
          className="Icon"
          src="baseline-cloud_upload-24px.svg"
        />
        <span>Upload Files</span>
      </div>
  )
}

export default DropZone