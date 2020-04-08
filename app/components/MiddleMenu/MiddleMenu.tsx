import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import {TopBarItem, TopBarButton, NotoriousButtonStyle, StickyLayoutMiddle, StickyLayoutTitle, StickyLayoutMain,StickyLayoutAddButton} from './MiddleMenu.style'
import FieldForm from '../EditorPane/FieldForm/FieldForm';

import {
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import { Button, Empty } from 'antd';
import NoteCard from './NoteCard/NoteCard';
import {
  MiddleMenuStyle,
  NoteList
} from './MiddleMenu.style';


export const NoteTitleInput = styled(FieldForm)`
  width: 100%;
  .ant-form {
    height: 100%;
  }
  .ant-input, .ant-input-lg, .ant-input:focus {
    padding: 5px;
    height: 100%;
    outline: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: none;
}
  /* .ant-form {
    width: 100%;
  }
  .ant-input, .ant-input:focus {
  border-color: ${props => props.theme.colors.text.light};

  width:100%;
} */
`
export default function MiddleMenu({
  visibleNotes,
  selection,
  selectNoteAction,
  createNote,
  selectedNote,
  softDeleteNote,
 updateNote,
 savingNew,
 searchNotes,
 addButtonDisabled,
 restoreNote,
 deleteNote,
 headerLabel
}) {

  const notecardContextHandlers = {
    cmPinNoteHandler: (e, {note}) => updateNote(note._id, {pinned: !note.pinned}),
    cmSwitchEditorHandler: (e, {note, editor}) => updateNote(note._id, {editor: editor}),
    cmCreateChildNoteHandler: (e, {note}) => createNote(note._id, {}),
    cmShowInMenuHandler: (e, {note}) => updateNote(note._id, {showInMenu: !note.showInMenu, kind: "collection" }),
    cmChangeKindHandler: (e, {note, kind}) => updateNote(note._id, {kind}),
    cmDeleteNoteHandler: (e, {note}) => softDeleteNote(note._id),
    cmHardDeleteNoteHandler: (e, {note}) => deleteNote(note._id),
    cmRestoreNoteHandler: (e, {note}) => restoreNote(note._id)
  };

  return (
    <MiddleMenuStyle id="MiddleMenu" style={{ height: '100%' }}>
      <StickyLayoutTitle>
        <h4 style={{textAlign: 'center'}}>{headerLabel}</h4>

      </StickyLayoutTitle>
      <StickyLayoutMiddle>
          <NoteTitleInput label="search" placeholder="Search" onUpdate={e => searchNotes(e.target.value)} delay={2} className="ant-input-sm" />
      </StickyLayoutMiddle>
      <StickyLayoutAddButton>

              <NotoriousButtonStyle size="small"  onClick={e => createNote(selection, {})} disabled={addButtonDisabled}>
                <FontAwesomeIcon icon={faPlus} />
              </NotoriousButtonStyle>
      </StickyLayoutAddButton>

<StickyLayoutMain>

      <Scrollbars autoHide id="scrollbar">
        {/* <div>{JSON.stringify(visibleNotes, null, 2)}</div> */}

        <NoteList id="notes-list">
          {visibleNotes.length > 0 ? (
            visibleNotes.map(i => (
              <NoteCard
                key={i._id ? i._id : Date.now()}
                note={i}
                selected={i._id === selectedNote}
                handleClick={selectNoteAction}
                handlers={notecardContextHandlers}
              />
            ))
          ) : (
            <Empty style={{alignSelf: 'middle', alignItems: 'center'}}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 60,
              }}
              description="This notebook is empty. Create a note or select a notebook."

            >
              <Button type="primary" onClick={e => createNote(selection, {})}>New Note</Button>
            </Empty>
          )}
        </NoteList>
      </Scrollbars>
</StickyLayoutMain>

    </MiddleMenuStyle>
  );
}
