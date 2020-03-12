import React, {useState, useRef} from 'react';
import { NoteTitle,NoteHeader } from './style';

import Editor from '@monaco-editor/react';

import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
export default function EditorPane({contentArea, note,
  updateNote
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
      updateNote(note._id, { content: value.getValue() })
    }
  };
  return (
    <>
      { note ? <>
        <NoteHeader>
          <FieldForm label="title" value={note.title} onUpdate={e => updateNote(note._id, {"title": e.target.value})} />
          <div>{note.tags}</div>
        </NoteHeader>

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
        <div>{JSON.stringify(note, null, 2)}</div>

      </> : <>No note selected</>}
    </>

  );
}
