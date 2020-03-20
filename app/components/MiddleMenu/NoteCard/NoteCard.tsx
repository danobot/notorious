import React from 'react';
import EllipsisText from 'react-ellipsis-text';
import { Tag } from 'antd';
import Moment from 'react-moment';
import {
  ContextMenu,
  ContextMenuTrigger,
  MenuItem,
  SubMenu
} from 'react-contextmenu';
import {
  NoteCardStyle,
  NoteListTitle,
  NotePreview,
  NoteTags,
  NoteCardMeta
} from './NoteCard.style';

const removeMd = require('remove-markdown');

export default function NoteCard(props) {
  const {
    cmPinNoteHandler,
    cmCreateChildNoteHandler,
    cmShowInMenuHandler,
    cmChangeTypeHandler,
    cmDeleteNoteHandler
  } = props.handlers;
  const { title, content, tags, _id, createdAt, updatedAt } = props.note;
  return (
    <>
      <ContextMenuTrigger id="notecard-context">
        <NoteCardStyle
          key={`${_id}style`}
          onClick={e => props.handleClick(props.note)}
          selected={props.selected}
        >
          <NoteListTitle>{title || 'Untitled Note'}</NoteListTitle>
          <NoteCardMeta>
            <Moment fromNow>{createdAt}</Moment>
          </NoteCardMeta>
          <NoteTags>
            {tags &&
              tags.length > 0 &&
              tags.map(t => <Tag key={`${_id}-${t}`}>{t}</Tag>)}
          </NoteTags>
          <NotePreview>
            <EllipsisText text={removeMd(content)} length={60} />
          </NotePreview>
        </NoteCardStyle>
      </ContextMenuTrigger>

      <ContextMenu id="notecard-context" key={`${_id}cm`}>
        <MenuItem data={{ note: props.note }} onClick={cmPinNoteHandler}>
          {props.note.pinned ? <span>Unpin</span> : <span>Pin to top</span>}
        </MenuItem>
        <MenuItem
          data={{ note: props.note }}
          onClick={cmCreateChildNoteHandler}
        >
          Create Child Note
        </MenuItem>
        <MenuItem data={{ note: props.note }} onClick={cmShowInMenuHandler}>
          {props.note.showInMenu ? (
            <span>Remove from menu</span>
          ) : (
            <span>Show in menu</span>
          )}
        </MenuItem>
        <SubMenu title="Change type to...">
          <MenuItem
            data={{ note: props.note, type: 'collection' }}
            onClick={cmChangeTypeHandler}
          >
            Collection
          </MenuItem>
          <MenuItem
            data={{ note: props.note, type: 'columns' }}
            onClick={cmChangeTypeHandler}
          >
            Column
          </MenuItem>
        </SubMenu>
        <MenuItem
          data={{ note: props.note }}
          onClick={cmDeleteNoteHandler}
          style={{ backgroundColor: 'red' }}
        >
          Delete
        </MenuItem>
      </ContextMenu>
    </>
  );
}
