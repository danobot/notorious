import React, {useState, useRef} from 'react';
import { NoteTitle,NoteHeader, EditorStyle, NoteMeta, NoteMetaIcon, MainContent} from './style';
import styled from 'styled-components';

import { MyInput } from './style';

import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
import MultiSelect from './FieldForm/MultiSelect';
import ColumnEditor from './ColumnEditor/ColumnEditor';
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from '@monaco-editor/react';
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faHistory, faTrashAlt, faFolderOpen, faFingerprint } from "@fortawesome/free-solid-svg-icons";

import { Button, Empty } from 'antd';
import CollectionEditor from './CollectionEditor/CollectionEditor';
import { InlineItem, RightFloaty } from '../../style/utils.style';
import { findExistingTags } from '../../containers/MainMenu/selectors';

const NoteTitleInput = styled(FieldForm)`
  font-size: 18pt;
  font-weight: bold;
  padding: 0;
  margin-top: 10px;
  .ant-input, .ant-input:focus {
  border: none;
  border-color: ${props => props.theme.colors.text.light};
  outline: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  width:100%;
}
`

export default function EditorPane({contentArea, note,
  subNotes,
  noteActions,
  existingTags
}) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [state, setState] = useState({});
  const valueGetter = useRef();

  const handleBlur = value => {
    console.log(value.getValue())
    setState({ content: value.getValue() });
    if ( note.content !== value.getValue() ) {
      noteActions.updateNote(note._id, { content: value.getValue() })
    }
  };
  const noteref = note && note._id+note._rev
  return (
    <>
      { note ? <>
        <NoteHeader>
          <NoteMeta>

            <InlineItem alt="Created"><FontAwesomeIcon icon={faClock} /><Moment format="MMM D, YYYY">{note.createAt}</Moment></InlineItem>
            <InlineItem alt="Updated"><FontAwesomeIcon icon={faHistory} /><Moment format="MMM D, YYYY">{note.updatedAt}</Moment></InlineItem>
            {note.children && note.children.length > 0 && <InlineItem alt="subnoteCount"><FontAwesomeIcon icon={faFolderOpen} />{note.children.length}</InlineItem>}
            <InlineItem alt="ID"><FontAwesomeIcon icon={faFingerprint} />{note._id.split("-")[0]}</InlineItem>
            <RightFloaty>
              <InlineItem alt="delete"><Button size="small" onClick={e => noteActions.deleteNote(note._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button></InlineItem>

            </RightFloaty>
          </NoteMeta>
          <MyInput>

          <NoteTitleInput label="title" value={note.title} placeholder="Untitled Note" onUpdate={e => noteActions.updateNote(note._id, {"title": e.target.value})} className="ant-input-lg" />
          </MyInput>
          <MultiSelect id={`react-select-${note.id}-${note._rev}`} label="tags" values={note.tags} options={existingTags.map(t=> ({label: t, value: t}))} onUpdate={tags => noteActions.updateNote(note._id, {"tags": tags})} />
        </NoteHeader>

      <MainContent>


        {note.kind && note.kind === "columns" && <EditorStyle>
          <ColumnEditor key={`column-editor-${noteref}`} note={note} subNotes={subNotes} noteActions={noteActions} />
        </EditorStyle>
        }
        {note.kind && note.kind === "collection" && <EditorStyle>
          <CollectionEditor key={`collectioneditor-${noteref}`} note={note} subNotes={subNotes} noteActions={noteActions} />
        </EditorStyle>}


        {(!note.kind || note.kind === 'normal') && <EditorStyle>
          <SimpleMDE id={noteref } key={noteref}
            value={note.content}
            events={{
              'blur': handleBlur,
            }}
            options={{
              spellChecker: false

            }} />


          </EditorStyle>
          }
      </MainContent>

      </> :  <Empty style={{marginTop: '200px'}}
    // image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        <p>No note selected.</p>
        <p>Select a note or notebook from the menus on the left.</p>
      </span>
    }
  >
  </Empty>}
    </>

  );
}
