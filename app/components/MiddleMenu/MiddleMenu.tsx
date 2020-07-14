import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Button, Empty } from 'antd';
import { faPlus, faSortAlphaDown, faSortAlphaUp, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';
import {
  TopBar,
  TopBarItem,
  NotoriousButtonStyle,
  StickyLayoutMiddle,
  StickyLayoutTitle,
  StickyLayoutMain,
  MiddleMenuStyle,
  NoteList,
  SortToggler
} from './MiddleMenu.style';
import FieldForm from '../EditorPane/FieldForm/FieldForm';

import NoteCard from './NoteCard/NoteCard';
import { SORT_ALPHA_REVERSE, SORT_ALPHA, SORT_CUSTOM, SORT_CREATED_AT, SORT_UPDATED_AT } from '../../containers/MiddleMenu/actions';

export const SearchBarInput = styled.div`
  .ant-input {
  border-color: ${props => props.theme.colors.text.light};

    outline: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}
`
export default function MiddleMenu({
  visibleNotes,
  sorter,
  selection,
  selectNoteAction,
  createNote,
  selectedNote,
  softDeleteNote,
 updateNote,
 moveNote,
 dropNoteCache,
 savingNew,
 searchNotes,
 addButtonDisabled,
 restoreNote,
 deleteNote,
 headerLabel,
 sortNotes
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
      <StickyLayoutMiddle>
        <TopBar>

          <TopBarItem>
            <SearchBarInput>

            <FieldForm label="search" placeholder="Search" onUpdate={e => searchNotes(e.target.value)} delay={2} className="ant-input-sm" />
            </SearchBarInput>
          </TopBarItem>
          <TopBarItem>
                <NotoriousButtonStyle size="small"  onClick={e => createNote(selection, {})} disabled={addButtonDisabled}>
                  <FontAwesomeIcon icon={faPlus} />
                </NotoriousButtonStyle>

          </TopBarItem>
        </TopBar>
      </StickyLayoutMiddle>
      <StickyLayoutTitle>

        {/* <TopBarItem style={{width: '15px'}}> */}
        { sorter === SORT_ALPHA && <SortToggler onClick={e=>sortNotes(SORT_ALPHA_REVERSE)}> <FontAwesomeIcon icon={faSortAlphaDown} /> Title</SortToggler>}
        { sorter === SORT_ALPHA_REVERSE && <SortToggler onClick={e=>sortNotes(SORT_CREATED_AT)}> <FontAwesomeIcon icon={faSortAlphaUp}  /> Title</SortToggler>}
        { sorter === SORT_CREATED_AT && <SortToggler onClick={e=>sortNotes(SORT_UPDATED_AT)}> <FontAwesomeIcon icon={faSortAmountDownAlt} /> Created </SortToggler>}
        { sorter === SORT_UPDATED_AT && <SortToggler onClick={e=>sortNotes(SORT_CUSTOM)}> <FontAwesomeIcon icon={faSortAmountDownAlt} /> Modified</SortToggler>}
        { sorter === SORT_CUSTOM && <SortToggler onClick={e=>sortNotes(SORT_ALPHA)}> <FontAwesomeIcon icon={faSortAmountDownAlt} /> Custom</SortToggler>}
        {/* </TopBarItem> */}
        <TopBarItem>
        <h4 style={{textAlign: 'center'}}>{headerLabel}</h4>

        </TopBarItem>
        <TopBarItem style={{width: '15px'}}>
        </TopBarItem>
      </StickyLayoutTitle>

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
                handleDrag={(id) => moveNote(id, dropNoteCache)}
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
