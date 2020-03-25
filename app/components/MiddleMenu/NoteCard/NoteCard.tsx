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
} from './NoteCard.style';
import { RightFloaty, InlineItem } from '../../../style/utils.style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-regular-svg-icons";
import {  faFolderOpen, faInbox } from "@fortawesome/free-solid-svg-icons";

const removeMd = require('remove-markdown');

export default function NoteCard(props) {
  const {
    cmPinNoteHandler,
    cmCreateChildNoteHandler,
    cmShowInMenuHandler,
    cmChangeKindHandler,
    cmDeleteNoteHandler
  } = props.handlers;
  const { title, content, tags, _id, createdAt, updatedAt,children, kind } = props.note;
  return (
    <>
      <ContextMenuTrigger id={`${_id}cm`}>
        <NoteCardStyle
          key={`${_id}style`}
          onClick={e => props.handleClick(props.note._id)}
          {...props}
        >
          <div className="noteListTitle">{title || 'Untitled Note'}</div>
          <div className="noteCardMeta">
            {children.length > 0 && <InlineItem><FontAwesomeIcon icon={faFolderOpen} />{children.length}</InlineItem>}
            {kind === 'collection' && <InlineItem><FontAwesomeIcon icon={faInbox} /></InlineItem>}
            <InlineItem><Moment fromNow>{createdAt}</Moment></InlineItem>
            <RightFloaty>

            </RightFloaty>
          </div>
          <div className="noteTags">
          {tags &&
              tags.length > 0 &&
              tags.map(t => <Tag key={`${_id}-${t}`}>{t}</Tag>)}
          </div>
            <div className="notePreview">
            <EllipsisText text={removeMd(content)} length={60} />

            </div>
        </NoteCardStyle>
      </ContextMenuTrigger>

      <ContextMenu id={`${_id}cm`} key={`${_id}cm`}>
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
        <SubMenu title="Change kind to..." delay={0}>
          <MenuItem
            data={{ note: props.note, kind: 'collection' }}
            onClick={cmChangeKindHandler}
          >
            Collection
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'columns' }}
            onClick={cmChangeKindHandler}
          >
            Column
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'normal' }}
            onClick={cmChangeKindHandler}
          >
            Normal
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
