import React, {useState, useRef} from 'react';
import styled from 'styled-components';

import { MyInput } from './style';
import sampleImage from '../../assets/sample.png'
import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
import MultiSelect from './FieldForm/MultiSelect';
import ColumnEditor from './ColumnEditor/ColumnEditor';
import IndexEditor from './IndexEditor/IndexEditor';
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faStar as faStarOutline
} from '@fortawesome/free-regular-svg-icons';
import {
  faHistory,
  faTrashAlt,
  faCaretSquareRight,
  faFolderOpen,
  faFingerprint,
  faThumbtack,
  faBook,
  faStar as faStarSolid
} from '@fortawesome/free-solid-svg-icons';

import { Empty } from 'antd';
import {
  EditorStyle,
  NoteMeta,
  Padding,
  EditorPaneStyle,
  EditorRowMeta,
  EditorRowTitle,
  EditorRowTags,
  EditorRowMain
} from './style';
import CollectionEditor from './CollectionEditor/CollectionEditor';
import { InlineItem, RightFloaty } from '../../style/utils.style';
import { NotoriousButtonStyle, TopBar } from '../MiddleMenu/MiddleMenu.style';
import RichEditor from './RichEditor/RichEditor';
import MarkdownEditor from './MarkdownEditor/MarkdownEditor';
import GroupEditor from './GroupEditor/GroupEditor';

const NoteTitleInput = styled(FieldForm)`
  font-size: 18pt;
  font-weight: bold;
  padding: 0;
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
  existingTags,
  selectNoteAction,
  addAttachment,
  parent
}) {
  const [state, setState] = useState({});
  const [count, setCount] = React.useState('100px')
  const valueGetter = useRef();

  // const handleBlur = value => {
  //   console.log(value.getValue())
  //   setState({ content: value.getValue() });
  //   if ( note.content !== value.getValue() ) {
  //     noteActions.updateNote(note._id, { content: value.getValue() })
  //   }
  // };
  const noteref = note && note._id + note._rev
  //http://tower:5985/notes/2e886b17-b57b-4314-a886-880ba4255308/title.txt
  return (
    <>
      { note ? <EditorPaneStyle>
        <EditorRowMeta >
         <TopBar>
            <NoteMeta>

            {parent && <InlineItem><FontAwesomeIcon title="Notebook" icon={faBook} /><span style={{textDecoration: 'underline'}} onClick={e=> selectNoteAction(parent._id)}>{parent.title}</span></InlineItem>}
            {note.children && note.children.length > 0 && <InlineItem title="Number of Subnotes"><FontAwesomeIcon icon={faFolderOpen} />{note.children.length}</InlineItem>}
            {note.showInMenu && <InlineItem><FontAwesomeIcon title="Menu item" icon={faCaretSquareRight} /><span>Menu Item</span></InlineItem>}
            <InlineItem><FontAwesomeIcon title="Created at" icon={faClock} /><Moment title={new Date(note.createdAt)} format="MMM D, YYYY">{note.createdAt}</Moment></InlineItem>
            <InlineItem><FontAwesomeIcon title="Updated at" icon={faHistory} /><Moment title={new Date(note.updatedAt)} format="MMM D, YYYY">{note.updatedAt}</Moment></InlineItem>
            {/* <InlineItem><FontAwesomeIcon title="Notebook" icon={faBook} /><span onClick={e=> addAttachment(note._id, note._rev, "title.txt", "Fd",  new Buffer.from(open(sampleImage)))}>Attachment</span></InlineItem>
            <InlineItem><FontAwesomeIcon title="Identifier" icon={faFingerprint} /><span title={note._id}>{note._id}</span></InlineItem> */}
            <RightFloaty>
              <InlineItem><NotoriousButtonStyle title="Favourite Note" size="small" onClick={e => noteActions.updateNote(note._id, {starred: !note.starred})}><FontAwesomeIcon icon={note.starred ? faStarSolid : faStarOutline} /></NotoriousButtonStyle></InlineItem>
              <InlineItem><NotoriousButtonStyle title="Pin note to top" size="small" onClick={e => noteActions.updateNote(note._id, {pinned: !note.pinned})}><FontAwesomeIcon icon={faThumbtack} /></NotoriousButtonStyle></InlineItem>
              <InlineItem><NotoriousButtonStyle title="Move to trash" size="small" onClick={e => noteActions.softDeleteNote(note._id)}><FontAwesomeIcon icon={faTrashAlt} /></NotoriousButtonStyle></InlineItem>
            </RightFloaty>
          </NoteMeta>
          </TopBar>
        </EditorRowMeta>
        <EditorRowTitle >
        <Padding>

            <MyInput>

            <NoteTitleInput label="title" value={note.title} placeholder="Untitled Note" onUpdate={e => noteActions.updateNote(note._id, {"title": e.target.value})} className="ant-input-lg" />
            </MyInput>
          </Padding>
        </EditorRowTitle>
        <EditorRowTags >
          <Padding>

            <MultiSelect id={`react-select-${note.id}-${note._rev}`} label="tags" values={note.tags} options={existingTags.map(t=> ({label: t, value: t}))} onUpdate={tags => noteActions.updateNote(note._id, {"tags": tags})} />
          </Padding>
          </EditorRowTags >
        <EditorRowMain>


        {note.kind && note.kind === "columns" && <EditorStyle>
          <ColumnEditor key={`column-editor-${noteref}`} note={note} subNotes={subNotes} noteActions={noteActions} />
        </EditorStyle>
        }
        {note.kind && note.kind === "collection" && <EditorStyle>
          <CollectionEditor key={`collectioneditor-${noteref}`} note={note} subNotes={subNotes} noteActions={noteActions} />
        </EditorStyle>}
        {note.kind && note.kind === "index" && <EditorStyle>
          <IndexEditor note={note} subNotes={subNotes} noteActions={noteActions} />

        </EditorStyle>}
        {note.kind && note.kind === "group" && <EditorStyle>
          <GroupEditor note={note} subNotes={subNotes} noteActions={noteActions} />

        </EditorStyle>}


        {(!note.kind || note.kind === 'normal') && <>
          {!note.editor || note.editor === 'markdown' ? <MarkdownEditor
            id={note._id}
            key={note._id}
            // key={noteref}  // reopens #61 and closes #122
            note={note}
            noteActions={noteActions}
           />

              : <RichEditor
              id={noteref } key={noteref}
              note={note}
              noteActions={noteActions}
              />
              }




          </>
          }
      </EditorRowMain>
      </EditorPaneStyle> :  <Empty style={{marginTop: '350px'}}
     image={Empty.PRESENTED_IMAGE_SIMPLE}
    imageStyle={{
      height: 60,
    }}
    description={<span>No note selected. Select something on the left.</span>
    }
  >
  </Empty>}
    </>

  );
}
