import React, { Component, useCallback  } from 'react';

import { debounce } from "lodash";

import 'jodit';
import JoditEditor from "jodit-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-regular-svg-icons";
import {  } from "@fortawesome/free-solid-svg-icons";

const handler = f => useCallback(debounce(f, 2000), []);

class RichEditor extends Component {
  constructor(props) {
      super(props);
      this.state = {
          content: props.note.content,
      }
  }

  updateContent(value) {
    // handler(()=>this.props.noteActions.updateNote(this.props.note._id, {content: value}))
// console.log(value)
// this.props.noteActions.updateNote(this.props.note._id, {content: value})
      // this.setState({content:value})
      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=> {this.setState({content:value}) ;this.props.noteActions.updateNote(this.props.note._id, {content: value})}, 5000)
  }

  render() {
      return <JoditEditor
          value={this.state.content}
          config={{
              readonly: false,
              height: '100%',
          }}
          onChange={ this.updateContent.bind(this)}
      />
  }
}
// export default function ColumnEditor({ subNotes, noteActions, note }) {
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [state, setState] = useState({});
//   const valueGetter = useRef();

//   function handleEditorDidMount(_valueGetter) {
//     console.log('Editor did mount');
//     setIsEditorReady(true);
//     valueGetter.current = _valueGetter;
//     console.log(valueGetter.current());
//   }
//   const handleBlur = note => value => {
//     console.log("editor content",value.getValue());
//     console.log("note.content: ",note.content);
//     // setState({ content: value.getValue() });
//     if (note.content !== value.getValue()) {
//       console.log("updateNote");
//       noteActions.updateNote(note._id, { content: value.getValue() });
//     }
//   };
//   const noteref = note._id+note._rev

//   return (
//     <>
//     <SplitPane split="vertical" key={noteref}>
//       {subNotes.map(editor => {
//         const unique = "column-editor-" + editor._id + editor._ref
//         return <SimpleMDE id={unique} key={unique}
//             value={editor.content}
//             events={{
//               'blur': handleBlur(editor),
//             }}
//             options={{
//               spellChecker: false
//             }} />

//           })}
//           </SplitPane>
//     </>
//   );
// }
export default RichEditor;
