import React, { Component, useCallback  } from 'react';
import {Controlled as ReactCodeMirror} from 'react-codemirror2';
import { debounce } from "lodash";

// import { Resizable} from 're-resizable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-regular-svg-icons";
import {  } from "@fortawesome/free-solid-svg-icons";

import 'codemirror/lib/codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';

import 'hypermd/core';
import 'hypermd/mode/hypermd';

import 'hypermd/addon/hide-token';
import 'hypermd/addon/cursor-debounce';
import 'hypermd/addon/fold';
import 'hypermd/addon/read-link';
import 'hypermd/addon/click';
import 'hypermd/addon/hover';
import 'hypermd/addon/paste';
import 'hypermd/addon/insert-file';
import 'hypermd/addon/mode-loader';
import 'hypermd/addon/table-align';

const handler = f => useCallback(debounce(f, 2000), []);

class MarkdownEditor extends Component {
  constructor(props) {
      super(props);
      this.state = {
          content: props.note.content,
      }
      this.codeMirrorRef = React.createRef();


  }

  updateContent

  render() {
    const updateContent=(editor, data, value)=> {
    console.log("updateContent editor",editor)
    console.log("updateContent data",data)
    console.log("updateContent value",value)
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

      hmdFold: {
        image: true,
        link: true,
        math: true,
      },
      hmdHideToken: true,
      hmdCursorDebounce: true,
      hmdPaste: true,
      hmdClick: false,
      hmdHover: true,
      hmdTableAlign: true
    };
      return  <ReactCodeMirror value={this.state.content} ref={this.codeMirrorRef}
      className="code-mirror_editor"
      options={options}
      onBeforeChange={(editor, data, value) => {
        this.setState({content: value});
      }}
      onChange={updateContent} />;
  }
}
export default MarkdownEditor;
