import React, { useCallback, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline";
import TextAlign from '@tiptap/extension-text-align'
import Tooltip from "@material-ui/core/Tooltip";
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

import { RiSeparator, RiTextWrap, } from "react-icons/ri"
import { MdOutlineFontDownloadOff } from "react-icons/md"

import {
    FaBold,
    FaItalic,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaStrikethrough,
    FaUnderline,
    FaUndo,
    FaCode,
    FaParagraph,
    FaAlignLeft,
    FaAlignRight,
    FaAlignCenter,
    FaAlignJustify,
    FaLink,
    FaUnlink,
    FaImages,
    FaHighlighter,
    FaSubscript,
    FaSuperscript,
    FaTable
} from "react-icons/fa";
interface Props {
    properties: any,
    handleData: any,
    name: any,
    parentState: any,
}
const MenuBar = ({editor, props}:any) => {

    const { handleData } = props;

    const [fontValue, setFontValue] = useState([]) as any;
    const [headerSize, setHeaderSize] = useState(Number)
    const [fontSize, setFontSize] = useState([]) as any;
    const [option, setOption] = useState('none');

    const FontOptions = [
        { name: "monospace", id: 1 },
        { name: "Courier", id: 2 },
        { name: "Arial", id: 3 },
        { name: "sans-serif", id: 4 },
        { name: "cursive", id: 5 },
        { name: '"Trebuchet MS", sans-serif', id: 6 },
        { name: 'Times New Roman', id: 7 },
    ];
    const fontSizeOption = [
        { name: "8pt", id: 1 },
        { name: "10pt", id: 2 },
        { name: "12pt", id: 3 },
        { name: "14pt", id: 4 },
        { name: "16pt", id: 5 },
        { name: "18pt", id: 6 },
        { name: "20pt", id: 7 },
        { name: "22pt", id: 8 },
        { name: "24pt", id: 9 },
        { name: "26pt", id: 10 },
        { name: "28pt", id: 11 },
        { name: "36pt", id: 12 },
        { name: "48pt", id: 13 },
        { name: "72pt", id: 14 },
    ];
    const HeaderOptions = [
        { id: 1, name: "H1", },
        { id: 2, name: "H2", },
        { id: 3, name: "H3", },
        { id: 4, name: "H4", },
        { id: 5, name: "H5", },
        { id: 6, name: "H6", },
    ];

    //table features start
    const TableField = (e: any) => {
        if (e === 'addColumnBefore') {
            editor.chain().focus().addColumnBefore().run();
        }
        else if (e === 'addColumnAfter') {
            editor.chain().focus().addColumnAfter().run()
        }
        else if (e === 'deleteColumn') {
            editor.chain().focus().deleteColumn().run()
        }
        else if (e === 'addRowBefore') {
            editor.chain().focus().addRowBefore().run()
        }
        else if (e === 'addRowAfter') {
            editor.chain().focus().addRowAfter().run()
        }
        else if (e === 'deleteRow') {
            editor.chain().focus().deleteRow().run()
        }
        else if (e === 'deleteTable') {
            editor.chain().focus().deleteTable().run()
        }
        else if (e === 'mergeCells') {
            editor.chain().focus().mergeCells().run()
        }
        else if (e === 'splitCell') {
            editor.chain().focus().splitCell().run()
        }
    }
    //table features end

    //link features
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        // cancelled
        if (url === null) {
            return
        }
        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()
            return
        }
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])
    //link features end
    //Add Image features
    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])
    //Add Image features end
    if (!editor) {
        return null
    }
    const handleChange = () => {
        console.log("HIT MENU BAR sri", handleData)
        const htmlValue = editor.getHTML()
        console.log("=====>", htmlValue);
        handleData(htmlValue);
    };
    return (
        <div className="menuBar">
            <div>
                <Tooltip title="Bold" >
                    <button
                        onClick={() => {editor.chain().focus().toggleBold().run(), handleChange()}}
                        className={editor.isActive("bold") ? "is-active" : ""}
                    >
                        <FaBold />
                    </button>
                </Tooltip>
                <Tooltip title="italic" >
                    <button
                        onClick={() => {editor.chain().focus().toggleItalic().run(), handleChange()}}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <FaItalic />
                    </button>
                </Tooltip>
                <Tooltip title="underline" >
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive("underline") ? "is-active" : ""}
                    >
                        <FaUnderline />
                    </button>
                </Tooltip>

                <Tooltip title="strick" >
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        <FaStrikethrough />
                    </button>
                </Tooltip>
                <Tooltip title="Paragraph" >
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={editor.isActive('paragraph') ? 'is-active' : ''}
                    >
                        <FaParagraph />
                    </button>
                </Tooltip>
                <Tooltip title="textalign-left" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
                        <FaAlignLeft />
                    </button>
                </Tooltip>
                <Tooltip title="textalign-right" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
                        <FaAlignRight />
                    </button>
                </Tooltip>
                <Tooltip title="textalign-center" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
                        <FaAlignCenter />
                    </button>
                </Tooltip>
                <Tooltip title="textalign-justify" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
                        <FaAlignJustify />
                    </button>
                </Tooltip>
                <Tooltip title="BulletList" >
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <FaListUl />
                    </button>
                </Tooltip>
                <Tooltip title="OrderList" >
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <FaListOl />
                    </button>
                </Tooltip>
                <Tooltip title="Codeblock" >
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        <FaCode />
                    </button>
                </Tooltip>
                <Tooltip title="Blockquote" >
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        <FaQuoteLeft />
                    </button>
                </Tooltip>
                <Tooltip title="Horizontal rule" >
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <RiSeparator />
                    </button>
                </Tooltip>
                <Tooltip title="Hard break" >
                    <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                        <RiTextWrap />
                    </button>
                </Tooltip>
                <Tooltip title="Choose Text Color" >
                    <button >
                        <input
                            type="color"
                            onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
                            value={editor.getAttributes('textStyle').color}
                        />
                    </button>
                </Tooltip>
                <Tooltip title="setLink" >
                    <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                        <FaLink />
                    </button>
                </Tooltip>
                <Tooltip title="unsetLink" >
                    <button
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                    >
                        <FaUnlink />
                    </button>
                </Tooltip>
                <Tooltip title="setimage" >
                    <button onClick={addImage}><FaImages /></button>
                </Tooltip>
                <Tooltip title="Highlight" >
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'is-active' : ''}>
                        <FaHighlighter />
                    </button>
                </Tooltip>
                <Tooltip title="Subscript" >
                    <button
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        className={editor.isActive('subscript') ? 'is-active' : ''}>
                        <FaSubscript />
                    </button>
                </Tooltip>
                <Tooltip title="Superscript" >
                    <button
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        className={editor.isActive('superscript') ? 'is-active' : ''}>
                        <FaSuperscript />
                    </button>
                </Tooltip>
                <Tooltip title="Remove font style" >
                    <button onClick={() => editor.chain().focus().unsetFontFamily().run()} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        <MdOutlineFontDownloadOff />
                    </button>
                </Tooltip>
                <Tooltip title="Select Font style" >
                    <button id='select' onClick={() => editor.chain().focus().setFontFamily(fontValue).run()}
                        className={editor.isActive('textStyle', { fontFamily: fontValue }) ? 'is-active' : ''}>
                        <select className='select' value={fontValue} onChange={(e) => setFontValue(e.target.value)}>
                            <option >Font Style</option>
                            {FontOptions.map((e) => {
                                const { name, id } = e;
                                return <option value={name}>{name}</option>;
                            })}
                        </select>
                    </button>
                </Tooltip>
                <Tooltip title="Select Header size" >
                    <button id='select' onClick={() => editor.chain().focus().toggleHeading({ level: headerSize }).run()}
                        className={editor.isActive('heading', { level: headerSize }) ? 'is-active' : ''}>
                        <select className='select' value={headerSize} onChange={(e) => setHeaderSize(parseInt(e.target.value))}>
                            <option >Select Header</option>
                            {HeaderOptions.map((e) => {
                                const { name, id } = e;
                                return <option value={id}>{name}</option>;
                            })}
                        </select>
                    </button>
                </Tooltip>
                <Tooltip title="Select Font size" >
                    <button id='select' onClick={() => editor.chain().focus().setFontSize(fontSize).run()}
                        className={editor.isActive('textStyle', { fontSize: fontSize }) ? 'is-active' : ''}>
                        <select className='select' value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                            <option>Font size</option>
                            {fontSizeOption.map((e) => {
                                const { name, id } = e;
                                return <option value={name}>{name}</option>;
                            })}
                        </select>
                    </button>
                </Tooltip>
                {/* table start */}
                <Tooltip title="Table" >
                    <button
                        onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); setOption('inline') }}>
                        <FaTable />
                    </button>
                </Tooltip>
                <Tooltip title="Table Operation" >
                    <button id='select' style={{ display: option }}>
                        <select className='select' onChange={(e) => { TableField(e.target.value); }}>
                            <option disabled selected> Table Operation</option>
                            <option value='addColumnBefore'>Add column Before</option>
                            <option value='addColumnAfter' >Add Column After</option>
                            <option value='deleteColumn'>Delete Column</option>
                            <option value='addRowBefore'>Add Row Before</option>
                            <option value='addRowAfter'>Add Row After</option>
                            <option value='deleteRow'> Delete Row</option>
                            <option value='deleteTable'> Delete Table</option>
                            <option value='mergeCells'> Merge Cells</option>
                            <option value='splitCell'> Split Cell</option>
                        </select>
                    </button>
                </Tooltip>
                {/* table end */}
                <Tooltip title="Undo" >
                    <button onClick={() => editor.chain().focus().undo().run()}>
                        <FaUndo />
                    </button>
                </Tooltip>
                <Tooltip title="Redo" >
                    <button onClick={() => editor.chain().focus().redo().run()}>
                        <FaRedo />
                    </button>
                </Tooltip>
                {/* Bubble menu start */}
                {editor && <BubbleMenu className='bubblemenu' editor={editor} tippyOptions={{ duration: 100 }}>
                    <Tooltip title="Bold" >
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'is-active' : ''}>
                            <FaBold />
                        </button>
                    </Tooltip>&nbsp;
                    <Tooltip title="Highlight" >
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight().run()}
                            className={editor.isActive('highlight') ? 'is-active' : ''}>
                            <FaHighlighter />
                        </button>
                    </Tooltip>&nbsp;
                    <Tooltip title="setLink" >
                        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                            <FaLink />
                        </button>
                    </Tooltip>
                </BubbleMenu>}
                {/* Bubble menu end */}
                <div style={{ textAlign: 'right', color: '#868e96', fontSize: '12px', marginRight: '5px' }}>
                    {editor.storage.characterCount.characters()} characters &nbsp;
                    {editor.storage.characterCount.words()} words
                </div>
            </div>
        </div>
    )
}
const TextEditorField = (props: Props) => {
    const { properties, handleData, name } = props;
    console.log("kk", props)
    let editor: any = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link,
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
        console.log("HIT MENU BAR")
        const htmlValue = editor.getHTML()
        console.log("=====>", htmlValue);
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
          .bubblemenu button{
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
          .bubblemenu button:hover{
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
            .tableWrapper {
                padding: 1rem 0;
                overflow-x: auto;
              }              
              .resize-cursor {
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