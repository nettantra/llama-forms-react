import React, { useCallback, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline";
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import FontFamily from '@tiptap/extension-font-family'
import fontSize from 'tiptap-extension-font-size';
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import MenuBar from './MenuBar';
interface Props {
    properties: any,
    handleData: any,
    name: any,
    parentState: any,
}

const TextEditorField = (props: Props) => {
    const { properties, handleData, name } = props;

    let editor: any = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
              autolink: false,
            }),
            Image,
            Highlight,
            Subscript,
            Superscript,
            FontFamily,
            fontSize,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            CharacterCount,
            Placeholder.configure({
                placeholder: 'Write something …',
            })
        ],
        content: props.parentState[name]?.value ? props.parentState[name]?.value : ` `,
    })
    const handleChange = (e: any) => {
        const htmlValue = editor.getHTML()
        handleData(htmlValue);
    };
    return (
        <>
            <h3 style={{ fontFamily: 'Nunito Sans', fontWeight: '400', fontSize: '16px', margin: '5px 0' }}>{properties['label']}
            </h3>
            <div className="main">
                <div className="textEditor">
                    <MenuBar editor={editor} props={props}/>
                    <EditorContent editor={editor} onInput={(e: any) => { handleChange(e); }} />
                </div>
            </div>
            <p style={{ fontFamily: "Nunito Sans", fontWeight: "400", fontSize: "14px", margin: "5px 0", }}>
                {properties["description"]}
            </p>
            <style>{
                `
          .main{
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            justify-content: center;  
            width:98%;
        }         
          .ProseMirror {
            padding: 10px;
            border-radius: 0 0 5px 5px;
            min-height: 100px;
            background: #ffffff;
          }
          .ProseMirror:focus {
            border: none;
            outline: none;
          }          
          .ProseMirror > * + * {
            margin-top: 0.75em;
          }          
          .ProseMirror ul,
          .ProseMirror ol {
            padding: 0 2rem;
          }          
          .ProseMirror h1,
          .ProseMirror h2,
          .ProseMirror h3,
          .ProseMirror h4,
          .ProseMirror h5,
          .ProseMirror h6 {
            line-height: 1.1;
          }          
          .ProseMirror code {
            background-color: rgba(#616161, 0.1);
            color: #616161;
          }          
          .ProseMirror pre {
            background: #0d0d0d;
            color: #fff;
            font-family: "JetBrainsMono", monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
          }
          .ProseMirror code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
          }          
          .ProseMirror img {
            max-width: 100%;
            height: auto;
          }          
          .ProseMirror blockquote {
            padding-left: 1rem;
            border-left: 3px solid #999999;
          }          
          .ProseMirror hr {
            border: none;
            border-top: 2px solid #424242;
            margin: 2rem 0;
          }          
          .textEditor {
            border-radius: 5px;
            border: 1px solid black;               
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            margin-bottom:5px;
          }
          .menuBar {
            padding: 3px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color:  #f7f5f5; 
          }
          .menuBar input{
            height:22px;
            width:22px;
            padding: 2px;
            cursor: pointer;
            border:none;
          }
          .select{
            height:20px;
            width:90px;
            font-size: 10px;
            font-weight: bold;
            border:none;
          }
          .select:hover{
            color:#2388ad;
            background-color:#e6ecee;
          }
          #select{
            height:30px;
            width:110px;
          }
          .menuBar button {
            height:30px;
            width:30px;
            font-size: 13px;
            margin: 7px;
            margin-right: 1px;
            outline: none; 
            border:none;
            color: rgb(70, 70, 70);
            cursor: pointer;
            border-radius: 6px;
            background-color: #f5ededc7;
            margin-bottom: 10px;               
          }        
          .menuBar button:hover{
            color:#2388ad;
            background-color:#e6ecee;
          } 
          .bubbleMenu button{
            height:30px;
            width:30px;
            font-size: 13px;
            outline: none; 
            border:none;
            color: rgb(70, 70, 70);
            cursor: pointer;
            border-radius: 6px;
            background-color: #f5ededc7;
          }   
          .bubbleMenu button:hover{
            color:#2388ad;
            background-color:#e6ecee;
          } 
          button.is-active {
            background-color:#e6ecee;
            padding: 2px 3px;
            border-radius: 6px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            color:#2388ad;
          }
          .heading1 {
            font-size: 14px;
          }
          .heading3 {
            font-size: 12px;
          }     
          .ProseMirror table {
            border-collapse: collapse;
            margin: 0;
            overflow: hidden;
            table-layout: fixed;
            width: 100%;
            }
            .ProseMirror td,
            .ProseMirror th {
            border: 2px solid #ced4da;
            box-sizing: border-box;
            min-width: 1em;
            padding: 3px 5px;
            position: relative;
            vertical-align: top;
             }
            .ProseMirror  > * {
                margin-bottom: 0;
            }
            .ProseMirror th {
            background-color: #f1f3f5;
            font-weight: bold;
            text-align: left;
            }
            .ProseMirror selectedCell:after {
            background: rgba(200, 200, 255, 0.4);
            content: "";
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
            }
            .ProseMirror column-resize-handle {
            background-color: #adf;
            bottom: -2px;
            position: absolute;
            right: -2px;
            pointer-events: none;
            top: 0;
            width: 4px;
            }
            .ProseMirror p {
            margin: 0;
            }
            .ProseMirror tableWrapper {
                padding: 1rem 0;
                overflow-x: auto;
              }              
              .ProseMirror resize-cursor {
                cursor: ew-resize;
                cursor: col-resize;
              }  
              .ProseMirror p.is-editor-empty:first-child::before {
                color: #adb5bd;
                content: attr(data-placeholder);
                float: left;
                height: 0;
                pointer-events: none;
              }
          `
            }</style>
        </>
    )
}
export default TextEditorField;