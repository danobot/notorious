import React, { useState, useRef } from 'react';


import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from '@monaco-editor/react';
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faHistory, faTrashAlt, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'antd';

import SplitPane from 'react-split-pane';
export default function ColumnEditor({ subNotes, noteActions }) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [state, setState] = useState({});
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    console.log('Editor did mount');
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
    console.log(valueGetter.current());
  }
  const handleBlur = note => value => {
    console.log("editor content",value.getValue());
    console.log("note.content: ",note.content);
    // setState({ content: value.getValue() });
    if (note.content !== value.getValue()) {
      console.log("updateNote");
      noteActions.updateNote(note._id, { content: value.getValue() });
    }
  };
  return (
    <>
    <SplitPane split="vertical" >

      {subNotes.map(editor => {
        const unique = "column-editor" + editor._id

        // <Editor key={editor.id} height="90vh" language="javascript" />
        return <SimpleMDE id={unique} key={unique}
            value={editor.content}
            events={{
              'blur': handleBlur(editor),
            }}
            options={{
              spellChecker: false
            }} />

          })}
          </SplitPane>
    </>
  );
}
