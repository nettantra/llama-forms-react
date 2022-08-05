import React, { useCallback, useState } from 'react'
import { BubbleMenu } from '@tiptap/react'
import Tooltip from "@material-ui/core/Tooltip";

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

const MenuBar = ({editor, props}:any) => {

    const { handleData } = props;

    const [fontValue, setFontValue] = useState([]) as any;
    const [headerSize, setHeaderSize] = useState(Number)
    const [fontSize, setFontSize] = useState([]) as any;
    const [option, setOption] = useState('none');

    const fontOptions = [
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
    const headerOptions = [
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
        const htmlValue = editor.getHTML()
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
                <Tooltip title="Italic" >
                    <button
                        onClick={() => {editor.chain().focus().toggleItalic().run(), handleChange()}}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <FaItalic />
                    </button>
                </Tooltip>
                <Tooltip title="Underline" >
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive("underline") ? "is-active" : ""}
                    >
                        <FaUnderline />
                    </button>
                </Tooltip>

                <Tooltip title="Strick" >
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
                <Tooltip title="Left Align" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive('left') ? 'is-active' : ''}>
                        <FaAlignLeft />
                    </button>
                </Tooltip>
                <Tooltip title="Right Align" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive('right') ? 'is-active' : ''}>
                        <FaAlignRight />
                    </button>
                </Tooltip>
                <Tooltip title="Center Align" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive('center') ? 'is-active' : ''}>
                        <FaAlignCenter />
                    </button>
                </Tooltip>
                <Tooltip title="Justify" >
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive('justify') ? 'is-active' : ''}>
                        <FaAlignJustify />
                    </button>
                </Tooltip>
                <Tooltip title="Bulleted list" >
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletedList') ? 'is-active' : ''}
                    >
                        <FaListUl />
                    </button>
                </Tooltip>
                <Tooltip title="Numbered list" >
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('numberedList') ? 'is-active' : ''}
                    >
                        <FaListOl />
                    </button>
                </Tooltip>
                <Tooltip title="Code block" >
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        <FaCode />
                    </button>
                </Tooltip>
                <Tooltip title="Block quote" >
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
                <Tooltip title="Set Link" >
                    <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                        <FaLink />
                    </button>
                </Tooltip>
                <Tooltip title="Unset Link" >
                    <button
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        // disabled={!editor.isActive('link')}
                    >
                        <FaUnlink />
                    </button>
                </Tooltip>
                <Tooltip title="Set Image" >
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
                <Tooltip title="Select font style" >
                    <button id='select' onClick={() => editor.chain().focus().setFontFamily(fontValue).run()}
                        className={editor.isActive('textStyle', { fontFamily: fontValue }) ? 'is-active' : ''}>
                        <select className='select' value={fontValue} onChange={(e) => setFontValue(e.target.value)}>
                            <option >Font Style</option>
                            {fontOptions.map((e) => {
                                const { name, id } = e;
                                return <option value={name}>{name}</option>;
                            })}
                        </select>
                    </button>
                </Tooltip>
                <Tooltip title="Select header size" >
                    <button id='select' onClick={() => editor.chain().focus().toggleHeading({ level: headerSize }).run()}
                        className={editor.isActive('heading', { level: headerSize }) ? 'is-active' : ''}>
                        <select className='select' value={headerSize} onChange={(e) => setHeaderSize(parseInt(e.target.value))}>
                            <option >Select Header</option>
                            {headerOptions.map((e) => {
                                const { name, id } = e;
                                return <option value={id}>{name}</option>;
                            })}
                        </select>
                    </button>
                </Tooltip>
                <Tooltip title="Select font size" >
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
                            <option disabled selected>Table Operation</option>
                            <option value='addColumnBefore'>Add column Before</option>
                            <option value='addColumnAfter' >Add Column After</option>
                            <option value='deleteColumn'>Delete Column</option>
                            <option value='addRowBefore'>Add Row Before</option>
                            <option value='addRowAfter'>Add Row After</option>
                            <option value='deleteRow'>Delete Row</option>
                            <option value='deleteTable'>Delete Table</option>
                            <option value='mergeCells'>Merge Cells</option>
                            <option value='splitCell'>Split Cell</option>
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
                {editor && <BubbleMenu className='bubbleMenu' editor={editor} tippyOptions={{ duration: 100 }}>
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
                    <Tooltip title="Set Link" >
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
export default MenuBar;
