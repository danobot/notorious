import React, {useState, useRef} from 'react';
import { MenuItem } from './style';

import Editor from '@monaco-editor/react';

import SimpleMDE from "react-simplemde-editor";
export default function EditorPane({contentArea, note,
  updateNoteContent
}) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [state, setState] = useState({});
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    console.log("Editor did mount")
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
    print(valueGetter.current())
  }
  const handleBlur = value => {
    console.log(value.getValue())
    setState({ content: value.getValue() });
    if ( note.content !== value.getValue() ) {
      updateNoteContent(note._id, { content: value.getValue() })
    }
  };
  return (
    <>
      { note ? <>
        <div>{note.title}</div>
        <div>{note.tags}</div>
        <div>{JSON.stringify(note, null, 2)}</div>
        <SimpleMDE id={note._id}
        value={note.content}
        events={{
          'blur': handleBlur,
        }}
        options={{
          autosave: {
            enabled: true,
            uniqueId: note._id,
            delay:1000
          },
        }} />;

      </> : <>No note selected</>}
    </>

  );
}
