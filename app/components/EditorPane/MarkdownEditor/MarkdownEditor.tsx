import React, { Component, useCallback  } from 'react';
import { Controlled as ReactCodeMirror } from 'react-codemirror2';
import { Scrollbars } from 'react-custom-scrollbars';
import 'codemirror/lib/codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';

import 'hypermd/core';
import 'hypermd/mode/hypermd';

import 'hypermd/keymap/hypermd';
import 'hypermd/addon/hide-token';
import 'hypermd/addon/cursor-debounce';
import 'hypermd/addon/fold';

// import 'hypermd/addon/fold-gutter';
// import 'hypermd/addon/markdown-fold';
import 'hypermd/addon/read-link';
import 'hypermd/addon/click';
import 'hypermd/addon/hover';
import 'hypermd/addon/insert-file';
import 'hypermd/addon/mode-loader';
import 'hypermd/addon/table-align';
// Folding
// import './codemirror/addon/fold-image';
import 'hypermd/addon/fold-html';
import 'hypermd/addon/fold-image';
import 'hypermd/addon/fold-code';
import 'hypermd/addon/fold-link';
import 'hypermd/addon/fold-emoji';
import 'hypermd/addon/fold-math';

import 'hypermd/powerpack/hover-with-marked';
import 'hypermd/powerpack/paste-with-turndown';
import 'hypermd/powerpack/fold-code-with-flowchart';
import 'hypermd/addon/paste';

import 'hypermd/powerpack/insert-file-with-smms';
import 'hypermd/powerpack/fold-emoji-with-emojione';
import { uploadImageAttachment } from '../../../PouchInit';
// import 'hypermd/powerpack/fold-emoji-with-twemoji';



class MarkdownEditor extends Component {
  state = { content: "", pendingUpdate: false}
  constructor(props) {
      super(props);
      this.state = {
          content: props.note.content,
      }
      this.codeMirrorRef = React.createRef();


  }
componentDidUpdate(prevProps) { // componentDidUpdate is significant because this.props already contains the new props
  if (prevProps.note._rev !== this.props.note._rev){
    console.log("componentDidUpdate prevProps", prevProps)
    console.log("componentDidUpdate prevProps rev", prevProps.note._rev)
    console.log("componentDidUpdate props rev", this.props.note._rev)
    this.setState({content: this.props.note.content}) // closes #61
  }
}

  render() {
    const updateContent=(editor, data, value)=> {
    console.log("updateContent editor",editor)
    console.log("updateContent data",data)
    // console.log("updateContent value",value)
      clearTimeout(this.timeout)
      const saveContents = ()=> {
        this.props.noteActions.updateNote(this.props.note._id, {content: value})
        editor.markClean()
      }
      this.timeout = setTimeout(saveContents, 5000)
  }
    const options = {
      mode: 'hypermd',
      // mode: 'gfm',
      theme: 'hypermd-light',
      // scrollbarStyle: "null",
      height: 'auto',
      // viewportMargin: 'Infinity',
      lineWrapping: true,
      hmdFold: {
        image: true,
        link: true,
        math: true,
        code: true,
        html: true,
        emoji: true
      },
      hmdFoldEmoji: {
        enabled: true
      },
      hmdFoldCode: {
        flowchart: true,
        mermaid: true
      },
      hmdClick: {
        enabled: true,
          handler: c => console.log("on hmd click", c),
      },
      hmdInsertFile: {
        byPaste: true,
        byDrop: true,
        fileHandler: (file: File, callback: (url?: string) => void) => {
          console.group("fileHandler")
          console.log("FileHandler file: ", file)
          const fileBuffer = Buffer.from(file)

          // TODO call upoadIMageAttachemnets here
          uploadImageAttachment(this.props.note, file.name, file.type, fileBuffer).then(result => {
            console.log("uploadImageAttachment result: ", result)
            // TODO construct image url
             // TODO call the callback with Url
            callback("./todo.png")

            console.groupEnd()
          }).catch(function (err) {
            console.log("uploadImageAttachment err: ", err)
            console.groupEnd()
          });

          // ajaxUpload(
          //   'https://sm.ms/api/upload',
          //   {
          //     smfile: file,
          //     format: 'json'
          //   },
          //   function (o, e) {
          //     const imgURL = (o && o.code == 'success') ? o.data.url : null
          //     callback(imgURL)
          //   }
          // )
        }
      },
      hmdHideToken: true,
      hmdCursorDebounce: true,
      hmdPaste: true,
      hmdClick: false,
      hmdHover: true,
      hmdTableAlign: true
    };
      return  <Scrollbars autoHide id="editor-scrollbar">
        <ReactCodeMirror value={this.state.content} ref={this.codeMirrorRef}
        autoCursor={true}
        autoScroll={true}
          className="code-mirror_editor"
          options={options}
          editorDidMount={(editor)=> {
            this.editor = editor
          }}
          onBeforeChange={(editor, data, value) => {
            this.setState({content: value});
          }}
          onChange={updateContent}
          onBlur={(editor, event) => {
            // console.log("onlur editor", editor)
            // console.log("onlur getValue", editor.getValue())
            // console.log("onlur event", event)
            // console.log("onlur timeout", this.timeout)
            console.log("onlur editor.isClean()", editor.isClean())
            if (!editor.isClean()) {
              clearTimeout(this.timeout)
              console.log("Editor is dirty, updating note in database")
              this.props.noteActions.updateNote(this.props.note._id, {content: editor.getValue()})
              editor.markClean()
            }
          }}
          />
      </Scrollbars>;
  }
}
export default MarkdownEditor;
