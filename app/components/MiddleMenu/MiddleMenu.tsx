import React from 'react';
import { MiddleMenuStyle, NoteList,MiddleLayout , TopBar } from './MiddleMenu.style';
import { Scrollbars } from "react-custom-scrollbars";
import NoteCard from './NoteCard/NoteCard';
import { Button } from 'antd';


export default function MiddleMenu({visibleNotes, selection, selectNoteAction, createNote}) {
  return (
      <MiddleMenuStyle id="MiddleMenu" style={{height: '100%'}}>
        <TopBar id="topbar">
          <Button onClick={e=> createNote(selection)}>Plus</Button>
        </TopBar>

        <Scrollbars autoHide id="scrollbar">
          {/* <div>{JSON.stringify(visibleNotes, null, 2)}</div> */}
          <NoteList id="notes-list">

          {visibleNotes.length > 0 ? visibleNotes.map(i => <NoteCard key={i._id} note={i} handleClick={selectNoteAction} />) : <p>No notes to show.</p>}
          </NoteList>
        </Scrollbars>

      </MiddleMenuStyle>
  );
}
