import React, {useState, useRef} from 'react';
import { NoteTitle,NoteHeader, Editor, NoteMeta, NoteMetaIcon, NoteMetaItem } from './style';


import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {

  faClock
} from "@fortawesome/free-regular-svg-icons";
import {faHistory } from "@fortawesome/free-solid-svg-icons";
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
          <NoteMeta>

            <NoteMetaItem alt="Created"><NoteMetaIcon><FontAwesomeIcon icon={faClock} /></NoteMetaIcon><Moment format="MMM D, YYYY">{note.createAt}</Moment>
            </NoteMetaItem>
            <NoteMetaItem alt="Updated"><NoteMetaIcon><FontAwesomeIcon icon={faHistory} /></NoteMetaIcon><Moment format="MMM D, YYYY">{note.updatedAt}</Moment></NoteMetaItem>
          </NoteMeta>
          <FieldForm label="title" value={note.title} onUpdate={e => updateNote(note._id, {"title": e.target.value})} />
          <div>{note.tags}</div>
        </NoteHeader>
        <Editor>

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
        </Editor>
        {/* <div>{JSON.stringify(note, null, 2)}</div> */}

      </> : <>No note selected</>}
    </>

  );
}
