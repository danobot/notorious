import React, { Component, useCallback  } from 'react';
import { Controlled as ReactCodeMirror } from 'react-codemirror2';
import { debounce } from "lodash";
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
import 'hypermd/addon/fold-emoji';
import 'hypermd/addon/fold-math';
// import 'hypermd/addon/fold-gutter';
// import 'hypermd/addon/markdown-fold';
// import 'hypermd/addon/overlay';
import 'hypermd/addon/read-link';
import 'hypermd/addon/click';
import 'hypermd/addon/hover';
import 'hypermd/addon/paste';
import 'hypermd/addon/insert-file';
import 'hypermd/addon/mode-loader';
import 'hypermd/addon/table-align';
// Folding
import 'hypermd/addon/fold-image';
import 'hypermd/addon/fold-emoji';
import 'hypermd/addon/fold-html';
import 'hypermd/addon/fold-code';
import 'hypermd/addon/fold-link';
import 'hypermd/addon/fold-math';

import 'hypermd/powerpack/hover-with-marked';
import 'hypermd/powerpack/paste-with-turndown';
import 'hypermd/powerpack/fold-code-with-flowchart';
import 'hypermd/powerpack/insert-file-with-smms';
import 'hypermd/powerpack/fold-emoji-with-emojione';



class MarkdownEditor extends Component {
  constructor(props) {
      super(props);
      this.state = {
          content: props.note.content,
      }
      this.codeMirrorRef = React.createRef();


  }


  render() {
    const updateContent=(editor, data, value)=> {
    // console.log("updateContent editor",editor)
    // console.log("updateContent data",data)
    // console.log("updateContent value",value)
    // handler(()=>this.props.noteActions.updateNote(this.props.note._id, {content: value}))
// console.log(value)
// this.props.noteActions.updateNote(this.props.note._id, {content: value})
      // this.setState({content:value})
      this.setState({content:value}) ;
      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=> {this.props.noteActions.updateNote(this.props.note._id, {content: value})}, 5000)
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
        byDrop: true
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
          className="code-mirror_editor"
          options={options}
          onBeforeChange={(editor, data, value) => {
            this.setState({content: value});
          }}
          onChange={updateContent} />
      </Scrollbars>;
  }
}
export default MarkdownEditor;
