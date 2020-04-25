import React, { Component, useCallback  } from 'react';
import { Controlled as ReactCodeMirror } from 'react-codemirror2';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../../../utils/config';

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
import './codemirror/addon/fold-image';
// import 'hypermd/addon/fold-image';
import 'hypermd/addon/fold-html';
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
    const ajaxUpload = (
      url: string,
      rev: string,
      form: { [name: string]: string | File; },
      callback: (content, error) => void,
      method?: string
    ) => {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (4 == this.readyState) {
          var ret = xhr.responseText
          try { ret = JSON.parse(xhr.responseText) } catch (err) { }

          if (/^20\d/.test(xhr.status + "")) {
            callback(ret, null)
          } else {
            callback(null, ret)
          }
        }
      }
      xhr.open( 'PUT', url, true)
      xhr.setRequestHeader("If-Match", rev);
      xhr.setRequestHeader("Authorization", "Basic " + btoa(config.username + ":" + config.password));
      xhr.setRequestHeader("Content-Type", form.type);
      xhr.send(form)
    }
    const updateContent=(editor, data, value)=> {
    // console.log("updateContent editor",editor)
    // console.log("updateContent data",data)
    // console.log("updateContent value",value)
      clearTimeout(this.timeout)
      const saveContents = ()=> {
        this.props.noteActions.updateNote(this.props.note._id, {content: value})
        editor.markClean()
      }
      this.timeout = setTimeout(saveContents, 10000)
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
        fileHandler: (files: File, action) => {
          console.group("fileHandler", action)
          console.log("FileHandler files: ", files)
          var placeholderForAll = document.createElement("span")
          placeholderForAll.className = "hmd-image-loading"
          action.setPlaceholder(placeholderForAll)


            const file = files[0] // can only drop one file
            const url = config.scheme +"://" +config.url + "/notes/" + this.props.note._id + "/" + file.name
            action.finish("![](@"+this.props.note._id + ":" + encodeURIComponent(file.name)+")", placeholderForAll)
            ajaxUpload(url, this.props.note._rev,  file,(o, e)=> {
              console.log(o)
            })
            // if (!/image\//.test(file.type)) continue
            // const fileBuffer = new Response(file).arrayBuffer().then(r=> {

            //   console.log("FileHandler rr: ", r)
            //   const dataView = new DataView(r)
            //   console.log("FileHandler dataView: ",dataView)

            //   uploadImageAttachment(this.props.note, file.name, file.type, dataView.buffer).then(result => {
            //     console.log("uploadImageAttachment result: ", result)
            //     console.log("uploadImageAttachment note: ", this.props.note)
            //     // TODO construct image url
            //     // TODO call the callback with Url
            //   action.finish("![]("+file.name+")", placeholderForAll)

            //     // action.finish("http://fds.com", placeholderForAll)

            //     console.groupEnd()
            //   }).catch(function (err) {
            //     console.log("uploadImageAttachment err: ", err)
            //     action.finish("http://fds.com", placeholderForAll)
            //     console.groupEnd()
            //   });
            //   // this.props.addAttachment(this.props.note._id, this.props.note._rev,file.name, file.type, dataView )

            // })
          // }
            // const fileBuffer = new Blob([file], {type: file.type, endings: "transparent"})
            //new Buffer.from(open(fileBuffer))


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
