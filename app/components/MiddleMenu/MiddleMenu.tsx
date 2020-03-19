import React from 'react';
import { MiddleMenuStyle, NoteList,MiddleLayout , TopBar } from './MiddleMenu.style';
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit

} from "@fortawesome/free-regular-svg-icons";
// import {

// } from "@fortawesome/free-solid-svg-icons";

import NoteCard from './NoteCard/NoteCard';
import { Button } from 'antd';


export default function MiddleMenu({visibleNotes, selection, selectNoteAction, createNote, selectedNote}) {
  return (
      <MiddleMenuStyle id="MiddleMenu" style={{height: '100%'}}>
        <TopBar id="topbar">
          <Button size="small" onClick={e=> createNote(selection)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </TopBar>

        <Scrollbars autoHide id="scrollbar">
          {/* <div>{JSON.stringify(visibleNotes, null, 2)}</div> */}
          <NoteList id="notes-list">

          {visibleNotes.length > 0 ? visibleNotes.map(i => <NoteCard key={i._id} note={i} selected={i._id === selectedNote} handleClick={selectNoteAction} />) : <p>No notes to show.</p>}
          </NoteList>
        </Scrollbars>

      </MiddleMenuStyle>
  );
}
