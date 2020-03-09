import React from 'react';
import { MiddleMenuStyle, NoteList,MiddleLayout , TopBar } from './MiddleMenu.style';
import { Scrollbars } from "react-custom-scrollbars";
import NoteCard from './NoteCard/NoteCard';


export default function MiddleMenu({visibleNotes, selectNoteAction}) {
  return (
      <MiddleMenuStyle id="MiddleMenu" style={{height: '100%'}}>
        <TopBar id="topbar">
          <p> TopBar test</p>
        </TopBar>

        <Scrollbars autoHide id="scrollbar">
          <p>Inside scrollbarsd</p>
          <div>{JSON.stringify(visibleNotes, null, 2)}</div>
          <NoteList id="notes-list">

          {visibleNotes.map(i => <NoteCard key={i._id} note={i} handleClick={selectNoteAction} />) }
          </NoteList>
        </Scrollbars>

      </MiddleMenuStyle>
  );
}
