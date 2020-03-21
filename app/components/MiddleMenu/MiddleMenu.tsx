import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
// import {

// } from "@fortawesome/free-solid-svg-icons";

import { Button } from 'antd';
import NoteCard from './NoteCard/NoteCard';
import {
  MiddleMenuStyle,
  NoteList,
  MiddleLayout,
  TopBar
} from './MiddleMenu.style';

export default function MiddleMenu({
  visibleNotes,
  selection,
  selectNoteAction,
  createNote,
  selectedNote,
  deleteNote,
 updateNote,
 savingNew
}) {
  const notecardContextHandlers = {
    cmPinNoteHandler: (e, {note}) => updateNote(note._id, {pinned: !note.pinned}),
    cmCreateChildNoteHandler: (e, {note}) => createNote(note._id, {}),
    cmShowInMenuHandler: (e, {note}) => updateNote(note._id, {showInMenu: !note.showInMenu, kind: "collection" }),
    cmChangeKindHandler: (e, {note, kind}) => updateNote(note._id, {kind}),
    cmDeleteNoteHandler: (e, {note}) => deleteNote(note._id),
  };
  return (
    <MiddleMenuStyle id="MiddleMenu" style={{ height: '100%' }}>
      <TopBar id="topbar">
        {/* <p>{JSON.stringify(savingNew, null, 2)}</p> */}
        <Button size="small"  onClick={e => createNote(selection, {})}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </TopBar>

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
            <p>No notes to show.</p>
          )}
        </NoteList>
      </Scrollbars>
    </MiddleMenuStyle>
  );
}
