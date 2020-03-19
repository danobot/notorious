import React, {useState, useRef} from 'react';
import { NoteTitle,NoteHeader, EditorStyle, NoteMeta, NoteMetaIcon, NoteMetaItem } from './style';


import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from '@monaco-editor/react';
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faHistory, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { deleteNote } from '../../reducers/noteActions';
import { Button } from 'antd';
export default function EditorPane({contentArea, note,
  updateNote,
  deleteNote
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

            <NoteMetaItem alt="Created"><NoteMetaIcon><FontAwesomeIcon icon={faClock} /></NoteMetaIcon><Moment format="MMM D, YYYY">{note.createAt}</Moment></NoteMetaItem>
            <NoteMetaItem alt="Updated"><NoteMetaIcon><FontAwesomeIcon icon={faHistory} /></NoteMetaIcon><Moment format="MMM D, YYYY">{note.updatedAt}</Moment></NoteMetaItem>
            <NoteMetaItem alt="ID">{note._id}</NoteMetaItem>
            <NoteMetaItem alt="delete"><Button size="small" onClick={e => deleteNote(note._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button></NoteMetaItem>
          </NoteMeta>
          <FieldForm label="title" value={note.title} placeholder="Untitled Note" onUpdate={e => updateNote(note._id, {"title": e.target.value})} />
          <div>{note.tags}</div>
        </NoteHeader>
        <EditorStyle>
          { note.contents.map(editor =>
          // <Editor key={editor.id} height="90vh" language="javascript" />

          <SimpleMDE id={note._id + editor.id} key={editor.id}
            value={editor.markdown}
            events={{
              'blur': handleBlur,
            }}
            options={{
              autosave: {
                enabled: true,
                uniqueId: note._id + editor.id,
                delay:1000
              },
            }} />

            )
          };
          </EditorStyle>
      </> : <>No note selected</>}
    </>

  );
}
